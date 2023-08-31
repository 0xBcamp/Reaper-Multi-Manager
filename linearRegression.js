function calculateLinearRegression(xData, yData) {
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
  
  // Example data
  const xData = [1, 2, 3, 4, 5];
  const yData = [2, 3.8, 5.1, 7.2, 8.6];
  
  const regressionExample = calculateLinearRegression(xData, yData);
  console.log("Slope:", regressionExample.slope);
  console.log("Intercept:", regressionExample.intercept);
  console.log("Linear equation:", regressionExample.slope,"* X +", regressionExample.intercept);
  console.log("R-squared:", regressionExample.rSquared);
  console.log("predictedY at xData(xData.length):", regressionExample.slope * xData[xData.length-1] + regressionExample.intercept)