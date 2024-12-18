import React, { useState } from "react";
import { Button, Upload, message, Dropdown, Menu } from "antd";
import { UploadOutlined, DownOutlined } from "@ant-design/icons";
import useCreateApiFormData from "../../hooks/useCreateApiFormData.ts";
import useAuth from "../../hooks/useAuth.ts";
import useCreateApi from "../../hooks/useCreateApi.ts";

interface UploadButtonProps {
    onUploadSuccess: () => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onUploadSuccess }) => {
    const { creating, handleCreate: uploadApi, errorData } = useCreateApiFormData({
        url: "/file-upload/file",
        fullResp: true,
        successMsg: "File uploaded successfully!",
        errorMsg: "File upload failed.",
    });
    const { handleCreate: updateDocument } = useCreateApi({
        url: "/documents",
        fullResp: true,
    });
    const [file, setFile] = useState<any>(null); // Only one file to upload
    const { me } = useAuth();
    const [selectedOption, setSelectedOption] = useState<string | null>(null); // Null until an option is selected

    // Handle file selection and upload immediately
    const handleChange = async (info: any) => {
        if (info.fileList.length > 0) {
            const selectedFile = info.fileList[0];
            setFile(selectedFile);

            // Prepare the form data with file and additional data
            const formData = new FormData();
            formData.append("file", selectedFile.originFileObj); // Append the selected file

            // Call the API to upload the file and data
            const uploadedFile = await uploadApi(formData);
            if (uploadedFile && uploadedFile.success) {
                message.success("File uploaded successfully.");
            } else {
                message.error("File upload failed.");
            }

            const resultDocument = await updateDocument({
                teacherId: me?.teacher?.id,
                url: uploadedFile.data.Location,
                createdAt: new Date().toISOString(),
                description: uploadedFile.data.Key,
                type: selectedOption
            });
            if (resultDocument && resultDocument.success) {
                message.success("Document uploaded successfully.");
                onUploadSuccess();
            } else {
                message.error("Document upload failed.");
            }

            setFile(null);
        }
    };
    const menu = (
        <Menu
            onClick={(e) => {
                setSelectedOption(e.domEvent.target.innerText); // Extract visible text
            }}
        >
            <Menu.Item key="lecture-plan">Kế hoạch bài dạy</Menu.Item>
            <Menu.Item key="continuation-education">Bồi dưỡng thường xuyên</Menu.Item>
            <Menu.Item key="meeting-plan">Hội họp</Menu.Item>
            <Menu.Item key="lecture-note">Ghi chú</Menu.Item>
            <Menu.Item key="group-profile">Hồ sơ tổ</Menu.Item>
            <Menu.Item key="others">Khác</Menu.Item>
        </Menu>
    );


    return (
        <div>
            <Dropdown overlay={menu} trigger={["click"]}>
                <Button>
                    {selectedOption ? `Selected: ${selectedOption}` : "Chọn loại tài liệu:"} <DownOutlined />

                </Button>
            </Dropdown>
            <Upload
                beforeUpload={() => false} // Prevent automatic upload, handle manually
                onChange={handleChange} // Handle file change and upload
                fileList={file ? [file] : []} // Only display the selected file
                accept="*" // You can restrict the file types here
                disabled={!selectedOption} // Disable the upload button until an option is selected
            >
                <Button
                    icon={<UploadOutlined />}
                    loading={creating} // Show loading state during upload
                    disabled={!selectedOption || creating} // Disable button when no option is selected or uploading
                >
                    {creating
                        ? "Uploading..."
                        : selectedOption
                            ? `Upload (${selectedOption})`
                            : "Upload"}
                </Button>
            </Upload>
            {errorData && <div>Error: {errorData}</div>}
        </div>
    );
};

export default UploadButton;
