import React, { useState, useEffect } from 'react';
import styles from '../style/RegisterPage.module.css';
import { checkUserId, createUser,checkEmail } from '../api/userApi';
import {useNavigate} from "react-router-dom";

function RegisterPage() {
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [isDuplicate, setIsDuplicate] = useState(null);
    const [isEmailDuplicate, setIsEmailDuplicate] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState(null);
    const [isValidated, setIsValidated] = useState(false);

    const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const navigate = useNavigate();
    // 아이디 중복 체크
    useEffect(() => {

        const checkDuplicate = async () => {
            if (!userId) {

                setIsDuplicate(null);
                return;
            }
            try {
                if(regex.test(userId)){
                    const res = await checkUserId(userId);
                    setIsDuplicate(res.data.isDuplicate);
                }

            } catch (err) {

                setIsDuplicate(null);
            }
        };

        const debounce = setTimeout(checkDuplicate, 500);
        return () => clearTimeout(debounce);
    }, [userId]);

    useEffect(() => {

        const checkDuplicate = async () => {
            if (!email) {

                setIsEmailDuplicate(null);
                return;
            }
            try {
                if(emailRegex.test(email)){
                    const res = await checkEmail(email);
                    setIsEmailDuplicate(res.data.isDuplicate);
                }

            } catch (err) {

                setIsEmailDuplicate(null);
            }
        };

        const debounce = setTimeout(checkDuplicate, 500);
        return () => clearTimeout(debounce);
    }, [email]);

    // 비밀번호 일치 여부 실시간 체크
    useEffect(() => {
        if (!password || !confirmPassword) {
            setIsPasswordMatch(null);
        } else {
            setIsPasswordMatch(password === confirmPassword);
        }
    }, [password, confirmPassword]);

    useEffect(() => {
        (isDuplicate === false && isEmailDuplicate===false && isPasswordMatch)? setIsValidated(true) : setIsValidated(false);
    }, [isDuplicate, isPasswordMatch, isEmailDuplicate]);


    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!isPasswordMatch) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        const response = await createUser({
            userId : userId, password :password, email:email
        });
        if(response.status === 'success'){
            alert("가입완료")
            navigate("/");
        } else {
            alert("서버에러")
        }

    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>아이디</label>
                    <input
                        className={styles.input}
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                    {userId && !regex.test(userId) === true && (
                        <div className={styles.warning}>영문 및 숫자만 입력해주세요.</div>
                    )}
                    {regex.test(userId) && isDuplicate === true && (
                        <div className={styles.warning}>이미 사용 중인 아이디입니다.</div>
                    )}
                    {regex.test(userId) && isDuplicate === false && (
                        <div className={styles.success}>사용 가능한 아이디입니다.</div>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>이메일</label>
                    <input
                        className={styles.input}
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {email && !emailRegex.test(email) === true && (
                        <div className={styles.warning}>이메일 형식에 맞게 입력해주세요.</div>
                    )}
                    {emailRegex.test(email) && isEmailDuplicate === true && (
                        <div className={styles.warning}>이미 사용 중인 이메일입니다.</div>
                    )}
                    {emailRegex.test(email) && isEmailDuplicate === false && (
                        <div className={styles.success}>사용 가능한 이메일입니다.</div>
                    )}
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
                <div className={styles.formGroup}>
                    <label className={styles.label}>비밀번호 확인</label>
                    <input
                        className={styles.input}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {isPasswordMatch === false && (
                        <div className={styles.warning}>비밀번호가 일치하지 않습니다.</div>
                    )}
                    {isPasswordMatch === true && (
                        <div className={styles.success}>비밀번호가 일치합니다.</div>
                    )}
                </div>
                <button className={styles.button} type="submit" disabled={!isValidated}>회원가입</button>
            </form>
        </div>
    );
}

export default RegisterPage;
