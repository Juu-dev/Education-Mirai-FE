import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { Role } from '../../constants/roles/routes';

const Login: React.FC = () => {
    const { setRole } = useRole();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>(''); 
    const [currentRole, setCurrentRole] = useState<Role | undefined>(undefined);
    const [error, setError] = useState<string>('');
    const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false); 

    const validEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password || !currentRole || !acceptedTerms) {
            setError('Vui lòng nhập đủ email, mật khẩu, chọn vai trò và chấp nhận điều khoản.');
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

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp.');
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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 w-screen ">
            <div className="bg-white p-8 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center uppercase">Create an account</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Role</label>
                    <select
                        value={currentRole}
                        onChange={(e) => setCurrentRole(e.target.value as Role)}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Choose your role</option>
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
                            placeholder="name@gmail.com"
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
                            placeholder="••••••••••"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="••••••••••"
                        />
                    </div>

                    {error && <p className="text-red-500">{error}</p>}
                    <div className='flex items-start mb-4'>
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                type="checkbox"
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)} 
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-gray-500">
                                I accept the {''}
                                <a className="font-medium text-primary-600 hover:underline" href="#">
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Sign Up
                    </button>
                    <p className="text-sm font-light text-gray-500">
                        Already have an account? {''}
                        <a onClick={() => navigate('/login')} className="font-medium text-primary-600 hover:underline">
                            Login here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
