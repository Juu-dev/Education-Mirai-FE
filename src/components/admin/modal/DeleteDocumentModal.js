import { jsx as _jsx } from "react/jsx-runtime";
import { Modal, Button, message } from "antd";
import useDeleteApi from "../../../hooks/useDeleteApi";
const DeleteDocumentModal = ({ visible, title, content, onCancel, url, handleRefresh, okText = "OK", cancelText = "Cancel", }) => {
    const { deleting, handleDelete } = useDeleteApi({ url: url, auth: true });
    const handleOkClick = async () => {
        const success = await handleDelete();
        if (success) {
            message.success("Xóa tài liệu thành công!");
            await handleRefresh();
            onCancel();
        }
        else {
            message.error("Xóa tài liệu thất bại. Vui lòng thử lại!");
            onCancel();
        }
    };
    return (_jsx(Modal, { title: title, visible: visible, onCancel: onCancel, onOk: handleOkClick, footer: [
            _jsx(Button, { onClick: onCancel, children: cancelText }, "cancel"),
            _jsx(Button, { type: "primary", onClick: handleOkClick, loading: deleting, children: okText }, "ok"),
        ], children: content }));
};
export default DeleteDocumentModal;
