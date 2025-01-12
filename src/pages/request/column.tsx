import type {ColumnsType} from "antd/es/table";
import {Button} from "antd";
import {CheckOutlined, SendOutlined} from "@ant-design/icons";

export interface Task {
    key: number;
    task: string;
    assignedBy: string;
    deadline: string;
    content: string;
    status: string;
    assignedTo?: string;
}

export const columnsReceived: ColumnsType<Task> = [
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
    },
    {
        title: "Hành động",
        key: "action",
        render: () => (
            <div className="flex space-x-2">
                <Button icon={<CheckOutlined />} type="primary" />
                <Button icon={<SendOutlined />} type="default" />
            </div>
        ),
    },
];

export const columnsSent: ColumnsType<Task> = [
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
    },
];
