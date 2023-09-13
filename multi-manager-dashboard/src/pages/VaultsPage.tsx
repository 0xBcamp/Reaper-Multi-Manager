import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectStrategiesByChain, selectVaultsByChain } from '../redux/selectors';
import { setSelectedVault } from '../redux/slices/vaultsSlice';


const VaultsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const vaults = useSelector(selectVaultsByChain);
    const strategies = useSelector(selectStrategiesByChain);

    const handleVaultClick = (vault) => {
        dispatch(setSelectedVault(vault));
        navigate(`/vaults/${vault.address}`);
    }

    return (
        <div className='grid grid-cols-4 gap-4 m-4'>
            {vaults?.map(vault => {
                return (
                    <div key={vault._id} onClick={() => handleVaultClick(vault)} className="cursor-pointer">
                        <div className="shadow-md rounded-lg p-6 text-center bg-white">
                            <h2 className="text-sm mb-4"><span className="text-gray-600">{vault.name}</span></h2>
                            <div className='flex flex-row justify-between'>
                                <div className='flex-1'>
                                    <div className="text-gray-500">Current APR:</div>
                                    <div className="text-green-500 font-bold text-2xl">?? %</div>
                                </div>
                                <div className='flex-1'>
                                    <div className="text-gray-500">Strategies</div>
                                    <div className="text-gray-400 text-2xl">{strategies.filter(x => x.vaultAddress.toLowerCase() === vault.address.toLowerCase()).length}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default VaultsPage