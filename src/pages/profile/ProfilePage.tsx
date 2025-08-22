import { useState, useEffect } from 'react';
import { Input, Button, Form, Avatar, notification, DatePicker, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import useAuth from "../../hooks/useAuth";
import useEditApi from "../../hooks/useEditApi";

const { Option } = Select;

const ProfilePage = () => {
    const { me } = useAuth();
    const [user, setUser] = useState<any>(null);

    const usersProfile = useEditApi({
        url: `/users/profile`,
        fullResp: true,
    })
    // () => message.success("Sửa bài tập đã giao thành công!"),
    // () => message.success("Sửa bài tập đã giao thất bại, vui lòng thử lại."),

    // Khi có dữ liệu người dùng, cập nhật state
    useEffect(() => {
        if (me) {
            setUser(me); // Cập nhật thông tin người dùng khi me thay đổi
        }
    }, [me]);

    const handleSubmit = async (values: any) => {
        const data = {
            avatar: "",
            username: values.username,
            email: "",
            ethnicity: "",
            gender: "",
            phone: "",
            name: "",
            birthDate: ""
        }

        // Gọi API để cập nhật thông tin người dùng
        notification.success({
            message: 'Cập nhật thành công',
            description: 'Thông tin người dùng đã được cập nhật.',
        });
    };

    if (!user) {
        return <div>Đang tải...</div>; // Hiển thị khi thông tin người dùng chưa được tải
    }

    return (
        <div className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto mt-8">
            <div className="text-center">
                <Avatar size={64} icon={<UserOutlined />} />
                <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
                <p>{user.email}</p>
            </div>

            <Form
                initialValues={{
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    ethnicity: user.ethnicity,
                    gender: user.gender,
                    birthDate: user.dob ? dayjs(user.dob) : null, // Chuyển đổi ngày sinh
                }}
                onFinish={handleSubmit}
                layout="vertical"
                className="mt-8"
            >
                {/* Username */}
                <Form.Item
                    label="Tên đăng nhập"
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                >
                    <Input disabled />
                </Form.Item>

                {/* Name */}
                <Form.Item
                    label="Tên đầy đủ"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên đầy đủ' }]}
                >
                    <Input />
                </Form.Item>

                {/* Email */}
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                >
                    <Input disabled />
                </Form.Item>

                {/* Phone */}
                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                >
                    <Input />
                </Form.Item>

                {/* Ethnicity */}
                <Form.Item
                    label="Dân tộc"
                    name="ethnicity"
                >
                    <Input />
                </Form.Item>

                {/* Gender */}
                <Form.Item
                    label="Giới tính"
                    name="gender"
                >
                    <Select placeholder="Chọn giới tính">
                        <Option value="male">Nam</Option>
                        <Option value="female">Nữ</Option>
                        <Option value="other">Khác</Option>
                    </Select>
                </Form.Item>

                {/* Birthdate */}
                <Form.Item
                    label="Ngày sinh"
                    name="birthDate"
                >
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>

                <Button type="primary" htmlType="submit" block>
                    Cập nhật thông tin
                </Button>
            </Form>
        </div>
    );
};

export default ProfilePage;
