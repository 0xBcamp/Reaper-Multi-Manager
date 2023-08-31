import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts"

export type CurveFitGraph = {
    name: string,
    data: CurveFitData[]
}

export type CurveFitData = {
    index: number,
    apr: number
}

interface ICurveFitChartProps {
    graph: CurveFitGraph
}
const CurveFitChart = ({ graph }: ICurveFitChartProps) => {
    return (
        <ResponsiveContainer width="100%" height="90%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="index" name="X-axis" />
          <YAxis type="number" dataKey="apr" name="Y-axis" />
          <Tooltip />
          <Scatter name="Data Points" data={graph.data} fill="#4a86ff" shape="circle" />
        </ScatterChart>
      </ResponsiveContainer>

    )
}

export default CurveFitChart;