const axios = require('axios');

const { INEX_API } = process.env;

const url = `${INEX_API}/users`;

const apiService = {
    async GetByID(userID) {
        const { data } = await axios.get(`${url}/${userID}`);
        return data;
    },
};

module.exports = apiService;