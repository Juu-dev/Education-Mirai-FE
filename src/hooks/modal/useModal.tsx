import React, {ReactNode, useState} from 'react';
import { Modal } from "antd";

interface ModalProps {
    title: string;
    content: string | ReactNode;
    footer?: ReactNode;
    handleOk?: () => void;
}

export default function useModal({
    title = 'Are you sure to delete?',
    content = 'Please be careful because you cannot undo this action.',
    footer = null,
    handleOk = () => {}
}: ModalProps) {
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    };
    const closeModal = () => setOpen(false);

    const modal: React.ReactNode =
        <Modal
            title={title}
            visible={open}
            onCancel={closeModal}
            onOk={handleOk}
            // footer={(_, { OkBtn, CancelBtn }) => (
            //     <>
            //         <CancelBtn />
            //         <OkBtn />
            //     </>
            // )}
            footer={footer}
        >
            {content}
        </Modal>

    return {modal, open, closeModal, openModal};
}
