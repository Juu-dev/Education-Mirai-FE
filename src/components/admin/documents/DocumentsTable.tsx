import { Button, message, Pagination, Space, Table } from "antd";
import { DeleteOutlined, DownloadOutlined, ShareAltOutlined, LinkOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import useFetchApi from "../../../hooks/useFetchApi";
import { getValueFromMenuUploadByKey } from "../../../constants/document-type";
import useModal from "../../../hooks/modal/useModal";
import useDeleteApi from "../../../hooks/useDeleteApi";

interface Document {
    id: string;
    description: string;
    type: string;
    createdAt: string;
    user: { name: string };
    url: string;
}

interface Props {
    handleShareClick: () => void;
    userId: string;
    isTableDataUpdated: boolean;
    searchTerm: string;
    filterType: string[];
}

const DocumentTable: React.FC<Props> = ({
    handleShareClick,
    userId,
    isTableDataUpdated,
    searchTerm,
    filterType,
}: Props) => {
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

    const { deleting, handleDelete } = useDeleteApi({ url: `/documents/${selectedDocument?.id}`, auth: true });
    const documentsApi: any = useFetchApi({ url: `/documents/pagination/${userId}`, auth: true });

    const handleOkClick = async () => {
        const success = await handleDelete();
        if (success) {
            message.success("Xóa tài liệu thành công!");
            await handleRefresh();
            deleteDocumentModal.closeModal();
        } else {
            message.error("Xóa tài liệu thất bại. Vui lòng thử lại!");
            deleteDocumentModal.closeModal();
        }
    };

    useEffect(() => {
        const params: Record<string, any> = {};

        if (searchTerm) params.search = searchTerm;
        if (filterType.length > 0) params.type = filterType;

        documentsApi.fetchApi(`/documents/pagination/${userId}`, { params });
    }, [userId, searchTerm, filterType]);

    const handleRefresh = async () => {
        await documentsApi.fetchApi(`/documents/pagination/${userId}`);
    };

    const handlePageChange = (page: number) => {
        documentsApi?.fetchApi(undefined, { params: { page, pageSize: documentsApi.pagination?.pageSize || 10 } });
    };

    useEffect(() => {
        handleRefresh().then(() => {});
    }, [isTableDataUpdated]);

    const deleteDocumentModal = useModal({
        title: "Xác nhận xoá tài liệu",
        content: <p>Bạn có chắc chắn muốn xoá tài liệu <b>{selectedDocument?.description}</b> ?</p>,
        handleOk: handleOkClick,
        footer: (
            <>
                <Button key="cancel">No</Button>
                <Button key="ok" type="primary" onClick={handleOkClick} loading={deleting}>
                    Yes
                </Button>
            </>
        ),
    });

    const handleDeleteDocument = (row: Document) => {
        setSelectedDocument(row);
        deleteDocumentModal.openModal();
    };

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Người sở hữu", dataIndex: "owner", key: "owner" },
        { title: "Ngày khởi tạo", dataIndex: "createdAt", key: "createdAt" },
        { title: "Loại tài liệu", dataIndex: "type", key: "type" },
        {
            title: "Hành động",
            key: "action",
            render: (row: Document) => (
                <Space size="middle">
                    <Button type="link" onClick={() => window.open(row.url, "_blank")} icon={<LinkOutlined />} />
                    <Button icon={<DownloadOutlined />} />
                    <Button icon={<ShareAltOutlined />} onClick={handleShareClick} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDeleteDocument(row)} />
                </Space>
            ),
        },
    ];

    const parseData = (data: Document[]) =>
        data.map((e) => ({
            key: e.id,
            id: e.id,
            name: e.description,
            type: getValueFromMenuUploadByKey(e.type),
            createdAt: new Date(e.createdAt).toLocaleDateString(),
            owner: e?.user?.name,
            url: e.url,
        }));

    return (
        <>
            <Table dataSource={parseData(documentsApi.data)} columns={columns} pagination={false} />

            <Pagination
                current={documentsApi?.pagination?.page}
                total={documentsApi?.count}
                pageSize={documentsApi?.pagination?.pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
                align="end"
                className="custom-pagination mt-3"
            />

            {deleteDocumentModal.modal}
        </>
    );
};

export default DocumentTable;
