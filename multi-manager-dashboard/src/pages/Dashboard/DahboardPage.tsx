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
                        <div className='col-span-9 flex flex-col flex-1'>
                            <div className='p-3 text-gray-600 font-semibold'>
                                TVL
                            </div>
                            <SnapshotsCardArea data={chain.last30SnapShots} dataKey={"tvl"} />
                        </div>
                        <div className='col-span-3'>
                            <SnapshotsDeltas deltas={chain.lastSnapShotDelta.tvl} type='usd' total={chain.last30SnapShots[chain.last30SnapShots.length - 1].tvl} />
                        </div>
                    </div>

                    <div className='grid grid-cols-12 bg-white border border-gray-200 mb-8'>
                        <div className='col-span-9 flex flex-col flex-1'>
                            <div className='p-3 text-gray-600 font-semibold flex flex-row justify-between items-center'>
                                Total users
                            </div>
                            {/* <ResponsiveContainer width='100%' height={200}>
                                <BarChart
                                    width={800}
                                    height={400}
                                    data={aggregatedSnapshots}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid opacity={0.1} vertical={false} />
                                    <XAxis
                                        dataKey="timestamp"
                                        axisLine={false}
                                        tickLine={false}
                                        tickFormatter={(value, index) => {
                                            if (index % 7 === 0) {
                                                const date = new Date(value * 1000);
                                                const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
                                                return formatter.format(date);
                                            }

                                            return "";
                                        }}
                                    />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="totalUsers" fill="#2451B7" />
                                </BarChart>
                            </ResponsiveContainer> */}
                        </div>
                        {/* <div className='col-span-3'>
                            <div className='flex justify-center items-center p-3 text-xl'>
                                {(aggregatedSnapshots[aggregatedSnapshots.length - 1].totalUsers).toLocaleString()}
                            </div>
                            <div className='flex flex-col pr-2 my-3'>
                                <div className='flex text-gray-400 text-xs'>
                                    Last 24 hours
                                </div>
                                <div className='flex flex-row items-center'>
                                    <div className={`flex-1 text-green-500`}>
                                        {diff24hoursUsers}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col pr-2 my-3'>
                                <div className='flex text-gray-400 text-xs'>
                                    Last 7 days
                                </div>
                                <div className='flex flex-row items-center'>
                                    <div className={`flex-1 text-green-500`}>
                                        {diff7daysUsers}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col pr-2 my-3'>
                                <div className='flex text-gray-400 text-xs'>
                                    Last 30 days
                                </div>
                                <div className='flex flex-row items-center'>
                                    <div className={`flex-1 text-green-500`}>
                                        {diff30daysUsers}
                                    </div>
                                </div>
                            </div>
                        </div> */}
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