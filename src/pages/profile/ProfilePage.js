import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Input, Button, Form, Avatar, notification, DatePicker, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import useAuth from "../../hooks/useAuth";
import useEditApi from "../../hooks/useEditApi";
const { Option } = Select;
const ProfilePage = () => {
    const { me } = useAuth();
    const [user, setUser] = useState(null);
    const usersProfile = useEditApi({
        url: `/users/profile`,
        fullResp: true,
    });
    // () => message.success("Sửa bài tập đã giao thành công!"),
    // () => message.success("Sửa bài tập đã giao thất bại, vui lòng thử lại."),
    // Khi có dữ liệu người dùng, cập nhật state
    useEffect(() => {
        if (me) {
            setUser(me); // Cập nhật thông tin người dùng khi me thay đổi
        }
    }, [me]);
    const handleSubmit = async (values) => {
        const data = {
            avatar: "",
            username: values.username,
            email: "",
            ethnicity: "",
            gender: "",
            phone: "",
            name: "",
            birthDate: ""
        };
        // Gọi API để cập nhật thông tin người dùng
        notification.success({
            message: 'Cập nhật thành công',
            description: 'Thông tin người dùng đã được cập nhật.',
        });
    };
    if (!user) {
        return _jsx("div", { children: "\u0110ang t\u1EA3i..." }); // Hiển thị khi thông tin người dùng chưa được tải
    }
    return (_jsxs("div", { className: "p-6 bg-white shadow-md rounded-md max-w-lg mx-auto mt-8", children: [_jsxs("div", { className: "text-center", children: [_jsx(Avatar, { size: 64, icon: _jsx(UserOutlined, {}) }), _jsx("h2", { className: "text-xl font-semibold mt-4", children: user.name }), _jsx("p", { children: user.email })] }), _jsxs(Form, { initialValues: {
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    ethnicity: user.ethnicity,
                    gender: user.gender,
                    birthDate: user.dob ? dayjs(user.dob) : null, // Chuyển đổi ngày sinh
                }, onFinish: handleSubmit, layout: "vertical", className: "mt-8", children: [_jsx(Form.Item, { label: "T\u00EAn \u0111\u0103ng nh\u1EADp", name: "username", rules: [{ required: true, message: 'Vui lòng nhập tên đăng nhập' }], children: _jsx(Input, { disabled: true }) }), _jsx(Form.Item, { label: "T\u00EAn \u0111\u1EA7y \u0111\u1EE7", name: "name", rules: [{ required: true, message: 'Vui lòng nhập tên đầy đủ' }], children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "Email", name: "email", rules: [{ required: true, message: 'Vui lòng nhập email' }], children: _jsx(Input, { disabled: true }) }), _jsx(Form.Item, { label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i", name: "phone", children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "D\u00E2n t\u1ED9c", name: "ethnicity", children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "Gi\u1EDBi t\u00EDnh", name: "gender", children: _jsxs(Select, { placeholder: "Ch\u1ECDn gi\u1EDBi t\u00EDnh", children: [_jsx(Option, { value: "male", children: "Nam" }), _jsx(Option, { value: "female", children: "N\u1EEF" }), _jsx(Option, { value: "other", children: "Kh\u00E1c" })] }) }), _jsx(Form.Item, { label: "Ng\u00E0y sinh", name: "birthDate", children: _jsx(DatePicker, { format: "YYYY-MM-DD" }) }), _jsx(Button, { type: "primary", htmlType: "submit", block: true, children: "C\u1EADp nh\u1EADt th\u00F4ng tin" })] })] }));
};
export default ProfilePage;
