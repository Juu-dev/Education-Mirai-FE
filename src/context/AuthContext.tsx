import { AxiosError } from 'axios';
import React, {createContext, useCallback, useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import token from "../helpers/token.ts";
import useCreateApi from "../hooks/useCreateApi.ts";

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

  const [isAuthenticated, setIsAuthenticated] = useState<IAuthContext['isAuthenticated']>(null);
  const [me, setMe] = useState(null);

  useEffect(() => {
    console.log("me change: ", me)
  }, [me])

  const saveMe = useCallback(
    (data: any) => {
      const me = {
        id: data.id,
        username: data.username,
        email: data.email,
        teacher: data.Teacher,
        student: data.Student,
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
        navigate('/admin/dashboard', { replace: true });
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
      await logoutApi();
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

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
