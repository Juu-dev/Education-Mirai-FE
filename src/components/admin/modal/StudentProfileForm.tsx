import {Form, Input, Button, Select, message} from "antd";
import useEditApi from "../../../hooks/useEditApi";
import React, {useEffect} from "react";
import useFetchApi from "../../../hooks/useFetchApi";
import {classPath} from "../../../helpers/api-params/auth";

interface StudentProfileModalProps {
    studentData: any | null;
}

const StudentProfileForm: React.FC<StudentProfileModalProps> = ({studentData}) => {
    const [form] = Form.useForm();
    const classesApi = useFetchApi(classPath)
    const studentEdit = useEditApi({
        url: `/users/student/${studentData.userId}`,
        handleSuccess: () => message.success("Sửa thông tin học sinh thành công!"),
        handleError: () => message.error("Sửa thông tin học sinh thất bại, vui lòng thử lại."),
        fullResp: true,
    })

    const handleFinish = async (values) => {
        const data = {
            name: values.name,
            birthDate: values.birthDate,
            parentName: values.parentName,
            phone: values.phone,
            classId: values.classId,
        }
        await studentEdit.handleEdit(data)
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
        } else {
            form.resetFields();
        }
    }, [studentData]);

    return (
        <>
            <Form
                form={form}
                layout="horizontal"
                labelWrap
                labelCol={{ flex: "110px" }}
                labelAlign="left"
                wrapperCol={{ flex: 1 }}
                onFinish={handleFinish}>
                <Form.Item name="name" label="Họ và tên">
                    <Input className="h-10" value={studentData?.name} />
                </Form.Item>
                <Form.Item name="birthDate" label="Ngày sinh">
                    <Input className="h-10" value={studentData?.birthDate}/>
                </Form.Item>
                <Form.Item name="parentName" label="Tên phụ huynh">
                    <Input className="h-10" value={studentData?.parentName} />
                </Form.Item>
                <Form.Item name="phone" label="SĐT">
                    <Input className="h-10" value={studentData?.phone}/>
                </Form.Item>
                <Form.Item name="classId" label="Lớp">
                    <Select
                        filterOption={false}
                        placeholder="Chọn lớp"
                        className="h-10"
                    >
                        {classesApi?.data.map((classOption: any, index) => (
                            <Select.Option key={index} value={classOption?.id}>
                                {classOption?.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <div className="flex justify-end mt-4">
                    <Button type="primary" htmlType="submit">
                        Lưu
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default StudentProfileForm;
