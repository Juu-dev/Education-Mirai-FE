import { AxiosError } from 'axios';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import token from '../helpers/token';
import useCreateApi from '../hooks/useCreateApi';
import { Role } from '../constants/roles/role.ts';
import useFetchApi from '../hooks/useFetchApi';
import {message} from "antd";

interface User {
  id: string;
  username: string;
  email: string;
  teacher?: {
    id: string;
    userId: string;
    classId: string;
    metadataUrl: string;
    name: string;
    dob: string;
    position: string;
    createdAt: string;
    updatedAt: string;
    class: {
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    }
  };
  student?: object;
  role: string;
}

interface LoginData {
  username: string;
  password: string;
}

interface IAuthContext {
  isAuthenticated: boolean | null;
  login: (
      data: LoginData,
      onSuccess?: () => void,
      onError?: (error: AxiosError<unknown>) => void,
  ) => Promise<void>;
  logout: () => Promise<void>;
  me: User | null;
  saveMe: (data: User) => void;
  isTeacher: boolean,
  isStudent: boolean,
  isPrincipal: boolean,
  isLibrarian: boolean,
}

interface IAuthProviderProps {
  children?: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  me: null,
  saveMe: () => {},
  isTeacher: false,
  isStudent: false,
  isPrincipal: false,
  isLibrarian: false,
});

interface IAuthProviderProps {
  children?: React.ReactNode;
}

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const { handleCreate: loginApi } = useCreateApi({ url: '/auth/login', fullResp: true, isWithCredentials: true });
  const { handleCreate: logoutApi } = useCreateApi({ url: '/auth/logout' });
  const { data: refreshData, fetchApi: refreshTokenApi } = useFetchApi({ url: '/auth/refresh-token', isWithCredentials: true });

  const [isAuthenticated, setIsAuthenticated] = useState<IAuthContext['isAuthenticated']>(null);
  const [me, setMe] = useState<User | null>(null);

  const saveMe = useCallback((data: any) => {
    setMe({
      id: data.id,
      username: data.username,
      email: data.email,
      teacher: data.Teacher,
      student: data.Student,
      role: data.roles[0].role.name,
    });
  }, [refreshData]);

  const login: IAuthContext['login'] = useCallback(
      async (data: LoginData, onSuccess, onError) => {
        try {
          const response = await loginApi(data);
          const { accessToken, user } = response?.result;
          message.success('Đăng nhập thành công!')

          saveMe(user as User);
          token.setAccessToken(accessToken);
          setIsAuthenticated(true);

          const role = user.roles[0].role.name;
          navigateRoleBasedPath(role);

          onSuccess?.();
        } catch (error) {
          onError?.(error as AxiosError<unknown>);
          message.error(`Login error:', ${(error as AxiosError).message}`)
        }
      },
      [saveMe, navigate]
  );

  const navigateRoleBasedPath = (role: Role) => {
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
      await logoutApi({});
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      token.removeAccessToken();
      setIsAuthenticated(false);
      setMe(null);
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const loginWithToken = useCallback(async () => {
    try {
      await refreshTokenApi();

      saveMe(refreshData?.user as User);
      token.setAccessToken(refreshData?.accessToken);
      setIsAuthenticated(true);
    } catch (error) {
      token.removeAccessToken();
      setIsAuthenticated(false);
    }
  }, [saveMe]);

  useEffect(() => {
    if (!me) {
      loginWithToken().then(
          () => {},
          () => {},
      );
    }
  }, [loginWithToken, me]);

  const contextValue = useMemo(
      () => ({
        isAuthenticated,
        login,
        logout,
        me,
        saveMe,
        isTeacher: me?.role === Role.Teacher,
        isStudent: me?.role === Role.Student,
        isPrincipal: me?.role === Role.Principal,
        isLibrarian: me?.role === Role.Librarian,
      }),
      [isAuthenticated, login, logout, me, saveMe]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
