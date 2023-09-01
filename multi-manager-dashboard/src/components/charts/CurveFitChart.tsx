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

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);


export type CurveFitGraph = {
    name: string,
    data: CurveFitData[]
}

export type CurveFitData = {
    index: number,
    apr: number,
}

interface ICurveFitChartProps {
    graph: CurveFitGraph
}
const CurveFitChart = ({ graph }: ICurveFitChartProps) => {
    const linearRegressionResults = calculateLinearRegression(graph.data.map(x => x.index), graph.data.map(x => (x.apr / 100)));

    const options: _DeepPartialObject<CoreChartOptions<"scatter"> & ElementChartOptions<"scatter"> & PluginChartOptions<"scatter"> & DatasetChartOptions<"scatter"> & ScaleChartOptions<"scatter"> & LineControllerChartOptions> = {
        scales: {
            x: {
                beginAtZero: true,
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
                        x: p.index,
                        y: p.apr / 100
                    }
                }),
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: 'Regression Line',
                data: graph.data.map(x => ({ x: x.index, y: linearRegressionResults.slope * x.index + linearRegressionResults.intercept })),
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