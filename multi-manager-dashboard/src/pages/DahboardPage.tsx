import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import Loader from '../components/layout/Loader';
import DataGrid from '../components/tables/DataGrid';
import { selectStrategiesByChain, selectVaultsByChain } from '../redux/selectors';
import { getVaultsColumns } from '../utils/gridColumns/vaults_columns';
import { getStrategyColumns } from '../utils/gridColumns/strategy_columns';


const DahboardPage = () => {
    const isInitialized = useSelector((state: RootState) => state.app.isInitialized);

    const vaults = useSelector(selectVaultsByChain);
    const strategies = useSelector(selectStrategiesByChain);
    // const strategyReports = useSelector(selec);

    console.log("strategies", strategies)

    return (
        <div className='p-4'>
            {!isInitialized && <Loader />}

            {isInitialized && <div className=''>
                <div className='flex flex-col w-full gap-2'>
                    <DataGrid data={vaults} columns={getVaultsColumns()} heading='Vaults' />
                    <DataGrid data={strategies} columns={getStrategyColumns()} heading='Strategies' />
                </div>
            </div>}

        </div>
    )
}

export default DahboardPage