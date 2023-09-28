import React, { useEffect, useState } from 'react'
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
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, RadialBarChart, RadialBar, Legend, BarChart, Bar } from 'recharts';

const DahboardPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isInitialized = useSelector((state: RootState) => state.app.isInitialized);

    const vaults = useSelector(selectVaultsByChain);
    const strategies = useSelector(selectStrategiesByChain);
    const snapshots = useSelector(selectVaultSnapshotsByChain);

    console.log("vaults", vaults)

    const aggregateSnapshots = (snapshots: VaultSnapshot[]): { timestamp: number; tvl: number; totalUsers: number }[] => {
        const aggregatedDataMap: Record<number, { timestamp: number; tvl: number }> = snapshots.reduce((acc, snapshot) => {
            if (!acc[snapshot.timestamp]) {
                acc[snapshot.timestamp] = {
                    timestamp: snapshot.timestamp,
                    tvl: 0,
                    totalUsers: 0
                };
            }

            acc[snapshot.timestamp].tvl += snapshot.usd.tvl;
            acc[snapshot.timestamp].totalUsers += snapshot.users.totalUsers;
            return acc;
        }, {});

        const aggregatedData = Object.values(aggregatedDataMap);
        return sortTimestampByProp(aggregatedData, "timestamp", "asc").slice(-30);
    };

    const aggregatedSnapshots = aggregateSnapshots(snapshots);

    const lastIndex = aggregatedSnapshots.length - 1;

    const diff24hoursRaw = lastIndex >= 1 ? aggregatedSnapshots[lastIndex].tvl - aggregatedSnapshots[lastIndex - 1].tvl : 0;
    const diff24hours = Number((diff24hoursRaw).toFixed(0)).toLocaleString();
    const isDiff24Negative = diff24hoursRaw < 0;

    const diff7daysRaw = lastIndex >= 1 ? aggregatedSnapshots[lastIndex].tvl - aggregatedSnapshots[lastIndex - 7].tvl : 0;
    const diff7days = Number((diff7daysRaw).toFixed(0)).toLocaleString();
    const isDiff7daysNegative = diff7daysRaw < 0;

    const diff30daysRaw = lastIndex >= 1 ? aggregatedSnapshots[lastIndex].tvl - aggregatedSnapshots[0].tvl : 0;
    const diff30days = Number((diff30daysRaw).toFixed(0)).toLocaleString();
    const isDiff30daysNegative = diff30daysRaw < 0;

    const diff24hoursRawUsers = lastIndex >= 1 ? aggregatedSnapshots[lastIndex].totalUsers - aggregatedSnapshots[lastIndex - 1].totalUsers : 0;
    const diff24hoursUsers = Number((diff24hoursRawUsers).toFixed(0)).toLocaleString();

    const diff7daysRawUsers = lastIndex >= 1 ? aggregatedSnapshots[lastIndex].totalUsers - aggregatedSnapshots[lastIndex - 7].totalUsers : 0;
    const diff7daysUsers = Number((diff7daysRawUsers).toFixed(0)).toLocaleString();

    const diff30daysRawUsers = lastIndex >= 1 ? aggregatedSnapshots[lastIndex].totalUsers - aggregatedSnapshots[0].totalUsers : 0;
    const diff30daysUsers = Number((diff30daysRawUsers).toFixed(0)).toLocaleString();

    const handleVaultClick = (vault) => {
        dispatch(setSelectedVaultAddress(vault.address));
        navigate(`/vaults/${vault.address}`);
    }

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
                        <div className='col-span-3'>
                            <div className='flex justify-center items-center p-3 text-xl'>
                                ${Number(aggregatedSnapshots[aggregatedSnapshots.length - 1].tvl.toFixed(0)).toLocaleString()}
                            </div>
                            <div className='flex flex-col pr-2 my-3'>
                                <div className='flex text-gray-400 text-xs'>
                                    Last 24 hours
                                </div>
                                <div className='flex flex-row items-center'>
                                    <div className={`flex-1 ${isDiff24Negative ? 'text-red-500' : 'text-green-500'}`}>
                                        ${isDiff24Negative ? diff24hours.replace('-', '') : diff24hours}
                                    </div>
                                    <div className='pb-[1px]'><img src={`${process.env.PUBLIC_URL}/icons/${isDiff24Negative ? "down-48.png" : "up-48.png"}`} alt="Menu Icon" className='h-[12px]' /></div>
                                </div>
                            </div>
                            <div className='flex flex-col pr-2 my-3'>
                                <div className='flex text-gray-400 text-xs'>
                                    Last 7 days
                                </div>
                                <div className='flex flex-row items-center'>
                                    <div className={`flex-1 ${isDiff7daysNegative ? 'text-red-500' : 'text-green-500'}`}>
                                        ${isDiff7daysNegative ? diff7days.replace('-', '') : diff7days}
                                    </div>
                                    <div className='pb-[1px]'><img src={`${process.env.PUBLIC_URL}/icons/${isDiff7daysNegative ? "down-48.png" : "up-48.png"}`} alt="Menu Icon" className='h-[12px]' /></div>
                                </div>
                            </div>
                            <div className='flex flex-col pr-2 my-3'>
                                <div className='flex text-gray-400 text-xs'>
                                    Last 30 days
                                </div>
                                <div className='flex flex-row items-center'>
                                    <div className={`flex-1 ${isDiff30daysNegative ? 'text-red-500' : 'text-green-500'}`}>
                                        ${isDiff30daysNegative ? diff30days.replace('-', '') : diff30days}
                                    </div>
                                    <div className='pb-[1px]'><img src={`${process.env.PUBLIC_URL}/icons/${isDiff30daysNegative ? "down-48.png" : "up-48.png"}`} alt="Menu Icon" className='h-[12px]' /></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-12 bg-white border border-gray-200 mb-8'>
                        <div className='col-span-9 flex flex-col flex-1'>
                            <div className='p-3 text-gray-600 font-semibold flex flex-row justify-between items-center'>
                                Total users
                            </div>
                            <ResponsiveContainer width='100%' height={200}>
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
                            </ResponsiveContainer>
                        </div>
                        <div className='col-span-3'>
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
                        </div>
                    </div>
                </div>

                <div className='p-2 text-gray-800 text-lg'>
                    Vaults
                </div>
                <div className='grid grid-cols-4 gap-4 '>
                    {vaults.map((vault, index) => {
                        const endAngle = 90 - (360 * (vault.healthScore / 100));
                        const allocatedPercentage = vault.lastSnapShot.usd.tvl !== 0
                            ? (vault.lastSnapShot.usd.totalAllocated / vault.lastSnapShot.usd.tvl * 100).toFixed(0)
                            : 0;

                        const idlePercentage = vault.lastSnapShot.usd.tvl !== 0
                            ? (vault.lastSnapShot.usd.totalIdle / vault.lastSnapShot.usd.tvl * 100).toFixed(0)
                            : 0;

                            console.log(vault.name, allocatedPercentage, idlePercentage)
                        return (
                            <div key={vault._id} onClick={() => handleVaultClick(vault)} className="flex flex-col cursor-pointer bg-white border border-gray-200">
                                <div className="flex flex-row  p-2">
                                    <div className='flex-1'>
                                        <h2 className="text-sm px-2 pb-4"><span className="text-gray-600 font-semibold">{vault.name}</span></h2>
                                        <div className='flex flex-row justify-between text-center'>
                                            <div className='flex-1'>
                                                <div className="text-gray-700 text-xl">{vault.APR.toFixed(2)}%</div>
                                                <div className="text-gray-400 text-xs">Current APR:</div>
                                            </div>
                                            <div className='flex-1'>

                                                <div className="text-gray-700 text-xl">${Number(vault.lastSnapShot.usd.tvl.toFixed(0)).toLocaleString()}</div>
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
                                            innerRadius="90%"
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
                                <div className='flex flex-row'>
                                    <div className={`w-[${allocatedPercentage}%] bg-green-500 h-[2px]`}></div>
                                    {idlePercentage !== 0 && <div className={`w-[${idlePercentage}%] bg-red-500 h-[2px]`}></div>}
                                </div>

                            </div>


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