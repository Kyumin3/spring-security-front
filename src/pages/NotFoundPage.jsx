import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style/NotFoundPage.module.css';

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404 - 페이지를 찾을 수 없습니다</h1>
            <p className={styles.message}>
                요청하신 페이지가 존재하지 않거나 이동되었어요.
            </p>
            <button className={styles.button} onClick={() => navigate('/')}>
                홈으로 돌아가기
            </button>
        </div>
    );
}

export default NotFoundPage;
