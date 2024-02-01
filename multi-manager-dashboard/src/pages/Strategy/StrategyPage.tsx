import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { setSelectedVaultAddress } from '../../redux/slices/vaultsSlice';
import { setSelectedStrategyAddress } from '../../redux/slices/strategiesSlice';
import { selectChain, selectStrategy, selectVault } from '../../redux/selectors';
import DataGrid from '../../components/DataGrid';
import { getStrategyReportColumns } from '../../utils/gridColumns/strategy_report_columns';
import { sortTimestampByProp } from '../../utils/data/sortByProp';
import StrategyAprSummary from '../../components/cards/StrategyAprSummary';
import StrategyAllocations from './components/StrategyAllocations';
import SnapshotsCardArea from '../../components/SnapshotCard/SnapshotsCardArea';
import { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { processEvents } from '../../services/appService';
import { setLastRefetch } from '../../redux/slices/appSlice';
import { ReaperBaseStrategyV4 } from '../../abi/ReaperBaseStrategyV4';
import { useAccount } from 'wagmi';
import Spinner from '../../components/Spinner';
import Tooltip from '../../components/Tooltip';
import StrategySupplyBorrow from './components/StrategySupplyBorrow';
import GranaryAddresses from './components/granary/GranaryAddresses';
import GranaryRewards from './components/granary/GranaryRewards';

const StrategyPage = () => {
    let { vaultAddress } = useParams();
    let { strategyAddress } = useParams();

    const dispatch = useDispatch();

    const strategy = useSelector(selectStrategy);
    const vault = useSelector(selectVault);
    const chain = useSelector(selectChain);

    console.log("chain", chain)

    dispatch(setSelectedVaultAddress(vaultAddress));
    dispatch(setSelectedStrategyAddress(strategyAddress));

    const [isHarvesting, setIsHarvesting] = useState(false);

    const { address } = useAccount();
    const provider = new ethers.BrowserProvider(window.ethereum as any);

    return (
        <>
            {vault && strategy && <>
                <div className="bg-white p-3 shadow-md">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center flex-row gap-x-1">
                            <Link to={`/`} className="hover:text-blue-600">Dashboard</Link>
                            <div className="text-gray-600">/</div>
                            <Link to={`/vaults/${vault.address}`} className="hover:text-blue-600">{vault?.name}</Link>
                            <div className="text-gray-600">/</div>
                            <div className="text-gray-600 font-bold">{strategy.protocol ? strategy.protocol.name : strategy.address}</div>
                        </div>
                        <div className="space-x-4 flex flex-row">
                            <Link to={`/vaults/${vault.address}/allocations`} className="text-blue-500 hover:text-blue-700" >Update Allocations</Link>
                            <Link to={`${chain.etherscanUrl}${strategy.address}`} className="text-blue-500 hover:text-blue-700" target='_blank' >Etherscan</Link>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-4 px-4 pt-4">
                    <div className='h-full col-span-5'>
                        <StrategyAprSummary />
                    </div>
                    <div className='grid grid-cols-12 col-span-5 bg-white border border-gray-200 mb-8'>
                        <div className={`col-span-12 flex flex-col flex-1`}>
                            <div className='p-3 text-gray-800 flex flex-row justify-between items-center'>
                                <div className='font-bold '>Harvest Profits</div>
                                <div className='text-xl pr-2 flex flex-row gap-x-1 items-center'>
                                    <div className='pr-2'>${strategy.last30daysHarvestProfit.toFixed(2)}</div>
                                    <div className='pb-[1px]'>
                                        {isHarvesting && <Spinner />}
                                        {!isHarvesting &&
                                            <Tooltip content="Harvest">
                                                <img
                                                    src={`${process.env.PUBLIC_URL}/icons/money-bag-50.png`}
                                                    alt="Harvest Icon"
                                                    className='h-[16px] cursor-pointer'
                                                    onClick={async () => {
                                                        setIsHarvesting(true);
                                                        try {
                                                            const signer = await provider.getSigner(address);
                                                            const contract = new ethers.Contract(strategy.address, ReaperBaseStrategyV4, signer);

                                                            const txResponse = await contract.harvest();
                                                            await txResponse.wait();

                                                            toast.success("Strategy successfully harvested")
                                                            await processEvents();
                                                            dispatch(setLastRefetch());
                                                        } catch (error) {
                                                            const revertReasonMatch = /reason="([^"]+)"/.exec(error.message);
                                                            if (revertReasonMatch && revertReasonMatch[1]) {
                                                                toast.error(revertReasonMatch[1]);
                                                            } else {
                                                                toast.error(error);
                                                            }
                                                        }
                                                        setIsHarvesting(false);
                                                    }}
                                                />
                                            </Tooltip>}
                                    </div>
                                </div>
                            </div>
                            <SnapshotsCardArea yxaisType='usd' data={strategy.last30daysHarvests} dataKey={"accumulatedGainValue"} customTooltip={<HarvestProfitTooltip />} />
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <StrategyAllocations key={strategy._id} strategy={strategy} />
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-4 px-4 pt-4">
                    <div className='h-full col-span-4'>
                        {strategy.protocol.fork === "Granary" && <StrategySupplyBorrow vault={vault} strategy={strategy} />}
                    </div>
                    <div className='h-full col-span-3'>
                        {strategy.protocol.fork === "Granary" && <GranaryAddresses vault={vault} strategy={strategy} />}
                    </div>
                    <div className='col-span-3'>
                        {strategy.protocol.fork === "Granary" && <GranaryRewards vault={vault} strategy={strategy} />}
                    </div>
                </div>
                <div className='flex px-4 pt-2'>
                    {strategy && <DataGrid data={sortTimestampByProp(strategy.aprReports, "reportDate", "desc")} columns={getStrategyReportColumns(vault)} heading='Strategy Reports' />}
                </div>
            </>}
            {!vault && <div className='flex h-full justify-center'>
                <div className='mt-16 text-xl text-gray-400'>No strategy selected</div>
            </div>}
        </>
    )
}

const HarvestProfitTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {

        const date = new Date(label * 1000);
        const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
        const formattedDate = formatter.format(date);

        return (
            <div className="p-2 bg-white shadow rounded border border-gray-300">
                <div className="text-sm text-gray-700 mb-2 font-semibold">{`${formattedDate}`}</div>
                <div className="text-sm text-blue-500 mb-1">{`Profit: $${payload[0].value.toFixed(2)}`}</div>
            </div>
        );
    }
    return null;
};

export default StrategyPage;