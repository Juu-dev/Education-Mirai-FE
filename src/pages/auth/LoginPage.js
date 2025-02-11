import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Typography, message, } from 'antd';
import useAuth from "../../hooks/useAuth";
const { Title, Text, Link } = Typography;
const Login = () => {
    const navigate = useNavigate();
    const [savePassword, setSavePassword] = useState(false);
    const { login } = useAuth();
    const handleLogin = async (values) => {
        const { email, password } = values;
        if (!email || !password) {
            message.error('Vui lòng nhập đủ email, mật khẩu và chọn vai trò.');
            return;
        }
        await login({ username: email, password });
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-100 w-screen", children: _jsxs("div", { className: "flex shadow-lg rounded", children: [_jsx("div", { className: "flex w-96", children: _jsx("img", { src: "src/assets/logo/login.png", alt: "Logo", className: "w-full h-full object-contain" }) }), _jsxs("div", { className: "bg-white p-8 rounded shadow-lg w-96", children: [_jsxs("div", { className: "flex flex-col items-start mb-4", children: [_jsx(Title, { level: 3, style: { color: '#1d4ed8' }, children: "Xin ch\u00E0o !" }), _jsxs(Text, { type: "secondary", children: ["B\u1EA1n ch\u01B0a c\u00F3 t\u00E0i kho\u1EA3n?", ' ', _jsx(Link, { onClick: () => navigate('/signup'), children: "\u0110\u0103ng k\u00FD" })] })] }), _jsx(Title, { level: 4, style: { textAlign: 'center', color: '#1d4ed8' }, children: "\u0110\u0103ng nh\u1EADp" }), _jsxs(Form, { layout: "vertical", onFinish: handleLogin, initialValues: {
                                email: localStorage.getItem('email') || '',
                                password: localStorage.getItem('password') || '',
                            }, children: [_jsx(Form.Item, { name: "email", label: "T\u00EAn \u0111\u0103ng nh\u1EADp", rules: [
                                        { required: true, message: 'Vui lòng nhập email!' },
                                        {
                                            type: 'email',
                                            message: 'Email không hợp lệ!',
                                        },
                                    ], children: _jsx(Input, { className: "h-10", placeholder: "Nh\u1EADp t\u00EAn \u0111\u0103ng nh\u1EADp" }) }), _jsx(Form.Item, { name: "password", label: "M\u1EADt kh\u1EA9u", rules: [
                                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                        { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                                    ], children: _jsx(Input.Password, { className: "h-10", placeholder: "Nh\u1EADp m\u1EADt kh\u1EA9u" }) }), _jsx(Form.Item, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Checkbox, { checked: savePassword, onChange: () => setSavePassword(!savePassword), children: "Nh\u1EDB m\u1EADt kh\u1EA9u" }), _jsx(Link, { onClick: () => message.info('Chức năng quên mật khẩu chưa được triển khai.'), children: "Qu\u00EAn m\u1EADt kh\u1EA9u?" })] }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", block: true, style: { height: "40px" }, children: "\u0110\u0103ng nh\u1EADp" }) }), _jsxs("div", { className: "flex justify-center space-x-2 mb-3", children: [_jsx("span", { className: "bg-gray-300 h-px flex-grow t-2 relative top-2" }), _jsx("span", { className: "flex-none uppercase text-xs text-gray-400 font-semibold", children: "or" }), _jsx("span", { className: "bg-gray-300 h-px flex-grow t-2 relative top-2" })] }), _jsx(Button, { type: "default", block: true, style: { backgroundColor: '#dc2626', color: 'white', height: "40px" }, onClick: () => message.info('Chức năng Google login chưa được triển khai.'), children: "\u0110\u0103ng nh\u1EADp v\u1EDBi Google" })] })] })] }) }));
};
export default Login;
