import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Select, DatePicker, Button, message } from 'antd';
import PageTitle from "../../components/common/SectionTitle";
import useCreateApi from "../../hooks/useCreateApi";
import useFetchApi from "../../hooks/useFetchApi";
import { Role } from "../../constants/roles/role";
import useAuth from "../../hooks/useAuth";
const { TextArea } = Input;
const { Option } = Select;
const PRIORITY_TYPE = [
    { key: "low", value: "Thấp" },
    { key: "normal", value: "Bình thường" },
    { key: "high", value: "Cao" },
];
const REQUEST_TYPE = [
    { key: "teaching", value: "Giảng dạy" },
    { key: "calendar", value: "Lịch họp" },
    { key: "admin", value: "Hành chính" },
    { key: "other", value: "Khác" },
];
const Request = () => {
    const { me } = useAuth();
    const [form] = Form.useForm();
    const tasksApi = useCreateApi({
        url: "/tasks",
        fullResp: true,
    });
    const getNameAssignee = (data) => {
        const name = data?.roles[0].role.name;
        if (name === Role.Principal)
            return 'Hiệu trưởng';
        return data.name;
    };
    const assigneeApi = useFetchApi({
        url: "/users/except-student",
        auth: true,
        presentData: (users) => {
            const assignee = users.map((user) => ({
                id: user?.id,
                name: getNameAssignee(user)
            }));
            return [{
                    id: "all",
                    name: "Tất cả"
                }, ...assignee];
        }
    });
    const onFinish = async (values) => {
        const payload = {
            ...values,
            assignerId: me?.id,
            status: "delivered"
        };
        await tasksApi.handleCreate(payload, () => message.success("Gửi yêu cầu thành công!"), () => message.error("Gủi yêu cầu thất bại, vui lòng thử lại."));
        message.success('Nhiệm vụ đã được gửi thành công!');
        form.resetFields();
    };
    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
        message.error('Vui lòng kiểm tra lại thông tin trong biểu mẫu.');
    };
    return (_jsxs("div", { style: { maxWidth: 600, margin: '0 auto', padding: '20px', background: '#fff', borderRadius: '8px' }, children: [_jsx(PageTitle, { title: "G\u1EEDi Y\u00EAu c\u1EA7u", className: "mb-3 flex justify-center" }), _jsxs(Form, { form: form, layout: "vertical", onFinish: onFinish, onFinishFailed: onFinishFailed, initialValues: { priority: 'normal' }, children: [_jsx(Form.Item, { label: "Ng\u01B0\u1EDDi nh\u1EADn y\u00EAu c\u1EA7u", name: "assigneeId", rules: [{ required: true, message: 'Vui lòng chọn người nhận!' }], children: _jsx(Select, { placeholder: "Ch\u1ECDn gi\u00E1o vi\u00EAn", children: assigneeApi?.data.map((user) => _jsx(Option, { value: user.id, children: user.name }, user.id)) }) }), _jsx(Form.Item, { label: "Ti\u00EAu \u0111\u1EC1 y\u00EAu c\u1EA7u", name: "title", rules: [{ required: true, message: 'Vui lòng nhập tiêu đề yêu cầu!' }], children: _jsx(Input, { placeholder: "Nh\u1EADp ti\u00EAu \u0111\u1EC1" }) }), _jsx(Form.Item, { label: "M\u00F4 t\u1EA3 y\u00EAu c\u1EA7u", name: "description", rules: [{ required: true, message: 'Vui lòng nhập mô tả yêu cầu!' }], children: _jsx(TextArea, { rows: 4, placeholder: "Nh\u1EADp chi ti\u1EBFt y\u00EAu c\u1EA7u" }) }), _jsx(Form.Item, { label: "H\u1EA1n ch\u00F3t", name: "endTime", rules: [{ required: true, message: 'Vui lòng chọn hạn chót!' }], children: _jsx(DatePicker, { showTime: true, placeholder: "Ch\u1ECDn ng\u00E0y v\u00E0 gi\u1EDD", style: { width: '100%' } }) }), _jsx(Form.Item, { label: "Lo\u1EA1i y\u00EAu c\u1EA7u", name: "type", rules: [{ required: true, message: 'Vui lòng chọn loại yêu cầu!' }], children: _jsx(Select, { placeholder: "Ch\u1ECDn lo\u1EA1i y\u00EAu c\u1EA7u", children: REQUEST_TYPE.map((e) => _jsx(Option, { value: e.key, children: e.value }, e.key)) }) }), _jsx(Form.Item, { label: "M\u1EE9c \u0111\u1ED9 \u01B0u ti\u00EAn", name: "priority", rules: [{ required: true, message: 'Vui lòng chọn mức độ ưu tiên!' }], children: _jsx(Select, { children: PRIORITY_TYPE.map((e) => _jsx(Option, { value: e.key, children: e.value }, e.key)) }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", style: { width: '100%' }, children: tasksApi.creating ? "Đang xử lý..." : "Gửi Yêu Cầu" }) })] })] }));
};
export default Request;
