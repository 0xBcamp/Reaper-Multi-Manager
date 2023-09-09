import { TIMESTAMP_ONE_MONTH_AGO, ONE_UNIX_YEAR } from '../../utils/constants';
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

// performs the linear regression calculation
export const calculateLinearRegression = (xData: number[], yData: number[]) => {
  if (xData.length !== yData.length) {
    throw new Error("Input arrays must have the same length");
  }

  const n = xData.length;

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;

  for (let i = 0; i < n; i++) {
    sumX += xData[i];
    sumY += yData[i];
    sumXY += xData[i] * yData[i];
    sumX2 += xData[i] * xData[i];
    sumY2 += yData[i] * yData[i];
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
  const intercept = (sumY - slope * sumX) / n;

  const predictedY = xData.map(x => slope * x + intercept);

  const residualSumOfSquares = predictedY.reduce((sum, predicted, i) => {
    return sum + (predicted - yData[i]) ** 2;
  }, 0);

  const totalSumOfSquares = sumY2 - (sumY ** 2) / n;

  const rSquared = 1 - residualSumOfSquares / totalSumOfSquares;

  return {
      slope,
      intercept,
      rSquared,
  };
}

// wrapper function
export const calculateRegressionData = (xData: number[], yData: number[]) =>
    calculateLinearRegression(xData, yData);