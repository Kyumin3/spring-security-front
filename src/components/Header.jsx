import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/store/authSlice';
import styles from '../style/Header.module.css';
import {sesseionLogout, jwtLogout} from "../api/loginApi";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);

    const handleLogout = async () => {
        const res = await jwtLogout();

        if (res.status === 200) {
            dispatch(logout());
            navigate('/');
        }

    };

    return (
        <header className={styles.header}>
            <div className={styles.logo} onClick={() => navigate('/')}>
                MyApp
            </div>
            <div className={styles.userInfo}>
                {!isLoggedIn ? (
                    <button className={styles.loginBtn} onClick={() => navigate('/login')}>
                        로그인
                    </button>
                ) : (
                    <div className={styles.loggedIn}>
                        <span className={styles.username}>{user?.username}</span>
                        <span className={styles.roles}>{user?.roles?.join(', ')}</span>
                        <button className={styles.logoutBtn} onClick={handleLogout}>
                            로그아웃
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
