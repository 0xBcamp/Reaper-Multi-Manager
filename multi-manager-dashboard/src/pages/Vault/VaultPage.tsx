import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectChain, selectVault } from '../../redux/selectors';
import { setSelectedVaultAddress } from '../../redux/slices/vaultsSlice';
import Loader from '../../components/layout/Loader';
import { RootState } from '../../redux/store';
import SnapshotsCardArea from '../../components/SnapshotCard/SnapshotsCardArea';
import SnapshotsDeltas from '../../components/SnapshotCard/SnapshotsDeltas';
import VaultStrategySummary from './components/VaultStrategySummary';
import { TVLTooltip, UsersTooltip } from '../Dashboard/DahboardPage';

const VaultPage = () => {
  let { vaultAddress } = useParams();
  const dispatch = useDispatch();

  dispatch(setSelectedVaultAddress(vaultAddress));

  const isInitialized = useSelector((state: RootState) => state.app.isInitialized);

  const vault = useSelector(selectVault);
  const chain = useSelector(selectChain);

  return (
    <>
      {!isInitialized && <Loader />}
      {isInitialized && vault && <>
        <div className="bg-white p-3 shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-row gap-x-1">
              <Link to={`/`} className="hover:text-blue-600">Dashboard</Link>
              <div className="text-gray-600">/</div>
              <div className="text-gray-600 font-bold">{vault?.name}</div>
            </div>
            <div className="space-x-4 flex flex-row">
              <Link to={`/vaults/${vault.address}/allocations`} className="text-blue-500 hover:text-blue-700" >Update Allocations</Link>
              <Link to={`${chain.etherscanUrl}${vault.address}`} className="text-blue-500 hover:text-blue-700" target='_blank' >Etherscan</Link>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-4 p-4'>
          <div className='grid grid-cols-12 col-span-5 bg-white border border-gray-200'>
            <div className={`col-span-${vault.last30SnapShots?.length > 0 ? "10" : "12"}`}>
              <div className='p-3 text-gray-600 font-semibold'>
                TVL
              </div>
              <SnapshotsCardArea data={vault.last30SnapShots} dataKey={"usd.tvl"} yxaisType='usd' customTooltip={<TVLTooltip />} />
            </div>
            {vault.last30SnapShots?.length > 0 && <div className='col-span-2'>
              <SnapshotsDeltas deltas={vault.lastSnapShot?.deltas?.tvl} type='usd' total={vault.lastSnapShot?.usd?.tvl} />
            </div>}
          </div>

          <div className='grid grid-cols-12 col-span-5 bg-white border border-gray-200'>
            <div className={`col-span-${vault.last30SnapShots?.length > 0 ? "10" : "12"}`}>
              <div className='p-3 text-gray-600 font-semibold'>
                Total users
              </div>
              <SnapshotsCardArea data={vault.last30SnapShots} dataKey={"users.totalUsers"} customTooltip={<UsersTooltip />} />
            </div>
            {vault.last30SnapShots?.length > 0 && <div className='col-span-2'>
              <SnapshotsDeltas deltas={vault.lastSnapShot?.deltas?.totalUsers} type='number' total={vault.lastSnapShot?.users?.totalUsers} />
            </div>}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 m-4">
          {vault.strategies.map((strategy) => {

            return (
              // Change strategy border colour if it has not harvested in 2 days
              <div className={`h-full ${strategy.isStale ? 'border border-red-500' : 'border border-gray-200'}`} key={strategy._id}>
                <Link to={`strategy/${strategy?.address}`}>
                  <VaultStrategySummary strategy={strategy} vault={vault} />
                </Link>
              </div>
            );
          })}
        </div>

      </>}
      {!vault && <div className='flex h-full justify-center'>
        <div className='mt-16 text-xl text-gray-400'>No vault selected</div>
      </div>}
    </>
  );
};

export default VaultPage;
