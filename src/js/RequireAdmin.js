// components/RequireAdmin.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkSession } from '../api/loginApi';
import { useDispatch } from 'react-redux';

export default function RequireAdmin({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const validateSession = async () => {
            try {
                const response = await checkSession(dispatch);
                const isAdmin = response.status === 200 &&
                    response.data.username &&
                    ["ROLE_ADMIN", "ROLE_MASTER"].some(role => response.data.roles.includes(role));

                if (isAdmin) {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                    alert("관리자만 접근 가능합니다.");
                    navigate("/");
                }
            } catch (err) {
                setIsAuthorized(false);
                alert("세션이 만료되었거나 인증되지 않았습니다.");
                navigate("/");
            }
        };

        validateSession();
    }, [navigate]);

    if (isAuthorized === null) return null;

    return children;
}
