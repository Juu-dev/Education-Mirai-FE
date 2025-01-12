import React, { useState } from "react";
import {Button, Input, Select} from "antd";
import {FolderAddOutlined, FileAddOutlined, ArrowLeftOutlined} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import PageTitle from "../../components/common/SectionTitle.tsx";
import UploadButton from "../../components/admin/UploadButton.tsx";
import DocumentsTable from "../../components/admin/documents/DocumentsTable.tsx";
import FolderTable from "../../components/admin/documents/FolderTable.tsx";
import useAuth from "../../hooks/useAuth.ts";
import {MENU_UPLOAD} from "../../constants/document-type.ts";
import useModal from "../../hooks/modal/useModal.tsx";
import useDebounce from "../../hooks/useDebounce.ts";
import {addTemplateModalParams, shareDocumentModalParams, templateModalParams} from "./modal-params.tsx";

const DocumentPage: React.FC = () => {
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
    const addTemplateModal = useModal(addTemplateModalParams)
    const templateModal = useModal(templateModalParams(addTemplateModal.openModal))
    const shareDocumentModal = useModal(shareDocumentModalParams)

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
        isPrincipal && !userId ?
            <FolderTable searchTerm={searchTerm} /> :
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

export default DocumentPage;
