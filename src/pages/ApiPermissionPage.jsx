import React, { useState, useEffect } from 'react';
import styles from '../style/ApiPermissionPage.module.css';
import { getPermissionList, updatePermissionInfo, createApiPermission, deleteApiPermission } from '../api/apiMngtApi';

const initialPermissions = [
    { id: 1, roles: ['ADMIN'], methods: ['GET'], path: '/users' },
    { id: 2, roles: ['MASTER', 'USER'], methods: ['POST', 'DELETE'], path: '/posts' },
];

const allRoles = ['MASTER', 'ADMIN', 'USER'];
const allMethods = ['GET', 'POST', 'PUT', 'DELETE'];

function ApiPermissionPage() {
    const [permissions, setPermissions] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({ roles: '', methods: '', path: '' });
    const [isUpdate, setIsUpdate] = useState(null);

    const fetchList = async() => {
        const response = await  getPermissionList();
        if(response.status === 200){
            const convertData = response.data.map((item,index) => ({
                id : item.id,
                roles: item.roles ? item.roles.split(",") : [],
                methods: item.methods ? item.methods.split(",") : [],
                path : item.path
            }))
            console.log("convertData:::", convertData);
            setPermissions(convertData);
        }
    }


    useEffect(() => {
        fetchList();
    }, []);



    const handleEdit = (item) => {

        setIsUpdate(true);
        setEditId(item.id);
        setEditData({ roles: item.roles, methods: item.methods, path: item.path });
    };

    const handleRoleChange = (role) => {
        setEditData((prev) => {
            const updated = prev.roles.includes(role)
                ? prev.roles.filter((r) => r !== role)
                : [...prev.roles, role];
            const sortedRoles = allRoles.filter((r) => updated.includes(r));

            return { ...prev, roles: sortedRoles };
        });
    };

    const handleMethodChange = (method) => {
        setEditData((prev) => {
            const updated = prev.methods.includes(method)
                ? prev.methods.filter((m) => m !== method)
                : [...prev.methods, method];

            const sortedMethods = allMethods.filter((r) => updated.includes(r));
            return { ...prev, methods: sortedMethods };
        });
    };

    const handleSave = async () => {

        const paramData ={
            methods : editData.methods.join(","),
            roles : editData.roles.join(","),
            path: editData.path
        }
        isUpdate ? await updatePermissionInfo(editId,paramData) : await createApiPermission(paramData);

        fetchList();

        setEditId(null);
    };

    const handleDelete = async (id) => {
        await deleteApiPermission (id);
        fetchList();
        // setPermissions((prev) => prev.filter((item) => item.id !== id));
    };

    const handleRegister = () => {
        setIsUpdate(false);
        const newId = permissions.length + 1;
        setPermissions([
            ...permissions,
            { id: newId, roles: [], methods: [], path: '' },
        ]);
        setEditId(newId);
        setEditData({ roles: [], methods: [], path: '' });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>API 권한 관리</h2>
                <button className={styles.registerBtn} onClick={handleRegister}>
                    등록
                </button>
            </div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>API주소</th>
                    <th>METHOD</th>
                    <th>권한</th>
                    <th>작업</th>
                </tr>
                </thead>
                <tbody>
                {permissions.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                            {editId === item.id ? (
                                <input
                                    className={styles.input}
                                    value={editData.path}
                                    onChange={(e) =>
                                        setEditData({ ...editData, path: e.target.value })
                                    }
                                />
                            ) : (
                                item.path
                            )}
                        </td>
                        <td>
                            {editId === item.id ? (
                                <div className={styles.checkboxGroup}>
                                    {allMethods.map((method) => (
                                        <label key={method}>
                                            <input
                                                type="checkbox"
                                                checked={editData.methods.includes(method)}
                                                onChange={() => handleMethodChange(method)}
                                            />
                                            {method}
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                item.methods.join(', ')
                            )}
                        </td>
                        <td>
                            {editId === item.id ? (
                                <div className={styles.checkboxGroup}>
                                    {allRoles.map((role) => (
                                        <label key={role}>
                                            <input
                                                type="checkbox"
                                                checked={editData.roles.includes(role)}
                                                onChange={() => handleRoleChange(role)}
                                            />
                                            {role}
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                item.roles.join(', ')
                            )}
                        </td>
                        <td>
                            {editId === item.id ? (
                                <button className={styles.saveBtn} onClick={handleSave}>
                                    저장
                                </button>
                            ) : (
                                <button className={styles.editBtn} onClick={() => handleEdit(item)}>
                                    수정
                                </button>
                            )}
                            <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>
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

export default ApiPermissionPage;
