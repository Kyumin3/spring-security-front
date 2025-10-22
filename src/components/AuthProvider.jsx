// components/AuthProvider.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../redux/store/authSlice';
import { checkSession } from '../api/loginApi';

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        checkSession().then(res => {
            if (res?.status === 200) {
                dispatch(loginSuccess({
                    username: res.data.username,
                    roles: res.data.roles
                }));
            } else {
                dispatch(logout());
            }
        });
    }, [dispatch]);

    return children;
};

export default AuthProvider;
