import axiosInstance from '../api/axiosInstance';


const API_BASE_URL = 'http://localhost:8080/api';
// 로그인 요청
export const login = async (userId, password) => {


    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/login`, {
            userId,
            password,
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const token = response.headers['authorization']?.split(' ')[1]; // "Bearer <token>"에서 추출

        if (token) {
            localStorage.setItem('jwtToken', token); // 또는 sessionStorage
        }
        // return response.data; // 토큰이나 사용자 정보 반환
        await checkSession();

        return response;

    } catch (error) {
        // throw error.response?.data || error;
        alert("로그인 실패");
    }

};

// 로그아웃 요청 (토큰 필요 시 헤더에 포함)
export const jwtLogout = async (token) => {

    try {
        const response = await axiosInstance.post(
            `${API_BASE_URL}/logout`,
        );
        localStorage.removeItem('jwtToken');
        return response;
    } catch (error) {
        throw error.response?.data || error;
    }
};

//세션 기반 로그아웃
export const sesseionLogout = async (token) => {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/logout`)

        return response;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const checkSession = async () => {

    try {

        const response = await axiosInstance.get(`${API_BASE_URL}/session`, {
            useAuth: true
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
        const response = await axiosInstance.get(`${API_BASE_URL}/auth-check`, {
            useAuth : true
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
