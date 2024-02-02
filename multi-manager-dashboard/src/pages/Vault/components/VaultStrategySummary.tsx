import { Vault } from '../../../redux/slices/vaultsSlice';
import { Strategy } from '../../../redux/slices/strategiesSlice';
import { formatUnits } from 'ethers';
import { useEffect, useState } from 'react';
import ProgressBar from '../../../components/ProgressBar';
import Tooltip from '../../../components/Tooltip';
import { Duration } from 'luxon';

type Props = {
  strategy: Strategy;
  vault: Vault;
  showDetails?: boolean;
}

function VaultStrategySummary({ strategy, vault, showDetails }: Props) {

  const [averageHarvestProfit, setAverageHarvestProfit] = useState(0);

  useEffect(() => {
    if (strategy && vault) {
      let avgProfit = 0;
      if (strategy.aprReports?.length > 0) {
        avgProfit = strategy.last30daysHarvestProfit / strategy.aprReports.length;
      }

      setAverageHarvestProfit(avgProfit);
    }
  }, [strategy, vault])

  const getAverageHarvestProfit = () => { }


  return (
    <>
      {showDetails && <div className='flex flex-row bg-white border border-gray-200 shadow-sm h-56'>
        <div className="flex flex-col cursor-pointer flex-1">
          <div className="flex flex-col p-2">
            <div className='text-gray-600 text-xs'>{strategy.protocol ? strategy.protocol.name : ""}</div>
            <div className='text-gray-400 text-xs'>{vault.name}</div>
            <div className='text-gray-400 text-xs'>{strategy.address}</div>
          </div>
          <div className="flex flex-row items-center justify-around flex-1">
            <div className='flex flex-col items-center w-1/3'>
              <div className="text-gray-600 font-semibold text-lg">{strategy.APR.toFixed(2)}%</div>
              <div className="text-gray-400 text-xs">APR</div>
            </div>
            <div className='flex flex-col items-center w-1/3'>
              <div className={`text-gray-600 font-semibold text-lg`}>{(strategy.aprReports?.length || 0)}</div>
              <div className="text-gray-400 text-xs">Harvests</div>
            </div>
            <div className='flex flex-col items-center w-1/3'>
              <div className={`text-gray-600 font-semibold text-lg ${strategy.last30daysHarvestProfit >= 0 ? "text-green-500" : "text-red-500"}`}>${(strategy.last30daysHarvestProfit).toFixed(2)}</div>
              <div className="text-gray-400 text-xs">30 day profit</div>
            </div>

          </div>
          <div className="flex flex-row items-center justify-around flex-1">
            <div className='flex flex-col items-center w-1/3'>
              <div className="text-gray-600 font-semibold text-lg">-</div>
              <div className="text-gray-400 text-xs">Supplied</div>
            </div>
            <div className='flex flex-col items-center w-1/3'>
              <div className={`text-gray-600 font-semibold text-lg`}>-</div>
              <div className="text-gray-400 text-xs">Borrowed</div>
            </div>
            <div className='flex flex-col items-center w-1/3'>
              <div className={`text-gray-600 font-semibold text-lg ${averageHarvestProfit >= 0 ? "text-green-500" : "text-red-500"}`}>${(averageHarvestProfit).toFixed(2)}</div>
              <div className="text-gray-400 text-xs">Avg profit</div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-around flex-1">
            <div className='flex flex-col items-center w-1/3'>
              <div className="text-gray-600 font-semibold text-lg">{vault.healthScore}%</div>
              <div className="text-gray-400 text-xs">Vault health</div>
            </div>
            <div className='flex flex-col items-center w-1/3'>
              <div className={`text-gray-600 font-semibold text-lg`}>{Duration.fromObject({ seconds: strategy.timeSinceLastHarvest }).toFormat('dd:hh:mm')}</div>
              <div className="text-gray-400 text-xs">Since last harvest</div>
            </div>
            <div className='flex flex-col items-center w-1/3'>
              <div className={`text-gray-600 font-semibold text-lg ${averageHarvestProfit >= 0 ? "text-green-500" : "text-red-500"}`}>${(averageHarvestProfit).toFixed(2)}</div>
              <div className="text-gray-400 text-xs">Pending</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className={`pt-2 px-1 text-xs`}>
            <div className={` ${strategy.actualOptimumPercDiff < 5 ? "text-green-600" : strategy.actualOptimumPercDiff < 10 ? "text-orange-600" : "text-red-600"}`}>
              <Tooltip content="Optimum vs Actual %" direction='right'>{strategy.actualOptimumPercDiff}%</Tooltip>
            </div>
          </div>
          <div className='flex flex-row justify-end items-center px-1 pt-1 gap-x-1  flex-grow'>
            <Tooltip content={`Actual allocation: ${strategy.actualAllocatedBPS}`} direction='left'>
              <ProgressBar percentage={Number(strategy.actualAllocatedBPS) / 100} vertical={true} colorScheme="secondary" height={110} isDashboardShowDetails={true}/>
            </Tooltip>
            <Tooltip content={`Optimum allocation: ${strategy.optimumAllocationBPS}`} direction='left'>
              <ProgressBar percentage={Number(strategy.optimumAllocationBPS) / 100} vertical={true} colorScheme="tertiary" height={100} isDashboardShowDetails={true} />
            </Tooltip>
          </div>
        </div>
      </div>}
      {!showDetails && <div className='flex flex-row bg-white border border-gray-200 shadow-sm h-32'>
        <div className="flex flex-col cursor-pointer flex-1">
          <div className="flex flex-col p-2">
            <div className='text-gray-600 text-xs'>{strategy.protocol ? strategy.protocol.name : ""}</div>
            <div className='text-gray-400 text-xs'>{vault.name}</div>
            <div className='text-gray-400 text-xs'>{strategy.address}</div>
          </div>
          <div className="flex flex-row items-center justify-around flex-1">
            <div className='flex flex-col items-center w-1/3'>
              <div className="text-gray-600 font-semibold text-xl">{strategy.APR.toFixed(2)}%</div>
              <div className="text-gray-400 text-xs">APR</div>
            </div>
            <div className='flex flex-col items-center w-1/3'>
              <div className={`text-gray-600 font-semibold text-xl`}>{(strategy.aprReports?.length || 0)}</div>
              <div className="text-gray-400 text-xs">Harvests</div>
            </div>
            <div className='flex flex-col items-center w-1/3'>
              <div className={`text-gray-600 font-semibold text-xl ${strategy.last30daysHarvestProfit >= 0 ? "text-green-500" : "text-red-500"}`}>${(strategy.last30daysHarvestProfit).toFixed(2)}</div>
              <div className="text-gray-400 text-xs">30 day profit</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className={`pt-2 px-1 text-xs`}>
            <div className={` ${strategy.actualOptimumPercDiff < 5 ? "text-green-600" : strategy.actualOptimumPercDiff < 10 ? "text-orange-600" : "text-red-600"}`}>
              <Tooltip content="Optimum vs Actual %" direction='right'>{strategy.actualOptimumPercDiff}%</Tooltip>
            </div>
          </div>
          <div className='flex flex-row justify-end items-center px-1 pt-1 gap-x-1  flex-grow'>
            <Tooltip content={`Actual allocation: ${strategy.actualAllocatedBPS}`} direction='left'>
              <ProgressBar percentage={Number(strategy.actualAllocatedBPS) / 100} vertical={true} colorScheme="secondary" height={110} />
            </Tooltip>
            <Tooltip content={`Optimum allocation: ${strategy.optimumAllocationBPS}`} direction='left'>
              <ProgressBar percentage={Number(strategy.optimumAllocationBPS) / 100} vertical={true} colorScheme="tertiary" height={100} />
            </Tooltip>
          </div>
        </div>
      </div>}
    </>

  )
}

export default VaultStrategySummary