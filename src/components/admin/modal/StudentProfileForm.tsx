import { useState } from "react";
import { Form, Input, Button } from "antd";

interface StudentProfileModalProps {
    studentData: any | null;
}

const StudentProfileForm: React.FC<StudentProfileModalProps> = ({studentData}) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Here, you would typically handle saving the data
        // For now, we will just disable editing
        setIsEditing(false);
    };

    return (
        <>
            <Form
                layout="horizontal"
                labelWrap
                labelCol={{ flex: "110px" }}
                labelAlign="left"
                wrapperCol={{ flex: 1 }}>
                <Form.Item label="Họ và tên">
                    <Input value={studentData?.name} readOnly={!isEditing} />
                </Form.Item>
                <Form.Item label="ID">
                    <Input value={studentData?.id} readOnly={!isEditing} />
                </Form.Item>
                <Form.Item label="Ngày sinh">
                    <Input
                        value={studentData?.birthDate}
                        readOnly={!isEditing}
                    />
                </Form.Item>
                <Form.Item label="Tên phụ huynh">
                    <Input
                        value={studentData?.parentName}
                        readOnly={!isEditing}
                    />
                </Form.Item>
                <Form.Item label="SĐT">
                    <Input value={studentData?.phone} readOnly={!isEditing} />
                </Form.Item>
                <Form.Item label="Lớp">
                    <Input value={studentData?.class} readOnly={!isEditing} />
                </Form.Item>
            </Form>
            <div className="flex justify-end mt-4">
                {!isEditing ? (
                    <Button type="primary" onClick={handleEditClick}>
                        Chỉnh sửa
                    </Button>
                ) : (
                    <Button type="primary" onClick={handleSaveClick}>
                        Lưu
                    </Button>
                )}
            </div>
        </>
    );
};

export default StudentProfileForm;
