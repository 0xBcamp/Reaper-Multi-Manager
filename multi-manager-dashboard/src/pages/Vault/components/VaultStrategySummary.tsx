import { Vault, setSelectedVaultAddress } from '../../../redux/slices/vaultsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Strategy } from '../../../redux/slices/strategiesSlice';
import { formatUnits } from 'ethers';
import { useEffect, useState } from 'react';
import StrategyAllocationChart from './StrategyAllocationChart';

type Props = {
  strategy: Strategy;
  vault: Vault
}

function VaultStrategySummary({ strategy, vault }: Props) {

  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    if (strategy && vault) {
      let totalProfit = 0;
      strategy.aprReports.forEach(report => {
        totalProfit += (Number(formatUnits(report.gain, vault.decimals))) * vault.tokenDto.usd;
        totalProfit -= (Number(formatUnits(report.loss, vault.decimals))) * vault.tokenDto.usd;
      });

      setTotalProfit(totalProfit);
    }
  }, [strategy, vault])

  return (
    <div className="flex flex-col cursor-pointer bg-white border border-gray-200 shadow-sm h-32">
      <div className="flex flex-row p-2 justify-between items-center">
        <div className='text-gray-400 text-xs'>{strategy.address}</div>
      </div>
      <div className="grid grid-cols-4 items-center justify-between">
        <div className='flex-1 col-span-3'>
          <div className='flex flex-row justify-between text-center pl-2'>
            <div className='flex-1'>
              <div className="text-gray-600 font-semibold text-xl">{strategy.APR.toFixed(2)}%</div>
              <div className="text-gray-400 text-xs">APR</div>
            </div>
            <div className='flex-1'>
              <div className={`text-gray-600 font-semibold text-xl ${totalProfit >= 0 ? "text-green-500" : "text-red-500"}`}>${(totalProfit).toFixed(2)}</div>
              <div className="text-gray-400 text-xs">30 day profit</div>
            </div>
          </div>
        </div>
        <div className='col-span-1 flex justify-end pr-2 pb-2'>
          <StrategyAllocationChart strategy={strategy} />
        </div>
      </div>
    </div>
  )
}

export default VaultStrategySummary