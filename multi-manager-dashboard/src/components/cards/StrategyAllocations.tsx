// Allocation.tsx
import { useState } from 'react';
import { formatUnits } from 'ethers';
import { DEFAULT_STD_DEV_THRESHOLD } from '../../utils/constants';
import {
    getStrategyAPRValues,
    getStrategyAllocatedValues,
    calculateStrategyProductValues,
    calculateVaultAPR,
    calculateOptimumAllocation,
    calculateOptimumAllocationBPS,
} from '../../lib/calculateStrategyAllocations';
import { Strategy } from '../../redux/slices/strategiesSlice';
import { Vault } from '../../redux/slices/vaultsSlice';
import Card from './Card';

interface IAllocationProps {
    vault: Vault;
    strategy: Strategy;
    strategies: Strategy[];
}

const AllocationSummary = ({ vault, strategy, strategies }: IAllocationProps) => {
    const [threshold, setThreshold] = useState(DEFAULT_STD_DEV_THRESHOLD)

    const lastVaultAllocated = parseFloat(vault.lastSnapShot?.totalAllocated || "0");
    const strategyAPRValues = getStrategyAPRValues(strategies);
    const strategyAllocatedValues = getStrategyAllocatedValues(strategies);
    const strategyProductValues = calculateStrategyProductValues(strategyAPRValues, strategyAllocatedValues);
    const vaultAPR = calculateVaultAPR(strategyProductValues, lastVaultAllocated);

    const optimumAllocation = calculateOptimumAllocation(parseFloat(strategy.lastReport?.allocated), strategy.APR, vaultAPR);
    const optimumAllocationBPS = calculateOptimumAllocationBPS(parseFloat(strategy.lastReport?.allocated), strategy.APR, vaultAPR, lastVaultAllocated);

    const totalProductValue = strategyProductValues
        .reduce((total, productValue) => {
                return total + productValue;
            }
        );


    return (
        <Card title={"Summary"} >
            {strategy.lastReport ?
            <div className='flex flex-col p-2 text-gray-600 text-md h-full'>
                <div className='flex justify-between'>
                    <div>Strategy allocated value:</div>
                    <div>{parseFloat(formatUnits(strategy.lastReport?.allocated)).toFixed(2)}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Contract allocated BPS:</div>
                    <div>{strategy.lastReport?.allocBPS}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Actual allocated BPS:</div>
                    <div>{(parseFloat(strategy.lastReport?.allocated)/lastVaultAllocated*10000)?.toFixed(2)}</div>
                </div>
                <div className='flex justify-between'>
                    <div>APR:</div>
                    <div>{(strategy.APR)?.toFixed(2)}%</div>
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
        </Card>
    );
};

export default AllocationSummary;