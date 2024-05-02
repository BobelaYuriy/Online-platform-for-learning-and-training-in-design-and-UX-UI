import axios from 'axios';
//це файл з налаштуваннями axios-а
const API_URL = 'http://localhost:3001/api'

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

$api.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('persist:auth'))?.token.slice(1, -1);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});


$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;
        if (error?.response?.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
                localStorage.setItem('persist:auth', { token: response.data.accessToken });
                return $api.request(originalRequest);
            } catch {
                console.error('User is not authorized');
                document.location.replace('/login');
                localStorage.setItem('persist:auth', { isAuth: false, token: null, user: null });
                console.error(`Refresh token error: ${error}`);
                throw new Error('Refresh token error');
            }
        } else {
            console.error(`User isn't authorized error: ${error}`);
        }
    },
);
export default $api;