import {Form, Input, Button, Select, InputNumber} from 'antd';
import { FC } from 'react';
import useFetchApi from "../../hooks/useFetchApi.ts";
import useCreateApi from "../../hooks/useCreateApi.ts";
import useAuth from "../../hooks/useAuth.ts";

interface AdminAssignmentModalProps {
    onSuccess: () => void;
}

interface IOption {
    id: string;
    name: string;
}

export interface AssignmentDetails {
    title: string;
    description: string;
    timeOut: number;
    classAssigneeId: string;
    quizId: string;
}

const AssignmentForm: FC<AdminAssignmentModalProps> = ({onSuccess}) => {
    const {me} = useAuth()
    const quizzes = useFetchApi<IOption>({
        url: "/quizzes",
        auth: true,
        presentData: (data) => (data.map((e) => ({
            id: e.id,
            name: e.title
        })).sort((a, b) => a.name.localeCompare(b.name)))
    })
    const classes = useFetchApi<IOption>({
        url: "/classes",
        auth: true,
        presentData: (data) => (data.map((e) => ({
            id: e.id,
            name: e.name
        })).sort((a, b) => a.name.localeCompare(b.name)))
    })
    const exercise = useCreateApi({
        url: "/exercises",
        successMsg: "Giao bài tập thành công!",
        errorMsg: "Giao bài tập thất bại, vui lòng thử lại.",
        fullResp: true,
    })

    const [form] = Form.useForm();
    const handleFinish = async (values: AssignmentDetails) => {
        const data = {
            name: values.title,
            description: values.description,
            timeOut: values.timeOut,
            assignerId: me?.id,
            classAssigneeId: values.classAssigneeId,
            quizId: values.quizId
        }

        await exercise.handleCreate(data)
        form.resetFields();
        onSuccess();
    };

    return (
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
                label="Thời gian làm bài (phút)"
                name="timeOut"
                rules={[
                    { required: true, message: 'Vui lòng nhập thời gian làm bài' },
                    { type: 'number', min: 1, message: 'Thời gian làm bài phải lớn hơn 0 phút' },
                ]}
            >
                <InputNumber placeholder="Nhập thời gian (phút)" style={{ width: '100%' }} />
            </Form.Item>

            {/* Student Group Selection */}
            <Form.Item
                label="Chọn lớp"
                name="classAssigneeId"
                rules={[{ required: true, message: "Vui lòng chọn ít nhất một lớp học" }]}
            >
                <Select
                    placeholder="Chọn lớp"
                >
                    {classes?.data.map(group => (
                        <Select.Option key={group.id} value={group.id}>
                            {group.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Chọn Quiz"
                name="quizId"
                rules={[{ required: true, message: 'Vui lòng chọn một Quiz' }]}
            >
                <Select placeholder="Chọn Quiz">
                    {quizzes?.data.map((quiz) => (
                        <Select.Option key={quiz.id} value={quiz.id}>
                            {quiz.name}
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
    );
};

export default AssignmentForm;
