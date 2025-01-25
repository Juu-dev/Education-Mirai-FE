import {Dropdown, MenuProps, Select} from "antd";
import type {ColumnsType} from "antd/es/table";
import { requestStatus } from "../../constants/status/requestStatus";

export interface Task {
    key: number;
    task: string;
    assignedBy: string;
    deadline: string;
    content: string;
    status: string;
    assignedTo?: string;
}

export const columnsReceived: (handleStatusChange: any) => ColumnsType<Task> = (handleStatusChange) => ([
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
        render: (status: string, record: Task) => {
            const statuses = [
                { label: requestStatus.pending, value: 'pending', color: 'bg-orange-200 text-orange-600' },
                { label: requestStatus.inProgress, value: 'inProgress', color: 'bg-blue-200 text-blue-600' },
                { label: requestStatus.completed, value: 'completed', color: 'bg-green-200 text-green-600' },
                { label: requestStatus.delivered, value: 'delivered', color: 'bg-purple-200 text-purple-600' },
            ];

            const menuItems: MenuProps['items'] = statuses.map((status) => ({
                key: status.value,
                label: (
                    <span className={`px-2 py-1 whitespace-nowrap rounded ${status.color}`}>
                    {status.label}
                  </span>
                ),
            }));

            console.log("status: ", statuses.find((e) => e.label === status)?.color)

            return (
                <Dropdown
                    menu={{ items: menuItems, onClick: (e) => handleStatusChange(e.key) }}
                    trigger={['click']}
                >
                    <button className={`rounded whitespace-nowrap shadow-sm hover:shadow focus:outline-none ${statuses.find((e) => e.label === status)?.color}`}>
                        <span>{status}</span>
                    </button>
                </Dropdown>
            )
        },
    },
]);

export const columnsSent: (handleStatusChange: any) => ColumnsType<Task> = (handleStatusChange) => ([
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
        render: (status: string, record: Task) => {
            const statuses = [
                { label: requestStatus.pending, value: 'pending', color: 'bg-orange-200 text-orange-600' },
                { label: requestStatus.inProgress, value: 'inProgress', color: 'bg-blue-200 text-blue-600' },
                { label: requestStatus.completed, value: 'completed', color: 'bg-green-200 text-green-600' },
                { label: requestStatus.delivered, value: 'delivered', color: 'bg-purple-200 text-purple-600' },
            ];

            const menuItems: MenuProps['items'] = statuses.map((status) => ({
                key: status.value,
                label: (
                    <span className={`px-2 py-1 whitespace-nowrap rounded ${status.color}`}>
                    {status.label}
                  </span>
                ),
            }));

            console.log("status: ", statuses.find((e) => e.label === status)?.color)

            return (
                <Dropdown
                    menu={{ items: menuItems, onClick: (e) => handleStatusChange(e.key) }}
                    trigger={['click']}
                >
                    <button className={`rounded whitespace-nowrap shadow-sm hover:shadow focus:outline-none ${statuses.find((e) => e.label === status)?.color}`}>
                        <span>{status}</span>
                    </button>
                </Dropdown>
            )
        },
    },
]);
