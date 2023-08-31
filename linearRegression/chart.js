import { calculateLinearRegression } from './regression.js';

document.addEventListener("DOMContentLoaded", () => {
  const xDataInput = document.getElementById("x-data");
  const yDataInput = document.getElementById("y-data");
  const calculateButton = document.getElementById("calculate-button");
  const rSquaredDisplay = document.getElementById("r-squared");

  let chartInstance;

  calculateButton.addEventListener("click", () => {
    const xValues = xDataInput.value.split(",").map(Number);
    const yValues = yDataInput.value.split(",").map(Number);

    const regressionResult = calculateLinearRegression(xValues, yValues);

    const ctx = document.getElementById('myChart').getContext('2d');

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Data',
              data: xValues.map((x, i) => ({ x: x, y: yValues[i] })),
              borderColor: 'blue',
              backgroundColor: 'blue',
              pointRadius: 5,
              showLine: false,
            },
            {
              label: 'Regression Line',
              data: xValues.map(x => ({ x: x, y: regressionResult.slope * x + regressionResult.intercept })),
              borderColor: 'red',
              backgroundColor: 'transparent',
              borderWidth: 2,
              showLine: true,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
            },
            y: {
              type: 'linear',
              position: 'left',
            },
          },
          plugins: {
            title: {
              display: false,
            },
            annotation: {
              drawTime: 'beforeDatasetsDraw',
              annotations: [{
                type: 'text',
                x: 0.1,
                y: 0.9,
                font: {
                  size: 14,
                  weight: 'bold',
                },
                content: `R-squared: ${regressionResult.rSquared.toFixed(4)}`,
              }],
            },
          },
        },
      });

    rSquaredDisplay.textContent = `R-squared: ${regressionResult.rSquared.toFixed(4)}`;
  });
});
