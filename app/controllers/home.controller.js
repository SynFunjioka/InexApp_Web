const axios = require('axios');

const { INEX_API } = process.env;

const { getAll } = require('../services/transaction.service');

//*Model
const {ResToTransaction} = require('../models/transaction.model');

const GetTransactions = async () =>{
    try {
        //📌 Importar funcion de mi servicio
        const { success, transactions: resTransactions, error } = await getAll();

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

const CreateTransaction = async (reqBody) => {
    try {
        //📌 Make the user_id dinamically 

        const myBody = {
            user_id: "648cc73b797b198401cb2f8b",
            ...reqBody
        };
        const { success } = await axios.post(`${INEX_API}/transactions`, myBody);

        return success;
    } catch (error) {
        console.log('Error creating transactions', error);
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
    GetTransactions,
    CreateTransaction
}