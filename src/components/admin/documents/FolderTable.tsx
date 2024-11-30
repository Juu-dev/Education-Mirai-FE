import {Button, Table} from "antd";
import {FolderOpenOutlined} from "@ant-design/icons";
import useFetchApi from "../../../hooks/useFetchApi.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    searchTerm: string;
}

const FolderTable = ({searchTerm}: Props) => {
    const navigate = useNavigate();
    const {data: teachers} = useFetchApi({url: `/teachers`, auth: true})

    const handleFolderClick = (teacherId: string) => {
        navigate(`/principal/document/${teacherId}`);
    };

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { title: "Tên giáo viên", dataIndex: "name", key: "name" },
        {
            title: "Lớp",
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
            render: (team: number) => `${team}`,
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
            team: t?.class?.name,
        }));

    return <Table dataSource={parseTeachers(filteredTeachers)} columns={columns} />;
};

export default FolderTable;
