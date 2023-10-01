import React, { useEffect, useState } from 'react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Vault } from '../../../redux/slices/vaultsSlice';
import { Strategy } from '../../../redux/slices/strategiesSlice';

type Props = {
  strategy: Strategy
}

function StrategyAllocationChart({ strategy }: Props) {

  const [optimumAllocationBPS, setOptimumAllocationBPS] = useState(0);
  const [actualAllocatedBPS, setActualAllocatedBPS] = useState(0);

  useEffect(() => {
    setOptimumAllocationBPS(Number(strategy.optimumAllocationBPS));
    setActualAllocatedBPS(Number(strategy.actualAllocatedBPS));
  }, [strategy]);

  const chartData = [
    {
      name: 'Strategy Allocation',
      optimum: optimumAllocationBPS,
      actual: actualAllocatedBPS
    }
  ];

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (e.activePayload) {
      const barWidth = e.activePayload[0].width;
      setTooltipPosition({ x: e.chartX + barWidth, y: e.chartY });
    }
  };

  return (
    <ResponsiveContainer width='100%' height={90}>
      <BarChart
        data={chartData}
        margin={{
          top: 5, right: 10, left: 20, bottom: 5,
        }}
        onMouseMove={handleMouseMove}
      >
        <YAxis domain={[0, 10000]} hide={true}/>
        <Tooltip />
        <Bar dataKey="optimum" fill="rgb(34 197 94)" name="Optimum Allocation" />
        <Bar dataKey="actual" fill="#2451B7" name="Actual Allocated" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default StrategyAllocationChart