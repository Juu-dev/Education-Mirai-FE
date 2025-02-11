import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Table, Space, Modal, Upload, message, Input, Select } from 'antd';
import { DownloadOutlined, ShareAltOutlined, FolderAddOutlined, FileAddOutlined, UploadOutlined } from '@ant-design/icons';
const { Option } = Select;
// Upload button props
const uploadProps = {
    name: 'file',
    action: '/upload.do', // Example upload URL
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        }
        else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
const LibrarianDocumentPage = () => {
    const [isChooseTemplateModalVisible, setIsChooseTemplateModalVisible] = useState(false);
    const [isAddTemplateModalVisible, setIsAddTemplateModalVisible] = useState(false);
    // Sample document data
    const dataSource = [
        {
            key: '1',
            id: '01',
            name: 'Hồ sơ học sinh',
            createdAt: '09/03/2024',
            owner: 'Bình Tống',
        },
        {
            key: '2',
            id: '02',
            name: 'Nguyễn Bình An',
            createdAt: '09/03/2024',
            owner: 'Bình Tống',
        },
    ];
    // Template data for form
    const templateData = [
        {
            key: '1',
            id: '01',
            name: 'Hồ sơ học sinh',
            userType: 'Hiệu trưởng',
        },
    ];
    const templateColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Đối tượng sử dụng',
            dataIndex: 'userType',
            key: 'userType',
        },
        {
            title: 'Tải xuống',
            key: 'download',
            render: () => _jsx(Button, { icon: _jsx(DownloadOutlined, {}) }),
        },
    ];
    // Table columns configuration
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày khởi tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Đồng sở hữu',
            dataIndex: 'owner',
            key: 'owner',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: () => (_jsxs(Space, { size: "middle", children: [_jsx(Button, { icon: _jsx(DownloadOutlined, {}) }), _jsx(Button, { icon: _jsx(ShareAltOutlined, {}) })] })),
        },
    ];
    // Show form for choosing template
    const showChooseTemplateModal = () => {
        setIsChooseTemplateModalVisible(true);
    };
    // Show form for adding template
    const showAddTemplateModal = () => {
        setIsAddTemplateModalVisible(true);
    };
    // Hide modals
    const handleCancelChooseTemplateModal = () => {
        setIsChooseTemplateModalVisible(false);
    };
    const handleCancelAddTemplateModal = () => {
        setIsAddTemplateModalVisible(false);
    };
    return (_jsxs("div", { className: "p-5", children: [_jsxs("div", { className: "flex gap-4 pb-3", children: [_jsx(Button, { type: "primary", icon: _jsx(FolderAddOutlined, {}), className: "p-4", children: "New Folder" }), _jsx(Button, { type: "default", icon: _jsx(FileAddOutlined, {}), className: "p-4", onClick: showChooseTemplateModal, children: "Use Template" }), _jsx(Upload, { ...uploadProps, children: _jsx(Button, { type: "default", icon: _jsx(UploadOutlined, {}), className: "p-4", children: "Upload" }) })] }), _jsx(Table, { dataSource: dataSource, columns: columns, pagination: false }), _jsxs(Modal, { title: "L\u1EF1a ch\u1ECDn template", open: isChooseTemplateModalVisible, onCancel: handleCancelChooseTemplateModal, footer: null, children: [_jsx(Table, { dataSource: templateData, columns: templateColumns, pagination: false }), _jsx("div", { className: "flex justify-end mt-4", children: _jsx(Button, { type: "primary", onClick: showAddTemplateModal, children: "Th\u00EAm m\u1EABu" }) })] }), _jsxs(Modal, { title: "Th\u00EAm m\u1EABu m\u1EDBi", open: isAddTemplateModalVisible, onCancel: handleCancelAddTemplateModal, footer: null, children: [_jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "mb-2", children: "T\u00EAn t\u00E0i li\u1EC7u" }), _jsx(Input, { placeholder: "Enter document name" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "mb-2", children: "\u0110\u1ED1i t\u01B0\u1EE3ng s\u1EED d\u1EE5ng" }), _jsxs(Select, { placeholder: "Select user type", className: "w-full", children: [_jsx(Option, { value: "student", children: "Student" }), _jsx(Option, { value: "teacher", children: "Teacher" }), _jsx(Option, { value: "principal", children: "Principal" })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "mb-2", children: "\u0110\u00EDnh k\u00E8m" }), _jsx(Upload, { children: _jsx(Button, { icon: _jsx(UploadOutlined, {}), children: "Click to Upload" }) })] }), _jsx("div", { className: "flex justify-end mt-4", children: _jsx(Button, { type: "primary", children: "Th\u00EAm m\u1EABu" }) })] })] }));
};
export default LibrarianDocumentPage;
