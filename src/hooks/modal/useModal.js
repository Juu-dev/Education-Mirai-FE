import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Modal } from "antd";
export default function useModal({ title = 'Are you sure to delete?', content = 'Please be careful because you cannot undo this action.', footer = null, handleOk = () => { }, width = 600, okText, cancelText, ...otherProps }) {
    const [open, setOpen] = useState(false);
    const openModal = () => {
        setOpen(true);
    };
    const closeModal = () => setOpen(false);
    const modal = _jsx(Modal, { title: _jsx("span", { className: "text-2xl", children: title }), visible: open, onCancel: closeModal, onOk: handleOk, width: width, centered: true, okText: okText, cancelText: cancelText, 
        // footer={(_, { OkBtn, CancelBtn }) => (
        //     <>
        //         <CancelBtn />
        //         <OkBtn />
        //     </>
        // )}
        footer: footer, ...otherProps, children: content });
    return { modal, open, closeModal, openModal };
}
