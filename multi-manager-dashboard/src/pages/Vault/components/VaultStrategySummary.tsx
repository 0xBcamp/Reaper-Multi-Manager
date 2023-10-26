import { Vault } from '../../../redux/slices/vaultsSlice';
import { Strategy } from '../../../redux/slices/strategiesSlice';
import { formatUnits } from 'ethers';
import { useEffect, useState } from 'react';
import ProgressBar from '../../../components/ProgressBar';
import Tooltip from '../../../components/Tooltip';

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
    <div className='flex flex-row bg-white border border-gray-200 shadow-sm h-32'>
      <div className="flex flex-col cursor-pointer flex-1">
        <div className="flex flex-col p-2">
          <div className='text-gray-600 text-sm'>{strategy.protocol ? strategy.protocol.name : ""}</div>
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
                <div className={`text-gray-600 font-semibold text-xl ${strategy.last30daysHarvestProfit >= 0 ? "text-green-500" : "text-red-500"}`}>${(strategy.last30daysHarvestProfit).toFixed(2)}</div>
                <div className="text-gray-400 text-xs">30 day profit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <div className={`pt-2 px-1 text-xs`}>
          <div className={` ${strategy.actualOptimumPercDiff < 5 ? "text-green-600" : strategy.actualOptimumPercDiff < 10 ? "text-orange-600" : "text-red-600"}`}>
            <Tooltip content="Optimum vs Actual %" direction='right'>{strategy.actualOptimumPercDiff}%</Tooltip>
          </div>
        </div>
        <div className='flex flex-row justify-end items-center px-1 pt-1 gap-x-1'>
          <Tooltip content={`Actual allocation: ${strategy.actualAllocatedBPS}`} direction='right'>
            <ProgressBar percentage={Number(strategy.actualAllocatedBPS) / 100} vertical={true} colorScheme="secondary" height={110} />
          </Tooltip>
          <Tooltip content={`Optimum allocation: ${strategy.optimumAllocationBPS}`} direction='right'>
            <ProgressBar percentage={Number(strategy.optimumAllocationBPS) / 100} vertical={true} colorScheme="tertiary" height={100} />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default VaultStrategySummary