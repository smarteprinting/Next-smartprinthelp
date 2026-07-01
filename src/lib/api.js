import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor — automatically attach auth token
api.interceptors.request.use(
    (config) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
        if (userInfo?.token) {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        
        // Add a timestamp parameter to bypass Chrome's aggressive caching of 308 Permanent Redirects
        config.params = { ...config.params, _t: Date.now() };
        
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — normalize error messages and unpack API wrappers
api.interceptors.response.use(
    (response) => {
        if (response.data && response.data.success === true && response.data.hasOwnProperty('data')) {
            response.data = response.data.data;
        }
        return response;
    },
    (error) => {
        const message =
            error.response?.data?.message || error.message || 'Something went wrong';
        error.message = message;
        return Promise.reject(error);
    }
);

export default api;
