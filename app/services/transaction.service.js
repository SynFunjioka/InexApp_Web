const axios = require('axios');

const { INEX_API } = process.env;
const url = `${INEX_API}/transactions`;

const apiService = {
    async getAll(query) {
        const { data } = await axios.get(`${url}`, { params: query });
        return data;
    },

    async create(transactionData) {
        const { data } = await axios.post(`${url}`, transactionData);
        return data;
    },

    async logicDelete(transactionID) {
        const { data } = await axios.put(`${url}/delete/${transactionID}`);
        return data;
    },
};

module.exports = apiService;