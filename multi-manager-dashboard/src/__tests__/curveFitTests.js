import assert from 'assert';
import { calculateLinearRegression } from '../lib/math/linearRegression';

describe('Linear Regression', () => {
  it('should calculate linear regression correctly', () => {
    // Given
    const xData = [1, 2, 3, 4, 5];
    const yData = [3, 5, 7, 9, 11];
    const expected = {
      slope: 2,
      intercept: 1,
      rSquared: 1,
    };
    
    // When
    const result = calculateLinearRegression(xData, yData);

    // Then
    assert.deepStrictEqual(result, expected, 'Incorrect linear regression calculations');
  });
});