import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input, Button, Form, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const bookType = [
    { value: "textBooks", name: "Sách giáo khoa" },
    { value: "referenceBooks", name: "Sách tham khảo" },
    { value: "audioBooks", name: "Sách nói" },
];
const AddBookForm = ({ form }) => {
    const beforeUpload = (file, allowedTypes) => {
        const isAllowedType = allowedTypes.includes(file.type);
        if (!isAllowedType) {
            message.error(`Chỉ chấp nhận các file định dạng: ${allowedTypes.join(", ")}`);
        }
        return false;
    };
    return (_jsxs(Form, { layout: "vertical", form: form, children: [_jsx(Form.Item, { name: "title", label: "T\u00EAn s\u00E1ch", rules: [{ required: true, message: "Vui lòng nhập tên sách" }], children: _jsx(Input, { placeholder: "Nh\u1EADp t\u00EAn s\u00E1ch" }) }), _jsx(Form.Item, { name: "author", label: "T\u00E1c gi\u1EA3", rules: [{ required: true, message: "Vui lòng nhập tác giả" }], children: _jsx(Input, { placeholder: "Nh\u1EADp t\u00EAn t\u00E1c gi\u1EA3" }) }), _jsx(Form.Item, { name: "description", label: "M\u00F4 t\u1EA3", children: _jsx(Input.TextArea, { rows: 4, placeholder: "Nh\u1EADp m\u00F4 t\u1EA3 s\u00E1ch" }) }), _jsx(Form.Item, { name: "nxb", label: "Nh\u00E0 xu\u1EA5t b\u1EA3n", rules: [{ required: true, message: "Vui lòng nhập NXB" }], children: _jsx(Input, { placeholder: "Nh\u1EADp nh\u00E0 xu\u1EA5t b\u1EA3n" }) }), _jsx(Form.Item, { name: "type", label: "Lo\u1EA1i s\u00E1ch", rules: [{ required: true, message: "Vui lòng chọn kiểu sách" }], children: _jsx(Select, { placeholder: "Ch\u1ECDn ki\u1EC3u s\u00E1ch", children: bookType.map(type => (_jsx(Select.Option, { value: type.value, children: type.name }, type.value))) }) }), _jsx(Form.Item, { name: "cover", label: "\u1EA2nh b\u00ECa", valuePropName: "fileList", getValueFromEvent: (e) => Array.isArray(e) ? e : e?.fileList, rules: [{ required: true, message: "Vui lòng tải ảnh bìa" }], children: _jsx(Upload, { name: "cover", listType: "picture", beforeUpload: (file) => beforeUpload(file, ["image/jpeg", "image/png"]), maxCount: 1, multiple: false, children: _jsx(Button, { icon: _jsx(UploadOutlined, {}), children: "T\u1EA3i \u1EA3nh b\u00ECa" }) }) }), _jsx(Form.Item, { name: "pdf", label: "S\u00E1ch PDF", valuePropName: "fileList", getValueFromEvent: (e) => Array.isArray(e) ? e : e?.fileList, rules: [{ required: true, message: "Vui lòng tải sách PDF" }], children: _jsx(Upload, { name: "pdf", beforeUpload: (file) => beforeUpload(file, ["application/pdf"]), maxCount: 1, multiple: false, children: _jsx(Button, { icon: _jsx(UploadOutlined, {}), children: "T\u1EA3i s\u00E1ch PDF" }) }) })] }));
};
export default AddBookForm;
