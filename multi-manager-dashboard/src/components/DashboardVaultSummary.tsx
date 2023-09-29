import React from 'react'
import { Area, AreaChart, CartesianGrid, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Vault, setSelectedVaultAddress } from '../redux/slices/vaultsSlice';
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

  return (
    <div onClick={() => handleClick(vault)} className="flex flex-col cursor-pointer bg-white border border-gray-200">
      <div className="flex flex-row  p-2">
        <div className='flex-1'>
          <h2 className="text-sm px-2 pb-4"><span className="text-gray-600 font-semibold">{vault.name}</span></h2>
          <div className='flex flex-row justify-between text-center items-center'>
            <div className='flex-col'>
              <div className='flex flex-row items-center'>
                <div className="text-gray-400 text-xs">APR:</div>
                <div className="text-gray-700 text-lg">{vault.APR.toFixed(2)}%</div>

              </div>
              <div className='flex flex-row items-center'>
                <div className="text-gray-400 text-xs">Allocated:</div>
                <div className="text-gray-700 text-lg">{(vault.actualAllocated * 100).toFixed(2)}%</div>
              </div>
            </div>

            <div className='flex-1'>
              <div className="text-gray-700 text-xl">${Number(vault.lastSnapShot.usd.tvl.toFixed(0)).toLocaleString()}</div>
              <div className="text-gray-400 text-xs">TVL</div>
            </div>
          </div>
        </div>
        <div>
          <VaultHealthScore vault={vault} />
        </div>
      </div>
    </div>
  )
}

export default DashboardVaultSummary