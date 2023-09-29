import React from 'react'
import { Area, AreaChart, CartesianGrid, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Vault } from '../redux/slices/vaultsSlice';

type Props = {
  vault: Vault
}

function VaultHealthScore({ vault }: Props) {
  const endAngle = 90 - (360 * (vault.healthScore / 100));
  
  return (
    <RadialBarChart
      width={100}
      height={100}
      cx={50}
      cy={50}
      innerRadius="90%"
      outerRadius="100%"
      barSize={10}
      data={[vault]}
      startAngle={90}
      endAngle={endAngle}

    >
      <RadialBar
        background={{ fill: '#e0e0e0' }}
        dataKey="healthScore"
        cornerRadius={2}
        fill={vault.healthScore > 75 ? "rgb(34,197,94)" : vault.healthScore > 45 ? "rgb(251,146,60)" : "rgb(239,68,68)"}
      />
      <text x={50} y={50} textAnchor="middle" dominantBaseline="middle" fontSize={14} fill="#333">{`${vault.healthScore}%`}</text>
    </RadialBarChart>
  )
}

export default VaultHealthScore