import { AxiosError } from 'axios';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import token from '../helpers/token';
import useCreateApi from '../hooks/useCreateApi';
import { Role } from '../constants/roles/role.ts';
import useFetchApi from '../hooks/useFetchApi';
import {message} from "antd";
import {loginPath, logoutPath, refreshTokenPath} from "../helpers/api-params/auth.ts";

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  dob: string;
  ethnicity: string;
  gender: string;
  teacher?: {
    id: string;
    userId: string;
    classId: string;
    metadataUrl: string;
    dob: string;
    position: string;
    createdAt: string;
    updatedAt: string;

  };
  librarian?: object;
  student?: object;
  class: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    _count: {
      user: number
    }
  }
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
  isUploadableDocument: boolean
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
  isUploadableDocument: false,
});

interface IAuthProviderProps {
  children?: React.ReactNode;
}

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const loginApi = useCreateApi(loginPath);
  const logoutApi = useCreateApi(logoutPath);
  const refreshTokenApi = useFetchApi(refreshTokenPath);

  const [isAuthenticated, setIsAuthenticated] = useState<IAuthContext['isAuthenticated']>(null);
  const [me, setMe] = useState<User | null>(null);

  const saveMe = useCallback((data: any) => {
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

  const login: IAuthContext['login'] = useCallback(
      async (data: LoginData, onSuccess, onError) => {
        try {
          const response = await loginApi.handleCreate(data);
          const { accessToken, user } = response?.result;
          message.success('Đăng nhập thành công!')

          console.log("user: ", user)

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
      await logoutApi.handleCreate({});
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
      await refreshTokenApi.fetchApi();

      saveMe(refreshTokenApi.data?.user as User);
      token.setAccessToken(refreshTokenApi.data?.accessToken);
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
        isUploadableDocument: me?.role === Role.Teacher || me?.role === Role.Librarian
      }),
      [isAuthenticated, login, logout, me, saveMe]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
