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

    const strategyAPR = strategy.APR;

    const strategyAPRValues = strategies.map((strategy) => {
        return strategy.APR;
    });

    const strategyAllocatedValues: number[] = strategies.map((strat) => {
        return parseFloat(strat.aprReports?.[strat.aprReports.length - 1]?.allocated || "0");
    });

    const strategyProductValues = strategies.map((_, index) => {
        const allocatedValue = (strategyAllocatedValues[index]);
        const aprValue = (strategyAPRValues[index]);
        return allocatedValue * aprValue;
    });

    const totalProductValue = strategyProductValues
        .reduce((total, productValue) => {
                return total + productValue;
            }
        );

    const vaultAPR = totalProductValue / Number(lastVaultAllocated);

    return (
        <>
            {lastStrategyHarvest ?
                <div className='flex flex-col p-2 text-gray-600 text-xs'>
                    <div className='flex justify-between'>
                    <div>CALCULATIONS</div>
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
                    <div>{(parseFloat(lastStrategyAllocated)/parseFloat(lastVaultAllocated)*10000).toFixed(2)}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Apr: </div>
                    <div>{(strategyAPR)?.toFixed(2)}%</div>
                </div>
                <div className='flex justify-between'>
                    <div>Vault APR: </div>
                    <div>{vaultAPR.toFixed(2)}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Optimum Allocation: </div>
                    <div>{(parseFloat(formatUnits(lastStrategyAllocated))*strategyAPR/vaultAPR).toFixed(2)}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Optimum Allocation BPS: </div>
                    <div>{(parseFloat(lastStrategyAllocated)*strategyAPR/vaultAPR/parseFloat(lastVaultAllocated)*10000).toFixed(2)}</div>
                </div>
            </div> :
            <div >No harvests found</div>}
        </>
    );
};

export default AllocationSummary;