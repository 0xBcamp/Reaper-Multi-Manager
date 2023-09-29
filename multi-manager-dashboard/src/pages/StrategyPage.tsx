import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedVaultAddress } from '../redux/slices/vaultsSlice';
import { setSelectedStrategyAddress } from '../redux/slices/strategiesSlice';
import { selectStrategy, selectVault } from '../redux/selectors';
import DataGrid from '../components/DataGrid';
import { getStrategyReportColumns } from '../utils/gridColumns/strategy_report_columns';
import { sortTimestampByProp } from '../utils/data/sortByProp';
import StrategyAprSummary from '../components/cards/StrategyAprSummary';
import StrategyAllocations from '../components/cards/StrategyAllocations';


const StrategyPage = () => {
    let { vaultAddress } = useParams();
    let { strategyAddress } = useParams();

    const dispatch = useDispatch();

    dispatch(setSelectedVaultAddress(vaultAddress));
    dispatch(setSelectedStrategyAddress(strategyAddress));

    const strategy = useSelector(selectStrategy);
    const vault = useSelector(selectVault);

    console.log("strategy", strategy)

    return (
        <>
            {vault && strategy && <div className='p-4'>
                <div>
                    <span className="text-lg">{vault?.name} - {strategy.address}</span>
                </div>
                <div className="grid grid-cols-4 gap-4 my-4">
                    <div className='h-full col-span-3'>
                        <StrategyAprSummary vault={vault} strategy={strategy} showSlider={true} />
                    </div>
                    <div>
                        <StrategyAllocations key={strategy._id} vault={vault} strategy={strategy} strategies={vault.strategies}/>
                    </div>
                </div>
                <div className='flex'>
                    {strategy && <DataGrid data={sortTimestampByProp(strategy.aprReports, "reportDate", "desc")} columns={getStrategyReportColumns()} heading='Strategy Reports' />}
                </div>
            </div>}
            {!vault && <div className='flex h-full justify-center'>
                <div className='mt-16 text-xl text-gray-400'>No strategy selected</div>
            </div>}
        </>
    )
}

export default StrategyPage;