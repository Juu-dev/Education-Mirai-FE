import { AxiosError } from 'axios';
import React, {createContext, useCallback, useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import token from "../helpers/token.ts";
import useCreateApi from "../hooks/useCreateApi.ts";
import {Role} from "../constants/roles/routes.ts";
import useFetchApi from "../hooks/useFetchApi.ts";

interface IAuthContext {
  isAuthenticated: boolean | null;
  login: (
    _data: { username: string; password: string },
    _onSuccess?: () => void,
    _onError?: (_error: AxiosError<any>) => void,
  ) => Promise<void>;
  logout: () => Promise<void>;
  me: any;
  saveMe: any
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  me: null,
  saveMe: () => {},
});

interface IAuthProviderProps {
  children?: React.ReactNode;
}

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }: any) => {
  const navigate = useNavigate();

  const {handleCreate: loginApi} = useCreateApi({url: "/auth/login", fullResp: true})
  const {handleCreate: logoutApi} = useCreateApi({url: "/auth/logout"})
  const {fetchApi: refreshTokenApi} = useFetchApi({url: "/auth/refresh-token"})

  const [isAuthenticated, setIsAuthenticated] = useState<IAuthContext['isAuthenticated']>(null);
  const [me, setMe] = useState(null);

  const saveMe = useCallback(
    (data: any) => {
      const me: any = {
        id: data.id,
        username: data.username,
        email: data.email,
        teacher: data.Teacher,
        student: data.Student,
        role: data.roles[0].role.name
      };

      setMe(me);
    },
    [],
  );

  const login: IAuthContext['login'] = useCallback(
    async (data, onSuccess, onError) => {
      try {
        const response = await loginApi(data);

        // eslint-disable-next-line no-unsafe-optional-chaining
        const { accessToken, user } = response?.result;
        saveMe(user);

        token.setAccessToken(accessToken);

        setIsAuthenticated(true);

        onSuccess?.();
        const role = user?.roles[0].role.name;
        console.log(role, role === Role.Teacher);
        navigate('/teacher/dashboard')
        if (role === Role.Teacher) {
          navigate('/teacher/dashboard');
        } else if (role === Role.Principal) {
          navigate('/principal/dashboard');
        } else if (role === Role.Student) {
          navigate('/user/books');
        } else if (role === Role.Librarian) {
          navigate('/librarian/dashboard');
        }
      } catch (error: any) {
        if (onError) onError?.(error as AxiosError<any>);
        console.log("login error api: ", error.message);
      }
    },
    [saveMe, navigate],
  );

  const logout = useCallback(async () => {
    try {
      token.removeRefreshToken();
      await logoutApi({});
      console.log('Đăng xuất thành công');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      console.log('Sign out failed');
    } finally {
      token.removeAccessToken();
      setIsAuthenticated(false);
      setMe(null);
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      me,
      saveMe,
    }),
    [isAuthenticated, login, logout, me, saveMe],
  );

  const loginWithToken = useCallback(async () => {
    try {
      const response: any = await refreshTokenApi();

      // eslint-disable-next-line no-unsafe-optional-chaining
      const { accessToken, user } = response?.result?.data;

      saveMe(user);

      token.setAccessToken(accessToken);

      setIsAuthenticated(true);
    } catch (error) {
      token.removeAccessToken();
      setIsAuthenticated(false);
    }
  }, [saveMe]);

  useEffect(() => {
    if (me === null)
      loginWithToken().then(
          () => {},
          () => {},
      );
  }, [loginWithToken, me]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
