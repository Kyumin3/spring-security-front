import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { sesseionLogout, jwtLogout ,checkSession } from "../api/loginApi";
import { api1, api2 } from "../api/testApi";
import { logout } from '../redux/store/authSlice';
import { useNavigate } from "react-router-dom";
import styles from '../style/Home.module.css';

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const handleLogout = async () => {
        const res = await jwtLogout();
        if (res.status === 200) {
            dispatch(logout());
        }
    };

    const moveToAdmin = async() => {
        const response = await checkSession();
        if(response.status === 200 &&  response.data.username && ["ROLE_ADMIN", "ROLE_MASTER"].some(role => response.data.roles.includes(role))  ) {
            navigate("/admin")
        } else {
            alert("인증된 사용자만 이용가능합니다.");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>홈화면이에요</div>
            {!isLoggedIn ? (
                <button className={styles.button} onClick={() => navigate('/login')}>로그인</button>
            ) : (
                <button className={`${styles.button} ${styles.logoutButton}`} onClick={handleLogout}>로그아웃</button>
            )}
            <button className={styles.button} onClick={moveToAdmin}>관리자 페이지</button>
            {/*<button className={styles.button} onClick={api1}>api1</button>*/}
            {/*<button className={styles.button} onClick={api2}>api2</button>*/}
        </div>
    );
}

export default Home;
