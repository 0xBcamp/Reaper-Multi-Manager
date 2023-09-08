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
  import { TIMESTAMP_ONE_MONTH_AGO, ONE_UNIX_YEAR } from '../../utils/constants';
  
  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
  
  export type CurveFitGraph = {
    name: string;
    data: CurveFitData[];
  };
  
  export type CurveFitData = {
    index: number;
    timestamp: number;
    gain: number;
    loss: number;
    allocated: number;
    duration: number;
  };
  
  interface ICurveFitChartProps {
    graph: CurveFitGraph;
  }
  
  const calculateXData = (data: CurveFitData[]) =>
    data.map(({ timestamp }) =>
      (timestamp - TIMESTAMP_ONE_MONTH_AGO) / (Date.now() / 1000 - TIMESTAMP_ONE_MONTH_AGO)
    );
  
  const calculateYData = (data: CurveFitData[]) =>
    data.map(({ gain, loss, allocated, duration }) =>
      ((gain - loss) / allocated * 100) / duration * ONE_UNIX_YEAR
    );
  
  const calculateYDataWithThreshold = (data: CurveFitData[], threshold: number) => {
    const yValues = calculateYData(data);
  
    const mean = yValues.reduce((acc, val) => acc + val, 0) / yValues.length;
  
    // Calculate the standard deviation
    const squaredDifferences = yValues.map((y) => Math.pow(y - mean, 2));
    const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / yValues.length;
    const standardDeviation = Math.sqrt(variance);
  
    // Filter out data points that are more than `threshold` standard deviations away
    const filteredData = data.filter((_, i) =>
      Math.abs(yValues[i] - mean) <= threshold * standardDeviation
    );
  
    const { xData, yData } = {
      xData: calculateXData(filteredData),
      yData: calculateYData(filteredData),
    };
  
    return { xData, yData };
  };
  
  const calculateRegressionData = (xData: number[], yData: number[]) =>
    calculateLinearRegression(xData, yData);

  
  const CurveFitChart = ({ graph }: ICurveFitChartProps) => {
    const threshold = 1.8; // Adjust the threshold value as needed
    const { xData, yData } = calculateYDataWithThreshold(graph.data, threshold);
    const regressionResults = calculateRegressionData(xData, yData);
    const lastAllocationValue = graph.data[graph.data.length - 1].allocated;
  
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
          data: xData.map((x, index) => ({
            x,
            y: regressionResults.slope * x + regressionResults.intercept,
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
        <div style={{ width: '100%', height: '100%' }}>
          <Scatter options={options} data={data} height={null} width={null} />
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
        APR: {(regressionResults.slope * xData[xData.length - 1] + regressionResults.intercept).toFixed(2)}%
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
        Last Allocated Value: {lastAllocationValue}
        </div>
      </div>
    );
  };
  
  export default CurveFitChart;