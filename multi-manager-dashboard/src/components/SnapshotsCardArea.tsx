import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Props = {
  data: any[];
  dataKey: string;
}

function SnapshotsCardArea({ data, dataKey }: Props) {
  console.log("data", data)
  console.log("dataKey", dataKey)
  return (
    <ResponsiveContainer width='100%' height={200}>
      <AreaChart data={data}
        margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={1} />
            <stop offset="100%" stopColor="#2451B7" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="timestamp"
          axisLine={false}
          tickLine={false}
          tickFormatter={(value, index) => {
            if (index % 7 === 0) {
              const date = new Date(value * 1000);
              const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
              return formatter.format(date);
            }

            return "";
          }}
        />

        <YAxis
          dataKey={dataKey}

          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(value) => {
            return value.toLocaleString();
          }}
        />

        <CartesianGrid opacity={0.1} vertical={false} />
        <Tooltip />
        <Area dataKey={dataKey} stroke="#2451B7" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default SnapshotsCardArea