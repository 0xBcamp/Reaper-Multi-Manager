import { useState } from 'react';
import TextField from '../../../components/form/TextField';
import Button from '../../../components/form/Button';
import { Strategy } from '../../../redux/slices/strategiesSlice';

interface UpdateStrategyAllocationForm {
    allocBPS: number;
}

interface IStrategyAllocationProps {
    strategy: Strategy
}

const StrategyAllocation = ({strategy}: IStrategyAllocationProps) => {

    const initialValues: UpdateStrategyAllocationForm = {
        allocBPS: Number(strategy.allocBPS),
    };

    const [formState, setFormState] = useState<UpdateStrategyAllocationForm>(initialValues);

    return (
        <div className='bg-white w-[30%] mx-auto mt-5'>
            <div className='flex flex-col border border-gray-200'>
                <div className='bg-blue-100 p-2 tex-sm text-gray-600'>
                    <div>{strategy.address}</div>
                </div>
                <div className='flex flex-row py-1 px-3 justify-between hover:bg-blue-50 text-xs text-gray-400'>
                    <div>APR</div>
                    <div>{strategy.APR.toFixed(2)}%</div>
                </div>
                <div className='flex flex-row py-1 px-3 justify-between hover:bg-blue-50 text-xs text-gray-400'>
                    <div>allocBPS</div>
                    <div>{strategy.allocBPS}</div>
                </div>
                <div className='flex flex-row py-1 px-3 justify-between hover:bg-blue-50 text-xs text-gray-400'>
                    <div>Actual Allocated BPS</div>
                    <div>{strategy.actualAllocatedBPS}</div>
                </div>
                <div className='flex flex-row py-1 px-3 justify-between hover:bg-blue-50 text-xs text-gray-400'>
                    <div>Optimum Allocation BPS</div>
                    <div>{strategy.optimumAllocationBPS}</div>
                </div>
                <div className=' px-3 py-4'>
                    <TextField label='New allocBPS' type='number' value={formState.allocBPS} onChange={(value: number) => setFormState(prevState => ({ ...prevState, allocBPS: value }))} />
                </div>
                <div className='px-3 pb-3 text-right'>
                    <Button text={`Update`} color='primary' variant='outlined' />
                </div>
            </div>
        </div>
    )
}

export default StrategyAllocation