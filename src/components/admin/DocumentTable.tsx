import React from "react";
import { Table, Button, Space } from "antd";
import { DownloadOutlined, ShareAltOutlined } from "@ant-design/icons";
import useFetchApi from "../../hooks/useFetchApi";
import { formatDate } from "../../helpers/date";
import {useLocation} from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";

interface Props {
    handleShareClick: () => void;
}

const DocumentTable: React.FC<Props> = ({ handleShareClick }) => {
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
            title: "Ngày khởi tạo",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {
            title: "Người sở hữu",
            dataIndex: "owner",
            key: "owner",
        },
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
    const {me} = useAuth();

    const location = useLocation();
    const isPrincipal = location.pathname.includes("principal");
    const path = isPrincipal ? "/documents/pagination" : `/documents/pagination/${me.teacher.id}`
    console.log("path: ", path)

    // const [data, setData] = useState();
    const {data, count, pagination} = useFetchApi({url: path, auth: true})

    const parseData = (data: any) => data.map((e: any) => ({
        key: e.id,
        id: e.id,
        name: e.description,
        createdAt: formatDate(e.createdAt),
        owner: e.teacher.name
    }))

    return (
        <Table dataSource={parseData(data)} columns={columns} pagination={false} />
    );
};

export default DocumentTable;
