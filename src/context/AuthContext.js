import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import token from '../helpers/token';
import useCreateApi from '../hooks/useCreateApi';
import { Role } from '../constants/roles/role';
import useFetchApi from '../hooks/useFetchApi';
import { message } from "antd";
import { loginPath, logoutPath, refreshTokenPath } from "../helpers/api-params/auth";
export const AuthContext = createContext({
    isAuthenticated: null,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    me: null,
    saveMe: () => { },
    isTeacher: false,
    isStudent: false,
    isPrincipal: false,
    isLibrarian: false,
    isUploadableDocument: false,
});
const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const loginApi = useCreateApi(loginPath);
    const logoutApi = useCreateApi(logoutPath);
    const refreshTokenApi = useFetchApi(refreshTokenPath);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [me, setMe] = useState(null);
    const saveMe = useCallback((data) => {
        setMe({
            id: data.id,
            username: data.username,
            email: data.email,
            name: data.name,
            gender: data.gender,
            ethnicity: data.ethnicity,
            dob: data.birthDate,
            teacher: data.teacher,
            student: data.student,
            librarian: data.librarian,
            class: data.class,
            role: data.roles[0].role.name,
        });
    }, [refreshTokenApi.data]);
    const login = useCallback(async (data, onSuccess, onError) => {
        try {
            const response = await loginApi.handleCreate(data);
            const { accessToken, user } = response?.result;
            message.success('Đăng nhập thành công!');
            console.log("user: ", user);
            saveMe(user);
            token.setAccessToken(accessToken);
            setIsAuthenticated(true);
            const role = user.roles[0].role.name;
            navigateRoleBasedPath(role);
            onSuccess?.();
        }
        catch (error) {
            onError?.(error);
            message.error(`Login error:', ${error.message}`);
        }
    }, [saveMe, navigate]);
    const navigateRoleBasedPath = (role) => {
        const rolePaths = {
            [Role.Teacher]: '/teacher/dashboard',
            [Role.Principal]: '/principal/dashboard',
            [Role.Student]: '/student/books',
            [Role.Librarian]: '/librarian/dashboard',
        };
        navigate(rolePaths[role] || '/');
    };
    const logout = useCallback(async () => {
        try {
            token.removeRefreshToken();
            await logoutApi.handleCreate({});
            console.log('Logout successful');
        }
        catch (error) {
            console.error('Logout failed:', error);
        }
        finally {
            token.removeAccessToken();
            setIsAuthenticated(false);
            setMe(null);
            navigate('/', { replace: true });
        }
    }, [navigate]);
    const loginWithToken = useCallback(async () => {
        try {
            await refreshTokenApi.fetchApi();
            saveMe(refreshTokenApi.data?.user);
            token.setAccessToken(refreshTokenApi.data?.accessToken);
            setIsAuthenticated(true);
        }
        catch (error) {
            token.removeAccessToken();
            setIsAuthenticated(false);
        }
    }, [saveMe]);
    useEffect(() => {
        if (!me) {
            loginWithToken().then(() => { }, () => { });
        }
    }, [loginWithToken, me]);
    const contextValue = useMemo(() => ({
        isAuthenticated,
        login,
        logout,
        me,
        saveMe,
        isTeacher: me?.role === Role.Teacher,
        isStudent: me?.role === Role.Student,
        isPrincipal: me?.role === Role.Principal,
        isLibrarian: me?.role === Role.Librarian,
        isUploadableDocument: me?.role === Role.Teacher || me?.role === Role.Librarian
    }), [isAuthenticated, login, logout, me, saveMe]);
    return _jsx(AuthContext.Provider, { value: contextValue, children: children });
};
export default AuthProvider;
