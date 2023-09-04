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
import { Scatter } from 'react-chartjs-2';
import { calculateLinearRegression } from '../../lib/math/linearRegression';
import { TIMESTAMP_ONE_MONTH_AGO } from '../../utils/constants';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);


export type CurveFitGraph = {
    name: string,
    data: CurveFitData[]
}

export type CurveFitData = {
    index: number,
    apr: number,
    timestamp: number,
}

interface ICurveFitChartProps {
    graph: CurveFitGraph
}
const CurveFitChart = ({ graph }: ICurveFitChartProps) => {
    // Normalize the x-axis data where one month ago is 0 and now is 1
    const normalizedXData = graph.data.map(x => (x.timestamp - TIMESTAMP_ONE_MONTH_AGO) / (Date.now() / 1000 - TIMESTAMP_ONE_MONTH_AGO));

    const linearRegressionResults = calculateLinearRegression(normalizedXData, graph.data.map(x => (x.apr / 100)));

    const options: _DeepPartialObject<CoreChartOptions<"scatter"> & ElementChartOptions<"scatter"> & PluginChartOptions<"scatter"> & DatasetChartOptions<"scatter"> & ScaleChartOptions<"scatter"> & LineControllerChartOptions> = {
        scales: {
            x: {
                beginAtZero: false,
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                }
            },
            y: {
                beginAtZero: true,
                max: Math.round((Math.max(...graph.data.map(p => p.apr / 100)) * 1.1)),
                ticks: {
                    font: {
                        size: 10
                    },
                    count: 2
                },
                grid: {
                    display: false
                }
            },
        },
        plugins: {
            legend: {
                display: false
            }
        },
        maintainAspectRatio: false,
        hover: {
            mode: 'index',
            intersect: false,
            axis: 'x'
        },
    };

    const data = {
        datasets: [
            {
                data: graph.data.map(p => {
                    return {
                        x: (p.timestamp - TIMESTAMP_ONE_MONTH_AGO) / (Date.now() / 1000 - TIMESTAMP_ONE_MONTH_AGO), // Normalize the x-axis data
                        y: p.apr / 100
                    }
                }),
                backgroundColor: 'blue',
            },
            {
                label: 'Regression Line',
                data: graph.data.map(x => ({ x: (x.timestamp - TIMESTAMP_ONE_MONTH_AGO) / (Date.now() / 1000 - TIMESTAMP_ONE_MONTH_AGO), y: linearRegressionResults.slope * (x.timestamp - TIMESTAMP_ONE_MONTH_AGO) / (Date.now() / 1000 - TIMESTAMP_ONE_MONTH_AGO) + linearRegressionResults.intercept })),
                borderColor: 'green',
                backgroundColor: 'transparent',
                borderWidth: 1,
                showLine: true,
                pointRadius: 1
            },
        ],
    };
    
    return (
        <Scatter options={options} data={data} height={null} width={null} />
    )
}

export default CurveFitChart;