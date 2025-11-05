import axiosInstance from '../api/axiosInstance';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8080/api';

// 로그인 요청
export const getUserList = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/user`, {useAuth : true});
        return response;
    } catch (error) {
        // console.error("API1 요청 실패:", error);
    }
};

export const updateUserRole = async (username, newRole) => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    try {
        const response = await axiosInstance.put(`${API_BASE_URL}/users/${username}/role`, {
            role: newRole // 예: "ADMIN,USER"
        }, {useAuth : true});
        return response;
    } catch (err) {
        return err.response
    }
};

export const checkUserId = async (userId) => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    try {
        // await axios.get(`/api/check-username?username=${username}`)
        const response = await axiosInstance.get(`${API_BASE_URL}/check-username?userId=${userId}`,
        // {
        //         withCredentials: true,
        //         headers: {
        //             'X-XSRF-TOKEN': csrfToken
        //         }
        //     }
        );
        return response;
    } catch (err) {
        return err.response
    }
};

export const checkEmail = async (email) => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/check-email?email=${email}`,
        );
        return response;
    } catch (err) {
        return err.response
    }
};

export const createUser = async (userData) => {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/save-user`, userData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {

        throw error.response?.data || error;
    }
};