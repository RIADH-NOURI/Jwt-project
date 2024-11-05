import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: BASE_URL,
});

<<<<<<< HEAD
// add token to HTTP
=======
>>>>>>> 19d7873004fb848edd781a92234360116ffbc2e6
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

<<<<<<< HEAD
// . add refresh token to HTTP
=======
>>>>>>> 19d7873004fb848edd781a92234360116ffbc2e6
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

<<<<<<< HEAD
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
=======
        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');

                const { data } = await axios.post(`${BASE_URL}/refresh`, { token: refreshToken });

                localStorage.setItem('accessToken', data.accessToken);
                if (data.refreshToken) {
                    localStorage.setItem('refreshToken', data.refreshToken); 
                }

>>>>>>> 19d7873004fb848edd781a92234360116ffbc2e6
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
