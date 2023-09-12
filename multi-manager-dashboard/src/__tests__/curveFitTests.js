import { calculateDataWithThreshold } from "../lib/math/linearRegression";

describe('calculateDataWithThreshold', () => {

  it('filters outliers based on standard deviation threshold', () => {

    const testData = [
      { index: 0, timestamp: 10, gain: 1, loss: 0, allocated: 1, allocationAdded: 0, duration: 0 },
      { index: 1, timestamp: 11, gain: 0.1, loss: 0, allocated: 2, allocationAdded: 0, duration: 1 },
      { index: 2, timestamp: 12, gain: 0.2, loss: 0, allocated: 2, allocationAdded: 0, duration: 1 },
      { index: 3, timestamp: 13, gain: NaN, loss: 0, allocated: 2, allocationAdded: 0, duration: 1 },
    ];
    const threshold = 1.8;

    // Call the function with test data
    const result = calculateDataWithThreshold(testData, threshold);

    expect(result.xData).toEqual(expect.arrayContaining([11,12])); // Assert that xData contains expected values
    expect(result.yData).toEqual(expect.arrayContaining([157680000,315360000])); // Assert that yData contains expected values
    expect(result.xData.length).toBeGreaterThan(0); // Assert that xData is not empty
    expect(result.yData.length).toBeGreaterThan(0); // Assert that yData is not empty
  });
});
