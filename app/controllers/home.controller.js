const axios = require('axios');

const { INEX_API } = process.env;

//*Model
const {ResToTransaction} = require('../models/transaction.model');
const { Chart } = require('chart.js');

const GetTransactions = async () =>{
    try {
        const { data } = await axios.get(`http://${INEX_API}/transactions`);
        const { success, transactions: resTransactions, error} = data;

        if(success){
            const transactions = resTransactions.map(ResToTransaction);
            const types = GroupTransactionsByType(transactions);
            const doughnutChartConfig = GenerateDoughnutChartConfig(types);

            return { transactions, doughnutChartConfig };
        }
        throw error;
    } catch (error) {
        console.log('Error loading transactions', error);
        throw error;
    }
}

//* This clas is "PRIVATE"
const GroupTransactionsByType = (transactions) => {
    return transactions.reduce((result, transaction) => {
        const value = transaction.type;

        if (!result[value]) {
            result[value] = [transaction];
        } else {
            result[value].push(transaction);
        }
        return result;
    }, {});
};

//* This clas is "PRIVATE"
const GenerateDoughnutChartConfig = (types) => {
    return {
        type: 'doughnut',
        data: {
            labels: ['Ingresos', 'Gastos'],
            datasets: [{
                label: 'Registro de gastos',
                data: [
                    types.INCOME ? types.INCOME.reduce((total, transaction) => total + transaction.mount, 0): 0,
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


module.exports = {
    GetTransactions
}