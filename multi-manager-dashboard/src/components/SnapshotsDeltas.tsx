import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ISnapshot_Delta } from '../redux/slices/vaultsSlice';

type Props = {
  deltas: ISnapshot_Delta;
  type: "usd" | "number";
  total: number;
}

function SnapshotsDeltas({ deltas, type, total }: Props) {
  const totalHeading = `${type === 'usd' ? "$" : ""}${Number(total.toFixed(0)).toLocaleString()}`

  const getDiffText = (value: number) => {
    return `${type === 'usd' ? "$" : ""}${Number(value.toFixed(0)).toLocaleString()}`;
  }

  const getVaultPercentageText = (value: number) => {
    return `${Number(Math.abs(value).toFixed(2)).toLocaleString()}%`;
  }

  const getVaultPercentageClassname = (value: number) => {
    return value < 0 ? `text-red-500` : "text-green-500";
  }

  const getVaultPercentageDirection = (value: number) => {
    return value < 0 ? `down-48` : "up-48";
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
        <div className='flex flex-row items-center w-full'>
          <div className={`flex-1 text-gray-700`}>
            {getDiffText(deltas.diff.days1)}
          </div>
          <div className='pb-[1px]'><img src={`${process.env.PUBLIC_URL}/icons/${getVaultPercentageDirection(deltas.perc.days1)}.png`} alt="Menu Icon" className='h-[12px]' /></div>
          <div className={`${getVaultPercentageClassname(deltas.perc.days1)} text-xs`}>{getVaultPercentageText(deltas.perc.days1)}</div>
        </div>
      </div>
      <div className='flex flex-col pr-2 my-3'>
        <div className='flex text-gray-400 text-xs'>
          Last 7 days
        </div>
        <div className='flex flex-row items-center w-full'>
          <div className={`flex-1 text-gray-700`}>
            {getDiffText(deltas.diff.days7)}
          </div>
          <div className='pb-[1px]'><img src={`${process.env.PUBLIC_URL}/icons/${getVaultPercentageDirection(deltas.perc.days7)}.png`} alt="Menu Icon" className='h-[12px]' /></div>
          <div className={`${getVaultPercentageClassname(deltas.perc.days7)} text-xs`}>{getVaultPercentageText(deltas.perc.days7)}</div>
        </div>
      </div>
      <div className='flex flex-col pr-2 my-3'>
        <div className='flex text-gray-400 text-xs'>
          Last 30 days
        </div>
        <div className='flex flex-row items-center w-full'>
          <div className={`flex-1 text-gray-700`}>
            {getDiffText(deltas.diff.days30)}
          </div>
          <div className='pb-[1px]'><img src={`${process.env.PUBLIC_URL}/icons/${getVaultPercentageDirection(deltas.perc.days30)}.png`} alt="Menu Icon" className='h-[12px]' /></div>
          <div className={`${getVaultPercentageClassname(deltas.perc.days30)} text-xs`}>{getVaultPercentageText(deltas.perc.days30)}</div>
        </div>
      </div>
    </>
  )
}

export default SnapshotsDeltas