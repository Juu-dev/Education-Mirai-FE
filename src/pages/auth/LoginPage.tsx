import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { Role } from '../../constants/roles/routes';

const Login: React.FC = () => {
  const { setRole } = useRole();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [currentRole, setCurrentRole] = useState<Role | undefined>(undefined);
  const [error, setError] = useState<string>('');

  const validEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !currentRole) {
      setError('Vui lòng nhập đủ email, mật khẩu và chọn vai trò.');
      return;
    }

    if (!validEmail(email)) {
      setError('Email không hợp lệ.');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    setRole(currentRole);
    console.log('Role:', currentRole);
    if (currentRole === Role.Admin) {
      navigate('/admin/dashboard');
    } else if (currentRole === Role.User) {
      navigate('/user/books');
    } else if (currentRole === Role.Librarian) {
      navigate('/librarian/dashboard');
    }
  };

  // //   useEffect(() => {
  // //     const savedRole = localStorage.getItem('role');
  // //     if (savedRole) {
  // //       if (savedRole === Role.Admin) {
  // //         navigate('/admin');
  // //       } else if (savedRole === Role.User) {
  // //         navigate('/user');
  // //       } else if (savedRole === Role.Librarian) {
  // //         navigate('/librarian');
  // //       }
  // //     }
  // //   }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center uppercase">Login to your acccount</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Role</label>
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value as Role)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>Choose a role</option>
            <option value={Role.Admin}>Admin</option>
            <option value={Role.User}>User</option>
            <option value={Role.Librarian}>Librarian</option>
          </select>
        </div>

        <form onSubmit={handleLogin} className="form">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">E-mail Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <div className="flex items-center mb-3 -mt-3">
            <div className="flex ml-auto p-2">
              <a onClick={() => navigate('/forgotpassword')} className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700 hover:underline">Forgot Password?</a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="flex justify-center items-center mt-6">
          <a onClick={() => navigate('/signup')} target="_blank" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
            <span>
              <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </span>
            <span className="ml-2">You don't have an account?</span>
          </a>
        </div>  
      </div>
    </div>
  );
};

export default Login;
