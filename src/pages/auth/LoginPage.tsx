import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { Role } from '../../constants/roles/routes';

const Login: React.FC = () => {
  const { setRole } = useRole();
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState<Role>()

  const handleLogin = (role: Role) => {
    setRole(role);
    console.log('Role:', role);
    if (role === Role.Admin) {
      navigate('/admin/dashboard');
    } else if (role === Role.User) {
      navigate('/user/books');
    } else if (role === Role.Librarian) {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded shadow-lg w-96 bg-opacity-50">
        <h2 className="text-2xl font-bold mb-6 text-center">Login as {currentRole}</h2>
        <div className="mb-4 flex justify-around gap-[8px]">
          <button onClick={() => setCurrentRole(Role.Admin)}>Admin</button>
          <button onClick={() => setCurrentRole(Role.User)}>User</button>
          <button onClick={() => setCurrentRole(Role.Librarian)}>Student</button>
        </div>

        <form className='form'>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>
          {currentRole === Role.Admin && (
            <div className='flex justify-center w-full'>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => handleLogin(Role.Admin)} type="submit">Login</button>
            </div>
          )}
          {currentRole === Role.User && (
            <div className='flex justify-center w-full'>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => handleLogin(Role.User)} type="submit">Login</button>
            </div>
          )}
          {currentRole === Role.Librarian && (
            <div className='flex justify-center w-full'>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => handleLogin(Role.Librarian)} type="submit">Login</button>
            </div>
          )}
        </form>
      </div>
      </div>
  );
};

export default Login;


