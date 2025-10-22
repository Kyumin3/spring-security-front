import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8080/api';

// 로그인 요청
export const getPermissionList = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/permissions`, {
            withCredentials: true
        });
        return response;
    } catch (error) {
        // console.error("API1 요청 실패:", error);
    }
};

export const updatePermissionInfo = async (id, updatedData) => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    try {
        const response = await axios.put(`${API_BASE_URL}/permission/${id}`, updatedData, {
            withCredentials: true,
            headers: {
                'X-XSRF-TOKEN': csrfToken
            }
        });
        return response;
    } catch (error) {
        if(error.response.status === 403){
            alert("수정 권한이 없어요.")
        }
    }
};

export const createApiPermission = async (apiData) => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    try {
        const response = await axios.post(`${API_BASE_URL}/save-permission`, apiData, {
            headers: {
                "Content-Type": "application/json",
                'X-XSRF-TOKEN': csrfToken
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {

        if(error.response.status === 403){
            alert("등록 권한이 없어요.")
        }
    }
};

export const deleteApiPermission = async (id) => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    try {
        const response = await axios.delete(`${API_BASE_URL}/permission/${id}`, {
            headers: {
                "Content-Type": "application/json",
                'X-XSRF-TOKEN': csrfToken
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {

        if(error.response.status === 403){
            alert("삭제 권한이 없어요.")
        }
        // throw error.response?.data || error;
    }
};

