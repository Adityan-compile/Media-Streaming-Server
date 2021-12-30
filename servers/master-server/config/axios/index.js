const axios = require('axios');

const instance = axios.create({});

instance.defaults.baseURL = "https://api.themoviedb.org/3/";

instance.defaults.params['api_key'] = process.env.TMDB_API_KEY || "";

module.exports = instance;