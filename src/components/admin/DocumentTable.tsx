import React from "react";
import { Table, Button, Space, Select } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FolderOpenOutlined, DownloadOutlined, ShareAltOutlined } from "@ant-design/icons";

interface Props {
    handleShareClick: () => void;
}

// Mock data for documents
const mockData = [
    {
        id: "1",
        description: "Math Curriculum",
        createdAt: "2024-11-20T10:30:00Z",
        teacher: { id: "101", name: "Alice Johnson" },
    },
    {
        id: "2",
        description: "Science Syllabus",
        createdAt: "2024-11-19T08:15:00Z",
        teacher: { id: "102", name: "Bob Smith" },
    },
    {
        id: "3",
        description: "History Notes",
        createdAt: "2024-11-18T14:45:00Z",
        teacher: { id: "103", name: "Catherine Brown" },
    },
];

// Mock data for teachers with "Tổ"
const mockTeachers = [
    { id: "101", name: "Alice Johnson", team: 1 },
    { id: "102", name: "Bob Smith", team: 2 },
    { id: "103", name: "Catherine Brown", team: 3 },
    { id: "104", name: "David Lee", team: 4 },
    { id: "105", name: "Eva Davis", team: 5 },
    { id: "106", name: "Frank Miller", team: 6 },
];

const DocumentTable: React.FC<Props> = ({ handleShareClick }) => {
    const navigate = useNavigate();
    const { teacherID } = useParams(); // Get teacherID from URL
    const location = useLocation();

    const isPrincipal = location.pathname.includes("principal");

    const handleFolderClick = (teacherId: string) => {
        navigate(`/principal/document/${teacherId}`);
    };

    const renderDocuments = () => {
        const columns = [
            { title: "ID", dataIndex: "id", key: "id" },
            { title: "Name", dataIndex: "name", key: "name" },
            { title: "Ngày khởi tạo", dataIndex: "createdAt", key: "createdAt" },
            { title: "Người sở hữu", dataIndex: "owner", key: "owner" },
            {
                title: "Hành động",
                key: "action",
                render: () => (
                    <Space size="middle">
                        <Button icon={<DownloadOutlined />} />
                        <Button
                            icon={<ShareAltOutlined />}
                            onClick={handleShareClick}
                        />
                    </Space>
                ),
            },
        ];

        // Filter documents by teacherID
        const filteredData = mockData.filter(
            (doc) => doc.teacher.id === teacherID
        );

        const parseData = (data: any) =>
            data.map((e: any) => ({
                key: e.id,
                id: e.id,
                name: e.description,
                createdAt: new Date(e.createdAt).toLocaleDateString(),
                owner: e.teacher.name,
            }));

        return <Table dataSource={parseData(filteredData)} columns={columns} />;
    };

    const renderFolders = () => {
        const columns = [
            { title: "Tên giáo viên", dataIndex: "name", key: "name" },
            { 
                title: "Tổ", 
                dataIndex: "team", 
                key: "team", 
                filters: [
                    { text: "Tổ 1", value: 1 },
                    { text: "Tổ 2", value: 2 },
                    { text: "Tổ 3", value: 3 },
                    { text: "Tổ 4", value: 4 },
                    { text: "Tổ 5", value: 5 },
                    { text: "Tổ 6", value: 6 }
                ],
                onFilter: (value: any, record: any) => record.team === value,
                render: (team: number) => `Tổ ${team}`,
            },
            {
                title: "Thao tác",
                key: "action",
                render: (_: any, record: any) => (
                    <Button
                        icon={<FolderOpenOutlined />}
                        onClick={() => handleFolderClick(record.id)}
                    >
                        Xem tài liệu
                    </Button>
                ),
            },
        ];

        const parseTeachers = (teachers: any) =>
            teachers.map((t: any) => ({
                key: t.id,
                id: t.id,
                name: t.name,
                team: t.team,
            }));

        return <Table dataSource={parseTeachers(mockTeachers)} columns={columns} />;
    };

    return isPrincipal && !teacherID ? renderFolders() : renderDocuments();
};

export default DocumentTable;
