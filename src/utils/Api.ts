import axios from "axios";
import {getCookie} from "typescript-cookie";

const api = axios.create({
    baseURL: 'http://localhost:8080'
})

api.interceptors.request.use((config) => {
    // Get CSRF token from cookie
    const csrfToken = getCookie('XSRF-TOKEN');

    // If the CSRF token is available, set it in the headers
    if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

export default api;