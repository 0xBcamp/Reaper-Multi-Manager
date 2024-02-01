import { Strategy } from '../../../redux/slices/strategiesSlice';
import ProgressBar from '../../../components/ProgressBar';
import Tooltip from '../../../components/Tooltip';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { GRANARY_DATA_PROVIDER } from '../../../abi/GranaryDataProvider';
import { Vault } from '../../../redux/slices/vaultsSlice';
import { useSelector } from 'react-redux';
import { selectTokensByChain } from '../../../redux/selectors';

interface IAllocationProps {
    vault: Vault;
    strategy: Strategy;
}

interface UserReserveData {
    currentATokenBalance: string;
    currentStableDebt: string;
    currentVariableDebt: string;
    principalStableDebt: string;
    scaledVariableDebt: string;
    stableBorrowRate: string;
    liquidityRate: string;
    stableRateLastUpdated: string;
    usageAsCollateralEnabled: boolean;
}

const StrategySupplyBorrow = ({ vault, strategy }: IAllocationProps) => {
    const tokens = useSelector(selectTokensByChain);

    const assetToken = tokens.find(t => t.address === vault.asset);

    const [supplyUSD, setSupplyUSD] = useState("");
    const [expectedSupplyUSD, setExpectedSupplyUSD] = useState("");

    const [userReserveData, setUserReserveData] = useState<UserReserveData | null>(null);

    const { address } = useAccount();
    const provider = new ethers.BrowserProvider(window.ethereum as any);

    useEffect(() => {
        if (userReserveData && assetToken) {
            const _supplyUSD = ((parseFloat(userReserveData.currentATokenBalance) * assetToken.usd).toFixed(2)).toLocaleString();

            const actualAllocate = parseFloat(strategy.actualAllocatedBPS) / 10000;
            const _expectedSupplyUSD = ((vault.lastSnapShot.usd.tvl * actualAllocate).toFixed(2)).toLocaleString();
            setSupplyUSD(_supplyUSD);
            setExpectedSupplyUSD(_expectedSupplyUSD);
        }
    }, [userReserveData, assetToken, vault])

    useEffect(() => {
        (async () => {
            if (strategy.dataProviderAddress) {
                const signer = await provider.getSigner(address);
                const contract = new ethers.Contract(strategy.dataProviderAddress, GRANARY_DATA_PROVIDER, signer);
    
                // Call the getUserReservesData function
                 const response = await contract.getUserReserveData(vault.asset, strategy.address); //op
    
                const data: UserReserveData = {
                    currentATokenBalance: ethers.formatUnits(response.currentATokenBalance.toString(), vault.decimals).toString(),
                    currentStableDebt: response.currentStableDebt.toString(),
                    currentVariableDebt: response.currentVariableDebt.toString(),
                    principalStableDebt: response.principalStableDebt.toString(),
                    scaledVariableDebt: response.scaledVariableDebt.toString(),
                    stableBorrowRate: response.stableBorrowRate.toString(),
                    liquidityRate: response.liquidityRate.toString(),
                    stableRateLastUpdated: response.stableRateLastUpdated.toString(),
                    usageAsCollateralEnabled: response.usageAsCollateralEnabled,
                };
    
                console.log(data);
                setUserReserveData(data);
            }
        })()

    }, [strategy.dataProviderAddress]);

    return (
        <div className='grid grid-cols-12 col-span-5 bg-white border border-gray-200 mb-8'>
            <div className={`col-span-12 flex flex-col flex-1`}>
                <div className='p-3 text-gray-800 items-center'>
                    <div className='font-bold'>Supply and Borrow</div>
                </div>
                {!strategy?.dataProviderAddress &&
                    <div className='text-md text-center py-10 text-gray-400'>
                        No Data Provider Found
                    </div>
                }
                {strategy?.dataProviderAddress && userReserveData && <div className='px-3 h-[200px] text-xs text-gray-500'>
                    <div className='grid grid-cols-12 mb-1'>
                        <div className='col-span-5'>currentATokenBalance</div>
                        <div className='col-span-3'>{parseFloat(userReserveData.currentATokenBalance).toFixed(7)}</div>
                        <div className='col-span-4'>${supplyUSD} (${expectedSupplyUSD})</div>
                    </div>
                    <div className='grid grid-cols-12 mb-1'>
                        <div className='col-span-6'>currentStableDebt</div>
                        <div className='col-span-6'>{userReserveData.currentStableDebt}</div>
                    </div>
                    <div className='grid grid-cols-12 mb-1'>
                        <div className='col-span-6'>currentVariableDebt</div>
                        <div className='col-span-6'>{userReserveData.currentVariableDebt}</div>
                    </div>
                    <div className='grid grid-cols-12 mb-1'>
                        <div className='col-span-6'>principalStableDebt</div>
                        <div className='col-span-6'>{userReserveData.principalStableDebt}</div>
                    </div>
                    <div className='grid grid-cols-12 mb-1'>
                        <div className='col-span-6'>scaledVariableDebt</div>
                        <div className='col-span-6'>{userReserveData.scaledVariableDebt}</div>
                    </div>
                    <div className='grid grid-cols-12 mb-1'>
                        <div className='col-span-6'>stableBorrowRate</div>
                        <div className='col-span-6'>{userReserveData.stableBorrowRate}</div>
                    </div>
                    <div className='grid grid-cols-12 mb-1'>
                        <div className='col-span-6'>liquidityRate</div>
                        <div className='col-span-6'>{userReserveData.liquidityRate}</div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default StrategySupplyBorrow;