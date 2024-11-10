import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { Role } from '../../constants/roles/routes';

const Login: React.FC = () => {
    const { setRole } = useRole();
    const navigate = useNavigate();
    const [fullName, setFullName] = useState<string>('');
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
        if (currentRole === Role.Teacher) {
            navigate('/admin/dashboard');
        } else if (currentRole === Role.Student) {
            navigate('/user/books');
        } else if (currentRole === Role.Librarian) {
            navigate('/librarian/dashboard');
        }
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
                            Bạn đã có tài khoản? {''}
                            <a onClick={() => navigate('/login')} className="font-medium inline-flex text-xs sm:text-sm text-blue-700 hover:text-blue-600 hover:underline">
                                Đăng nhập
                            </a>
                        </p>
                    </div>
                    <h2 className="text-xl font-bold mb-3 text-center uppercase mt-3 text-blue-700">Đăng ký</h2>

                    <div className="mb-3">
                        <label className="block text-gray-700 mb-1">Role</label>
                        <select
                            value={currentRole}
                            onChange={(e) => setCurrentRole(e.target.value as Role)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Choose your role</option>
                            <option value={Role.Principal}>Principal</option>
                            <option value={Role.Teacher}>Teacher</option>
                            <option value={Role.Student}>Student</option>
                            <option value={Role.Librarian}>Librarian</option>
                        </select>
                    </div>

                    <form onSubmit={handleLogin} className="form">
                        <div className="mb-3">
                            <label htmlFor="fullName" className="block text-gray-700 mb-1">Họ và tên</label>
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Nguyễn Văn A   "
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-gray-700 mb-1">Tên đăng nhập</label>
                            <input
                                type="email"
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

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">Xác nhận mật khẩu</label>
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
                        <div className='flex items-start mb-3'>
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
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Đăng ký
                        </button>
                    </form>
                    <div className="flex justify-center space-x-2 mt-3 mb-3">
                        <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
                        <span className="flex-none uppercase text-xs text-gray-400 font-semibold">or</span>
                        <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
                    </div>
                    <div className='justify-center items-center'>
                        <button className="bg-red-600 w-full text-white py-2 px-4 rounded hover:bg-red-500">
                            Signup with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
