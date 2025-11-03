import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/store/authSlice';
import styles from '../style/Header.module.css';
import {jwtLogout} from "../api/loginApi";
import {getRemainingTime} from "../js/utils/jwtUtils";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const [remainingTime, setRemainingTime] = useState(null);

    useEffect(() => {

        if (!token) return;

        const interval = setInterval(() => {
            const time = getRemainingTime(token);
            setRemainingTime(time);
        }, 1000); // 1초마다 갱신

        return () => clearInterval(interval);
    }, [token]);

    useEffect(() => {

        if( remainingTime ===0) {
            alert("세션이 만료되어 로그아웃합니다.");
            window.location.reload();
        }
    }, [navigate,remainingTime]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        const parts = [];
        if (h > 0) parts.push(`${h}시간`);
        if (m > 0) parts.push(`${m}분`);
        if (s > 0 || parts.length === 0) parts.push(`${s}초`);

        return parts.join(' ');
    };

    const handleLogout = async () => {
        await jwtLogout(dispatch,navigate);

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
                        <span className={styles.timer}>
                            세션 남은 시간: {formatTime(remainingTime)}
                        </span>
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
