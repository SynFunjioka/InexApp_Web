class HomeView{
    constructor(transactions){
        console.log('data in html', transactions);

        this.transactions = transactions;

        this.chart = new DoughnutChart(transactions);
    }


    
    DeleteTransaction(id){
        console.log('Transaction id:', id);
        const self = this; //? Esto es para poder eliminar elementos del arreglo de transactions
        $.ajax({
            type: "PUT",
            url: `/api/transactions/${id}/delete`,
            data: {},
            success: function (response) {
                console.log('Response from home.js delete function', response);
                if(response.success){
                    self.transactions = self.transactions.filter(tr => tr.id !== id);
                    console.log(self.transactions);
                    $(`.transaction-item__delete[data-id="${id}"]`).parent().remove();
                    self.chart.canvas.destroy();
                    self.chart.canvas = self.chart.CreateChart(self.transactions);
                }
            },
            error: function (xhr, status, error){
                console.error('Error in html', error);
            }
        });
    }
}

class DoughnutChart {
    constructor(data){
        this.canvasDOM = document.getElementById('myChart').getContext('2d');
        this.canvas = this.CreateChart(data);
    }

    CreateChart(transactions){
        const types = transactions.reduce((result, transaction) => {
            const value = transaction.type;

            if (!result[value]) {
                result[value] = [transaction];
            } else {
                result[value].push(transaction);
            }
            return result;
        }, {});

        const chartConfig = this.GenerateDoughnutChartConfig(types);

        return new Chart(this.canvasDOM, chartConfig);
    };



    GenerateDoughnutChartConfig(types){
        return {
            type: 'doughnut',
            data: {
                labels: ['Ingresos', 'Gastos'],
                datasets: [{
                    label: 'Registro de gastos',
                    data: [
                        types.INCOME ? types.INCOME.reduce((total, transaction) => total + transaction.mount, 0) : 0,
                        types.EXPENSE ? types.EXPENSE.reduce((total, transaction) => total + transaction.mount, 0) : 0,
                    ],
                    backgroundColor: ['rgb(19, 209, 73)', 'rgb(210, 19, 18)'],
                    hoverOffset: 4,
                },],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Comparacion de gastos e ingresos',
                    },
                },
            },
        };
    };
}