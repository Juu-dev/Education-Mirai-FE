import React from "react";
import { Modal, Input, Button, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

interface Props {
    isVisible: boolean;
    onCancel: () => void;
}

const AddTemplateModal: React.FC<Props> = ({ isVisible, onCancel }) => (
    <Modal
        title="Thêm mẫu mới"
        visible={isVisible}
        onCancel={onCancel}
        footer={null}>
        <div className="mb-4">
            <div className="mb-2">Tên tài liệu</div>
            <Input placeholder="Enter document name" />
        </div>
        <div className="mb-4">
            <div className="mb-2">Đối tượng sử dụng</div>
            <Select placeholder="Select user type" className="w-full">
                <Option value="student">Student</Option>
                <Option value="teacher">Teacher</Option>
                <Option value="principal">Principal</Option>
            </Select>
        </div>
        <div className="mb-4">
            <div className="mb-2">Đính kèm</div>
            <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </div>
        <div className="flex justify-end mt-4">
            <Button type="primary">Thêm mẫu</Button>
        </div>
    </Modal>
);

export default AddTemplateModal;
