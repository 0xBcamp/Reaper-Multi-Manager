import { Vault, setSelectedVaultAddress } from '../../../redux/slices/vaultsSlice';
import VaultHealthScore from './VaultHealthScore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type Props = {
  vault: Vault
}

function DashboardVaultSummary({ vault }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (vault) => {
    dispatch(setSelectedVaultAddress(vault.address));
    navigate(`/vaults/${vault.address}`);
  }

  const getVaultPercentageText = (value: number) => {
    return `${Number(Math.abs(value).toFixed(2)).toLocaleString()}%`;
  }

  const getVaultPercentageClassname = (value: number) => {
    return value < 0 ? `text-red-500` : "text-green-500";
  }

  const getVaultPercentageDirection = (value: number) => {
    return value < 0 ? `down-48` : "up-48";
  }

  return (
    <div onClick={() => handleClick(vault)} className="flex flex-col cursor-pointer bg-white border border-gray-200 shadow-sm">
      <div className="flex flex-row p-2 justify-between items-center">
        <div className=''>{vault.name}</div>
        <div className='flex flex-row items-center'>
          <div className='text-gray-700 text-lg flex-1 pr-2'>${Number(vault.lastSnapShot.usd.tvl.toFixed(0)).toLocaleString()}</div>
          <div className=''><img src={`${process.env.PUBLIC_URL}/icons/${getVaultPercentageDirection(vault.lastSnapShot.deltas.tvl.perc.days30)}.png`} alt="Menu Icon" className='h-[12px]' /></div>
          <div className={`${getVaultPercentageClassname(vault.lastSnapShot.deltas.tvl.perc.days30)} text-xs`}>{getVaultPercentageText(vault.lastSnapShot.deltas.tvl.perc.days30)}</div>

        </div>

      </div>
      <div className="grid grid-cols-4 items-center justify-between">
        <div className='flex-1 col-span-3'>
          <div className='flex flex-row justify-between text-center pl-2'>
            <div className='flex-1'>
              <div className="text-gray-600 font-semibold text-xl">{vault.totalAPR.toFixed(2)}%</div>
              <div className="text-gray-400 text-xs">APR</div>
            </div>
            <div className='flex-1'>
              <div className="text-gray-600 font-semibold text-xl">{(vault.vaultAllocatedBPS / 100).toFixed(2)}%</div>
              <div className="text-gray-400 text-xs">Allocated</div>
            </div>
          </div>
        </div>
        <div className='col-span-1 flex justify-end pr-2 pb-2'>
          <VaultHealthScore vault={vault} />
        </div>
      </div>
    </div>
  )
}

export default DashboardVaultSummary