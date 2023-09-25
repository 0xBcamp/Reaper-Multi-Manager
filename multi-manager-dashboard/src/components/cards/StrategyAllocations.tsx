// Allocation.tsx
import { useState } from 'react';
import { DEFAULT_STD_DEV_THRESHOLD } from '../../utils/constants';
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
        return (
        <Card title={"Summary"} >
            {strategy.lastReport ?
            <div className='flex flex-col p-2 text-gray-600 text-md h-full'>
                <div className='flex justify-between'>
                    <div>Contract allocated BPS:</div>
                    <div>{strategy.lastReport?.allocBPS}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Actual allocated BPS:</div>
                    <div>{strategy?.actualAllocatedBPS}</div>
                </div>
                <div className='flex justify-between'>
                    <div>APR:</div>
                    <div>{strategy.APR?.toFixed(2)}%</div>
                </div>
                <div className='flex justify-between'>
                    <div>Vault APR:</div>
                    <div>{vault.APR?.toFixed(2)}%</div>
                </div>
                <div className='flex justify-between'>
                    <div>Optimum Allocation BPS:</div>
                    <div>{strategy?.optimumAllocationBPS}</div>
                </div>
            </div> :
            <div >No harvests found</div>}
        </Card>
    );
};

export default AllocationSummary;