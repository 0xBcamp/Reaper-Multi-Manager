// LastHarvest.tsx
import { useMemo } from 'react';
import { CurveFitGraph } from '../charts/types';
import { formatUnits } from 'ethers';
import { calculateTimeBasedMovingAverage, calculateYDataWithThreshold } from '../../lib/math/linearRegression';
import { formatDate } from '../../utils/dateUtils';

interface ILastHarvestProps {
  graph: CurveFitGraph;
}

const LastHarvest = ({ graph }: ILastHarvestProps) => {
  
  const lastHarvest = useMemo(() => graph.data[graph.data.length - 1], [graph.data]);

  const { xData, yData } = calculateYDataWithThreshold(graph.data, graph.threshold);
  const timeBasedMovingAverageResults = calculateTimeBasedMovingAverage(xData, yData);

  return (
    <>
      {lastHarvest ?
        <div className='flex flex-col p-2 text-gray-600 text-xs'>
          <div className='flex justify-between'>
            <div>Last allocated value:</div>
            <div>{parseFloat(formatUnits(lastHarvest?.allocated)).toFixed(2)}</div>
          </div>
          <div className='flex justify-between'>
            <div>Last harvest:</div>
            <div>{formatDate(lastHarvest.timestamp)}</div>
          </div>
          <div className='flex justify-between'>
            <div>Apr: </div>
            <div>{(timeBasedMovingAverageResults.resultYData[timeBasedMovingAverageResults.resultYData.length - 1])?.toFixed(2)}%</div>
          </div>
        </div> :
        <div >No harvests found</div>}
    </>

  );
};

export default LastHarvest;