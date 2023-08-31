import assert from 'assert';
import { calculateLinearRegression } from './regression.js';

// Test case 1
const xData1 = [1, 2, 3, 4, 5];
const yData1 = [2, 3.8, 5.1, 7.2, 8.6];
const expected1 = {
  slope: 1.700000000000001,
  intercept: 0.3400000000000034,
  rSquared: 0.9789957894736958,
};
const result1 = calculateLinearRegression(xData1, yData1);
assert.deepStrictEqual(result1, expected1, 'Test case 1 failed');
