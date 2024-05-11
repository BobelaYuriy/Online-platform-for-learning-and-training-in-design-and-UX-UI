import axios from 'axios';
//це файл з налаштуваннями axios-а
const API_URL = 'http://localhost:3001/api'

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

$api.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('persist:user'))?.token.slice(1, -1);
    config.headers.Authorization = `Bearer ${token}`;
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
                localStorage.setItem('persist:user', { token: response.data.accessToken });
                // Повертаємо дані з сервера після успішного оновлення токену
                return response;
            } catch {
                console.error('User is not authorized');
                document.location.replace('/signin');
                localStorage.setItem('persist:user', { isAuthorized: false, token: null, userData: null });
                console.error(`Refresh token error: ${error}`);
                throw new Error('Refresh token error');
            }
        } else {
            console.error(`User isn't authorized error: ${error}`);
            // Повертаємо помилку у випадку, якщо токен не може бути оновлений
            return Promise.reject(error);
        }
    },
);

export default $api;