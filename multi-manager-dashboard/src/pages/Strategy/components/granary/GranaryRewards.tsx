import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { GRANARY_DATA_PROVIDER } from '../../../../abi/GranaryDataProvider';
import { Vault } from '../../../../redux/slices/vaultsSlice';
import { Strategy } from '../../../../redux/slices/strategiesSlice';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectChain } from '../../../../redux/selectors';

interface IGranaryAddressesProps {
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

const GranaryRewards = ({ vault, strategy }: IGranaryAddressesProps) => {
    const chain = useSelector(selectChain);

    const [userReserveData, setUserReserveData] = useState<UserReserveData | null>(null);

    const { address } = useAccount();
    const provider = new ethers.BrowserProvider(window.ethereum as any);

    useEffect(() => {
        (async () => {
            if (strategy.dataProviderAddress) {
                const signer = await provider.getSigner(address);
                const contract = new ethers.Contract(strategy.dataProviderAddress, GRANARY_DATA_PROVIDER, signer);
    
                // Call the getUserReservesData function
                const response = await contract.getReserveData(vault.asset);
    
                // const data: UserReserveData = {
                //     currentATokenBalance: response.currentATokenBalance.toString(),
                //     currentStableDebt: response.currentStableDebt.toString(),
                //     currentVariableDebt: response.currentVariableDebt.toString(),
                //     principalStableDebt: response.principalStableDebt.toString(),
                //     scaledVariableDebt: response.scaledVariableDebt.toString(),
                //     stableBorrowRate: response.stableBorrowRate.toString(),
                //     liquidityRate: response.liquidityRate.toString(),
                //     stableRateLastUpdated: response.stableRateLastUpdated.toString(),
                //     usageAsCollateralEnabled: response.usageAsCollateralEnabled,
                // };
    
                console.log(response);
                // setUserReserveData(data);
            }
        })()

    }, [strategy.dataProviderAddress]);

    return (
        <div className='grid grid-cols-12 col-span-5 bg-white border border-gray-200 mb-8'>
            <div className={`col-span-12 flex flex-col flex-1`}>
                <div className='p-3 text-gray-800 items-center'>
                    <div className='font-bold'>Rewards</div>
                </div>
                {!strategy?.dataProviderAddress &&
                    <div className='text-md text-center py-10 text-gray-400'>
                        No Data Provider Found
                    </div>
                }
                {strategy?.dataProviderAddress && userReserveData && <div className='px-3 h-[200px] text-xs text-gray-500'>
                    <div className='grid grid-cols-12 mb-1'>
                        <div className='col-span-3'>Vault</div>
                        <div className='col-span-9'><Link to={`${chain.etherscanUrl}${vault.address}`} className="text-blue-500 hover:text-blue-700" target='_blank' >{vault.address}</Link></div>
                    </div>
                    <div className='grid grid-cols-12 mb-1'>
                        <div className='col-span-3'>Strategy</div>
                        <div className='col-span-9'><Link to={`${chain.etherscanUrl}${strategy.address}`} className="text-blue-500 hover:text-blue-700" target='_blank' >{strategy.address}</Link></div>
                    </div>
                    <div className='grid grid-cols-12 mb-1'>
                        <div className='col-span-3'>Asset</div>
                        <div className='col-span-9'><Link to={`${chain.etherscanUrl}${vault.asset}`} className="text-blue-500 hover:text-blue-700" target='_blank' >{vault.asset}</Link></div>
                    </div>
                    <div className='grid grid-cols-12 mb-1'>
                        <div className='col-span-3'>Address Pvdr</div>
                        <div className='col-span-9'><Link to={`${chain.etherscanUrl}${strategy.addressProviderAddress}`} className="text-blue-500 hover:text-blue-700" target='_blank' >{strategy.addressProviderAddress}</Link></div>
                    </div>
                    <div className='grid grid-cols-12 mb-1'>
                        <div className='col-span-3'>Data Provider</div>
                        <div className='col-span-9'><Link to={`${chain.etherscanUrl}${strategy.dataProviderAddress}`} className="text-blue-500 hover:text-blue-700" target='_blank' >{strategy.dataProviderAddress}</Link></div>
                    </div>
                    <div className='grid grid-cols-12 mb-1'>
                        <div className='col-span-3'>Lending Pool</div>
                        <div className='col-span-9'><Link to={`${chain.etherscanUrl}${strategy.lendingPoolAddress}`} className="text-blue-500 hover:text-blue-700" target='_blank' >{strategy.lendingPoolAddress}</Link></div>
                    </div>
                    <div className='grid grid-cols-12 mb-1'>
                        <div className='col-span-3'>Rewarder</div>
                        <div className='col-span-9'><Link to={`${chain.etherscanUrl}${strategy.rewarderAddress}`} className="text-blue-500 hover:text-blue-700" target='_blank' >{strategy.rewarderAddress}</Link></div>
                    </div>
                    <div className='grid grid-cols-12 mb-1'>
                        <div className='col-span-3'>Swapper</div>
                        <div className='col-span-9'><Link to={`${chain.etherscanUrl}${strategy.swapperAddress}`} className="text-blue-500 hover:text-blue-700" target='_blank' >{strategy.swapperAddress}</Link></div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default GranaryRewards;