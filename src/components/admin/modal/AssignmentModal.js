import { jsx as _jsx } from "react/jsx-runtime";
import { Modal, Table, Button } from "antd";
const AssignmentModal = ({ visible, onCancel, assignmentData, }) => {
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ngày giao",
            dataIndex: "dueDate",
            key: "dueDate",
        },
        {
            title: "Số câu",
            dataIndex: "questionCount",
            key: "questionCount",
        },
        {
            title: "Môn",
            dataIndex: "subject",
            key: "subject",
        },
        {
            title: "Loại",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Hành động",
            key: "action",
            render: () => _jsx(Button, { type: "primary", children: "Th\u00EAm" }),
        },
    ];
    return (_jsx(Modal, { title: "Giao b\u00E0i t\u1EADp", visible: visible, onCancel: onCancel, footer: [
            _jsx(Button, { type: "primary", children: "Th\u00EAm" }, "add"),
            _jsx(Button, { onClick: onCancel, children: "H\u1EE7y" }, "cancel"),
        ], width: 600, bodyStyle: { maxHeight: "400px", overflowY: "auto" }, children: _jsx(Table, { columns: columns, dataSource: assignmentData, pagination: false, scroll: { y: 300 } }) }));
};
export default AssignmentModal;
