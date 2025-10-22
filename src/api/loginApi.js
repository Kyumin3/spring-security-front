// src/api/auth.js
import axios from 'axios';
import {useNavigation} from "react-router-dom";


const API_BASE_URL = 'http://localhost:8080/api';
// 로그인 요청
export const login = async (userId, password) => {


    try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
            userId,
            password,
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true // ✅ 꼭 있어야 함
        });
        // return response.data; // 토큰이나 사용자 정보 반환
        await checkSession();
        return response;

    } catch (error) {
        // throw error.response?.data || error;
        alert("로그인 실패");
    }

};

// 로그아웃 요청 (토큰 필요 시 헤더에 포함)
export const logout = async (token) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

//세션 기반 로그아웃
export const sesseionLogout = async (token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/logout`, {},{
            withCredentials: true // 세션 기반 인증 시 필수
        }
        )

        return response;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const checkSession = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/session`, {
            withCredentials: true // 세션 기반 인증 시 필수
        })

        return response;
    } catch (error) {
        // throw error.response?.data || error;
        return error.response;
    }
};





// 로그인 상태 확인 (예: 토큰 유효성 검사)
export const checkAuth = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth-check`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
