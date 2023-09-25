import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import Loader from '../components/layout/Loader';
import DataGrid from '../components/tables/DataGrid';
import { selectStrategiesByChain, selectVaultSnapshotsByChain, selectVaultsByChain } from '../redux/selectors';
import { getVaultsColumns } from '../utils/gridColumns/vaults_columns';
import { getStrategyColumns } from '../utils/gridColumns/strategy_columns';
import { VaultSnapshot, setSelectedVaultAddress } from '../redux/slices/vaultsSlice';
import { sortTimestampByProp } from '../utils/data/sortByProp';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, RadialBarChart, RadialBar, Legend } from 'recharts';

const DahboardPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleVaultClick = (vault) => {
        dispatch(setSelectedVaultAddress(vault.address));
        navigate(`/vaults/${vault.address}`);
    }

    return (
        <div className='p-4'>
            {!isInitialized && <Loader />}

            {isInitialized && <>
                <div className='grid grid-cols-2 gap-4 '>
                    <div className='flex flex-col bg-white border border-gray-200 mb-8'>
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
                
                <div className='p-2 text-gray-800 text-lg'>
                    Vaults
                </div>
                <div className='grid grid-cols-4 gap-4 '>
                    {vaults.map((vault, index) => {
                        const endAngle = 90 - (360 * (vault.healthScore / 100));

                        return (
                            <div key={vault._id} onClick={() => handleVaultClick(vault)} className="cursor-pointer">
                                <div className="flex flex-row bg-white border border-gray-200 p-2">
                                    <div className='flex-1'>
                                        <h2 className="text-sm px-2 pb-4"><span className="text-gray-600 font-semibold">{vault.name}</span></h2>
                                        <div className='flex flex-row justify-between text-center'>
                                            <div className='flex-1'>
                                                <div className="text-green-500 font-bold text-xl">{vault.APR.toFixed(2)}%</div>
                                                <div className="text-gray-400 text-xs">Current APR:</div>
                                            </div>
                                            <div className='flex-1'>

                                                <div className="text-gray-700  text-xl">${Number(vault.lastSnapShot.usd.tvl.toFixed(0)).toLocaleString()}</div>
                                                <div className="text-gray-400 text-xs">TVL</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>

                                        <RadialBarChart
                                            width={100}
                                            height={100}
                                            cx={50}
                                            cy={50}
                                            innerRadius="80%"
                                            outerRadius="100%"
                                            barSize={10}
                                            data={[vault]}
                                            startAngle={90}
                                            endAngle={endAngle}

                                        >
                                            <RadialBar
                                                background={{ fill: '#e0e0e0' }}
                                                dataKey="healthScore"
                                                cornerRadius={2}
                                                fill={vault.healthScore > 75 ? "rgb(34,197,94)" : vault.healthScore > 45 ? "rgb(251,146,60)" : "rgb(239,68,68)"}
                                            />
                                            <text x={50} y={50} textAnchor="middle" dominantBaseline="middle" fontSize={14} fill="#333">{`${vault.healthScore}%`}</text>
                                        </RadialBarChart>
                                    </div>
                                </div>
                            </div>


                        )
                    })}

                </div>
                <div className='flex flex-col w-full gap-2 mt-4'>
                    {/* <DataGrid data={vaults} columns={getVaultsColumns()} heading='Vaults' /> */}
                    <DataGrid data={strategies} columns={getStrategyColumns()} heading='Strategies' />
                </div>
            </>}

        </div>
    )
}

export default DahboardPage