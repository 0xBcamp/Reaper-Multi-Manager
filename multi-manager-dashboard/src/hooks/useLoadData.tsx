import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Chain, setChains, setSelectedChain } from "../redux/slices/blockchainSlice";
import { RootState } from "../redux/store";
import { User, Vault, VaultSnapshot, VaultTransaction, setVaultSnapshots, setVaultTransactions, setVaults } from "../redux/slices/vaultsSlice";
import { Strategy, StrategyReport, setStrategies, setStrategyReports } from "../redux/slices/strategiesSlice";
import axios from "axios";
import { calculateDataWithThreshold, calculateStrategyAPR } from "../lib/calculateStrategyAPR";
import { DEFAULT_STD_DEV_THRESHOLD } from "../utils/constants";
import { sortTimestampByProp } from "../utils/data/sortByProp";
import { filterLastXDays } from "../utils/data/filterLastXDays";
import { calculateOptimumAllocation, calculateOptimumAllocationBPS, calculateStrategyProductValues, calculateVaultAPR, getStrategyAPRValues, getStrategyAllocatedValues } from "../lib/calculateStrategyAllocations";
import { setInitialized } from "../redux/slices/appSlice";
import { setTokens } from "../redux/slices/reaperSlice";
import { calculateVaultHealthScore } from "../utils/processing";
import { formatUnits } from "ethers";

type ApiResponse = {
    data: {
        Chains: Chain[],
        StrategyReports: StrategyReport[],
        Strategys: Strategy[],
        Users: User[],
        VaultSnapshots: VaultSnapshot[],
        VaultTransactions: VaultTransaction[],
        Vaults: Vault[],
    }

}

export const useLoadData = () => {
    const dispatch = useDispatch();
    const selectedChain = useSelector((state: RootState) => state.blockchain.selectedChain);

    useEffect(() => {
        (async () => {
            const [response, dbVaults, reaperTokens] = await Promise.all([
                fecthData(),
                fecthdbVaults(),
                fecthReaperTokens()
            ]);

            let strategyReports: StrategyReport[] = response.data.StrategyReports.map((report, index) => {
                const strategyAprValue = calculateDataWithThreshold([report], DEFAULT_STD_DEV_THRESHOLD);
                return {
                    ...report,
                    apr: strategyAprValue.yData[0] ? strategyAprValue.yData[0] : 0
                }
            });

            let strategies = response.data.Strategys.filter(x => x.isActive).map(strategy => {
                let currentStrategyReports = strategyReports.filter(report =>
                    report.strategyAddress.toLowerCase() === strategy.address.toLowerCase()
                );

                currentStrategyReports = sortTimestampByProp(currentStrategyReports, "reportDate");

                const inDateRangeReports = filterLastXDays(currentStrategyReports, "reportDate", new Date().getTime(), 30) as StrategyReport[];

                const APR = calculateStrategyAPR(inDateRangeReports);

                return {
                    ...strategy,
                    APR: APR,
                    lastReport: inDateRangeReports?.length > 0 ? inDateRangeReports[inDateRangeReports?.length - 1] : undefined,
                    aprReports: inDateRangeReports,
                };
            });

            const vaultSnapshots = response.data.VaultSnapshots

            let vaults = response.data.Vaults.filter(vault =>
                dbVaults.some(dbVault =>
                    vault.address.toLowerCase() === dbVault.address.toLowerCase() && vault.chain.chainId === dbVault.chainId
                ));

            vaults = response.data.Vaults.filter(vault =>
                dbVaults.some(dbVault =>
                    vault.address.toLowerCase() === dbVault.address.toLowerCase() && vault.chain.chainId === dbVault.chainId
                )).map(vault => {
                    let currentVaultSnapshots = vaultSnapshots.filter(snapshot =>
                        snapshot.vaultAddress.toLowerCase() === vault.address.toLowerCase()
                    );

                    currentVaultSnapshots = sortTimestampByProp(currentVaultSnapshots, "timestamp");

                    const vaultStrategies = strategies.filter(x => x.vaultAddress.toString() === vault.address.toString());

                    const lastSnapShot = currentVaultSnapshots?.length > 0 ? currentVaultSnapshots[currentVaultSnapshots.length - 1] : undefined;

                    let lastVaultAllocated: number;
                    let strategyAPRValues: number[];
                    let strategyAllocatedValues: number[];
                    if (lastSnapShot) {
                        lastVaultAllocated = parseFloat(lastSnapShot?.totalAllocated || "0");
                        strategyAPRValues = getStrategyAPRValues(vaultStrategies);
                        strategyAllocatedValues = getStrategyAllocatedValues(vaultStrategies);

                        const strategyProductValues = calculateStrategyProductValues(strategyAPRValues, strategyAllocatedValues);

                        const vaultAPR = calculateVaultAPR(strategyProductValues, lastVaultAllocated);
                        vault.APR = vaultAPR && !isNaN(vaultAPR) ? vaultAPR : 0
                    }

                    const reaperToken = reaperTokens.find(x => x.address.toLowerCase() === vault.token.toLowerCase());


                    return {
                        ...vault,
                        lastSnapShot: currentVaultSnapshots?.length > 0 ? currentVaultSnapshots[currentVaultSnapshots.length - 1] : undefined,
                        strategyCount: vaultStrategies.length,
                        reaperToken: reaperToken
                    }
                });

            strategies = strategies.map(strategy => {

                const strategyVault = vaults.find(x => x.address.toLowerCase() === strategy.vaultAddress.toLowerCase() && x.chain.chainId === strategy.chainId);

                const lastVaultAllocated = parseFloat(strategyVault.lastSnapShot?.totalAllocated || "0");

                const actualAllocatedBPS = (parseFloat(strategy.lastReport?.allocated) / lastVaultAllocated * 10000)?.toFixed(2);
                const optimumAllocation = calculateOptimumAllocation(parseFloat(strategy.lastReport?.allocated), strategy.APR, strategyVault.APR);
                const optimumAllocationBPS = calculateOptimumAllocationBPS(parseFloat(strategy.lastReport?.allocated), strategy.APR, strategyVault.APR, lastVaultAllocated);

                return {
                    ...strategy,
                    vault: strategyVault,
                    actualAllocatedBPS,
                    optimumAllocation,
                    optimumAllocationBPS
                }
            })

            vaults = vaults.map(vault => {
                const vaultStrategies = strategies.filter(x => x.vaultAddress.toString() === vault.address.toString());

                return {
                    ...vault,
                    healthScore: calculateVaultHealthScore(vaultStrategies)
                }
            })

            dispatch(setChains(response.data.Chains));
            if (!selectedChain && response.data.Chains?.length > 0) {
                dispatch(setSelectedChain(response.data.Chains[0]))
            }

            dispatch(setStrategies(strategies));
            dispatch(setStrategyReports(strategyReports));


            dispatch(setVaultSnapshots(vaultSnapshots));
            dispatch(setVaults(vaults));
            dispatch(setVaultTransactions(response.data.VaultTransactions));

            dispatch(setTokens(reaperTokens));


            dispatch(setInitialized(true))
        })()

    }, []);

    const fecthData = async (): Promise<ApiResponse> => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/arkiver/data`);
            return response.data
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        return null;
    }

    const fecthdbVaults = async (): Promise<any[]> => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/vaults`);

            return response.data
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        return null;
    }

    const fecthReaperTokens = async (): Promise<any[]> => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/tokens`);
            return response.data
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        return null;
    }
}