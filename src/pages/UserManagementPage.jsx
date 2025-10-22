import React, { useState, useEffect } from 'react';
import styles from '../style/UserManagementPage.module.css';
import {getUserList, updateUserRole} from "../api/userApi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../redux/store/authSlice';
import {useNavigate} from "react-router-dom";

// const initialUsers = [
//     { no: 1, userId: 'user1', roles: ['MASTER'] },
//     { no: 2, userId: 'user2', roles: ['ADMIN'] },
//     { no: 3, userId: 'user3', roles: ['ADMIN', 'USER'] },
// ];

const allRoles = ["MASTER", "ADMIN", "USER"];

function UserManagementPage() {
    const [users, setUsers] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({ userId: '', roles: '' });

    const dispatch =useDispatch();
    const navigate =useNavigate();

    const fetchUsers = async () => {
        try {
            const res = await getUserList(); // ✅ 반드시 await 필요
            setUsers(
                res.data.map((user, index) => ({
                    no: index + 1,
                    userId: user.userId,
                    roles: user.role ? user.role?.split(",") : []
                }))
            );
        } catch (err) {
            console.error("에러 발생:", err);
        }
    };

    const fetchUpdateRole = async () => {
        try {
            const res = await updateUserRole(editData.userId,editData.roles.join());
            if(res.status === 200 && res.data.isLoggedOut) {
                dispatch(logout());
                alert("MASTER권한이 제거되어 로그아웃합니다.")
                navigate("/"); // 홈으로 이동
            } else if(res.status === 403){
                alert("수정 권한이 없어요");
            }

        } catch (err) {
            console.error("에러 발생:", err);
        }
    };

    useEffect(() => {

        fetchUsers();
        // console.log("Res:::",res);
    }, []);

    const handleEdit = (user) => {

        setEditId(user.userId);
        setEditData({ userId: user.userId, roles: user.roles });
    };

    const handleRoleChange = (role) => {

        setEditData((prev) => {
            const updatedRoles = prev.roles.includes(role)
                ? prev.roles.filter((r) => r !== role)
                : [...prev.roles, role];

            const sortedRoles = allRoles.filter((r) => updatedRoles.includes(r));

            return { ...prev, roles: sortedRoles };
        });
    };

    const handleSave = async () => {
        await fetchUpdateRole();
        await fetchUsers();
        setEditId(null);
    };

    const handleDelete = (userId) => {
        setUsers((prev) => prev.filter((user) => user.userId !== userId));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>회원관리 페이지</h2>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>순서</th>
                    <th>아이디</th>
                    <th>권한</th>
                    <th>작업</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={user.no}>
                        <td>{index + 1}</td>
                        <td>
                            {/*{editId === user.userId ? (*/}
                            {/*    <input*/}
                            {/*        value={editData.userId}*/}
                            {/*        onChange={(e) =>*/}
                            {/*            setEditData({ ...editData, userId: e.target.value })*/}
                            {/*        }*/}
                            {/*    />*/}
                            {/*) : (*/}
                            {/*    user.userId*/}
                            {/*)}*/}
                            {user.userId}
                        </td>
                        <td>
                            {editId === user.userId ? (
                                <div className={styles.checkboxGroup}>
                                    {allRoles.map((role) => (
                                        <label key={role}>
                                            <input
                                                type="checkbox"
                                                checked={editData.roles?.includes(role)}
                                                onChange={() => handleRoleChange(role)}
                                            />
                                            {role}
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                user.roles?.join(', ')
                            )}
                        </td>
                        <td>
                            {editId === user.userId ? (
                                <button className={styles.saveBtn} onClick={handleSave}>
                                    저장
                                </button>
                            ) : (
                                <button className={styles.editBtn} onClick={() => handleEdit(user)}>
                                    수정
                                </button>
                            )}
                            <button className={styles.deleteBtn} onClick={() => handleDelete(user.userId)}>
                                삭제
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserManagementPage;
