import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Input, Select, Table, Upload } from "antd";
import { OBJECT_DATA, SHARE_LIST_DATA, TEMPLATE_DATA } from "../../constants/mocks/document";
import { SHARE_LIST_COLUMNS, TEMPLATE_COLUMNS } from "../../constants/document-modal";
import { UploadOutlined } from "@ant-design/icons";
export const templateModalParams = (openModal) => ({
    title: "Lựa chọn template",
    content: _jsxs(_Fragment, { children: [_jsx(Table, { dataSource: TEMPLATE_DATA, columns: TEMPLATE_COLUMNS, pagination: false }), _jsx("div", { className: "flex justify-end mt-4", children: _jsx(Button, { type: "primary", onClick: openModal, children: "Th\u00EAm m\u1EABu" }) })] })
});
export const shareDocumentModalParams = {
    title: "Share Document",
    content: _jsxs(_Fragment, { children: [_jsx(Input.Search, { placeholder: "Search by name or email", className: "mb-4" }), _jsx(Table, { dataSource: SHARE_LIST_DATA, columns: SHARE_LIST_COLUMNS, pagination: false }), _jsx("div", { className: "flex justify-end mt-4", children: _jsx(Button, { type: "primary", children: "Chia s\u1EBB" }) })] })
};
export const addTemplateModalParams = {
    title: "Thêm mẫu mới",
    content: _jsxs(_Fragment, { children: [_jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "mb-2", children: "T\u00EAn t\u00E0i li\u1EC7u" }), _jsx(Input, { placeholder: "Enter document name" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "mb-2", children: "\u0110\u1ED1i t\u01B0\u1EE3ng s\u1EED d\u1EE5ng" }), _jsx(Select, { placeholder: "Select user type", className: "w-full", options: OBJECT_DATA })] }), _jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "mb-2", children: "\u0110\u00EDnh k\u00E8m" }), _jsx(Upload, { children: _jsx(Button, { icon: _jsx(UploadOutlined, {}), children: "Click to Upload" }) })] }), _jsx("div", { className: "flex justify-end mt-4", children: _jsx(Button, { type: "primary", children: "Th\u00EAm m\u1EABu" }) })] })
};
