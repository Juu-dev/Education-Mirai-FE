import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import token from '../helpers/token';
import useCreateApi from '../hooks/useCreateApi';
import { Role } from '../constants/roles/role';
import { loginPath, logoutPath } from "../helpers/api-params/auth";
import { message } from "antd";
import useFetchApi from "../hooks/useFetchApi";
export const AuthContext = createContext({
    isAuthenticated: null,
    login_CallFromUI: () => Promise.resolve(),
    logout_CallFromUI: () => Promise.resolve(),
    me: null,
    setMe: () => {
    },
    isTeacher: false,
    isStudent: false,
    isPrincipal: false,
    isLibrarian: false,
    isUploadableDocument: false,
});
const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [me, setMe] = useState(null);
    // const navigateRoleBasedPath = (role: Role) => {
    //     const rolePaths = {
    //         [Role.Teacher]: '/teacher/dashboard',
    //         [Role.Principal]: '/principal/dashboard',
    //         [Role.Student]: '/student/books',
    //         [Role.Librarian]: '/librarian/dashboard',
    //     };
    //     navigate(rolePaths[role] || '/');
    // };
    // =======================
    // LOGIN
    // =======================
    const loginApi = useCreateApi(loginPath);
    const login_CallFromUI = useCallback(async (data) => {
        const handleSuccess = (response) => {
            const { accessToken, user } = response?.result;
            // save token and user
            setMe({
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                gender: user.gender,
                ethnicity: user.ethnicity,
                dob: user.birthDate,
                teacher: user.teacher,
                student: user.student,
                librarian: user.librarian,
                class: user.class,
                role: user.roles[0].role.name
            });
            token.setAccessToken(accessToken);
            setIsAuthenticated(true);
            // redirect
            const role = user.roles[0].role.name;
            // navigateRoleBasedPath(role);
            navigate("/teacher/dashboard");
            message.success("Đăng nhập thành công!");
        };
        const handleError = (response) => {
            message.error("Đăng nhập thất bại!");
        };
        await loginApi.handleCreate(data, handleSuccess, handleError);
    }, [navigate]);
    // =======================
    // GET ME
    // =======================
    const getMeApi = useFetchApi({ url: "/auth/get-me", auth: true, initLoad: false });
    useEffect(() => {
        const data = getMeApi.data;
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
            role: data.roles?.[0]?.role?.name,
        });
    }, [getMeApi.data]);
    useEffect(() => {
        const fetchMe = async () => {
            if (!me && !!token.getAccessToken()) {
                await getMeApi.fetchApi();
            }
        };
        fetchMe();
    }, []);
    // =======================
    // LOGOUT
    // =======================
    const logoutApi = useCreateApi(logoutPath);
    const logout_CallFromUI = useCallback(async () => {
        const handleSuccess = (response) => {
            token.removeAccessToken();
            setIsAuthenticated(false);
            setMe(null);
            navigate('/', { replace: true });
            message.success("Đăng xuất thành công!");
        };
        const handleError = (response) => {
            message.error("Đăng xuất thất bại!");
        };
        await logoutApi.handleCreate({}, handleSuccess, handleError);
    }, [navigate]);
    // =======================
    // CONTEXT
    // =======================
    const contextValue = useMemo(() => ({
        isAuthenticated,
        login_CallFromUI,
        logout_CallFromUI,
        me,
        setMe,
        isTeacher: me?.role === Role.Teacher,
        isStudent: me?.role === Role.Student,
        isPrincipal: me?.role === Role.Principal,
        isLibrarian: me?.role === Role.Librarian,
        isUploadableDocument: me?.role === Role.Teacher || me?.role === Role.Librarian
    }), [isAuthenticated, login_CallFromUI, logout_CallFromUI, me, setMe]);
    return _jsx(AuthContext.Provider, { value: contextValue, children: children });
};
export default AuthProvider;
