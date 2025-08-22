import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Form, Input, Button, Select, message } from "antd";
import useEditApi from "../../../hooks/useEditApi";
import { useEffect } from "react";
import useFetchApi from "../../../hooks/useFetchApi";
import { classPath } from "../../../helpers/api-params/auth";
const StudentProfileForm = ({ studentData }) => {
    const [form] = Form.useForm();
    const classesApi = useFetchApi(classPath);
    const studentEdit = useEditApi({
        url: `/users/student/${studentData.userId}`,
        handleSuccess: () => message.success("Sửa thông tin học sinh thành công!"),
        handleError: () => message.error("Sửa thông tin học sinh thất bại, vui lòng thử lại."),
        fullResp: true,
    });
    const handleFinish = async (values) => {
        const data = {
            name: values.name,
            birthDate: values.birthDate,
            parentName: values.parentName,
            phone: values.phone,
            classId: values.classId,
        };
        await studentEdit.handleEdit(data);
    };
    useEffect(() => {
        if (studentData) {
            form.setFieldsValue({
                name: studentData.name,
                birthDate: studentData.birthDate,
                parentName: studentData.parentName,
                phone: studentData.phone,
                classId: studentData.classId
            });
        }
        else {
            form.resetFields();
        }
    }, [studentData]);
    return (_jsx(_Fragment, { children: _jsxs(Form, { form: form, layout: "horizontal", labelWrap: true, labelCol: { flex: "110px" }, labelAlign: "left", wrapperCol: { flex: 1 }, onFinish: handleFinish, children: [_jsx(Form.Item, { name: "name", label: "H\u1ECD v\u00E0 t\u00EAn", children: _jsx(Input, { className: "h-10", value: studentData?.name }) }), _jsx(Form.Item, { name: "birthDate", label: "Ng\u00E0y sinh", children: _jsx(Input, { className: "h-10", value: studentData?.birthDate }) }), _jsx(Form.Item, { name: "parentName", label: "T\u00EAn ph\u1EE5 huynh", children: _jsx(Input, { className: "h-10", value: studentData?.parentName }) }), _jsx(Form.Item, { name: "phone", label: "S\u0110T", children: _jsx(Input, { className: "h-10", value: studentData?.phone }) }), _jsx(Form.Item, { name: "classId", label: "L\u1EDBp", children: _jsx(Select, { filterOption: false, placeholder: "Ch\u1ECDn l\u1EDBp", className: "h-10", children: classesApi?.data.map((classOption, index) => (_jsx(Select.Option, { value: classOption?.id, children: classOption?.name }, index))) }) }), _jsx("div", { className: "flex justify-end mt-4", children: _jsx(Button, { type: "primary", htmlType: "submit", children: "L\u01B0u" }) })] }) }));
};
export default StudentProfileForm;
