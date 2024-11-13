import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth.ts";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [savePassword, setSavePassword] = useState<boolean>(false);

  const {login} = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Vui lòng nhập đủ email, mật khẩu và chọn vai trò.');
      return;
    }

    await login({username: email, password})
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-screen ">
      <div className="flex shadow-lg rounded">
        <div className='flex w-96'>
          <img src="src/assets/logo/login.png" alt="Logo" />
        </div>
        <div className="bg-white p-8 rounded shadow-lg w-96">
          <div className="flex flex-col items-start ">
            <h3 className="text-lg font-medium text-blue-700">Xin chào !</h3>
            <p className="text-sm font-light text-gray-500">
              Bạn chưa có tài khoản? {''}
              <a onClick={() => navigate('/signup')} className="font-medium inline-flex text-xs sm:text-sm text-blue-700 hover:text-blue-600 hover:underline">
                Đăng ký
              </a>
            </p>
          </div>
          <h2 className="text-xl font-bold mb-3 text-center uppercase mt-3 text-blue-700">Đăng nhập</h2>

          <form onSubmit={handleLogin} className="form">
            <div className="mb-3">
              <label htmlFor="email" className="block text-gray-700 mb-1">Tên đăng nhập</label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="name@gmail.com"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="block text-gray-700 mb-1">Mật khẩu</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="••••••••••"
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <div className="flex items-center justify-between mb-3 mt-3">
              <label className="flex items-center text-xs sm:text-sm text-gray-500">
                <input
                  type="checkbox"
                  checked={savePassword}
                  onChange={() => setSavePassword(!savePassword)}
                  className="mr-2"
                />
                Nhớ mật khẩu
              </label>
              <a onClick={() => navigate('/forgotpassword')} className="inline-flex text-xs sm:text-sm text-blue-700 hover:text-blue-600 hover:underline">
                Quên mật khẩu?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Đăng nhập
            </button>
          </form>
          <div className="flex justify-center space-x-2 mt-3 mb-3">
            <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
            <span className="flex-none uppercase text-xs text-gray-400 font-semibold">or</span>
            <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
          </div>
          <div className='justify-center items-center'>
            <button className="bg-red-600 w-full text-white py-2 px-4 rounded hover:bg-red-500">
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
