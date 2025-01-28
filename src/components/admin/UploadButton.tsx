import React, { useState } from "react";
import { Button, Upload, message, Dropdown, Menu } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useCreateApiFormData from "../../hooks/useCreateApiFormData";
import useAuth from "../../hooks/useAuth";
import {IMenuItem, MENU_UPLOAD} from "../../constants/document-type";

interface UploadButtonProps {
    onUploadSuccess: () => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onUploadSuccess }) => {
    const { creating, handleCreate: updateDocument, errorData } = useCreateApiFormData({
        url: "/documents",
        fullResp: true,
        successMsg: "Thêm tài liệu thành công",
        errorMsg: "Thêm tài liệu thất bại",
    });
    const [file, setFile] = useState<any>(null); // Only one file to upload
    const { me } = useAuth();
    const [selectedOption, setSelectedOption] = useState<IMenuItem | null>(null); // Null until an option is selected

    // Handle file selection and upload immediately
    const handleChange = async (info: any, e: IMenuItem) => {
        if (info.fileList.length > 0) {
            const selectedFile = info.fileList[0];
            setFile(selectedFile);

            // Prepare the form data with file and additional data
            const formData = new FormData();
            formData.append("files", selectedFile.originFileObj); // Append the selected file
            formData.append("userId", me?.id);
            formData.append("description", selectedFile.name);
            formData.append("type", e.key);

            const success = await updateDocument(formData);
            if (success) {
                message.success("Document uploaded successfully.");
                onUploadSuccess();
            } else {
                message.error("Document upload failed.");
            }

            setFile(null);
            setSelectedOption(null);
        }
    };

    const menu = (
        <Menu>
            {MENU_UPLOAD.map((e) =>
                <Menu.Item
                    key={e.key}
                    onClick={() => setSelectedOption(e)
                }>
                    <Upload
                        beforeUpload={() => false} // Prevent automatic upload, handle manually
                        onChange={(info) => handleChange(info, e)} // Handle file change and upload
                        fileList={file ? [file] : []} // Only display the selected file
                        accept="*" // You can restrict the file types here
                    >
                        {e.value}
                    </Upload>
                </Menu.Item>
            )}
        </Menu>
    );

    return (
        <div>
            <Dropdown overlay={menu} trigger={["click"]}>
                <Button>
                    <UploadOutlined /> {creating
                    ? "Uploading..."
                    : selectedOption
                    ? `Upload (${selectedOption.value})`
                    : "Upload document"}
                </Button>
            </Dropdown>
            {errorData && <div>Error: {errorData}</div>}
        </div>
    );
};

export default UploadButton;
