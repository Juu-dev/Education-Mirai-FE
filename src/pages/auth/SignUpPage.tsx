import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateApi from "../../hooks/useCreateApi";
import {Form, Checkbox, Input, Select, Alert, message, Button, Typography} from "antd";
import useFetchApi from "../../hooks/useFetchApi";
import {classPath, registerPath} from "../../helpers/api-params/auth";

const { Title, Text, Link } = Typography;

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [error, setError] = useState<string>("");
    const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

    const registerApi = useCreateApi(registerPath);
    const classesApi = useFetchApi(classPath)

    const handleSubmit = async (values: any) => {
        if (!acceptedTerms) {
            setError("Vui lòng chấp nhận điều khoản và điều kiện.");
            return;
        }

        const payload = {
            email: values.email,
            password: values.password,
            name: values.name,
            classId: values.classId,
        }

        const response = await registerApi.handleCreate(payload);

        if (response && typeof response !== "boolean" && response.success) {
            message.success('Đăng ký thành công!')
            navigate("/login");
        } else if (response && typeof response !== "boolean") {
            setError(response.error || "Đăng ký thất bại.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 w-screen ">
            <div className="flex shadow-lg rounded">
                <div className="flex w-96">
                    <img src="src/assets/logo/login.png" alt="Logo" />
                </div>
                <div className="bg-white p-8 rounded shadow-lg w-96 text-base">
                    <div className="flex flex-col items-start ">
                        <Title level={3} style={{ color: '#1d4ed8' }}>
                            Xin chào !
                        </Title>
                        <Text type="secondary">
                            Bạn đã có tài khoản?{' '}
                            <Link onClick={() => navigate('/login')}>Đăng nhập</Link>
                        </Text>
                    </div>

                    <h2 className="text-xl font-bold mb-3 text-center uppercase mt-3 text-blue-700">
                        Đăng ký
                    </h2>

                    {error && <Alert message={error} type="error" showIcon className="mb-3"/>}
                    {registerApi.errorData && (
                        <Alert
                            message="Lỗi từ server"
                            description={JSON.stringify(registerApi.errorData)}
                            type="error"
                            showIcon
                            className="mb-3"
                        />
                    )}

                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Form.Item
                            label="Họ và tên"
                            name="name"
                            rules={[{required: true, message: "Vui lòng nhập họ và tên."}]}
                        >
                            <Input className="h-10" placeholder="Nhập họ và tên"/>
                        </Form.Item>

                        <Form.Item
                            label="Chọn lớp"
                            name="classId"
                            required>
                            <Select
                                filterOption={false}
                                placeholder="Chọn lớp"
                                className="h-10"
                            >
                                {classesApi?.data.map((classOption, index) => (
                                    <Select.Option key={index} value={classOption?.id}>
                                        {classOption?.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Tên đăng nhập"
                            name="email"
                            rules={[
                                {required: true, message: "Vui lòng nhập email."},
                                {type: "email", message: "Email không hợp lệ."},
                            ]}
                        >
                            <Input className="h-10" placeholder="Nhập tên đăng nhập"/>
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {required: true, message: "Vui lòng nhập mật khẩu."},
                                {min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự."},
                            ]}
                        >
                            <Input.Password className="h-10" placeholder="Nhập mật khẩu"/>
                        </Form.Item>

                        <Form.Item
                            label="Xác nhận mật khẩu"
                            name="confirmPassword"
                            dependencies={["password"]}
                            rules={[
                                {required: true, message: "Vui lòng xác nhận mật khẩu."},
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Mật khẩu xác nhận không khớp."));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password className="h-10" placeholder="Nhập lại mật khẩu"/>
                        </Form.Item>

                        <Form.Item>
                            <Checkbox checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)}>
                                I accept the{" "}
                                <a
                                    onClick={() => message.info('Chức năng Terms and Conditions chưa được triển khai.')}
                                    href="#" className="text-blue-700 hover:underline">
                                    Terms and Conditions
                                </a>
                            </Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block style={{height: "40px"}}>
                                {registerApi.creating ? "Đang đăng ký..." : "Đăng ký"}
                            </Button>
                        </Form.Item>
                    </Form>

                    <div className="flex justify-center space-x-2 mt-3 mb-3">
                        <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
                        <span className="flex-none uppercase text-xs text-gray-400 font-semibold">or</span>
                        <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
                    </div>

                    <Button
                        type="default"
                        block
                        style={{backgroundColor: '#dc2626', color: 'white', height: "40px"}}
                        onClick={() => message.info('Chức năng Google signup chưa được triển khai.')}
                    >
                        Đăng ký với Google
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
