import { Form, Input, Select, DatePicker, Button, message } from 'antd';
import PageTitle from "../../components/common/SectionTitle";
import useCreateApi from "../../hooks/useCreateApi";
import useFetchApi from "../../hooks/useFetchApi";
import {Role} from "../../constants/roles/role";
import useAuth from "../../hooks/useAuth";

const { TextArea } = Input;
const { Option } = Select;

const PRIORITY_TYPE = [
    {key: "low", value: "Thấp"},
    {key: "normal",value: "Bình thường"},
    {key: "high",value: "Cao"},
]

const REQUEST_TYPE = [
    {key: "teaching", value: "Giảng dạy"},
    {key: "calendar", value: "Lịch họp"},
    {key: "admin", value: "Hành chính"},
    {key: "other", value: "Khác"},
]

const Request = () => {
    const { me } = useAuth();
    const [form] = Form.useForm();

    const tasksApi = useCreateApi({
        url: "/tasks",
        fullResp: true,
    });

    const getNameAssignee = (data: any) => {
        const name = data?.roles[0].role.name;
        if (name === Role.Principal) return 'Hiệu trưởng';
        return data.name
    }

    const assigneeApi = useFetchApi({
        url: "/users/except-student",
        auth: true,
        presentData: (users) => {
            const assignee = users.map((user: any) => ({
                id: user?.id,
                name: getNameAssignee(user)
            }))
            return [{
                id: "all",
                name: "Tất cả"
            },...assignee]
        }
    })

    const onFinish = async (values: any) => {
        const payload = {
            ...values,
            assignerId: me?.id,
            status: "delivered"
        }

        await tasksApi.handleCreate(payload,
            () => message.success("Gửi yêu cầu thành công!"),
            () => message.error("Gủi yêu cầu thất bại, vui lòng thử lại."),)

        message.success('Nhiệm vụ đã được gửi thành công!');
        form.resetFields();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.error('Failed:', errorInfo);
        message.error('Vui lòng kiểm tra lại thông tin trong biểu mẫu.');
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px', background: '#fff', borderRadius: '8px' }}>
            <PageTitle title="Gửi Yêu cầu" className="mb-3 flex justify-center" />
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ priority: 'normal' }}
            >
                {/* Người nhận */}
                <Form.Item
                    label="Người nhận yêu cầu"
                    name="assigneeId"
                    rules={[{ required: true, message: 'Vui lòng chọn người nhận!' }]}
                >
                    <Select placeholder="Chọn giáo viên">
                        {assigneeApi?.data.map((user: any) =>
                            <Option key={user.id} value={user.id}>{user.name}</Option>
                        )}
                    </Select>
                </Form.Item>

                {/* Tiêu đề yêu cầu */}
                <Form.Item
                    label="Tiêu đề yêu cầu"
                    name="title"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề yêu cầu!' }]}
                >
                    <Input placeholder="Nhập tiêu đề" />
                </Form.Item>

                {/* Mô tả yêu cầu */}
                <Form.Item
                    label="Mô tả yêu cầu"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả yêu cầu!' }]}
                >
                    <TextArea rows={4} placeholder="Nhập chi tiết yêu cầu" />
                </Form.Item>

                {/* Hạn chót */}
                <Form.Item
                    label="Hạn chót"
                    name="endTime"
                    rules={[{ required: true, message: 'Vui lòng chọn hạn chót!' }]}
                >
                    <DatePicker showTime placeholder="Chọn ngày và giờ" style={{ width: '100%' }} />
                </Form.Item>

                {/* Loại yêu cầu */}
                <Form.Item
                    label="Loại yêu cầu"
                    name="type"
                    rules={[{ required: true, message: 'Vui lòng chọn loại yêu cầu!' }]}
                >
                    <Select placeholder="Chọn loại yêu cầu">
                        {REQUEST_TYPE.map((e: any) => <Option key={e.key} value={e.key}>{e.value}</Option>)}
                    </Select>
                </Form.Item>

                {/* Mức độ ưu tiên */}
                <Form.Item
                    label="Mức độ ưu tiên"
                    name="priority"
                    rules={[{ required: true, message: 'Vui lòng chọn mức độ ưu tiên!' }]}
                >
                    <Select>
                        {PRIORITY_TYPE.map((e: any) => <Option key={e.key} value={e.key}>{e.value}</Option>)}
                    </Select>
                </Form.Item>

                {/* Nút gửi */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        {tasksApi.creating ? "Đang xử lý..." : "Gửi Yêu Cầu"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Request;
