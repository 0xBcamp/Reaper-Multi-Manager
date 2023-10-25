import { Strategy } from '../../../redux/slices/strategiesSlice';
import { Vault } from '../../../redux/slices/vaultsSlice';
import Card from '../../../components/cards/Card';
import ProgressBar from '../../../components/ProgressBar';
import { useEffect, useState } from 'react';

interface IAllocationProps {
    vault: Vault;
    strategy: Strategy;
    strategies: Strategy[];
}

const AllocationSummary = ({ vault, strategy, strategies }: IAllocationProps) => {

    const [allocDiff, setAllocDiff] = useState(0);

    useEffect(() => {
        if (strategy) {
            const actual = parseFloat(strategy?.actualAllocatedBPS || "0");
            const optimum = parseFloat(strategy?.optimumAllocationBPS || "0");

            const difference = Math.abs(actual - optimum) / 100;
            const roundedValue = parseFloat(difference.toFixed(2)); // rounded to 2 decimal places

            setAllocDiff(roundedValue);
        }
    }, [strategy]);

    return (
        <div className='grid grid-cols-12 col-span-5 bg-white border border-gray-200 mb-8'>
            <div className={`col-span-12 flex flex-col flex-1`}>
                <div className='p-3 text-gray-600 font-semibold flex flex-row justify-between items-center'>
                    <div>Allocations</div>
                    <div className={` text-xl ${allocDiff < 5 ? "text-green-600" : allocDiff < 10 ? "text-orange-600" : "text-red-600"}`}>{allocDiff}%</div>
                </div>
                <div className='px-3 h-[200px]'>
                    <div>
                        <ProgressBar title='Contract allocated BPS' percentage={parseFloat(strategy.lastReport?.allocBPS) / 100} percentageDisplay={strategy.lastReport?.allocBPS} showPercentage={false} colorScheme='primary' />
                    </div>
                    <div>
                        <ProgressBar title='Actual allocated BPS' percentage={parseFloat(strategy?.actualAllocatedBPS) / 100} percentageDisplay={strategy?.actualAllocatedBPS} showPercentage={false} colorScheme='secondary' />
                    </div>
                    <div>
                        <ProgressBar title='Optimum Allocation BPS' percentage={parseFloat(strategy?.optimumAllocationBPS) / 100} percentageDisplay={strategy?.optimumAllocationBPS} showPercentage={false} colorScheme='tertiary' />
                    </div>
                </div>
            </div>
        </div>
        // <Card title={"Summary"} >
        //     {strategy.lastReport ?
        //         <div className='flex flex-col p-2 text-gray-600 text-md h-full'>
        //             {/* <div className='flex justify-between'>
        //                 <div>Contract allocated BPS:</div>
        //                 <div>{strategy.lastReport?.allocBPS}</div>
        //             </div>
        //             <div className='flex justify-between'>
        //                 <div>Actual allocated BPS:</div>
        //                 <div>{strategy?.actualAllocatedBPS}</div>
        //             </div>
        //             <div className='flex justify-between'>
        //                 <div>APR:</div>
        //                 <div>{strategy.APR?.toFixed(2)}%</div>
        //             </div>
        //             <div className='flex justify-between'>
        //                 <div>Vault APR:</div>
        //                 <div>{vault.totalAPR?.toFixed(2)}%</div>
        //             </div>
        //             <div className='flex justify-between'>
        //                 <div>Optimum Allocation BPS:</div>
        //                 <div>{strategy?.optimumAllocationBPS}</div>
        //             </div> */}
        //             <div>
        //                 <ProgressBar title='Contract allocated BPS' percentage={parseFloat(strategy.lastReport?.allocBPS)/100} percentageDisplay={strategy.lastReport?.allocBPS} showPercentage={false} colorScheme='primary'/>
        //             </div>
        //             <div>
        //                 <ProgressBar title='Actual allocated BPS' percentage={parseFloat(strategy?.actualAllocatedBPS)/100} percentageDisplay={strategy?.actualAllocatedBPS} showPercentage={false} colorScheme='secondary'/>
        //             </div>
        //             <div>
        //                 <ProgressBar title='Optimum Allocation BPS' percentage={parseFloat(strategy?.optimumAllocationBPS)/100} percentageDisplay={strategy?.optimumAllocationBPS} showPercentage={false} colorScheme='tertiary'/>
        //             </div>
        //             {/* <div>
        //                 <ProgressBar title='Actual allocated' percentage={72}/>
        //             </div>
        //             <div>
        //                 <ProgressBar title='Optimum Allocation' percentage={32}/>
        //             </div> */}
        //         </div> :
        //         <div >No harvests found</div>}
        // </Card>
    );
};

export default AllocationSummary;