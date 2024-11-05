import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: BASE_URL,
});

// إضافة التوكن إلى طلبات HTTP
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

// التعامل مع استجابة HTTP
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // التعامل مع الأخطاء التي تشير إلى انتهاء صلاحية الـ accessToken
        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // استرجاع الـ refreshToken من localStorage
                const refreshToken = localStorage.getItem('refreshToken');

                // طلب تجديد الـ accessToken
                const { data } = await axios.post(`${BASE_URL}/refresh`, { token: refreshToken });

                // تخزين الـ accessToken و refreshToken الجديدين
                localStorage.setItem('accessToken', data.accessToken);
                if (data.refreshToken) {
                    localStorage.setItem('refreshToken', data.refreshToken); // تخزين الـ refreshToken الجديد إذا كان موجودًا
                }

                // تحديث الـ Authorization header
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
