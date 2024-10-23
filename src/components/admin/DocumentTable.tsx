import React from "react";
import { Table, Button, Space } from "antd";
import { DownloadOutlined, ShareAltOutlined } from "@ant-design/icons";
import { DATA_SOURCE } from "../../constants/mocks/document";

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
            title: "Đồng sở hữu",
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

    return (
        <Table dataSource={DATA_SOURCE} columns={columns} pagination={false} />
    );
};

export default DocumentTable;
