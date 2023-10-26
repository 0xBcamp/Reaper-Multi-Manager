import { useMemo } from 'react';
import { DEFAULT_STD_DEV_THRESHOLD } from '../../utils/constants';

import { calculateDataWithThreshold, calculateTimeBasedMovingAverage } from '../../utils/calculateStrategyAPR';
import { CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, Scatter, ComposedChart } from 'recharts';
import { selectStrategy } from '../../redux/selectors';
import { useSelector } from 'react-redux';



const StrategyAprSummary = () => {

    const strategy = useSelector(selectStrategy);
    
    const { xData, yData } = useMemo(() => calculateDataWithThreshold(strategy.aprReports, DEFAULT_STD_DEV_THRESHOLD), [strategy.aprReports, DEFAULT_STD_DEV_THRESHOLD]);

    const timeBasedMovingAverageResults = useMemo(() => {
        if (xData.length > 0 && yData.length > 0) {
            return calculateTimeBasedMovingAverage(xData, yData);
        }
        return null;
    }, [xData, yData]);



    const data = useMemo(() => {
        if (timeBasedMovingAverageResults && xData.length > 0) {
            return xData.map((x, index) => ({
                    x,
                    y1: yData[index],
                    y2: timeBasedMovingAverageResults?.resultYData[index],
                }))
            ;
        }
        return null;
    }, [xData, yData, timeBasedMovingAverageResults]);

    return (
        <div className='grid grid-cols-12 col-span-5 bg-white border border-gray-200 mb-8'>
            <div className={`col-span-12 flex flex-col flex-1`}>
                <div className='p-3 text-gray-800 flex flex-row justify-between items-center'>
                    <div className='font-bold'>Strategy APR</div>
                    <div className='text-xl'>{strategy?.APR?.toFixed(2)}%</div>
                </div>
                <div className='px-3 h-[200px]'>
                    {strategy?.aprReports?.length > 0 &&<ResponsiveContainer width='100%' height={200}>
                        <ComposedChart
                            data={data}
                        >
                            <CartesianGrid opacity={0.4} vertical={false} />
                            <XAxis
                                type="number"
                                dataKey="x"
                                name="date"
                                axisLine={false}
                                tickLine={false}
                                domain={[data[0]?.x - 50000, data[data?.length - 1]?.x + 50000]}
                                tick={{ fontSize: '11px' }}
                                tickFormatter={(value, index) => {
                                    const date = new Date(value * 1000);
                                    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
                                    return formatter.format(date);
                                }}
                            />
                            <YAxis
                                type="number"
                                dataKey="y1"
                                name="APR"
                                tickFormatter={(value) => {
                                    return `${value.toFixed(0)}%`;
                                }}
                                tick={{ fontSize: '11px' }}
                                axisLine={false}
                                tickLine={false}
                                domain={[(Math.min(...data.map(x => x.y1)) * 0.9) , (Math.max(...data.map(x => x.y1)) * 1.1)]}
                            />
                            <Tooltip content={<StrategyAprTooltip />} />
                            <Scatter 
                                name="APR" 
                                fill="#3B82F6" 
                                dataKey="y1"
                            />
                            <Line type="monotone" name="Weighted APR" dataKey="y2" stroke="#10B981" strokeWidth={1} dot={{ r: 2 }}/>
                            
                        </ComposedChart>
                    </ResponsiveContainer>}
                </div>
            </div>
        </div>
    );
};

const StrategyAprTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {

        const date = new Date(label * 1000);
		const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
		const formattedDate = formatter.format(date);

        return (
            <div className="p-2 bg-white shadow rounded border border-gray-300">
                <div className="text-sm text-gray-700 mb-2 font-semibold">{`${formattedDate}`}</div>
                <div className="text-sm text-blue-500 mb-1">{`Report APR: ${payload[0].value.toFixed(2)}%`}</div>
                <div className="text-sm text-green-500 mb-1">{`Strategy APR: ${payload[1].value.toFixed(2)}%`}</div>
            </div>
        );
    }
    return null;
};

export default StrategyAprSummary;