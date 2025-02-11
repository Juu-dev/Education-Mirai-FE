import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateApi from "../../hooks/useCreateApi";
import { Form, Checkbox, Input, Select, Alert, message, Button, Typography } from "antd";
import useFetchApi from "../../hooks/useFetchApi";
import { classPath, registerPath } from "../../helpers/api-params/auth";
const { Title, Text, Link } = Typography;
const Login = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [error, setError] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const registerApi = useCreateApi(registerPath);
    const classesApi = useFetchApi(classPath);
    const handleSubmit = async (values) => {
        if (!acceptedTerms) {
            setError("Vui lòng chấp nhận điều khoản và điều kiện.");
            return;
        }
        const payload = {
            email: values.email,
            password: values.password,
            name: values.name,
            classId: values.classId,
        };
        const response = await registerApi.handleCreate(payload);
        if (response && typeof response !== "boolean" && response.success) {
            message.success('Đăng ký thành công!');
            navigate("/login");
        }
        else if (response && typeof response !== "boolean") {
            setError(response.error || "Đăng ký thất bại.");
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-100 w-screen ", children: _jsxs("div", { className: "flex shadow-lg rounded", children: [_jsx("div", { className: "flex w-96", children: _jsx("img", { src: "src/assets/logo/login.png", alt: "Logo" }) }), _jsxs("div", { className: "bg-white p-8 rounded shadow-lg w-96 text-base", children: [_jsxs("div", { className: "flex flex-col items-start ", children: [_jsx(Title, { level: 3, style: { color: '#1d4ed8' }, children: "Xin ch\u00E0o !" }), _jsxs(Text, { type: "secondary", children: ["B\u1EA1n \u0111\u00E3 c\u00F3 t\u00E0i kho\u1EA3n?", ' ', _jsx(Link, { onClick: () => navigate('/login'), children: "\u0110\u0103ng nh\u1EADp" })] })] }), _jsx("h2", { className: "text-xl font-bold mb-3 text-center uppercase mt-3 text-blue-700", children: "\u0110\u0103ng k\u00FD" }), error && _jsx(Alert, { message: error, type: "error", showIcon: true, className: "mb-3" }), registerApi.errorData && (_jsx(Alert, { message: "L\u1ED7i t\u1EEB server", description: JSON.stringify(registerApi.errorData), type: "error", showIcon: true, className: "mb-3" })), _jsxs(Form, { form: form, layout: "vertical", onFinish: handleSubmit, children: [_jsx(Form.Item, { label: "H\u1ECD v\u00E0 t\u00EAn", name: "name", rules: [{ required: true, message: "Vui lòng nhập họ và tên." }], children: _jsx(Input, { className: "h-10", placeholder: "Nh\u1EADp h\u1ECD v\u00E0 t\u00EAn" }) }), _jsx(Form.Item, { label: "Ch\u1ECDn l\u1EDBp", name: "classId", required: true, children: _jsx(Select, { filterOption: false, placeholder: "Ch\u1ECDn l\u1EDBp", className: "h-10", children: classesApi?.data.map((classOption, index) => (_jsx(Select.Option, { value: classOption?.id, children: classOption?.name }, index))) }) }), _jsx(Form.Item, { label: "T\u00EAn \u0111\u0103ng nh\u1EADp", name: "email", rules: [
                                        { required: true, message: "Vui lòng nhập email." },
                                        { type: "email", message: "Email không hợp lệ." },
                                    ], children: _jsx(Input, { className: "h-10", placeholder: "Nh\u1EADp t\u00EAn \u0111\u0103ng nh\u1EADp" }) }), _jsx(Form.Item, { label: "M\u1EADt kh\u1EA9u", name: "password", rules: [
                                        { required: true, message: "Vui lòng nhập mật khẩu." },
                                        { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự." },
                                    ], children: _jsx(Input.Password, { className: "h-10", placeholder: "Nh\u1EADp m\u1EADt kh\u1EA9u" }) }), _jsx(Form.Item, { label: "X\u00E1c nh\u1EADn m\u1EADt kh\u1EA9u", name: "confirmPassword", dependencies: ["password"], rules: [
                                        { required: true, message: "Vui lòng xác nhận mật khẩu." },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue("password") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error("Mật khẩu xác nhận không khớp."));
                                            },
                                        }),
                                    ], children: _jsx(Input.Password, { className: "h-10", placeholder: "Nh\u1EADp l\u1EA1i m\u1EADt kh\u1EA9u" }) }), _jsx(Form.Item, { children: _jsxs(Checkbox, { checked: acceptedTerms, onChange: (e) => setAcceptedTerms(e.target.checked), children: ["I accept the", " ", _jsx("a", { onClick: () => message.info('Chức năng Terms and Conditions chưa được triển khai.'), href: "#", className: "text-blue-700 hover:underline", children: "Terms and Conditions" })] }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", block: true, style: { height: "40px" }, children: registerApi.creating ? "Đang đăng ký..." : "Đăng ký" }) })] }), _jsxs("div", { className: "flex justify-center space-x-2 mt-3 mb-3", children: [_jsx("span", { className: "bg-gray-300 h-px flex-grow t-2 relative top-2" }), _jsx("span", { className: "flex-none uppercase text-xs text-gray-400 font-semibold", children: "or" }), _jsx("span", { className: "bg-gray-300 h-px flex-grow t-2 relative top-2" })] }), _jsx(Button, { type: "default", block: true, style: { backgroundColor: '#dc2626', color: 'white', height: "40px" }, onClick: () => message.info('Chức năng Google signup chưa được triển khai.'), children: "\u0110\u0103ng k\u00FD v\u1EDBi Google" })] })] }) }));
};
export default Login;
