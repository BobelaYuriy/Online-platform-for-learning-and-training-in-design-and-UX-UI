import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error?.response?.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
                localStorage.setItem('token', response.data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                return $api.request(originalRequest);
            } catch (error) {
                console.error('User is not authorized');
                localStorage.removeItem('token');
                document.location.replace('/signin');
                throw new Error('Refresh token error');
            }
        }
        return Promise.reject(error);
    }
);

export default $api;
