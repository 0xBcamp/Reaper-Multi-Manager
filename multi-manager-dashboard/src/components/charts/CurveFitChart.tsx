import { useEffect, useMemo, useState } from 'react';
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
import { calculateYDataWithThreshold, calculateTimeBasedMovingAverage } from '../../lib/math/linearRegression';
import { CurveFitGraph } from './types';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface ICurveFitChartProps {
  graph: CurveFitGraph;
  graphUpdated: (graph: CurveFitGraph) => void;
}

const CurveFitChart = ({ graph, graphUpdated }: ICurveFitChartProps) => {
  const { xData, yData } = useMemo(() => calculateYDataWithThreshold(graph.data, graph.threshold), [graph.data, graph.threshold]);

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
            data: xData.map((x, index) => ({
              x,
              y: yData[index],
            })),
            backgroundColor: 'blue',
          },
          {
            label: 'Regression Line',
            data: timeBasedMovingAverageResults.resultXData.map((x, index) => ({
              x,
              y: timeBasedMovingAverageResults.resultYData[index],
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

  const handleThresholdChange = (event) => {
    graphUpdated({
      ...graph,
      threshold: parseFloat(event.target.value)
    })
  };

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
          display: false,
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

  return (
    <div style={{ width: '100%', height: '250px' }}>
      <div className='flex flex-col p-2 space-x-2 justify-items-center'>
        <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">Threshold: {graph.threshold}</label>
        <input id="default-range" type="range" value={graph.threshold} onChange={handleThresholdChange} min={0} max={4} step={0.1} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
      </div>
      {data && <div style={{ width: '100%', height: '200px' }}>
        <Scatter options={options} data={data} height={null} width={null} />
      </div>}
    </div>
  );
};

export default CurveFitChart;