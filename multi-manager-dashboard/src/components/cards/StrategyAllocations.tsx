// Allocation.tsx
import { useMemo, useState } from 'react';
import { formatUnits } from 'ethers';
import { calculateDataWithThreshold, calculateTimeBasedMovingAverage } from '../../lib/calculateStrategyAPR';
import { Vault } from '../../gql/graphql';
import { StrategySelector } from '../../redux/selectors';
import { DEFAULT_STD_DEV_THRESHOLD } from '../../utils/constants';

interface IAllocationProps {
    vault: Vault;
    strategy: StrategySelector;
    strategies: StrategySelector[];
}

const AllocationSummary = ({ vault, strategy, strategies }: IAllocationProps) => {
    const [threshold, setThreshold] = useState(DEFAULT_STD_DEV_THRESHOLD)

    const lastVaultAllocated = vault.lastSnapShot?.totalAllocated;
    
    const lastStrategyHarvest = strategy.aprReports?.length > 0 ? strategy.aprReports[strategy.aprReports?.length - 1] : undefined;
    const lastStrategyAllocated = lastStrategyHarvest?.allocated;

    const { xData, yData } = useMemo(() => calculateDataWithThreshold(strategy.aprReports, threshold), [strategy.aprReports, threshold]);
    const timeBasedMovingAverageResults = calculateTimeBasedMovingAverage(xData, yData);
    const strategyAPR = timeBasedMovingAverageResults.resultYData[timeBasedMovingAverageResults.resultYData.length - 1];

    return (
        <>
            {lastStrategyHarvest ?
                <div className='flex flex-col p-2 text-gray-600 text-xs'>
                    <div className='flex justify-between'>
                    <div>CALCULATIONS (IGNORE FOR NOW)</div>
                </div>
                <div className='flex justify-between'>
                    <div>Strategy allocated value:</div>
                    <div>{parseFloat(formatUnits(lastStrategyAllocated))?.toFixed(2)}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Contract allocated BPS:</div>
                    <div>{lastStrategyHarvest?.allocBPS}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Actual allocated BPS:</div>
                    <div>{(Number(lastStrategyAllocated)/Number(lastVaultAllocated)*10000).toFixed(2)}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Apr: </div>
                    <div>{(strategyAPR)?.toFixed(2)}%</div>
                </div>
                <div className='flex justify-between'>
                    <div>Vault APR: </div>
                    <div>(alloc1 * apr1) + (alloc2 * apr2) + ... / (totalAlloc)</div>
                </div>
                <div className='flex justify-between'>
                    <div>Optimum allocation: </div>
                    <div>{lastStrategyAllocated} / vaultAPR * {strategyAPR}</div>
                </div>
            </div> :
            <div >No harvests found</div>}
        </>
    );
};

export default AllocationSummary;