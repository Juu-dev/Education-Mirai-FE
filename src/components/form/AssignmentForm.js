import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Button, Select, InputNumber } from 'antd';
import useFetchApi from "../../hooks/useFetchApi";
import useCreateApi from "../../hooks/useCreateApi";
import useAuth from "../../hooks/useAuth";
import { exerciseCreatePath, quizzesFetchPath } from "../../helpers/api-params/auth";
const AssignmentForm = ({ onSuccess }) => {
    const { me } = useAuth();
    const quizzes = useFetchApi(quizzesFetchPath);
    const exercise = useCreateApi(exerciseCreatePath);
    const [form] = Form.useForm();
    const handleFinish = async (values) => {
        const data = {
            name: values.title,
            description: values.description,
            timeOut: values.timeOut,
            assignerId: me?.id,
            classAssigneeId: values.classAssigneeId,
            quizId: values.quizId
        };
        await exercise.handleCreate(data);
        form.resetFields();
        onSuccess();
    };
    return (_jsxs(Form, { form: form, layout: "vertical", onFinish: handleFinish, children: [_jsx(Form.Item, { label: "Ti\u00EAu \u0111\u1EC1 b\u00E0i t\u1EADp", name: "title", rules: [{ required: true, message: "Vui lòng nhập tiêu đề bài tập" }], children: _jsx(Input, { placeholder: "Nh\u1EADp ti\u00EAu \u0111\u1EC1 b\u00E0i t\u1EADp" }) }), _jsx(Form.Item, { label: "M\u00F4 t\u1EA3", name: "description", rules: [{ required: true, message: "Vui lòng nhập mô tả bài tập" }], children: _jsx(Input.TextArea, { placeholder: "Nh\u1EADp m\u00F4 t\u1EA3 b\u00E0i t\u1EADp", rows: 4 }) }), _jsx(Form.Item, { label: "Th\u1EDDi gian l\u00E0m b\u00E0i (ph\u00FAt)", name: "timeOut", rules: [
                    { required: true, message: 'Vui lòng nhập thời gian làm bài' },
                    { type: 'number', min: 1, message: 'Thời gian làm bài phải lớn hơn 0 phút' },
                ], children: _jsx(InputNumber, { placeholder: "Nh\u1EADp th\u1EDDi gian (ph\u00FAt)", style: { width: '100%' } }) }), _jsx(Form.Item, { label: "Ch\u1ECDn l\u1EDBp", name: "classAssigneeId", rules: [{ required: true, message: "Vui lòng chọn ít nhất một lớp học" }], children: _jsx(Select, { placeholder: "Ch\u1ECDn l\u1EDBp", disabled: true, defaultValue: me?.class?.id, children: [me?.class].map(group => (_jsx(Select.Option, { value: group.id, children: group.name }, group.id))) }) }), _jsx(Form.Item, { label: "Ch\u1ECDn Quiz", name: "quizId", rules: [{ required: true, message: 'Vui lòng chọn một Quiz' }], children: _jsx(Select, { placeholder: "Ch\u1ECDn Quiz", children: quizzes?.data.map((quiz) => (_jsx(Select.Option, { value: quiz.id, children: quiz.name }, quiz.id))) }) }), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { type: "primary", htmlType: "submit", children: "Giao b\u00E0i t\u1EADp" }) })] }));
};
export default AssignmentForm;
