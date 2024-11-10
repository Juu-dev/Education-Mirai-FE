import React, {useState} from "react";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useCreateApiFormData from "../../hooks/useCreateApiFormData.ts";
import useAuth from "../../hooks/useAuth.ts";
import useCreateApi from "../../hooks/useCreateApi.ts";

const UploadButton: React.FC = () => {
    const { creating, handleCreate: uploadApi, errorData } = useCreateApiFormData({
        url: "/file-upload/file",
        fullResp: true,
        successMsg: "File uploaded successfully!",
        errorMsg: "File upload failed.",
    });
    const { handleCreate: updateDocument} = useCreateApi({
        url: "/documents",
        fullResp: true,
    });
    const [file, setFile] = useState<any>(null); // Only one file to upload
    const {me} = useAuth()
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
                teacherId: me.teacher.id,
                url: uploadedFile.data.Location,
                createdAt: new Date().toISOString(),
                description: uploadedFile.data.Key
            });
            if (resultDocument && resultDocument.success) {
                message.success("Document uploaded successfully.");
            } else {
                message.error("Document upload failed.");
            }
        }
    };

    return (
        <div>
            <Upload
                beforeUpload={() => false} // Prevent automatic upload, handle manually
                onChange={handleChange} // Handle file change and upload
                fileList={file ? [file] : []} // Only display the selected file
                accept="*" // You can restrict the file types here
            >
                <Button
                    icon={<UploadOutlined/>}
                    loading={creating} // Show loading state during upload
                    disabled={creating} // Disable button when uploading
                >
                    {creating ? "Uploading..." : "Upload"}
                </Button>
            </Upload>
            {errorData && <div>Error: {errorData}</div>}
        </div>
    );
};

export default UploadButton;
