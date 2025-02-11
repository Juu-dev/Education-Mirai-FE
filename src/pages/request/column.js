import { jsx as _jsx } from "react/jsx-runtime";
import { Dropdown } from "antd";
import { requestStatus } from "../../constants/status/requestStatus";
export const columnsReceived = (handleStatusChange) => ([
    {
        title: "Tên công việc",
        dataIndex: "task",
        key: "task",
    },
    {
        title: "Người giao",
        dataIndex: "assignedBy",
        key: "assignedBy",
    },
    {
        title: "Deadline",
        dataIndex: "deadline",
        key: "deadline",
    },
    {
        title: "Nội dung",
        dataIndex: "content",
        key: "content",
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (status, record) => {
            const statuses = [
                { label: requestStatus.pending, value: 'pending', color: 'bg-orange-200 text-orange-600' },
                { label: requestStatus.inProgress, value: 'inProgress', color: 'bg-blue-200 text-blue-600' },
                { label: requestStatus.completed, value: 'completed', color: 'bg-green-200 text-green-600' },
                { label: requestStatus.delivered, value: 'delivered', color: 'bg-purple-200 text-purple-600' },
            ];
            const menuItems = statuses.map((status) => ({
                key: status.value,
                label: (_jsx("span", { className: `px-2 py-1 whitespace-nowrap rounded ${status.color}`, children: status.label })),
            }));
            console.log("status: ", statuses.find((e) => e.label === status)?.color);
            return (_jsx(Dropdown, { menu: { items: menuItems, onClick: (e) => handleStatusChange(e.key) }, trigger: ['click'], children: _jsx("button", { className: `rounded whitespace-nowrap shadow-sm hover:shadow focus:outline-none ${statuses.find((e) => e.label === status)?.color}`, children: _jsx("span", { children: status }) }) }));
        },
    },
]);
export const columnsSent = (handleStatusChange) => ([
    {
        title: "Tên công việc",
        dataIndex: "task",
        key: "task",
    },
    {
        title: "Gửi tới người",
        dataIndex: "assignedTo",
        key: "assignedTo",
    },
    {
        title: "Deadline",
        dataIndex: "deadline",
        key: "deadline",
    },
    {
        title: "Nội dung",
        dataIndex: "content",
        key: "content",
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (status, record) => {
            const statuses = [
                { label: requestStatus.pending, value: 'pending', color: 'bg-orange-200 text-orange-600' },
                { label: requestStatus.inProgress, value: 'inProgress', color: 'bg-blue-200 text-blue-600' },
                { label: requestStatus.completed, value: 'completed', color: 'bg-green-200 text-green-600' },
                { label: requestStatus.delivered, value: 'delivered', color: 'bg-purple-200 text-purple-600' },
            ];
            const menuItems = statuses.map((status) => ({
                key: status.value,
                label: (_jsx("span", { className: `px-2 py-1 whitespace-nowrap rounded ${status.color}`, children: status.label })),
            }));
            console.log("status: ", statuses.find((e) => e.label === status)?.color);
            return (_jsx(Dropdown, { menu: { items: menuItems, onClick: (e) => handleStatusChange(e.key) }, trigger: ['click'], children: _jsx("button", { className: `rounded whitespace-nowrap shadow-sm hover:shadow focus:outline-none ${statuses.find((e) => e.label === status)?.color}`, children: _jsx("span", { children: status }) }) }));
        },
    },
]);
