import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ISnapshot_Delta } from '../redux/slices/vaultsSlice';

type Props = {
  deltas: ISnapshot_Delta;
  type: "usd" | "number";
  total: number;
}

function SnapshotsDeltas({ deltas, type, total }: Props) {
  console.log("deltas", deltas)
  console.log("type", type)

  const totalHeading = `${type === 'usd' ? "$" : ""}${Number(total.toFixed(0)).toLocaleString()}`

  const getDiffText = (value: number) => {
    return `${type === 'usd' ? "$" : ""}${Number(value.toFixed(0)).toLocaleString()}`;
  }

  const getColorClass = (value: number) => {
    return value < 0 ? "text-red-500" : "text-green-500";
  }

  return (
    <>
      <div className='flex justify-center items-center p-3 text-xl'>
        {totalHeading}
      </div>
      <div className='flex flex-col pr-2 my-3'>
        <div className='flex text-gray-400 text-xs'>
          Last 24 hours
        </div>
        <div className='flex flex-row items-center'>
          <div className={`flex-1 ${getColorClass(deltas.diff.days1)}`}>
            {getDiffText(deltas.diff.days1)}
          </div>
          {/* <div className='pb-[1px]'><img src={`${process.env.PUBLIC_URL}/icons/${isDiff24Negative ? "down-48.png" : "up-48.png"}`} alt="Menu Icon" className='h-[12px]' /></div> */}
        </div>
      </div>
      <div className='flex flex-col pr-2 my-3'>
        <div className='flex text-gray-400 text-xs'>
          Last 7 days
        </div>
        <div className='flex flex-row items-center'>
          <div className={`flex-1 ${getColorClass(deltas.diff.days7)}`}>
            {getDiffText(deltas.diff.days7)}
          </div>
          {/* <div className='pb-[1px]'><img src={`${process.env.PUBLIC_URL}/icons/${isDiff7daysNegative ? "down-48.png" : "up-48.png"}`} alt="Menu Icon" className='h-[12px]' /></div> */}
        </div>
      </div>
      <div className='flex flex-col pr-2 my-3'>
        <div className='flex text-gray-400 text-xs'>
          Last 30 days
        </div>
        <div className='flex flex-row items-center'>
          <div className={`flex-1 ${getColorClass(deltas.diff.days30)}`}>
            {getDiffText(deltas.diff.days30)}
          </div>
          {/* <div className='pb-[1px]'><img src={`${process.env.PUBLIC_URL}/icons/${isDiff30daysNegative ? "down-48.png" : "up-48.png"}`} alt="Menu Icon" className='h-[12px]' /></div> */}
        </div>
      </div>
    </>
  )
}

export default SnapshotsDeltas