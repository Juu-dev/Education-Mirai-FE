import React, { useState } from "react";
import { Button } from "antd";
import { FolderAddOutlined, FileAddOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PageTitle from "../../components/common/SectionTitle";
import UploadButton from "../../components/admin/UploadButton";
import DocumentTable from "../../components/admin/DocumentTable";
import TemplateModal from "../../components/admin/modal/TemplateModal";
import AddTemplateModal from "../../components/admin/modal/AddTemplateModal";
import ShareDocumentModal from "../../components/admin/modal/ShareDocumentModal";

const AdminDocumentPage: React.FC = () => {
    const [isChooseTemplateModalVisible, setIsChooseTemplateModalVisible] =
        useState(false);
    const [isAddTemplateModalVisible, setIsAddTemplateModalVisible] =
        useState(false);
    const [isShareModalVisible, setIsShareModalVisible] = useState(false);

    const { teacherID } = useParams(); 
    const navigate = useNavigate(); 
    const location = useLocation();

    const isPrincipal = location.pathname.includes("principal");

    const handleBackToFolder = () => {
        navigate("/principal/document"); 
    };

    return (
        <div className="p-5">
            {/* Back Button*/}
            {teacherID && isPrincipal && (
                <Button
                    type="default"
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBackToFolder}
                    className="mb-3"
                >
                    Quay lại danh sách folder
                </Button>
            )}

            {/* Button Section */}
            {!teacherID && isPrincipal && (
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
                        onClick={() => setIsChooseTemplateModalVisible(true)}>
                        Use Template
                    </Button>
                    <UploadButton />
                </div>
            )}

            {/* Page Title */}
            <PageTitle
                title={
                    teacherID
                        ? `Danh sách tài liệu của giáo viên`
                        : "Danh sách giáo viên"
                }
                className="mb-3"
            />

            {/* Table Section */}
            <DocumentTable
                handleShareClick={() => setIsShareModalVisible(true)}
            />

            {/* Modals */}
            <TemplateModal
                isVisible={isChooseTemplateModalVisible}
                onCancel={() => setIsChooseTemplateModalVisible(false)}
                showAddTemplateModal={() => setIsAddTemplateModalVisible(true)}
            />
            <AddTemplateModal
                isVisible={isAddTemplateModalVisible}
                onCancel={() => setIsAddTemplateModalVisible(false)}
            />
            <ShareDocumentModal
                isVisible={isShareModalVisible}
                onCancel={() => setIsShareModalVisible(false)}
            />
        </div>
    );
};

export default AdminDocumentPage;
