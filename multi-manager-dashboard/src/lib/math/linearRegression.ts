import { ONE_UNIX_YEAR, ONE_UNIX_WEEK } from '../../utils/constants';
import { CurveFitData } from '../../components/charts/types';

// x data calculated as one month of timestamps normalized from 0 (one month ago) to 1 (now)
const calculateXData = (data: CurveFitData[]) =>
  data.map(({ timestamp }) => timestamp);

// y data calculated as normalized performance metric (annualized rate)
// correct for allocationAdded
const calculateYData = (data: CurveFitData[]) =>
  data.map(({ gain, loss, allocated, allocationAdded, duration }) =>
  ((gain - loss) / (allocated - allocationAdded) * 100) / duration * ONE_UNIX_YEAR
);

// Calculate the mean of an array of values
const calculateMean = (values: number[]) => values.reduce((acc, val) => acc + val, 0) / values.length;

// Calculate the standard deviation of an array of values
const calculateStandardDeviation = (values: number[]) => {
  const mean = calculateMean(values);
  const squaredDifferences = values.map((val) => Math.pow(val - mean, 2));
  const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / values.length;
  return Math.sqrt(variance);
};

// Refactors x and y data applying a standard deviation threshold to filter outliers
export const calculateDataWithThreshold = (data: CurveFitData[], threshold: number) => {
  try {
    // Generate x and y values
    const xValues = calculateXData(data);
    const yValues = calculateYData(data);
    
    //Use valid values (not NaN or +/- Infinity)
    const validXValues = xValues.filter((_, index) =>
      !Number.isNaN(yValues[index]) && yValues[index] !== Infinity && yValues[index] !== -Infinity
    );
    const validYValues = yValues.filter((val, index) => !Number.isNaN(val) && val !== Infinity && val !== -Infinity);

    // Calculate the mean
    const mean = calculateMean(validYValues);

    // Calculate the standard deviation
    const standardDeviation = calculateStandardDeviation(validYValues);

    // Filter out x and y data points where y data are more than `threshold` standard deviations away
    const filteredXValues = validXValues.filter((_, i) =>
      Math.abs(validYValues[i] - mean) <= threshold * standardDeviation
    );

    const filteredYValues = validYValues.filter((_, i) =>
      Math.abs(validYValues[i] - mean) <= threshold * standardDeviation
    );

    // Final x and y data
    const { xData, yData } = {
      xData: filteredXValues,
      yData: filteredYValues,
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
    const windowStart = xData[i] - ONE_UNIX_WEEK;
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
