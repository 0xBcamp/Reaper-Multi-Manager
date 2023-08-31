import assert from 'assert';
import { calculateLinearRegression } from './regression.js';

// regression calculations
const xData = [1, 2, 3, 4, 5];
const yData = [3, 5, 7, 9, 11];
const expected = {
  slope: 2,
  intercept: 1,
  rSquared: 1,
};
const result = calculateLinearRegression(xData, yData);
assert.deepStrictEqual(result, expected, 'Incorrect linear regression calculations');

console.log('All tests passed.')