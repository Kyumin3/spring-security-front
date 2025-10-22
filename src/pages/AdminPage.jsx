import React, { useEffect, useState } from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import { checkSession } from "../api/loginApi";
import styles from '../style/AdminPage.module.css';

function AdminPage() {
    const navigate = useNavigate();

    // 인증된 사용자만 렌더링
    return (
        <div className={styles.container}>
            <div className={styles.title}>ADMIN 관리페이지</div>
            <button className={styles.button} onClick={() => navigate('/admin/user')}>회원관리</button>
            <button className={styles.button} onClick={() => navigate('/admin/role')}>권한관리</button>
            {/*<Outlet />*/}
        </div>
    );
}

export default AdminPage;
