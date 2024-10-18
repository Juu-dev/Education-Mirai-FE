import { Modal, Form, Input, DatePicker, Button, Select } from 'antd';
import { FC } from 'react';
import { AssignmentDetails } from '../assignment/interface/assginment-interface';

interface AdminAssignmentModalProps {
    visible: boolean;
    onCancel: () => void;
    onAssign: (values: AssignmentDetails) => void;
    groups: { id: string; name: string }[];  // Accept a list of groups as a prop
}

const AdminAssignmentModal: FC<AdminAssignmentModalProps> = ({ visible, onCancel, onAssign, groups }) => {
    const [form] = Form.useForm();

    // Handle form submission
    const handleFinish = (values: AssignmentDetails) => {
        onAssign(values);
        form.resetFields();
    };

    return (
        <Modal
            title="Tạo và giao bài tập"
            open={visible}
            onCancel={onCancel}
            footer={null}  // We'll handle form submission through the form itself
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                {/* Title */}
                <Form.Item
                    label="Tiêu đề bài tập"
                    name="title"
                    rules={[{ required: true, message: "Vui lòng nhập tiêu đề bài tập" }]}
                >
                    <Input placeholder="Nhập tiêu đề bài tập" />
                </Form.Item>

                {/* Description */}
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: "Vui lòng nhập mô tả bài tập" }]}
                >
                    <Input.TextArea placeholder="Nhập mô tả bài tập" rows={4} />
                </Form.Item>

                {/* Due Date */}
                <Form.Item
                    label="Hạn nộp"
                    name="dueDate"
                    rules={[{ required: true, message: "Vui lòng chọn hạn nộp bài tập" }]}
                >
                    <DatePicker placeholder="Chọn ngày" style={{ width: '100%' }} />
                </Form.Item>

                {/* Student Group Selection */}
                <Form.Item
                    label="Chọn nhóm học sinh"
                    name="groups"  // Adjusted the form field name to plural for multiple selections
                    rules={[{ required: true, message: "Vui lòng chọn ít nhất một nhóm học sinh" }]}
                >
                    <Select
                        mode="multiple"  // Enable multiple selection
                        placeholder="Chọn nhóm học sinh"
                    >
                        {groups.map(group => (
                            <Select.Option key={group.id} value={group.id}>
                                {group.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button type="primary" htmlType="submit">
                        Giao bài tập
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default AdminAssignmentModal;
