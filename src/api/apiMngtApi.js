import axiosInstance from '../api/axiosInstance';
import Cookies from 'js-cookie';

export const getPermissionList = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
        const response = await axiosInstance.get(`/permissions`, {
            useAuth : true
        });
        return response;
    } catch (error) {
        // console.error("API1 요청 실패:", error);
    }
};

export const updatePermissionInfo = async (id, updatedData) => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    const token = localStorage.getItem('jwtToken');
    try {
        const response = await axiosInstance.put(`/permission/${id}`, updatedData, {
            useAuth : true
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
    const token = localStorage.getItem('jwtToken');
    try {
        const response = await axiosInstance.post(`/save-permission`, apiData, {useAuth : true});
        return response.data;
    } catch (error) {

        if(error.response.status === 403){
            alert("등록 권한이 없어요.")
        }
    }
};

export const deleteApiPermission = async (id) => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    const token = localStorage.getItem('jwtToken');
    try {
        const response = await axiosInstance.delete(`/permission/${id}`, {useAuth : true});
        return response.data;
    } catch (error) {

        if(error.response.status === 403){
            alert("삭제 권한이 없어요.")
        }
        // throw error.response?.data || error;
    }
};

