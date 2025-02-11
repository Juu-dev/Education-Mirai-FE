import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, message, Pagination, Space, Table } from "antd";
import { DeleteOutlined, DownloadOutlined, ShareAltOutlined, LinkOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import useFetchApi from "../../../hooks/useFetchApi";
import { getValueFromMenuUploadByKey } from "../../../constants/document-type";
import useModal from "../../../hooks/modal/useModal";
import useDeleteApi from "../../../hooks/useDeleteApi";
const DocumentTable = ({ handleShareClick, userId, isTableDataUpdated, searchTerm, filterType, }) => {
    const [selectedDocument, setSelectedDocument] = useState(null);
    const { deleting, handleDelete } = useDeleteApi({ url: `/documents/${selectedDocument?.id}`, auth: true });
    const documentsApi = useFetchApi({ url: `/documents/pagination/${userId}`, auth: true });
    const handleOkClick = async () => {
        const success = await handleDelete();
        if (success) {
            message.success("Xóa tài liệu thành công!");
            await handleRefresh();
            deleteDocumentModal.closeModal();
        }
        else {
            message.error("Xóa tài liệu thất bại. Vui lòng thử lại!");
            deleteDocumentModal.closeModal();
        }
    };
    useEffect(() => {
        const params = {};
        if (searchTerm)
            params.search = searchTerm;
        if (filterType.length > 0)
            params.type = filterType;
        documentsApi.fetchApi(`/documents/pagination/${userId}`, { params });
    }, [userId, searchTerm, filterType]);
    const handleRefresh = async () => {
        await documentsApi.fetchApi(`/documents/pagination/${userId}`);
    };
    const handlePageChange = (page) => {
        documentsApi?.fetchApi(undefined, { params: { page, pageSize: documentsApi.pagination?.pageSize || 10 } });
    };
    useEffect(() => {
        handleRefresh().then(() => { });
    }, [isTableDataUpdated]);
    const deleteDocumentModal = useModal({
        title: "Xác nhận xoá tài liệu",
        content: _jsxs("p", { children: ["B\u1EA1n c\u00F3 ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\u00E1 t\u00E0i li\u1EC7u ", _jsx("b", { children: selectedDocument?.description }), " ?"] }),
        handleOk: handleOkClick,
        footer: (_jsxs(_Fragment, { children: [_jsx(Button, { children: "No" }, "cancel"), _jsx(Button, { type: "primary", onClick: handleOkClick, loading: deleting, children: "Yes" }, "ok")] })),
    });
    const handleDeleteDocument = (row) => {
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
            render: (row) => (_jsxs(Space, { size: "middle", children: [_jsx(Button, { type: "link", onClick: () => window.open(row.url, "_blank"), icon: _jsx(LinkOutlined, {}) }), _jsx(Button, { icon: _jsx(DownloadOutlined, {}) }), _jsx(Button, { icon: _jsx(ShareAltOutlined, {}), onClick: handleShareClick }), _jsx(Button, { icon: _jsx(DeleteOutlined, {}), onClick: () => handleDeleteDocument(row) })] })),
        },
    ];
    const parseData = (data) => data.map((e) => ({
        key: e.id,
        id: e.id,
        name: e.description,
        type: getValueFromMenuUploadByKey(e.type),
        createdAt: new Date(e.createdAt).toLocaleDateString(),
        owner: e?.user?.name,
        url: e.url,
    }));
    return (_jsxs(_Fragment, { children: [_jsx(Table, { dataSource: parseData(documentsApi.data), columns: columns, pagination: false }), _jsx(Pagination, { current: documentsApi?.pagination?.page, total: documentsApi?.count, pageSize: documentsApi?.pagination?.pageSize, onChange: handlePageChange, showSizeChanger: false, align: "end", className: "custom-pagination mt-3" }), deleteDocumentModal.modal] }));
};
export default DocumentTable;
