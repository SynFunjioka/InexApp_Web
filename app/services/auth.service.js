const axios = require('axios');

const { INEX_API } = process.env;
const url = `${INEX_API}/auth`;

const apiService = {
    async login(credentials) {
        const { data } = await axios.post(`${url}/login`, credentials);
        return data;
    },

    async signUp(credentials) {
        const { data } = await axios.post(`${url}/signup`, credentials);
        return data;
    },
};

module.exports = apiService;