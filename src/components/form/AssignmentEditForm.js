import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Button, Select, InputNumber } from 'antd';
import { useEffect } from 'react';
import useFetchApi from "../../hooks/useFetchApi";
import useAuth from "../../hooks/useAuth";
import useEditApi from "../../hooks/useEditApi";
import { quizzesFetchPath } from "../../helpers/api-params/auth";
const AssignmentEditForm = ({ assignment, onSuccess }) => {
    const { me } = useAuth();
    const quizzes = useFetchApi(quizzesFetchPath);
    const classAssignee = useFetchApi({
        url: `/classes/${assignment?.classAssigneeId}`,
        auth: true
    });
    const exercise = useEditApi({
        url: `/exercises/${assignment?.id}`,
        successMsg: "Sửa bài tập đã giao thành công!",
        errorMsg: "Sửa bài tập đã giao thất bại, vui lòng thử lại.",
        fullResp: true,
    });
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
        }
        else {
            form.resetFields();
        }
    }, [assignment]);
    const handleFinish = async (values) => {
        const data = {
            name: values.name,
            description: values.description,
            timeOut: values.timeOut,
            assignerId: me?.id,
            classAssigneeId: values.classAssigneeId,
            quizId: values.quizId
        };
        await exercise.handleEdit(data);
        onSuccess();
    };
    return (_jsxs(Form, { form: form, layout: "vertical", onFinish: handleFinish, children: [_jsx(Form.Item, { label: "Ti\u00EAu \u0111\u1EC1 b\u00E0i t\u1EADp", name: "name", rules: [{ required: true, message: "Vui lòng nhập tiêu đề bài tập" }], children: _jsx(Input, { placeholder: "Nh\u1EADp ti\u00EAu \u0111\u1EC1 b\u00E0i t\u1EADp" }) }), _jsx(Form.Item, { label: "M\u00F4 t\u1EA3", name: "description", rules: [{ required: true, message: "Vui lòng nhập mô tả bài tập" }], children: _jsx(Input.TextArea, { placeholder: "Nh\u1EADp m\u00F4 t\u1EA3 b\u00E0i t\u1EADp", rows: 4 }) }), _jsx(Form.Item, { label: "Th\u1EDDi gian l\u00E0m b\u00E0i (ph\u00FAt)", name: "timeOut", rules: [
                    { required: true, message: 'Vui lòng nhập thời gian làm bài' },
                    { type: 'number', min: 1, message: 'Thời gian làm bài phải lớn hơn 0 phút' },
                ], children: _jsx(InputNumber, { placeholder: "Nh\u1EADp th\u1EDDi gian (ph\u00FAt)", style: { width: '100%' } }) }), _jsx(Form.Item, { label: "Ch\u1ECDn l\u1EDBp", name: "classAssigneeId", rules: [{ required: true, message: "Vui lòng chọn ít nhất một lớp học" }], children: _jsx(Select, { placeholder: "Ch\u1ECDn l\u1EDBp", disabled: true, children: [classAssignee?.data].map((group) => (_jsx(Select.Option, { value: group.id, children: group.name }, group.id))) }) }), _jsx(Form.Item, { label: "Ch\u1ECDn Quiz", name: "quizId", rules: [{ required: true, message: 'Vui lòng chọn một Quiz' }], children: _jsx(Select, { placeholder: "Ch\u1ECDn Quiz", children: quizzes?.data.map((quiz) => (_jsx(Select.Option, { value: quiz.id, children: quiz.name }, quiz.id))) }) }), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { type: "primary", htmlType: "submit", children: "Save" }) })] }));
};
export default AssignmentEditForm;
