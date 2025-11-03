// components/AuthProvider.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../redux/store/authSlice';
import { checkSession } from '../api/loginApi';

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        checkSession(dispatch).then(res => {
        });
    }, [dispatch]);

    return children;
};

export default AuthProvider;
