import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from '../style/ResetPasswordConfirmPage.module.css';
import { validateEmailToken, updatePassword } from '../api/loginApi';

function ResetPasswordConfirmPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const [valid, setValid] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [matchMessage, setMatchMessage] = useState('');

    useEffect(() => {
        const validateToken = async () => {
            try {
                const res = await validateEmailToken(token);
                setValid(res.status === 200);
            } catch (err) {
                setValid(false);
            }
        };
        validateToken();
    }, [token]);

    useEffect(() => {
        if (!confirmPassword) {
            setMatchMessage('');
        } else if (newPassword === confirmPassword) {
            setMatchMessage('✅ 비밀번호가 일치합니다.');
        } else {
            setMatchMessage('❌ 비밀번호가 일치하지 않습니다.');
        }
    }, [newPassword, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updatePassword(token, newPassword);
            if (res.status === 200) {
                setMessage('비밀번호 변경 완료되었습니다.');
            } else {
                setMessage('비밀번호 변경에 실패했습니다.');
            }
        } catch (err) {
            setMessage('비밀번호 변경에 실패했습니다.');
        }
    };

    if (valid === null) return <div className={styles.loading}>로딩 중...</div>;
    if (valid === false) return <div className={styles.error}>토큰이 유효하지 않습니다.</div>;

    return (
        <div className={styles.container}>
            {message ? (
                <div className={styles.success}>
                    <p>{message}</p>
                    <button className={styles.homeBtn} onClick={() => navigate('/')}>
                        홈으로 가기
                    </button>
                </div>
            ) : (
                <>
                    <h2 className={styles.title}>비밀번호 재설정</h2>
                    <form onSubmit={handleSubmit}>
                        <label className={styles.label}>새 비밀번호</label>
                        <input
                            className={styles.input}
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />

                        <label className={styles.label}>비밀번호 확인</label>
                        <input
                            className={styles.input}
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <p className={styles.matchMessage}>{matchMessage}</p>

                        <button
                            className={styles.button}
                            type="submit"
                            disabled={newPassword !== confirmPassword || !newPassword}
                        >
                            변경하기
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}

export default ResetPasswordConfirmPage;
