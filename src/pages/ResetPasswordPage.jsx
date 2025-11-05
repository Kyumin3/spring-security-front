import React, { useState } from 'react';
import styles from '../style/ResetPasswordPage.module.css';
import { sendResetEmail } from '../api/loginApi';

function ResetPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await sendResetEmail(email);
        if (res.status === 200) {
            setMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
        } else {
            setMessage('이메일 전송에 실패했습니다. 다시 시도해주세요.');
        }
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>비밀번호 재설정</h2>

            <div className={loading ? styles.dimmed : ''}>
                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>가입한 이메일 주소</label>
                    <input
                        className={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button className={styles.button} type="submit" disabled={loading}>
                        재설정 링크 보내기
                    </button>
                </form>
                {message && <p className={styles.message}>{message}</p>}
            </div>

            {loading && (
                <div className={styles.loaderOverlay}>
                    <div className={styles.spinner}></div>
                </div>
            )}
        </div>
    );
}

export default ResetPasswordPage;
