import axios from 'axios';
import retry from 'axios-retry';

const instance = axios.create({
    baseURL: '/api/'
});

retry(axios, { 
    retries: 2
});

export default instance;

