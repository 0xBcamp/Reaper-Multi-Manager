import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectVault } from '../../redux/selectors';
import { setSelectedVaultAddress } from '../../redux/slices/vaultsSlice';
import Loader from '../../components/layout/Loader';
import { RootState } from '../../redux/store';
import SnapshotsCardArea from '../../components/SnapshotCard/SnapshotsCardArea';
import SnapshotsDeltas from '../../components/SnapshotCard/SnapshotsDeltas';
import VaultStrategySummary from './components/VaultStrategySummary';

const VaultPage = () => {
  let { vaultAddress } = useParams();
  const dispatch = useDispatch();

  dispatch(setSelectedVaultAddress(vaultAddress));

  const isInitialized = useSelector((state: RootState) => state.app.isInitialized);

  const vault = useSelector(selectVault);

  return (
    <>
      {!isInitialized && <Loader />}
      {isInitialized && vault && <>
        <div className="bg-white p-3 shadow-md">
          <div className="flex justify-between items-center">
            <div className="text-gray-600 font-bold">{vault?.name}</div>
            {/* <div className="space-x-4">
              <Link to={"/vaults/deploy"} className="text-blue-500 hover:text-blue-700" >Add Vault</Link>
            </div> */}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 p-4'>
          <div className='grid grid-cols-12 bg-white border border-gray-200 mb-8'>
            <div className={`col-span-${vault.last30SnapShots?.length > 0 ? "10" : "12"} flex flex-col flex-1`}>
              <div className='p-3 text-gray-600 font-semibold'>
                TVL
              </div>
              <SnapshotsCardArea data={vault.last30SnapShots} dataKey={"usd.tvl"} />
            </div>
            {vault.last30SnapShots?.length > 0 && <div className='col-span-2'>
              <SnapshotsDeltas deltas={vault.lastSnapShot?.deltas?.tvl} type='usd' total={vault.lastSnapShot?.usd?.tvl} />
            </div>}
          </div>

          <div className='grid grid-cols-12 bg-white border border-gray-200 mb-8'>
            <div className={`col-span-${vault.last30SnapShots?.length > 0 ? "10" : "12"} flex flex-col flex-1`}>
              <div className='p-3 text-gray-600 font-semibold'>
                Total users
              </div>
              <SnapshotsCardArea data={vault.last30SnapShots} dataKey={"users.totalUsers"} />
            </div>
            {vault.last30SnapShots?.length > 0 && <div className='col-span-2'>
              <SnapshotsDeltas deltas={vault.lastSnapShot?.deltas?.totalUsers} type='number' total={vault.lastSnapShot?.users?.totalUsers} />
            </div>}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 m-4">
          {vault.strategies.map((strategy) => (
            <div className='h-full' key={strategy._id}>
              <Link to={`strategy/${strategy?.address}`}>
                <VaultStrategySummary strategy={strategy} vault={vault} />
              </Link>
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

export default VaultPage;
