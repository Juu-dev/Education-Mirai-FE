import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
  message,
} from 'antd';
import useAuth from "../../hooks/useAuth.ts";

const { Title, Text, Link } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [savePassword, setSavePassword] = useState<boolean>(false);
  const {login} = useAuth()

  const handleLogin = async (values: any) => {
    const { email, password } = values;

    if (!email || !password) {
      message.error('Vui lòng nhập đủ email, mật khẩu và chọn vai trò.');
      return;
    }

    await login({username: email, password})
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 w-screen">
        <div className="flex shadow-lg rounded">
          <div className="flex w-96">
            <img src="src/assets/logo/login.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <div className="flex flex-col items-start mb-4">
              <Title level={3} style={{ color: '#1d4ed8' }}>
                Xin chào !
              </Title>
              <Text type="secondary">
                Bạn chưa có tài khoản?{' '}
                <Link onClick={() => navigate('/signup')}>Đăng ký</Link>
              </Text>
            </div>
            <Title level={4} style={{ textAlign: 'center', color: '#1d4ed8' }}>
              Đăng nhập
            </Title>

            <Form
                layout="vertical"
                onFinish={handleLogin}
                initialValues={{
                  email: localStorage.getItem('email') || '',
                  password: localStorage.getItem('password') || '',
                }}
            >
              <Form.Item
                  name="email"
                  label="Tên đăng nhập"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    {
                      type: 'email',
                      message: 'Email không hợp lệ!',
                    },
                  ]}
              >
                <Input className="h-10" placeholder="Nhập tên đăng nhập" />
              </Form.Item>

              <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[
                    { required: true, message: 'Vui lòng nhập mật khẩu!' },
                    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                  ]}
              >
                <Input.Password className="h-10" placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Form.Item>
                <div className="flex items-center justify-between">
                  <Checkbox
                      checked={savePassword}
                      onChange={() => setSavePassword(!savePassword)}
                  >
                    Nhớ mật khẩu
                  </Checkbox>
                  <Link onClick={() => message.info('Chức năng quên mật khẩu chưa được triển khai.')}>
                    Quên mật khẩu?
                  </Link>
                </div>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block style={{height: "40px"}}>
                  Đăng nhập
                </Button>
              </Form.Item>

              <div className="flex justify-center space-x-2 mb-3">
                <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
                <span className="flex-none uppercase text-xs text-gray-400 font-semibold">or</span>
                <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
              </div>

              <Button
                  type="default"
                  block
                  style={{backgroundColor: '#dc2626', color: 'white', height: "40px"}}
                  onClick={() => message.info('Chức năng Google login chưa được triển khai.')}
              >
                Đăng nhập với Google
              </Button>
            </Form>
          </div>
        </div>
      </div>
  );
};

export default Login;
