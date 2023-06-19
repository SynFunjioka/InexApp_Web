const axios = require('axios');

const { INEX_API } = process.env;

const { getAll, create } = require('../services/transaction.service');

//*Model
const {ResToTransaction} = require('../models/transaction.model');

const GetTransactions = async (query) =>{
    try {
        const { success, transactions: resTransactions, error } = await getAll(query);

        if(success){
            const transactions = resTransactions.map(ResToTransaction);

            return { transactions };
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

        // const myBody = {
        //     user_id: "648cc73b797b198401cb2f8b",
        //     ...reqBody
        // };

        const { success } = await create(reqBody);

        return success;
    } catch (error) {
        console.log('Error creating transactions', error);
        throw error;
    }
}

module.exports = {
    GetTransactions,
    CreateTransaction
}