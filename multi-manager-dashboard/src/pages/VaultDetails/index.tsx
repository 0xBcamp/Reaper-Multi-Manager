import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectStrategiesByVault, selectVault, selectVaultsByChain } from '../../redux/selectors';
import StrategyAprSummary from '../../components/cards/StrategyAprSummary';
import StrategyAllocations from '../../components/cards/StrategyAllocations';
import { useEffect } from 'react';
import { setSelectedVault } from '../../redux/slices/vaultsSlice';

const VaultDetailsPage = () => {
  let { vaultAddress } = useParams();
  const dispatch = useDispatch();
  
  const vault = useSelector(selectVault);
  const strategies = useSelector(selectStrategiesByVault);
  const vaults = useSelector(selectVaultsByChain);

  useEffect(() => {
    if (!vault) {
      dispatch(setSelectedVault(vaults.find(x => x.address.toLowerCase() === vaultAddress.toLowerCase())));
    }
  }, [vault])

  return (
    <>
      {vault && <>
        <div className="p-4">
          <span className="text-lg">{vault?.name}</span>
        </div>
        <div className="grid grid-cols-4 gap-4 m-4">
          {strategies.map((strategy) => (
            <StrategyAprSummary key={strategy._id} vault={vault} strategy={strategy} />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 m-4">
          {strategies.map((strategy) => (
            <StrategyAllocations key={strategy._id} vault={vault} strategy={strategy} />
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
