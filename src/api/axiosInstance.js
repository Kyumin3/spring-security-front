import axios from 'axios';
import store from '../redux/store/store';
import {updateToken} from "../redux/store/authSlice";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('jwtToken');
    const state = store.getState();
    // const token = state.auth.token; // authSlice에 저장된 토큰
    // 헤더 병합 처리
    config.headers = {
        ...config.headers, // 기존 headers 유지
        ...(config.useAuth && token
            ? { Authorization: `Bearer ${token}` }
            : {})
    };

    return config;
}, error => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (response) => {

        const newToken = response.headers['authorization']?.split(' ')[1];
        if (newToken) {
            localStorage.setItem('jwtToken', newToken);
            store.dispatch(updateToken(newToken)); // Redux 상태 갱신
        }
        return response;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;