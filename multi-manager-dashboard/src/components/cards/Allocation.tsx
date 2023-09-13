// Allocation.tsx
import { useMemo } from 'react';
import { CurveFitGraph } from '../charts/types';
import { formatUnits } from 'ethers';
import { calculateTimeBasedMovingAverage, calculateDataWithThreshold } from '../../lib/math/linearRegression';

interface IAllocationProps {
  graph: CurveFitGraph;
}

const Allocation = ({ graph }: IAllocationProps) => {
  
  const allocationData = useMemo(() => graph.data[graph.data.length - 1], [graph.data]);

  const { xData, yData } = calculateDataWithThreshold(graph.data, graph.threshold);
  const timeBasedMovingAverageResults = calculateTimeBasedMovingAverage(xData, yData);

  const stratAPR = timeBasedMovingAverageResults.resultYData[timeBasedMovingAverageResults.resultYData.length - 1];
  const allocated = allocationData?.allocated;

  return (
    <>
      {allocationData ?
        <div className='flex flex-col p-2 text-gray-600 text-xs'>
          <div className='flex justify-between'>
            <div>CALCULATIONS (IGNORE FOR NOW)</div>
          </div>
          <div className='flex justify-between'>
            <div>Last allocated value:</div>
            <div>{parseFloat(formatUnits(allocated)).toFixed(2)}</div>
          </div>
          <div className='flex justify-between'>
            <div>Contract allocated BPS:</div>
            <div>{allocationData?.allocBPS}</div>
          </div>
          <div className='flex justify-between'>
            <div>Actual allocated BPS:</div>
            {/* replace with strategy allocated / vault allocated */}
            <div>{parseFloat(formatUnits(allocated)) / (289.2 + 155.73) * 10000}</div>
          </div>
          <div className='flex justify-between'>
            <div>Apr: </div>
            <div>{(stratAPR)?.toFixed(2)}%</div>
          </div>
          <div className='flex justify-between'>
            <div>Vault APR: </div>
            <div>(alloc1 * apr1) + (alloc2 * apr2) + ... / (totalAlloc)</div>
          </div>
          <div className='flex justify-between'>
            <div>Optimum allocation: </div>
            <div>{allocated} / vaultAPR * {stratAPR}</div>
          </div>
        </div> :
        <div >No harvests found</div>}
    </>

  );
};

export default Allocation;