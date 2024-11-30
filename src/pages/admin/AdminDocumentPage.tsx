import React, { useState } from "react";
import {Button, Input} from "antd";
import { FolderAddOutlined, FileAddOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import PageTitle from "../../components/common/SectionTitle";
import UploadButton from "../../components/admin/UploadButton";
import TemplateModal from "../../components/admin/modal/TemplateModal";
import AddTemplateModal from "../../components/admin/modal/AddTemplateModal";
import ShareDocumentModal from "../../components/admin/modal/ShareDocumentModal";
import DocumentsTable from "../../components/admin/documents/DocumentsTable.tsx";
import FolderTable from "../../components/admin/documents/FolderTable.tsx";
import useAuth from "../../hooks/useAuth.ts";

const AdminDocumentPage: React.FC = () => {
    const [isChooseTemplateModalVisible, setIsChooseTemplateModalVisible] = useState(false);
    const [isAddTemplateModalVisible, setIsAddTemplateModalVisible] = useState(false);
    const [isShareModalVisible, setIsShareModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const {isPrincipal, isTeacher, me} = useAuth();

    const [isTableDataUpdated, setIsTableDataUpdated] = useState(false);

    const handleRefreshTableData = () => {
        setIsTableDataUpdated(prev => !prev);
    };

    const { teacherID } = useParams();
    const navigate = useNavigate();
    const handleBackToFolder = () => navigate("/principal/document");

    // Modal Handlers
    const handleChooseTemplateModal = () => setIsChooseTemplateModalVisible(true);
    const handleAddTemplateModal = () => setIsAddTemplateModalVisible(true);
    const handleShareModal = () => setIsShareModalVisible(true);
    const closeChooseTemplateModal = () => setIsChooseTemplateModalVisible(false);
    const closeAddTemplateModal = () => setIsAddTemplateModalVisible(false);
    const closeShareModal = () => setIsShareModalVisible(false);

    // Button Section for Principal
    const renderButtonSection = () => (
        <div className="flex gap-4 pb-3">
            <Button
                type="primary"
                icon={<FolderAddOutlined />}
                className="p-4">
                New Folder
            </Button>
            <Button
                type="default"
                icon={<FileAddOutlined />}
                className="p-4"
                onClick={handleChooseTemplateModal}>
                Use Template
            </Button>
            <UploadButton onUploadSuccess={handleRefreshTableData} />
        </div>
    );

    // Table Section Rendering
    const renderTable = () => (
        isPrincipal && !teacherID ? <FolderTable searchTerm={searchTerm} /> :
            <DocumentsTable
                handleShareClick={handleShareModal}
                teacherId={isTeacher ? me!.teacher!.id : teacherID!}
                isTableDataUpdated={isTableDataUpdated}
            />
    );

    // Page Title
    const pageTitle = isTeacher ? `Danh sách tài liệu của giáo viên` : "Danh sách giáo viên";

    // Handle search change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="p-5">
            {/* Back Button */}
            {isPrincipal && (
                <Button
                    type="default"
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBackToFolder}
                    className="mb-3">
                    Quay lại danh sách folder
                </Button>
            )}

            {/* Conditional Button Section */}
            {isTeacher && renderButtonSection()}

            {/* Search Input for Principal */}
            {isPrincipal && (
                <div className="pb-3">
                    <Input
                        placeholder="Tìm kiếm theo tên giáo viên"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{ width: 300 }}
                    />
                </div>
            )}

            {/* Page Title */}
            <PageTitle title={pageTitle} className="mb-3" />

            {/* Table Section */}
            {renderTable()}

            {/* Modals */}
            <TemplateModal
                isVisible={isChooseTemplateModalVisible}
                onCancel={closeChooseTemplateModal}
                showAddTemplateModal={handleAddTemplateModal}
            />
            <AddTemplateModal
                isVisible={isAddTemplateModalVisible}
                onCancel={closeAddTemplateModal}
            />
            <ShareDocumentModal
                isVisible={isShareModalVisible}
                onCancel={closeShareModal}
            />
        </div>
    );
};

export default AdminDocumentPage;
