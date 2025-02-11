import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button, Input, Select } from "antd";
import { FolderAddOutlined, FileAddOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import PageTitle from "../../components/common/SectionTitle";
import UploadButton from "../../components/admin/UploadButton";
import DocumentsTable from "../../components/admin/documents/DocumentsTable";
import FolderTable from "../../components/admin/documents/FolderTable";
import useAuth from "../../hooks/useAuth";
import { MENU_UPLOAD } from "../../constants/document-type";
import useModal from "../../hooks/modal/useModal";
import useDebounce from "../../hooks/useDebounce";
import { addTemplateModalParams, shareDocumentModalParams, templateModalParams } from "./modal-params";
const DocumentPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const debouncedFilterType = useDebounce(filterType, 500);
    const { isPrincipal, isUploadableDocument, me } = useAuth();
    const [isTableDataUpdated, setIsTableDataUpdated] = useState(false);
    const handleRefreshTableData = () => {
        setIsTableDataUpdated(prev => !prev);
    };
    const { userId } = useParams();
    const navigate = useNavigate();
    const handleBackToFolder = () => navigate("/principal/document");
    // Modal Handlers
    const addTemplateModal = useModal(addTemplateModalParams);
    const templateModal = useModal(templateModalParams(addTemplateModal.openModal));
    const shareDocumentModal = useModal(shareDocumentModalParams);
    // Button Section for Principal
    const renderButtonSection = () => (_jsxs("div", { className: "flex gap-4 pb-3", children: [_jsx(Button, { type: "primary", icon: _jsx(FolderAddOutlined, {}), className: "p-4", children: "New Folder" }), _jsx(Button, { type: "default", icon: _jsx(FileAddOutlined, {}), className: "p-4", onClick: templateModal.openModal, children: "Use Template" }), _jsx(UploadButton, { onUploadSuccess: handleRefreshTableData })] }));
    // Table Section Rendering
    const renderTable = () => (isPrincipal && !userId ?
        _jsx(FolderTable, { searchTerm: searchTerm }) :
        _jsx(DocumentsTable, { handleShareClick: shareDocumentModal.openModal, userId: isUploadableDocument ? me.id : userId, isTableDataUpdated: isTableDataUpdated, searchTerm: debouncedSearchTerm, filterType: debouncedFilterType }));
    // Page Title
    const pageTitle = isUploadableDocument ? `Danh sách tài liệu của giáo viên` : "Danh sách giáo viên";
    // Handle search change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleFilterTypeChange = (value) => {
        setFilterType(value);
    };
    return (_jsxs("div", { className: "p-5", children: [isPrincipal && userId && (_jsx(Button, { type: "default", icon: _jsx(ArrowLeftOutlined, {}), onClick: handleBackToFolder, className: "mb-3", children: "Quay l\u1EA1i danh s\u00E1ch folder" })), isUploadableDocument && renderButtonSection(), isPrincipal && !userId && (_jsx("div", { className: "pb-3", children: _jsx(Input, { placeholder: "T\u00ECm ki\u1EBFm theo t\u00EAn gi\u00E1o vi\u00EAn", value: searchTerm, onChange: handleSearchChange, style: { width: 300, marginRight: "10px" } }) })), isPrincipal && userId && (_jsxs("div", { className: "pb-3", children: [_jsx(Input, { placeholder: "T\u00ECm ki\u1EBFm theo t\u00EAn t\u00E0i li\u1EC7u", value: searchTerm, onChange: handleSearchChange, style: { width: 300, marginRight: "10px" } }), _jsx(Select, { mode: "multiple", allowClear: true, style: { width: 300 }, placeholder: "Ch\u1ECDn lo\u1EA1i t\u00E0i li\u1EC7u", onChange: handleFilterTypeChange, options: MENU_UPLOAD.map(e => ({
                            label: e.value,
                            value: e.key
                        })) })] })), _jsx(PageTitle, { title: pageTitle, className: "mb-3" }), renderTable(), templateModal.modal, addTemplateModal.modal, shareDocumentModal.modal] }));
};
export default DocumentPage;
