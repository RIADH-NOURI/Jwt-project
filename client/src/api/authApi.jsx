import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: BASE_URL,
});

// add token to HTTP
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

// . add refresh token to HTTP
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // check if accessToken
        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // get refresh token
                const refreshToken = localStorage.getItem('refreshToken');

                // refresh token
                const { data } = await axios.post(`${BASE_URL}/refresh`, { token: refreshToken });

                // update accessToken
                localStorage.setItem('accessToken', data.accessToken);
                if (data.refreshToken) {
                    localStorage.setItem('refreshToken', data.refreshToken); // store new refresh token
                }

                // update Authorization header
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
