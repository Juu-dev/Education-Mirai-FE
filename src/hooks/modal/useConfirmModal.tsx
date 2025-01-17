import React, {ReactNode, useState} from 'react';
import { Modal } from "antd";

interface ModalProps {
    title?: string;
    content?: string | ReactNode;
    footer?: ReactNode | ReactNode[] | any;
    handleOk?: () => void;
    width?: number;
    okText?: string;
    cancelText?: string;
}

export default function useConfirmModal({
    title = 'Bạn chắc chắn xoá chứ?',
    content = 'Please be careful because you cannot undo this action.',
    footer = (_, { OkBtn, CancelBtn }) => (
        <>
            <CancelBtn />
            <OkBtn className="bg-red-700" />
        </>
    ),
    handleOk = () => {},
    width = 600,
    okText,
    cancelText,
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
            okText="Delete"
            cancelText={cancelText}
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
