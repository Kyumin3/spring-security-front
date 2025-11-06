// src/api/auth.js
import axios from 'axios';

// 로그인 요청
export const api1 = async () => {
    try {
        const response = await axios.get(`/api1`, {
            withCredentials: true
        });
        return response;
    } catch (error) {

    }
};

export const api2 = async (username, password) => {


    try {
        const response = await axios.get(`/api2`,{
            withCredentials: true
        });
        // return response.data;
        return response;
    } catch (error) {

    }

};





