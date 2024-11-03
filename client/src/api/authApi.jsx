// client/src/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; 

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true; 

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const { data } = await axios.post(`${BASE_URL}/refresh`, { refreshToken });

                localStorage.setItem('accessToken', data.accessToken);

                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token error:', refreshError);
                throw refreshError;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
