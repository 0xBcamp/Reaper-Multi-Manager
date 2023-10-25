import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Props = {
  data: any[];
  dataKey: string;
  heigth?: number;
}

function SnapshotsCardArea({ data, dataKey, heigth }: Props) {
  return (
    <>
      {data?.length > 0 ? <ResponsiveContainer width='100%' height={heigth || 200}>
        <AreaChart data={data}
          margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.5} />
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
          <Area dataKey={dataKey} stroke="#2451B7" fillOpacity={1} strokeWidth={2} fill="url(#colorUv)" type={"monotone"} />
        </AreaChart>
      </ResponsiveContainer>
      : <div className='h-[200px] text-center my-auto text-gray-400'>No data found</div>}
    </>

  )
}

export default SnapshotsCardArea