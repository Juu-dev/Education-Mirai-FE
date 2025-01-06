import React, { useState } from "react";
import {Button, Input, Select, Table, Upload} from "antd";
import {FolderAddOutlined, FileAddOutlined, ArrowLeftOutlined, UploadOutlined} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import PageTitle from "../../components/common/SectionTitle";
import UploadButton from "../../components/admin/UploadButton";
import DocumentsTable from "../../components/admin/documents/DocumentsTable.tsx";
import FolderTable from "../../components/admin/documents/FolderTable.tsx";
import useAuth from "../../hooks/useAuth.ts";
import {MENU_UPLOAD} from "../../constants/document-type.ts";
import {OBJECT_DATA, SHARE_LIST_DATA, TEMPLATE_DATA} from "../../constants/mocks/document.ts";
import useModal from "../../hooks/modal/useModal.tsx";
import {SHARE_LIST_COLUMNS, TEMPLATE_COLUMNS} from "../../constants/document-modal.tsx";
import useDebounce from "../../hooks/useDebounce.ts";

const AdminDocumentPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<string[]>([]);
    const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
    const debouncedFilterType = useDebounce<string[]>(filterType, 500);

    const {isPrincipal, isUploadableDocument, me} = useAuth();
    const [isTableDataUpdated, setIsTableDataUpdated] = useState(false);

    const handleRefreshTableData = () => {
        setIsTableDataUpdated(prev => !prev);
    };

    const { userId } = useParams();
    const navigate = useNavigate();
    const handleBackToFolder = () => navigate("/principal/document");

    // Modal Handlers
    const addTemplateModal = useModal({
        title: "Thêm mẫu mới",
        content:
            <>
                <div className="mb-4">
                    <div className="mb-2">Tên tài liệu</div>
                    <Input placeholder="Enter document name"/>
                </div>
                <div className="mb-4">
                    <div className="mb-2">Đối tượng sử dụng</div>
                    <Select
                        placeholder="Select user type"
                        className="w-full"
                        options={OBJECT_DATA}
                    />
                </div>
                <div className="mb-4">
                    <div className="mb-2">Đính kèm</div>
                    <Upload>
                        <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                    </Upload>
                </div>
                <div className="flex justify-end mt-4">
                    <Button type="primary">Thêm mẫu</Button>
                </div>
            </>
    })
    const templateModal = useModal({
        title: "Lựa chọn template",
        content:
            <>
                <Table
                    dataSource={TEMPLATE_DATA}
                    columns={TEMPLATE_COLUMNS}
                    pagination={false}
                />
                <div className="flex justify-end mt-4">
                    <Button type="primary" onClick={addTemplateModal.openModal}>
                        Thêm mẫu
                    </Button>
                </div>
            </>
    })
    const shareDocumentModal = useModal({
        title: "Share Document",
        content:
            <>
                <Input.Search
                    placeholder="Search by name or email"
                    className="mb-4"
                />
                <Table
                    dataSource={SHARE_LIST_DATA}
                    columns={SHARE_LIST_COLUMNS}
                    pagination={false}
                />
                <div className="flex justify-end mt-4">
                    <Button type="primary">Chia sẻ</Button>
                </div>
            </>
    })

    // Button Section for Principal
    const renderButtonSection = () => (
        <div className="flex gap-4 pb-3">
            <Button
                type="primary"
                icon={<FolderAddOutlined/>}
                className="p-4">
                New Folder
            </Button>
            <Button
                type="default"
                icon={<FileAddOutlined />}
                className="p-4"
                onClick={templateModal.openModal}>
                Use Template
            </Button>
            <UploadButton onUploadSuccess={handleRefreshTableData} />
        </div>
    );

    // Table Section Rendering
    const renderTable = () => (
        isPrincipal && !userId ? <FolderTable searchTerm={searchTerm} /> :
            <DocumentsTable
                handleShareClick={shareDocumentModal.openModal}
                userId={isUploadableDocument ? me!.id : userId!}
                isTableDataUpdated={isTableDataUpdated}
                searchTerm={debouncedSearchTerm}
                filterType={debouncedFilterType}
            />
    );

    // Page Title
    const pageTitle = isUploadableDocument ? `Danh sách tài liệu của giáo viên` : "Danh sách giáo viên";

    // Handle search change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterTypeChange = (value: string[]) => {
        setFilterType(value);
    };

    return (
        <div className="p-5">
            {/* Back Button */}
            {isPrincipal && userId && (
                <Button
                    type="default"
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBackToFolder}
                    className="mb-3">
                    Quay lại danh sách folder
                </Button>
            )}

            {/* Conditional Button Section */}
            {isUploadableDocument && renderButtonSection()}

            {isPrincipal && !userId && (
                <div className="pb-3">
                    <Input
                        placeholder="Tìm kiếm theo tên giáo viên"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{ width: 300, marginRight: "10px" }}
                    />
                </div>)}

            {/* Search Input for Principal */}
            {isPrincipal && userId && (
                <div className="pb-3">
                    <Input
                        placeholder="Tìm kiếm theo tên tài liệu"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{ width: 300, marginRight: "10px" }}
                    />
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: 300 }}
                        placeholder="Chọn loại tài liệu"
                        onChange={handleFilterTypeChange}
                        options={MENU_UPLOAD.map(e => ({
                            label: e.value,
                            value: e.key
                        }))}
                    />
                </div>
            )}

            {/* Page Title */}
            <PageTitle title={pageTitle} className="mb-3" />

            {/* Table Section */}
            {renderTable()}

            {/* Modals */}
            {templateModal.modal}
            {addTemplateModal.modal}
            {shareDocumentModal.modal}
        </div>
    );
};

export default AdminDocumentPage;
