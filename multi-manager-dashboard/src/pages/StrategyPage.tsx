import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedVaultAddress } from '../redux/slices/vaultsSlice';
import { setSelectedStrategyAddress } from '../redux/slices/strategiesSlice';
import { selectStrategy, selectVault } from '../redux/selectors';
import DataGrid from '../components/tables/DataGrid';
import { getStrategyReportColumns } from '../utils/gridColumns/strategy_report_columns';
import { sortTimestampByProp } from '../utils/data/sortByProp';
import StrategyAprSummary from '../components/cards/StrategyAprSummary';


const StrategyPage = () => {
    let { vaultAddress } = useParams();
    let { strategyAddress } = useParams();

    const dispatch = useDispatch();

    dispatch(setSelectedVaultAddress(vaultAddress));
    dispatch(setSelectedStrategyAddress(strategyAddress));

    const strategy = useSelector(selectStrategy);
    const vault = useSelector(selectVault);

    return (
        <>
            {vault && <div className='p-4'>
                <div>
                    <span className="text-lg">{vault?.name} - {strategy.address}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 my-4">
                    <div className='h-full'>
                        <StrategyAprSummary vault={vault} strategy={strategy} />
                    </div>
                </div>
                <div className='flex'>
                    {strategy && <DataGrid data={sortTimestampByProp(strategy.aprReports, "reportDate", "desc")} columns={getStrategyReportColumns()} heading='Strategy Reports' />}
                </div>
            </div>}
            {!vault && <div className='flex h-full justify-center'>
                <div className='mt-16 text-xl text-gray-400'>No vault selected</div>
            </div>}
        </>
    )
}

export default StrategyPage;