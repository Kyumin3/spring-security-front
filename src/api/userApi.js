import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8080/api';

// 로그인 요청
export const getUserList = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user`, {
            withCredentials: true
        });
        return response;
    } catch (error) {
        // console.error("API1 요청 실패:", error);
    }
};

export const updateUserRole = async (username, newRole) => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${username}/role`, {
            role: newRole // 예: "ADMIN,USER"
        }, {
            withCredentials: true,
            headers: {
                'X-XSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (err) {
        return err.response
    }
};

export const checkUserId = async (userId) => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    try {
        // await axios.get(`/api/check-username?username=${username}`)
        const response = await axios.get(`${API_BASE_URL}/check-username?userId=${userId}`,
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

export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/save-user`, userData, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {

        throw error.response?.data || error;
    }
};