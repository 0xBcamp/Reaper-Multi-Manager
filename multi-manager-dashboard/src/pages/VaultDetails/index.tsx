import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectStrategiesByVault, selectVault } from '../../redux/selectors';
import StrategyAprSummary from '../../components/cards/StrategyAprSummary';
import { setSelectedVaultAddress } from '../../redux/slices/vaultsSlice';

const VaultDetailsPage = () => {
  let { vaultAddress } = useParams();
  const dispatch = useDispatch();

  dispatch(setSelectedVaultAddress(vaultAddress));

  const vault = useSelector(selectVault);
  const strategies = useSelector(selectStrategiesByVault);

  return (
    <>
      {vault && <>
        <div className="p-4">
          <span className="text-lg">{vault?.name}</span>
        </div>
        <div className="grid grid-cols-4 gap-4 m-4">
          {strategies.map((strategy) => (
            <div className='h-full' key={strategy._id}>
              <Link to={`strategy/${strategy?.address}`}>
                <StrategyAprSummary  vault={vault} strategy={strategy} />
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

export default VaultDetailsPage;
