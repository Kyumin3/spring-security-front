import React, { useState } from 'react';
import { login } from "../api/loginApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/store/authSlice';
import styles from '../style/LoginPage.module.css';

function LoginPage() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const dispatch = useDispatch();

    const gogoLogin = async (e) => {
        e.preventDefault();
        const res = await login(userId, password);

        if (res && res.status === 200) {

            const userData = res.data.userData;
            const token = res.headers['authorization']?.split(' ')[1];
            dispatch(loginSuccess({
                userData: userData,
                token: token
            }));
            navigate("/");
        } else {
            setErrorMsg('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>로그인</h2>
            {errorMsg && <div className={styles.error}>{errorMsg}</div>}
            <form onSubmit={gogoLogin}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>아이디</label>
                    <input
                        className={styles.input}
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>비밀번호</label>
                    <input
                        className={styles.input}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className={styles.button} type="submit">로그인</button>
            </form>

            {/* 회원가입 버튼 추가 */}
            <div className={styles.signupContainer}>
                <span>계정이 없으신가요?</span>
                <button className={styles.signupBtn} onClick={() => navigate('/regist')}>
                    회원가입
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
