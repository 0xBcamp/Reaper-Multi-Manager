import { RadialBar, RadialBarChart } from 'recharts';
import { Vault } from '../../../redux/slices/vaultsSlice';

type Props = {
  vault: Vault
  height: number;
}

function VaultHealthScore({ vault, height }: Props) {
  const endAngle = 90 - (360 * (vault.healthScore / 100));

  return (
    <RadialBarChart
      width={height}
      height={height}
      cx={height/2}
      cy={height/2}
      innerRadius="85%"
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
      <text x={height/2} y={height/2} textAnchor="middle" dominantBaseline="middle" fontSize={12} fill="#333">{`${vault.healthScore}%`}</text>
    </RadialBarChart>
  )
}

export default VaultHealthScore