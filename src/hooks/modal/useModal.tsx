import React, {ReactNode, useState} from 'react';
import { Modal } from "antd";

interface ModalProps {
    title: string;
    content: string | ReactNode;
    footer?: ReactNode | ReactNode[];
    handleOk?: () => void;
    width?: number;
}

export default function useModal({
    title = 'Are you sure to delete?',
    content = 'Please be careful because you cannot undo this action.',
    footer = null,
    handleOk = () => {},
    width = 600,
    ...otherProps
}: ModalProps) {
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    };
    const closeModal = () => setOpen(false);

    const modal: React.ReactNode =
        <Modal
            title={<span className="text-2xl">{title}</span>}
            visible={open}
            onCancel={closeModal}
            onOk={handleOk}
            width={width}
            centered
            // footer={(_, { OkBtn, CancelBtn }) => (
            //     <>
            //         <CancelBtn />
            //         <OkBtn />
            //     </>
            // )}
            footer={footer}
            {...otherProps}
        >
            {content}
        </Modal>

    return {modal, open, closeModal, openModal};
}
