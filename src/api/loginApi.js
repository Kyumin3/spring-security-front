import axiosInstance from '../api/axiosInstance';
import {loginSuccess, logout} from "../redux/store/authSlice";

// 로그인 요청
export const login = async (userId, password) => {


    try {
        const response = await axiosInstance.post(`/login`, {
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
export const jwtLogout = async (dispatch,navigate) => {
    try {
        const response = await axiosInstance.post(
            `/logout`,
        );
        localStorage.removeItem('jwtToken');
        if (response.status === 200) {
            dispatch(logout());
            navigate('/');
        }
        return response;
    } catch (error) {
        throw error.response?.data || error;
    }
};

//세션 기반 로그아웃
export const sesseionLogout = async (token) => {
    try {
        const response = await axiosInstance.post(`/logout`)

        return response;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const checkSession = async (dispatch) => {

    try {
        const response = await axiosInstance.get(`/session`, {
            useAuth: true
        })
        if (response?.status === 200) {
            const token = response.headers['authorization']?.split(' ')[1];
            localStorage.setItem('jwtToken', token);
            dispatch(loginSuccess(
                {
                    userData : {
                        username: response.data?.username,
                        roles: response.data?.roles.map(role => role.replace("ROLE_", ""))
                    },
                    token: token
                }
            ));
        } else {
            dispatch(logout());
        }
        return response;
    } catch (error) {
        // throw error.response?.data || error;
        return error.response;
    }
};

export const sendResetEmail = async (email) => {
    try {
        return await axiosInstance.post(`/reset-password/request`, { email });
    } catch (error) {
        return { status: 500 };
    }
};

export const validateEmailToken = async (token) => {
    try {
        return await axiosInstance.post(`/reset-password/validate`, { token });
    } catch (error) {
        return { status: 500 };
    }
};

export const updatePassword = async (token, newPassword) => {
    try {
        return await axiosInstance.post(`/reset-password/update`, {
            token,
            newPassword
        });
    } catch (error) {
        return { status: 500 };
    }
};



// 로그인 상태 확인 (예: 토큰 유효성 검사)
export const checkAuth = async (token) => {
    try {
        const response = await axiosInstance.get(`/auth-check`, {
            useAuth : true
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
