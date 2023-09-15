// Allocation.tsx
import { useState } from 'react';
import { formatUnits } from 'ethers';
import { Vault } from '../../gql/graphql';
import { StrategySelector } from '../../redux/selectors';
import { DEFAULT_STD_DEV_THRESHOLD } from '../../utils/constants';
import {
    getLastStrategyHarvest,
    getLastStrategyAllocated,
    getStrategyAPRValues,
    getStrategyAllocatedValues,
    calculateStrategyProductValues,
    calculateVaultAPR,
    calculateActualAllocatedBPS,
    calculateOptimumAllocation,
    calculateOptimumAllocationBPS,
} from '../../lib/calculateStrategyAllocations';

interface IAllocationProps {
    vault: Vault;
    strategy: StrategySelector;
    strategies: StrategySelector[];
}

const AllocationSummary = ({ vault, strategy, strategies }: IAllocationProps) => {
    const [threshold, setThreshold] = useState(DEFAULT_STD_DEV_THRESHOLD)

    const lastStrategyHarvest = getLastStrategyHarvest(strategy);
    const lastStrategyAllocated = getLastStrategyAllocated(strategy);

    const strategyAPR = strategy.APR;

    const lastVaultAllocated = parseFloat(vault.lastSnapShot?.totalAllocated || "0");
    const strategyAPRValues = getStrategyAPRValues(strategies);
    const strategyAllocatedValues = getStrategyAllocatedValues(strategies);
    const strategyProductValues = calculateStrategyProductValues(strategyAPRValues, strategyAllocatedValues);
    const vaultAPR = calculateVaultAPR(strategyProductValues, lastVaultAllocated);

    const optimumAllocation = calculateOptimumAllocation(parseFloat(lastStrategyAllocated), strategyAPR, vaultAPR);
    const optimumAllocationBPS = calculateOptimumAllocationBPS(parseFloat(lastStrategyAllocated), strategyAPR, vaultAPR, lastVaultAllocated);

    const totalProductValue = strategyProductValues
        .reduce((total, productValue) => {
                return total + productValue;
            }
        );


    return (
        <>
            {lastStrategyHarvest ?
            <div className='flex flex-col p-2 text-gray-600 text-xs'>
                <div className='flex justify-between'>
                    <div>Strategy allocated value:</div>
                    <div>{parseFloat(formatUnits(lastStrategyAllocated)).toFixed(2)}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Contract allocated BPS:</div>
                    <div>{lastStrategyHarvest?.allocBPS}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Actual allocated BPS:</div>
                    <div>{(parseFloat(lastStrategyAllocated)/lastVaultAllocated*10000)?.toFixed(2)}</div>
                </div>
                <div className='flex justify-between'>
                    <div>APR:</div>
                    <div>{(strategyAPR)?.toFixed(2)}%</div>
                </div>
                <div className='flex justify-between'>
                    <div>Vault APR:</div>
                    <div>{(vaultAPR)?.toFixed(2)}%</div>
                </div>
                <div className='flex justify-between'>
                    <div>Optimum Allocation:</div>
                    <div>{parseFloat(formatUnits(optimumAllocation)).toFixed(2)}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Optimum Allocation BPS:</div>
                    <div>{optimumAllocationBPS}</div>
                </div>
            </div> :
            <div >No harvests found</div>}
        </>
    );
};

export default AllocationSummary;