import { useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
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

  return (
    <ResponsiveContainer width='100%' height={90}>
      <BarChart
        data={chartData}
        margin={{
          top: 5, right: 10, left: 20, bottom: 5,
        }}
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