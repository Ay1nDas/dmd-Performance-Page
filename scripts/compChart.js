// export function displayChart(mainData, prData) {
//   const ctx = document.getElementById('barChart').getContext('2d');

//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: ['User Time (s)', 'System Time (s)', 'Max RAM (MB)'],
//       datasets: [
//         {
//           label: 'PR',
//           data: [
//             mainData.userTime,
//             mainData.sysTime * 65,
//             mainData.maxRam / 20000,
//           ], // Values for each group
//           backgroundColor: 'rgba(255, 99, 132, 0.7)',
//           borderColor: 'rgba(255, 99, 132, 1)',
//           borderWidth: 1,
//         },
//         {
//           label: 'Master',
//           data: [prData.userTime, prData.sysTime * 65, prData.maxRam / 20000], // Values for each group
//           backgroundColor: 'rgba(54, 162, 235, 0.7)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { position: 'top' },
//       },
//       scales: {
//         x: {
//           stacked: false,
//           categoryPercentage: 0.6, // Controls spacing between groups
//           barPercentage: 1.0, // Keeps bars in a group close
//         },
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   });
// }

let myChart = null;

export function displayChart(mainData, prData) {
  const userTimePercentage = (
    ((mainData.userTime - prData.userTime) / mainData.userTime) *
    100
  ).toFixed(2);
  const sysTimePercentage = (
    ((mainData.sysTime - prData.sysTime) / mainData.sysTime) *
    100
  ).toFixed(2);
  const maxRamPercentage = (
    ((mainData.maxRam - prData.maxRam) / mainData.maxRam) *
    100
  ).toFixed(2);

  const ctx = document.getElementById('bidirectionalChart').getContext('2d');

  if (myChart) {
    const newData = [userTimePercentage, sysTimePercentage, maxRamPercentage];
    myChart.data.datasets[0].data = newData;

    const maxAbs = Math.max(...newData.map(Math.abs));
    myChart.options.scales.y.min = -maxAbs;
    myChart.options.scales.y.max = maxAbs;
    myChart.update();
  } else {
    const data = [userTimePercentage, sysTimePercentage, maxRamPercentage];
    const maxAbs = Math.max(...data.map(Math.abs));

    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          '% improve User Time',
          '% improve System Time',
          '% improve Max RAM',
        ],
        datasets: [
          {
            label: '% Change in Performance',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: '#b03931',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        animations: {
          duration: 50,
        },
        scales: {
          y: {
            min: -maxAbs,
            max: maxAbs,
            beginAtZero: true,
            grid: {
              color: (ctx) => {
                return ctx.tick.value === 0 ? '#b03931' : '#ccc'; // darker color at 0
              },
              lineWidth: (ctx) => {
                return ctx.tick.value === 0 ? 3 : 1; // thicker line at 0
              },
            },
          },
        },
      },
    });
  }
}
