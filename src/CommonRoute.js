import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import AuthProvider from "./components/AuthProvider";
import UserManagementPage from "./pages/UserManagementPage";
import RequireAdmin from "./js/RequireAdmin";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import ApiPermissionPage from "./pages/ApiPermissionPage";
import Layout from "../src/components/Layout";

export default function CommonRoute() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout><Outlet /></Layout>}>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/regist" element={<RegisterPage />} />
                        <Route
                            path="/admin"
                            element={
                                <RequireAdmin>
                                    <Outlet />
                                </RequireAdmin>
                            }
                        >
                            <Route index element={<AdminPage />} />
                            <Route path="user" element={<UserManagementPage />} />
                            <Route path="role" element={<ApiPermissionPage />} />
                        </Route>
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
