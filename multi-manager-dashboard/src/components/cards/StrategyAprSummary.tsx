import { useMemo, useState } from 'react';
import { formatDate } from '../../utils/dateUtils';
import Card from './Card';
import { DEFAULT_STD_DEV_THRESHOLD } from '../../utils/constants';
import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    CoreChartOptions,
    DatasetChartOptions,
    ElementChartOptions,
    PluginChartOptions,
    ScaleChartOptions,
    LineControllerChartOptions,
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { Vault } from '../../redux/slices/vaultsSlice';
import { Strategy } from '../../redux/slices/strategiesSlice';
import { calculateDataWithThreshold, calculateTimeBasedMovingAverage } from '../../utils/calculateStrategyAPR';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface IStrategyAprSummaryProps {
    vault: Vault;
    strategy: Strategy;
    showSlider: boolean;
}

const StrategyAprSummary = ({ vault, strategy, showSlider }: IStrategyAprSummaryProps) => {
    const [threshold, setThreshold] = useState(DEFAULT_STD_DEV_THRESHOLD)

    const lastHarvest = strategy.aprReports?.length > 0 ? strategy.aprReports[strategy.aprReports?.length - 1] : undefined;

    const { xData, yData } = useMemo(() => calculateDataWithThreshold(strategy.aprReports, threshold), [strategy.aprReports, threshold]);

    const timeBasedMovingAverageResults = useMemo(() => {
        if (xData.length > 0 && yData.length > 0) {
            return calculateTimeBasedMovingAverage(xData, yData);
        }
        return null;
    }, [xData, yData]);

    const data = useMemo(() => {
        if (timeBasedMovingAverageResults && xData.length > 0) {
            return {
                datasets: [
                    {
                        label: 'Apr',
                        data: xData.map((x, index) => ({
                            x,
                            y: yData[index],
                        })),
                        backgroundColor: 'blue',
                    },
                    {
                        label: 'Regression Line',
                        data: timeBasedMovingAverageResults?.resultXData.map((x, index) => ({
                            x,
                            y: timeBasedMovingAverageResults?.resultYData[index],
                        })),
                        borderColor: 'green',
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        showLine: true,
                        pointRadius: 0,
                    },
                ],
            };
        }
        return null;
    }, [xData, yData, timeBasedMovingAverageResults]);

    const options: _DeepPartialObject<
        CoreChartOptions<"scatter"> &
        ElementChartOptions<"scatter"> &
        PluginChartOptions<"scatter"> &
        DatasetChartOptions<"scatter"> &
        ScaleChartOptions<"scatter"> &
        LineControllerChartOptions
    > = {
        scales: {
            x: {
                beginAtZero: false,
                ticks: {
                    font: {
                        size: 10,
                    },
                    count: 2,
                },
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: false,
                ticks: {
                    font: {
                        size: 10,
                    },
                    count: 2,
                },
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        maintainAspectRatio: false,
        hover: {
            mode: 'index',
            intersect: false,
            axis: 'x',
        },
    };

    const handleThresholdChange = (event) => {
        setThreshold(parseFloat(event.target.value));
    };

    return (
        <div className='grid grid-cols-12 col-span-5 bg-white border border-gray-200 mb-8'>
            <div className={`col-span-12 flex flex-col flex-1`}>
                <div className='p-3 text-gray-800 flex flex-row justify-between items-center'>
                    <div className='font-bold'>Strategy APR</div>
                    <div className='text-xl'>{strategy?.APR?.toFixed(2)}%</div>
                </div>
                <div className='px-3 h-[200px]'>
                    <Scatter options={options} data={data} height={null} width={null} />
                </div>
            </div>
        </div>
        // <Card>
        //     <>
        //         {lastHarvest ?
        //             <>
        //                 {strategy.aprReports?.length > 0 && <div style={{ width: '100%', height: '250px' }}>
        //                     {showSlider && <div className='flex flex-col p-2 space-x-2 justify-items-center'>
        //                         <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">Threshold: {threshold}</label>
        //                         <input id="default-range" type="range" value={threshold} onChange={handleThresholdChange} min={0.1} max={4} step={0.1} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
        //                     </div>}
        //                     <div style={{ width: '100%', height: '200px' }}>
        //                         <Scatter options={options} data={data} height={null} width={null} />
        //                     </div>
        //                 </div>}
        //             </>
        //             :
        //             <div className='flex justify-center h-full my-auto p-10 text-gray-500'>No harvests found</div>}
        //     </>
        // </Card>

    );
};

export default StrategyAprSummary;