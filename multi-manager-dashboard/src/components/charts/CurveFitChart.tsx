import { useState } from 'react';
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
import { defaultStdDevThreshold } from '../../utils/constants';
  
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface ICurveFitChartProps {
  graph: CurveFitGraph;
}

const CurveFitChart = ({ graph }: ICurveFitChartProps) => {
  const [threshold, setThreshold] = useState(defaultStdDevThreshold);
  const { xData, yData } = calculateYDataWithThreshold(graph.data, threshold);
  const timeBasedMovingAverageResults = calculateTimeBasedMovingAverage(xData, yData,);
  const lastAllocationValue = graph.data[graph.data.length - 1]?.allocated;
  const handleThresholdChange = (event) => {
    const newThreshold = parseFloat(event.target.value);
    setThreshold(newThreshold);
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

  const data = {
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
        pointRadius: 1,
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '200px' }}>
      <div>
        Threshold: 
        <input
          type="number"
          value={threshold}
          onChange={handleThresholdChange}
          step="0.1"
          min="0"
        />
      </div>
      <div style={{ width: '100%', height: '100%' }}>
        <Scatter options={options} data={data} height={null} width={null} />
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
      APR: {(timeBasedMovingAverageResults.resultYData[timeBasedMovingAverageResults.resultYData.length-1])}%
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
      Last Allocated Value: {lastAllocationValue}
      </div>
    </div>
  );
};
  
export default CurveFitChart;