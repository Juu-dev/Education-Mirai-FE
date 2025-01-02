import {Button, message, Space, Table} from "antd";
import {DeleteOutlined, DownloadOutlined, ShareAltOutlined, LinkOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import useFetchApi from "../../../hooks/useFetchApi.ts";
import {getValueFromMenuUploadByKey} from "../../../constants/document-type.ts";
import useModal from "../../../hooks/modal/useModal.tsx";
import useDeleteApi from "../../../hooks/useDeleteApi.ts";

interface Props {
    handleShareClick: () => void;
    teacherId: string;
    isTableDataUpdated: boolean;
    searchTerm: string;
    filterType: string;
}

const DocumentTable: React.FC<Props> = ({
    handleShareClick,
    teacherId,
    isTableDataUpdated,
    searchTerm,
    filterType,
}: Props) => {
    const [selectedDocument, setSelectedDocument] = useState(null);

    const {deleting, handleDelete} = useDeleteApi({url: `/documents/${selectedDocument?.id}`, auth: true})
    const documentsApi = useFetchApi({url: `/documents/pagination/${teacherId}`, auth: true})

    const handleOkClick = async () => {
        const success = await handleDelete();
        if (success) {
            message.success("Xóa tài liệu thành công!");
            await handleRefresh();
            deleteDocumentModal.closeModal()
        } else {
            message.error("Xóa tài liệu thất bại. Vui lòng thử lại!");
            deleteDocumentModal.closeModal()
        }
    }


    useEffect(() => {
        documentsApi.setFetched(false);
    },[teacherId])

    const handleRefresh = async () => {
        await documentsApi.fetchApi();
    };

    useEffect(() => {
        handleRefresh().then(() => {});
    }, [isTableDataUpdated]);

    const deleteDocumentModal = useModal({
        title: "Xác nhận xoá tài liệu",
        content: <p>Bạn có chắc chắn muốn xoá tài liệu <b>{selectedDocument?.name}</b> ?</p>,
        handleOk: handleOkClick,
        footer:
            <>
                <Button key="cancel">
                    No
                </Button>
                <Button
                    key="ok"
                    type="primary"
                    onClick={handleOkClick}
                    loading={deleting}
                >
                    Yes
                </Button>
            </>
    })

    const handleDeleteDocument = (row) => {
        setSelectedDocument(row);
        deleteDocumentModal.openModal()
    };

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Người sở hữu", dataIndex: "owner", key: "owner" },
        { title: "Ngày khởi tạo", dataIndex: "createdAt", key: "createdAt" },
        { title: "Loại tài liệu", dataIndex: "type", key: "type" },
        {
            title: "Hành động",
            key: "action",
            render: (row: any) => (
                <Space size="middle">
                    <Button
                        type="link"
                        onClick={() => window.open(row.url, "_blank")}
                        icon={<LinkOutlined />}
                    />
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
            type: getValueFromMenuUploadByKey(e.type),
            createdAt: new Date(e.createdAt).toLocaleDateString(),
            owner: e.teacher.name,
            url: e.url
        }));

    return <>
        <Table dataSource={parseData(documentsApi.data)} columns={columns} />
        {deleteDocumentModal.modal}
    </>
};

export default DocumentTable;
