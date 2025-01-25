import {Form, Input, Button, Select, InputNumber} from 'antd';
import {FC, useEffect} from 'react';
import useFetchApi from "../../hooks/useFetchApi.ts";
import useAuth from "../../hooks/useAuth.ts";
import useEditApi from "../../hooks/useEditApi.ts";
import {quizzesFetchPath} from "../../helpers/api-params/auth.ts";

interface AdminAssignmentModalProps {
    assignment?: AssignmentDetails | null;
    onSuccess: () => void;
}

interface IOption {
    id: string;
    name: string;
}

export interface AssignmentDetails {
    name: string;
    description: string;
    timeOut: number;
    classAssigneeId: string;
    quizId: string;
}

const AssignmentEditForm: FC<AdminAssignmentModalProps> = ({assignment, onSuccess}) => {
    const {me} = useAuth()
    const quizzes = useFetchApi<IOption>(quizzesFetchPath)
    const classAssignee = useFetchApi({
        url: `/classes/${assignment?.classAssigneeId}`,
        auth: true
    })
    const exercise = useEditApi({
        url: `/exercises/${assignment?.id}`,
        successMsg: "Sửa bài tập đã giao thành công!",
        errorMsg: "Sửa bài tập đã giao thất bại, vui lòng thử lại.",
        fullResp: true,
    })

    const [form] = Form.useForm();
    useEffect(() => {
        if (assignment) {
            form.setFieldsValue({
                name: assignment.name,
                description: assignment.description,
                timeOut: assignment.timeOut,
                assignerId: me?.id,
                classAssigneeId: assignment.classAssigneeId,
                quizId: assignment.quizId
            });
        } else {
            form.resetFields();
        }
    }, [assignment]);

    const handleFinish = async (values: AssignmentDetails) => {
        const data = {
            name: values.name,
            description: values.description,
            timeOut: values.timeOut,
            assignerId: me?.id,
            classAssigneeId: values.classAssigneeId,
            quizId: values.quizId
        }

        await exercise.handleEdit(data)
        onSuccess();
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleFinish}>
            {/* Title */}
            <Form.Item
                label="Tiêu đề bài tập"
                name="name"
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
                {/*<Input placeholder={classAssignee?.data?.name}  value={classAssignee?.data?.id} disabled />*/}
                <Select placeholder="Chọn lớp" disabled>
                    {[classAssignee?.data].map(group => (
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
                    Save
                </Button>
            </div>
        </Form>
    );
};

export default AssignmentEditForm;
