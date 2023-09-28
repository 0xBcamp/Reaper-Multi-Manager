import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectStrategiesByVault, selectVault, selectVaultSnapshotsByVault } from '../../redux/selectors';
import { setSelectedVaultAddress } from '../../redux/slices/vaultsSlice';
import Loader from '../../components/layout/Loader';
import { RootState } from '../../redux/store';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { sortTimestampByProp } from '../../utils/data/sortByProp';
import StrategyAllocations from '../../components/cards/StrategyAllocations';
import StrategyAprSummary from '../../components/cards/StrategyAprSummary';

const VaultDetailsPage = () => {
  let { vaultAddress } = useParams();
  const dispatch = useDispatch();

  dispatch(setSelectedVaultAddress(vaultAddress));

  const isInitialized = useSelector((state: RootState) => state.app.isInitialized);

  const vault = useSelector(selectVault);
  const strategies = useSelector(selectStrategiesByVault);
  const snapshots = useSelector(selectVaultSnapshotsByVault);
  const formattedSnapshots = sortTimestampByProp(snapshots, "timestamp", "asc").slice(-30);

  console.log("formattedSnapshots", formattedSnapshots)

  return (
    <>
      {!isInitialized && <Loader />}
      {isInitialized && vault && <>
        <div className="p-4">
          <span className="text-lg">{vault?.name}</span>
        </div>
        <div className='grid grid-cols-2'>
          <div className='flex flex-col m-4 bg-white'>
            <div className='p-2'>
              TVL
            </div>
            <ResponsiveContainer width='100%' height={200}>
              <AreaChart data={formattedSnapshots}
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
                  dataKey="usd.tvl"

                  axisLine={false}
                  tickLine={false}
                  tickCount={8}
                  tickFormatter={(value) => {
                    return value.toLocaleString();
                  }}
                />

                <CartesianGrid opacity={0.1} vertical={false} />
                <Tooltip />
                <Area dataKey="usd.tvl" stroke="#2451B7" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className='flex flex-col m-4 bg-white'>
            <div className='p-2'>
              Total users
            </div>
            <ResponsiveContainer width='100%' height={200}>
              <AreaChart data={formattedSnapshots}
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
                  dataKey="users.totalUsers"

                  axisLine={false}
                  tickLine={false}
                  tickCount={8}
                  tickFormatter={(value) => {
                    return value.toLocaleString();
                  }}
                />

                <CartesianGrid opacity={0.1} vertical={false} />
                <Tooltip />
                <Area dataKey="users.totalUsers" stroke="#2451B7" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 m-4">
          {strategies.map((strategy) => (
            <div className='h-full' key={strategy._id}>
              <Link to={`strategy/${strategy?.address}`}>
                <StrategyAprSummary vault={vault} strategy={strategy} showSlider={false} />
              </Link>
              <StrategyAllocations key={strategy._id} vault={vault} strategy={strategy} strategies={strategies} />
            </div>
          ))}
        </div>
      </>}
      {!vault && <div className='flex h-full justify-center'>
        <div className='mt-16 text-xl text-gray-400'>No vault selected</div>
      </div>}
    </>
  );
};

export default VaultDetailsPage;
