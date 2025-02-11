import {Button, Table} from "antd";
import {FolderOpenOutlined} from "@ant-design/icons";
import useFetchApi from "../../../hooks/useFetchApi";
import {useNavigate} from "react-router-dom";

interface Props {
    searchTerm: string;
}

const CLASSES = {
    CLASS_ONE: ["1", "1A", "1B", "1C", "1D", "1E", "1G"],
    CLASS_TWO_THREE: ["2A", "2B", "2C", "2D", "2E", "2G", "3", "3A", "3B", "3C", "3D", "3E"],
    CLASS_FOUR_FIVE: ["4A", "4B", "4C", "4D", "4E", "4G", "5A", "5B", "5C", "5D", "5E", "5G"],
    CLASS_SPECIAL: ["AN","MT","TH","TV","TD","TA"],
    CLASS_PRINCIPAL: ["HT", "HP"]
}

const FolderTable = ({searchTerm}: Props) => {
    const navigate = useNavigate();
    const {data: users} = useFetchApi({url: `/users/librarian-and-teacher`, auth: true})

    const handleFolderClick = (userId: string) => {
        navigate(`/principal/document/${userId}`);
    };

    const filteredTeachers = users.filter((user: any) =>
        user!.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns: any = [
        { title: "Tên giáo viên", dataIndex: "name", key: "name" },
        {
            title: "Lớp",
            dataIndex: "team",
            key: "team",
            filters: [
                { text: "Tổ 1", value: CLASSES.CLASS_ONE },
                { text: "Tổ 2,3", value: CLASSES.CLASS_TWO_THREE },
                { text: "Tổ 4,5", value: CLASSES.CLASS_FOUR_FIVE },
                { text: "Tổ giám hiệu", value: CLASSES.CLASS_PRINCIPAL },
                { text: "Tổ chuyên biệt", value: CLASSES.CLASS_SPECIAL }
            ],
            onFilter: (value: any, record: any) => value.includes(record.team),
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

    const parseTeachers = (users: any) =>
        users.map((t: any) => ({
            key: t.id,
            id: t.id,
            name: t.name,
            team: t?.class?.name,
        }));

    return <Table dataSource={parseTeachers(filteredTeachers)} columns={columns} />;
};

export default FolderTable;
