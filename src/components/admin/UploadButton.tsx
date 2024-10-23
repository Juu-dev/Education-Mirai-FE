import React from "react";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

const uploadProps: UploadProps = {
    name: "file",
    action: "/upload.do",
    headers: {
        authorization: "authorization-text",
    },
    onChange(info) {
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const UploadButton: React.FC = () => {
    return (
        <Upload {...uploadProps}>
            <Button type="default" icon={<UploadOutlined />} className="p-4">
                Upload
            </Button>
        </Upload>
    );
};

export default UploadButton;
