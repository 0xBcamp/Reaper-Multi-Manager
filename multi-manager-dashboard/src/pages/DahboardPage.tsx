import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import Loader from '../components/layout/Loader';
import DataGrid from '../components/tables/DataGrid';
import { selectStrategiesByChain, selectVaultSnapshotsByChain, selectVaultsByChain } from '../redux/selectors';
import { getVaultsColumns } from '../utils/gridColumns/vaults_columns';
import { getStrategyColumns } from '../utils/gridColumns/strategy_columns';
import { VaultSnapshot } from '../redux/slices/vaultsSlice';
import { sortTimestampByProp } from '../utils/data/sortByProp';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';

const DahboardPage = () => {
    const isInitialized = useSelector((state: RootState) => state.app.isInitialized);

    const vaults = useSelector(selectVaultsByChain);
    const strategies = useSelector(selectStrategiesByChain);
    const snapshots = useSelector(selectVaultSnapshotsByChain);

    const aggregateSnapshots = (snapshots: VaultSnapshot[]): { timestamp: number; tvl: number }[] => {
        const aggregatedDataMap: Record<number, { timestamp: number; tvl: number }> = snapshots.reduce((acc, snapshot) => {
            if (!acc[snapshot.timestamp]) {
                acc[snapshot.timestamp] = {
                    timestamp: snapshot.timestamp,
                    tvl: 0
                };
            }

            acc[snapshot.timestamp].tvl += snapshot.usd.tvl;
            return acc;
        }, {});

        const aggregatedData = Object.values(aggregatedDataMap);
        return sortTimestampByProp(aggregatedData, "timestamp", "asc").slice(-30);
    };

    const aggregatedSnapshots = aggregateSnapshots(snapshots);

    return (
        <div className='p-4'>
            {!isInitialized && <Loader />}

            {isInitialized && <>
                <div className='grid grid-cols-2 gap-4 '>
                    <div className='flex flex-col m-4 bg-white'>
                        <div className='p-2'>
                            TVL
                        </div>
                        <ResponsiveContainer width='100%' height={200}>
                            <AreaChart data={aggregatedSnapshots}
                                margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#2451B7" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#2451B7" stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>
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

                                <YAxis
                                    dataKey="tvl"

                                    axisLine={false}
                                    tickLine={false}
                                    tickCount={8}
                                    tickFormatter={(value) => {
                                        return value.toLocaleString();
                                    }}
                                />

                                <CartesianGrid opacity={0.1} vertical={false} />
                                <Tooltip />
                                <Area dataKey="tvl" stroke="#2451B7" fillOpacity={1} fill="url(#colorUv)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <DataGrid data={vaults} columns={getVaultsColumns()} heading='Vaults' />
                    <DataGrid data={strategies} columns={getStrategyColumns()} heading='Strategies' />
                </div>
            </>}

        </div>
    )
}

export default DahboardPage