import {Button, Space, Table} from "antd";
import {DeleteOutlined, DownloadOutlined, ShareAltOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import useFetchApi from "../../../hooks/useFetchApi.ts";
import DeleteDocumentModal from "../modal/DeleteDocumentModal.tsx";

interface Props {
    handleShareClick: () => void;
    teacherId: string;
}

const DocumentTable: React.FC<Props> = ({ handleShareClick, teacherId }) => {
    const {data: documents, fetchApi: fetchDocumentsApi} = useFetchApi({url: `/documents/pagination/${teacherId}`, auth: true})
    const [selectedDocument, setSelectedDocument] = useState(null);

    const handleRefresh = async () => {
        await fetchDocumentsApi(`/documents/pagination/${teacherId}`);
    };

    const [isDeleteDocumentModalVisible, setIsDeleteDocumentModalVisible] = useState(false);

    const handleOpenModal = () => {
        setIsDeleteDocumentModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsDeleteDocumentModalVisible(false);
    };

    const handleDeleteDocument = (row) => {
        setSelectedDocument(row);
        handleOpenModal()
    };

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Link", dataIndex: "url", key: "url" },
        { title: "Người sở hữu", dataIndex: "owner", key: "owner" },
        { title: "Ngày khởi tạo", dataIndex: "createdAt", key: "createdAt" },
        {
            title: "Hành động",
            key: "action",
            render: (row: any) => (
                <Space size="middle">
                    <Button icon={<DownloadOutlined />} />
                    <Button
                        icon={<ShareAltOutlined />}
                        onClick={handleShareClick}
                    />
                    <Button icon={<DeleteOutlined />} onClick={() =>
                        handleDeleteDocument(row)
                    } />
                </Space>
            ),
        },
    ];

    const parseData = (data: any) =>
        data.map((e: any) => ({
            key: e.id,
            id: e.id,
            name: e.description,
            createdAt: new Date(e.createdAt).toLocaleDateString(),
            owner: e.teacher.name,
            url: e.url
        }));

    return <>
        <Table dataSource={parseData(documents)} columns={columns} />
        <DeleteDocumentModal
            visible={isDeleteDocumentModalVisible}
            title="Xác nhận xoá tài liệu"
            content={<p>Bạn có chắc chắn muốn xoá tài liệu <b>{selectedDocument?.name}</b> ?</p>}
            onCancel={handleCloseModal}
            okText="Yes"
            cancelText="No"
            url={`/documents/${selectedDocument?.id}`}
            handleRefresh={handleRefresh}
        />
    </>
};

export default DocumentTable;
