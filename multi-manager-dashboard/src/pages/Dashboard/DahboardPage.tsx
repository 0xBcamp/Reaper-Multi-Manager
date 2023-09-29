import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import Loader from '../../components/layout/Loader';
import DataGrid from '../../components/DataGrid';
import { selectChain, selectVaultsByChain } from '../../redux/selectors';
import { getVaultsColumns } from '../../utils/gridColumns/vaults_columns';
import { getStrategyColumns } from '../../utils/gridColumns/strategy_columns';
import { VaultSnapshot, setSelectedVaultAddress } from '../../redux/slices/vaultsSlice';
import { sortTimestampByProp } from '../../utils/data/sortByProp';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, RadialBarChart, RadialBar, Legend, BarChart, Bar } from 'recharts';
import SnapshotsCardArea from '../../components/SnapshotsCardArea';
import SnapshotsDeltas from '../../components/SnapshotsDeltas';
import VaultHealthScore from './components/VaultHealthScore';
import DashboardVaultSummary from './components/DashboardVaultSummary';

const DahboardPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isInitialized = useSelector((state: RootState) => state.app.isInitialized);

    const vaults = useSelector(selectVaultsByChain);
    const chain = useSelector(selectChain);

    console.log("vaults", vaults)
    console.log("chain", chain)

    return (
        <div className='p-4'>
            {!isInitialized && <Loader />}

            {isInitialized && <>
                <div className='grid grid-cols-2 gap-4 '>
                    <div className='grid grid-cols-12 bg-white border border-gray-200 mb-8'>
                        <div className='col-span-10 flex flex-col'>
                            <div className='p-3 text-gray-600 font-semibold'>
                                TVL
                            </div>
                            <SnapshotsCardArea data={chain.last30SnapShots} dataKey={"tvl"} />
                        </div>
                        <div className='col-span-2 mr-2'>
                            <SnapshotsDeltas deltas={chain.lastSnapShotDelta.tvl} type='usd' total={chain.last30SnapShots[chain.last30SnapShots.length - 1].tvl} />
                        </div>
                    </div>

                    <div className='grid grid-cols-12 bg-white border border-gray-200 mb-8'>
                        <div className='col-span-10 flex flex-col'>
                            <div className='p-3 text-gray-600 font-semibold'>
                                Total users
                            </div>
                            <SnapshotsCardArea data={chain.last30SnapShots} dataKey={"totalUsers"} />
                        </div>
                        <div className='col-span-2 mr-2'>
                            <SnapshotsDeltas deltas={chain.lastSnapShotDelta.totalUsers} type='number' total={chain.last30SnapShots[chain.last30SnapShots.length - 1].totalUsers} />
                        </div>
                    </div>
                </div>

                <div className='p-2 text-gray-800 text-lg'>
                    Vaults
                </div>
                <div className='grid grid-cols-4 gap-4 '>
                    {vaults.map((vault) => {
                        return (
                            <DashboardVaultSummary vault={vault} key={vault._id} />
                        )
                    })}

                </div>
                <div className='flex flex-col w-full gap-2 mt-4'>
                    {/* <DataGrid data={vaults} columns={getVaultsColumns()} heading='Vaults' /> */}
                    {/* <DataGrid data={strategies} columns={getStrategyColumns()} heading='Strategies' /> */}
                </div>
            </>}

        </div>
    )
}

export default DahboardPage