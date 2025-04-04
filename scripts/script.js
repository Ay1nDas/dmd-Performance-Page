const ctx = document.getElementById('barChart').getContext('2d');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['User Time (s)', 'System Time (s)', 'Max RAM (MB)'], // 3 Groups
        datasets: [
            {
                label: 'PR',
                data: [7.09, 0.36, 39.93 ], // Values for each group
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Master',
                data: [7.10, 0.35, 48.45], // Values for each group
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' }
        },
        scales: {
            x: {
                stacked: false,
                categoryPercentage: 0.6, // Controls spacing between groups
                barPercentage: 1.0      // Keeps bars in a group close
            },
            y: {
                beginAtZero: true
            }
        }
    }
});