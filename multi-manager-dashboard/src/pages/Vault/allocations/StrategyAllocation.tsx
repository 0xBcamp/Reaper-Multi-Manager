import { useState } from 'react';
import TextField from '../../../components/form/TextField';
import Button from '../../../components/form/Button';
import { Strategy } from '../../../redux/slices/strategiesSlice';
import { processEvents } from '../../../services/appService';
import { useDispatch } from 'react-redux';
import { setLastRefetch } from '../../../redux/slices/appSlice';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { VAULT_V2_ABI } from '../../../abi/vaultV2Abi';
import { toast } from 'react-toastify';
import { ReaperBaseStrategyV4 } from '../../../abi/ReaperBaseStrategyV4';
import ProgressBar from '../../../components/ProgressBar';
import Tooltip from '../../../components/Tooltip';

interface UpdateStrategyAllocationForm {
    allocBPS: number;
}

interface IStrategyAllocationProps {
    strategy: Strategy
}

const StrategyAllocation = ({ strategy }: IStrategyAllocationProps) => {
    const dispatch = useDispatch();

    const initialValues: UpdateStrategyAllocationForm = {
        allocBPS: Number(strategy.allocBPS),
    };

    const [formState, setFormState] = useState<UpdateStrategyAllocationForm>(initialValues);
    const [isHarvesting, setIsHarvesting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const { address } = useAccount();
    const provider = new ethers.BrowserProvider(window.ethereum as any);

    return (
        <div className='bg-white w-[30%] mx-auto mt-5'>
            <div className='flex flex-col border border-gray-200'>
                <div className='p-2 shadow-sm flex flex-row justify-between items-center'>
                    <div>
                        <div className='text-gray-600 font-semibold'>{strategy.protocol ? strategy.protocol.name : strategy.address}</div>
                        <div className='text-gray-400 text-xs'>{strategy.address}</div>
                    </div>
                    <div className='text-gray-600 font-semibold pr-1'>
                        <Tooltip content={"Strategy APR"}>
                            {strategy.APR.toFixed(2)}%
                        </Tooltip>
                    </div>
                </div>

                <div className='px-3'>
                    <ProgressBar title='Contract allocated BPS' percentage={parseFloat(strategy.lastReport?.allocBPS) / 100} percentageDisplay={strategy.lastReport?.allocBPS} showPercentage={false} colorScheme='primary' />
                </div>
                <div className='px-3'>
                    <ProgressBar title='Actual allocated BPS' percentage={parseFloat(strategy?.actualAllocatedBPS) / 100} percentageDisplay={strategy?.actualAllocatedBPS} showPercentage={false} colorScheme='secondary' />
                </div>
                <div className='px-3'>
                    <ProgressBar title='Optimum Allocation BPS' percentage={parseFloat(strategy?.optimumAllocationBPS) / 100} percentageDisplay={strategy?.optimumAllocationBPS} showPercentage={false} colorScheme='tertiary' />
                </div>
                <div className=' px-3 py-4'>
                    <TextField label='New allocBPS' type='number' value={formState.allocBPS} onChange={(value: number) => setFormState(prevState => ({ ...prevState, allocBPS: value }))} />
                </div>
                <div className='px-3 pb-3 text-right'>
                    <Button text={`Harvest`} color='primary' variant='outlined' className='mr-3' isBusy={isHarvesting} disabled={isUpdating} onClick={async () => {
                        setIsHarvesting(true);
                        try {
                            const signer = await provider.getSigner(address);
                            const contract = new ethers.Contract(strategy.address, ReaperBaseStrategyV4, signer);

                            const txResponse = await contract.harvest();
                            await txResponse.wait();

                            toast.success("Strategy successfully harvested")
                            await processEvents();
                            dispatch(setLastRefetch());
                        } catch (error) {
                            const revertReasonMatch = /reason="([^"]+)"/.exec(error.message);
                            if (revertReasonMatch && revertReasonMatch[1]) {
                                toast.error(revertReasonMatch[1]);
                            } else {
                                toast.error(error);
                            }
                        }
                        setIsHarvesting(false);
                    }} />
                    <Button text={`Update`} color='primary' variant='outlined' isBusy={isUpdating} disabled={isHarvesting} onClick={async () => {
                        setIsUpdating(true);
                        try {
                            const signer = await provider.getSigner(address);
                            const contract = new ethers.Contract(strategy.vaultAddress, VAULT_V2_ABI, signer);

                            const txResponse = await contract.updateStrategyAllocBPS(strategy.address, formState.allocBPS);
                            await txResponse.wait();

                            toast.success("Strategy AllocBPS successfully updated")
                            await processEvents();
                            dispatch(setLastRefetch());
                        } catch (error) {
                            const revertReasonMatch = /reason="([^"]+)"/.exec(error.message);
                            if (revertReasonMatch && revertReasonMatch[1]) {
                                toast.error(revertReasonMatch[1]);
                            } else {
                                toast.error(error);
                            }
                        }
                        setIsUpdating(false);
                    }} />
                </div>
            </div>
        </div>
    )
}

export default StrategyAllocation