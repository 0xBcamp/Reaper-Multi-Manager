import { TIMESTAMP_ONE_MONTH_AGO, ONE_UNIX_YEAR, oneWeekInMilliseconds } from '../../utils/constants';
import { CurveFitData } from '../../components/charts/types';

// x data calculated as one month of timestamps normalized from 0 (one month ago) to 1 (now)
const calculateXData = (data: CurveFitData[]) =>
  data.map(({ timestamp }) =>
  (timestamp - TIMESTAMP_ONE_MONTH_AGO) / (Date.now() / 1000 - TIMESTAMP_ONE_MONTH_AGO)
);

// y data calculated as normalized performance metric (annualized rate)
const calculateYData = (data: CurveFitData[]) =>
  data.map(({ gain, loss, allocated, duration }) =>
  ((gain - loss) / allocated * 100) / duration * ONE_UNIX_YEAR
);

// refactors x and y data applying a standard deviation threshold to filter outliers
export const calculateYDataWithThreshold = (data: CurveFitData[], threshold: number) => {
  try {
    const yValues = calculateYData(data);

    const validYValues = yValues.filter(val => !Number.isNaN(val) && val !== Infinity && val !== -Infinity);

    const mean = validYValues.reduce((acc, val) => acc + val, 0) / validYValues.length;
  
    // Calculate the standard deviation
    const squaredDifferences = validYValues.map((y) => Math.pow(y - mean, 2));
    const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / validYValues.length;
    const standardDeviation = Math.sqrt(variance);
  
    // Filter out data points that are more than `threshold` standard deviations away
    const filteredData = data.filter((_, i) =>
      Math.abs(validYValues[i] - mean) <= threshold * standardDeviation
    );
  
    const { xData, yData } = {
      xData: calculateXData(filteredData),
      yData: calculateYData(filteredData),
    };
  
    return { xData, yData };
  } catch (error) {
    console.log("error", error)
  }

};

// Calculate time-based moving average with a window of 1 week
export const calculateTimeBasedMovingAverage = (xData: number[], yData: number[]) => {
  if (xData.length !== yData.length) {
    throw new Error("Input arrays must have the same length");
  }

  const resultX: number[] = [];
  const resultY: number[] = [];

  const totalDataPoints = xData.length;

  for (let i = 0; i < totalDataPoints; i++) {
    // Calculate the time window boundaries
    const windowStart = xData[i] - oneWeekInMilliseconds;
    const windowEnd = xData[i];

    // Calculate the moving average for the current window
    let sumY = 0;
    let count = 0;

    for (let j = i; j >= 0; j--) {
      if (xData[j] < windowStart) {
        break;
      }

      sumY += yData[j];
      count++;
    }

    const averageY = sumY / count;

    // Push the timestamp and moving average into the result arrays
    resultX.push(windowEnd);
    resultY.push(averageY);
  }

  return {
    resultXData: resultX,
    resultYData: resultY,
  };
};
