import React, { useState } from "react";
import {Button, Input} from "antd";
import { FolderAddOutlined, FileAddOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PageTitle from "../../components/common/SectionTitle";
import UploadButton from "../../components/admin/UploadButton";
import TemplateModal from "../../components/admin/modal/TemplateModal";
import AddTemplateModal from "../../components/admin/modal/AddTemplateModal";
import ShareDocumentModal from "../../components/admin/modal/ShareDocumentModal";
import DocumentsTable from "../../components/admin/documents/DocumentsTable.tsx";
import FolderTable from "../../components/admin/documents/FolderTable.tsx";

const AdminDocumentPage: React.FC = () => {
    const [isChooseTemplateModalVisible, setIsChooseTemplateModalVisible] = useState(false);
    const [isAddTemplateModalVisible, setIsAddTemplateModalVisible] = useState(false);
    const [isShareModalVisible, setIsShareModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const { teacherID } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const isPrincipal = location.pathname.includes("principal");

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
            <UploadButton />
        </div>
    );

    // Table Section Rendering
    const renderTable = () => (
        isPrincipal && !teacherID ? <FolderTable searchTerm={searchTerm} /> :
            <DocumentsTable
                handleShareClick={handleShareModal}
                teacherId={teacherID || ""}
            />
    );

    // Page Title
    const pageTitle = teacherID ? `Danh sách tài liệu của giáo viên` : "Danh sách giáo viên";

    // Handle search change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="p-5">
            {/* Back Button */}
            {teacherID && isPrincipal && (
                <Button
                    type="default"
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBackToFolder}
                    className="mb-3">
                    Quay lại danh sách folder
                </Button>
            )}

            {/* Conditional Button Section */}
            {!teacherID && isPrincipal && renderButtonSection()}

            {/* Search Input for Teacher */}
            {!teacherID && isPrincipal && (
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
