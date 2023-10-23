import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectVault } from '../../redux/selectors';
import { setSelectedVaultAddress } from '../../redux/slices/vaultsSlice';
import Loader from '../../components/layout/Loader';
import { RootState } from '../../redux/store';
import SnapshotsCardArea from '../../components/SnapshotCard/SnapshotsCardArea';
import SnapshotsDeltas from '../../components/SnapshotCard/SnapshotsDeltas';
import VaultStrategySummary from './components/VaultStrategySummary';
import { TWO_UNIX_DAYS } from '../../utils/constants';

const VaultPage = () => {
  let { vaultAddress } = useParams();
  const dispatch = useDispatch();

  dispatch(setSelectedVaultAddress(vaultAddress));

  const isInitialized = useSelector((state: RootState) => state.app.isInitialized);

  const vault = useSelector(selectVault);

  return (
    <div className='p-4'>
      {!isInitialized && <Loader />}
      {isInitialized && vault && <>
        <div className="text-lg pb-2">
          {vault?.name}
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='grid grid-cols-12 bg-white border border-gray-200 mb-8'>
            <div className='col-span-10 flex flex-col flex-1'>
              <div className='p-3 text-gray-600 font-semibold'>
                TVL
              </div>
              <SnapshotsCardArea data={vault.last30SnapShots} dataKey={"usd.tvl"} />
            </div>
            <div className='col-span-2'>
              <SnapshotsDeltas deltas={vault.lastSnapShot.deltas.tvl} type='usd' total={vault.lastSnapShot.usd.tvl} />
            </div>
          </div>

          <div className='grid grid-cols-12 bg-white border border-gray-200 mb-8'>
            <div className='col-span-10 flex flex-col flex-1'>
              <div className='p-3 text-gray-600 font-semibold'>
                Total users
              </div>
              <SnapshotsCardArea data={vault.last30SnapShots} dataKey={"users.totalUsers"} />
            </div>
            <div className='col-span-2'>
              <SnapshotsDeltas deltas={vault.lastSnapShot.deltas.totalUsers} type='number' total={vault.lastSnapShot.users.totalUsers} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 m-4">
          {vault.strategies.map((strategy) => {
            // Calculate whether the lastHarvest timestamp is more than 2 days old
            const isStale = strategy.lastReport
            ? Date.now()/1000 - strategy.lastReport.reportDate > TWO_UNIX_DAYS
            : false;

          return (
            // Change strategy border colour if it has not harvested in 2 days
            <div className={`h-full ${isStale ? 'border border-red-500' : 'border border-gray-200'}`} key={strategy._id}>
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
    </div>
  );
};

export default VaultPage;
