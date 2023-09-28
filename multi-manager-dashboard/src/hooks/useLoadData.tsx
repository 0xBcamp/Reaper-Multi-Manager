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
import { ethers, formatUnits } from "ethers";

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
            const [dbVaults, dbChains] = await Promise.all([
                fecthVaults(),
                fecthChains()
            ]);

            console.log("dbVaults", dbVaults)
            console.log("dbChains", dbChains)

            let vaults = dbVaults.map((vault: Vault) => {
                // Process strategies and update apr in aprReports within each strategy
                const strategiesWithUpdatedApr = vault.strategies.map(strategy => {
                    const updatedAprReports = strategy.aprReports.map(report => {
                        return {
                            ...report,
                            apr: calculateStrategyReportApr(report)
                        };
                    });

                    const strategyAPR = calculateStrategyAPR(updatedAprReports);

                    const updatedStrategy: Strategy = {
                        ...strategy,
                        APR: strategyAPR,
                        lastReport: {
                            ...strategy.lastReport,
                            apr: calculateStrategyReportApr(strategy.lastReport)
                        },
                        aprReports: updatedAprReports
                    }

                    return updatedStrategy;
                });

                let lastVaultAllocated: number;
                let strategyAPRValues: number[];
                let strategyAllocatedValues: number[];
                let currentVaultAPR: number = 0;

                if (vault.lastSnapShot) {
                    lastVaultAllocated = parseFloat(vault.lastSnapShot?.totalAllocated || "0");
                    strategyAPRValues = getStrategyAPRValues(strategiesWithUpdatedApr);
                    strategyAllocatedValues = getStrategyAllocatedValues(vault.strategies);

                    const strategyProductValues = calculateStrategyProductValues(strategyAPRValues, strategyAllocatedValues);

                    const vaultAPR = calculateVaultAPR(strategyProductValues, lastVaultAllocated);
                    currentVaultAPR = vaultAPR && !isNaN(vaultAPR) ? vaultAPR : 0
                }

                const strategiesWithOptimumValues = strategiesWithUpdatedApr.map(strategy => {

                    lastVaultAllocated = parseFloat(vault.lastSnapShot?.totalAllocated || "0");

                    const actualAllocatedBPS = (parseFloat(strategy.lastReport?.allocated || "0") / lastVaultAllocated * 10000)?.toFixed(2);
                    const optimumAllocation = calculateOptimumAllocation(parseFloat(strategy.lastReport?.allocated || "0"), strategy.APR, currentVaultAPR);
                    const optimumAllocationBPS = calculateOptimumAllocationBPS(parseFloat(strategy.lastReport?.allocated || "0"), strategy.APR, currentVaultAPR, lastVaultAllocated);

                    const updatedStrategy: Strategy = {
                        ...strategy,
                        actualAllocatedBPS,
                        optimumAllocation,
                        optimumAllocationBPS
                    }

                    return updatedStrategy;
                });

                return {
                    ...vault,
                    APR: currentVaultAPR,
                    strategies: strategiesWithOptimumValues
                };
            })

            dispatch(setVaults(vaults));

        })();
    }, []);



    const calculateStrategyReportApr = (report: StrategyReport) => {
        const strategyAprValue = calculateDataWithThreshold([report], DEFAULT_STD_DEV_THRESHOLD);
        return strategyAprValue.yData[0] ? strategyAprValue.yData[0] : 0;
    };

    // useEffect(() => {
    //     (async () => {
    //         const [response, dbVaults, reaperTokens] = await Promise.all([
    //             fecthData(),
    //             fecthdbVaults(),
    //             fecthReaperTokens(),

    //         ]);



    //         const vaultSnapshots = response.data.VaultSnapshots


    //         strategies = strategies.map(strategy => {

    //             const strategyVault = vaults.find(x => x.address.toLowerCase() === strategy.vaultAddress.toLowerCase() && x.chain.chainId === strategy.chainId);

    //             const lastVaultAllocated = parseFloat(strategyVault.lastSnapShot?.totalAllocated || "0");

    //             const actualAllocatedBPS = (parseFloat(strategy.lastReport?.allocated || "0") / lastVaultAllocated * 10000)?.toFixed(2);
    //             const optimumAllocation = calculateOptimumAllocation(parseFloat(strategy.lastReport?.allocated || "0"), strategy.APR, strategyVault.APR);
    //             const optimumAllocationBPS = calculateOptimumAllocationBPS(parseFloat(strategy.lastReport?.allocated || "0"), strategy.APR, strategyVault.APR, lastVaultAllocated);

    //             return {
    //                 ...strategy,
    //                 vault: strategyVault,
    //                 actualAllocatedBPS,
    //                 optimumAllocation,
    //                 optimumAllocationBPS
    //             }
    //         })

    //         vaults = vaults.map(vault => {
    //             const vaultStrategies = strategies.filter(x => x.vaultAddress.toString() === vault.address.toString());

    //             return {
    //                 ...vault,
    //                 healthScore: calculateVaultHealthScore(vaultStrategies)
    //             }
    //         })

    //         dispatch(setChains(response.data.Chains));
    //         if (!selectedChain && response.data.Chains?.length > 0) {
    //             dispatch(setSelectedChain(response.data.Chains[0]))
    //         }

    //         dispatch(setStrategies(strategies));
    //         dispatch(setStrategyReports(strategyReports));


    //         dispatch(setVaultSnapshots(vaultSnapshots));
    //         dispatch(setVaults(vaults));
    //         dispatch(setVaultTransactions(response.data.VaultTransactions));

    //         dispatch(setTokens(reaperTokens));

    //         setTimeout(() => {
    //             dispatch(setInitialized(true))
    //         }, 1000);

    //     })()

    // }, []);

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

    const fecthVaults = async (): Promise<any[]> => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/dto/vaults`);

            return response.data
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        return null;
    }

    const fecthChains = async (): Promise<any[]> => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/dto/chains`);

            return response.data
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        return null;
    }
}