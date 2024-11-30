import React from "react";
import {Modal, Button, message} from "antd";
import useDeleteApi from "../../../hooks/useDeleteApi.ts";

interface DeleteDocumentModalProps {
    visible: boolean;
    title: string;
    content: React.ReactNode;
    onCancel: () => void;
    handleRefresh: () => Promise<void>;
    okText?: string;
    cancelText?: string;
    loading?: boolean;
    url: string;
}

const DeleteDocumentModal: React.FC<DeleteDocumentModalProps> = ({
                                                           visible,
                                                           title,
                                                           content,
                                                           onCancel,
                                                           url,
                                                           handleRefresh,
                                                           okText = "OK",
                                                           cancelText = "Cancel",
                                                       }) => {
    const {deleting, handleDelete} = useDeleteApi({url: url, auth: true})
    const handleOkClick = async () => {
        const success = await handleDelete();
        if (success) {
            message.success("Xóa tài liệu thành công!");
            await handleRefresh();
            onCancel()
        } else {
            message.error("Xóa tài liệu thất bại. Vui lòng thử lại!");
            onCancel()
        }
    }

    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={onCancel}
            onOk={handleOkClick}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    {cancelText}
                </Button>,
                <Button
                    key="ok"
                    type="primary"
                    onClick={handleOkClick}
                    loading={deleting}
                >
                    {okText}
                </Button>,
            ]}
        >
            {content}
        </Modal>
    );
};

export default DeleteDocumentModal;
