import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { Role } from '../../constants/roles/routes';

const Login: React.FC = () => {
  const { setRole } = useRole();
  const navigate = useNavigate();

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

//   useEffect(() => {
//     const savedRole = localStorage.getItem('role');
//     if (savedRole) {
//       if (savedRole === Role.Admin) {
//         navigate('/admin');
//       } else if (savedRole === Role.User) {
//         navigate('/user');
//       } else if (savedRole === Role.Librarian) {
//         navigate('/librarian');
//       }
//     }
//   }, [navigate]);

  return (
    <div>
      <h2>Login as:</h2>
      <button onClick={() => handleLogin(Role.Admin)}>Admin</button>
      <button onClick={() => handleLogin(Role.User)}>User</button>
      <button onClick={() => handleLogin(Role.Librarian)}>Librarian</button>
    </div>
  );
};

export default Login;
