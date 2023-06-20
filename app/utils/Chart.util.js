//* The object is from Charts.js library.
//* See the official page to see the options

let = doughnutChartConfig = {
    type: 'doughnut',
    data: {
        labels: [
            'Ingresos',
            'Gastos',
        ],
        datasets: [{
            label: 'Registro de gastos',
            data: null,
            backgroundColor: [
                'rgb(19, 209, 73)',
                'rgb(210, 19, 18)',
            ],
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Comparacion de gastos e ingresos'
            }
        }
    },
}

function UpdateChart(chartDOM = "myChart") {
    const ctx = document.getElementById(chartDOM);

    new Chart(ctx, doughnutChartConfig);
}