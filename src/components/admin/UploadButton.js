import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button, Upload, message, Dropdown, Menu } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useCreateApiFormData from "../../hooks/useCreateApiFormData";
import useAuth from "../../hooks/useAuth";
import { MENU_UPLOAD } from "../../constants/document-type";
const UploadButton = ({ onUploadSuccess }) => {
    const { creating, handleCreate: updateDocument, errorData } = useCreateApiFormData({
        url: "/documents",
        fullResp: true,
        successMsg: "Thêm tài liệu thành công",
        errorMsg: "Thêm tài liệu thất bại",
    });
    const [file, setFile] = useState(null); // Only one file to upload
    const { me } = useAuth();
    const [selectedOption, setSelectedOption] = useState(null); // Null until an option is selected
    // Handle file selection and upload immediately
    const handleChange = async (info, e) => {
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
            }
            else {
                message.error("Document upload failed.");
            }
            setFile(null);
            setSelectedOption(null);
        }
    };
    const menu = (_jsx(Menu, { children: MENU_UPLOAD.map((e) => _jsx(Menu.Item, { onClick: () => setSelectedOption(e), children: _jsx(Upload, { beforeUpload: () => false, onChange: (info) => handleChange(info, e), fileList: file ? [file] : [], accept: "*" // You can restrict the file types here
                , children: e.value }) }, e.key)) }));
    return (_jsxs("div", { children: [_jsx(Dropdown, { overlay: menu, trigger: ["click"], children: _jsxs(Button, { children: [_jsx(UploadOutlined, {}), " ", creating
                            ? "Uploading..."
                            : selectedOption
                                ? `Upload (${selectedOption.value})`
                                : "Upload document"] }) }), errorData && _jsxs("div", { children: ["Error: ", errorData] })] }));
};
export default UploadButton;
