import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Loader from '../../../components/layout/Loader';
import { selectVault } from '../../../redux/selectors';
import { Link, useParams } from 'react-router-dom';

import { setSelectedVaultAddress } from '../../../redux/slices/vaultsSlice';
import StrategyAllocation from './StrategyAllocation';

const VaultAllocationsPage = () => {
    const dispatch = useDispatch();

    let { vaultAddress } = useParams();
    dispatch(setSelectedVaultAddress(vaultAddress));

    const isInitialized = useSelector((state: RootState) => state.app.isInitialized);

    const vault = useSelector(selectVault);

    return (
        <>
            {!isInitialized && <Loader />}
            {isInitialized &&
                <>
                    <div className="bg-white p-3 shadow-md">
                        <div className="flex items-center flex-row gap-x-1">
                            <Link to={`/`} className="hover:text-blue-600">Dashboard</Link>
                            <div className="text-gray-600">/</div>
                            <Link to={`/vaults/${vault.address}`}>{vault?.name}</Link>
                            <div className="text-gray-600">/</div>
                            <div className="text-gray-600 font-bold">Update Strategy Allocations</div>
                        </div>
                    </div>
                    {vault.strategies.map(strategy => {
                        return (
                            <div key={strategy.address}>
                                <StrategyAllocation strategy={strategy} />
                            </div>
                        )
                    })}
                </>
            }
        </>

    )
}

export default VaultAllocationsPage