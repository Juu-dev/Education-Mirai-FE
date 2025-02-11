import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Modal } from "antd";
export default function useConfirmModal({ title = 'Bạn chắc chắn xoá chứ?', content = 'Please be careful because you cannot undo this action.', footer = (_, { OkBtn, CancelBtn }) => (_jsxs(_Fragment, { children: [_jsx(CancelBtn, {}), _jsx(OkBtn, { className: "bg-red-700" })] })), handleOk = () => { }, width = 600, okText, cancelText, ...otherProps }) {
    const [open, setOpen] = useState(false);
    const openModal = () => {
        setOpen(true);
    };
    const closeModal = () => setOpen(false);
    const modal = _jsx(Modal, { title: _jsx("span", { className: "text-2xl", children: title }), visible: open, onCancel: closeModal, onOk: handleOk, width: width, centered: true, okText: "Delete", cancelText: cancelText, 
        // footer={(_, { OkBtn, CancelBtn }) => (
        //     <>
        //         <CancelBtn />
        //         <OkBtn />
        //     </>
        // )}
        footer: footer, ...otherProps, children: content });
    return { modal, open, closeModal, openModal };
}
