import axios from 'axios';
import retry from 'axios-retry';

const instance = axios.create({
    baseURL: '/api/'
});

instance.defaults.withCredentials = true;

retry(axios, { 
    retries: 2
});

export default instance;

