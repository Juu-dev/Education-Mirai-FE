import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Form } from 'antd';
import { BookList } from "../../components/book/BookList";
import AddBookForm from "../../components/library/form/AddBookForm";
import useCreateApiFormData from "../../hooks/useCreateApiFormData";
import useModal from "../../hooks/modal/useModal";
export const AddBookPage = () => {
    const [isTableDataUpdated, setIsTableDataUpdated] = useState(false);
    const handleRefreshTableData = () => {
        setIsTableDataUpdated(prev => !prev);
    };
    const [form] = Form.useForm();
    const { creating, handleCreate } = useCreateApiFormData({
        url: "/books",
        fullResp: true,
        successMsg: "Thêm sách thành công",
        errorMsg: "Thêm sách thất bại",
    });
    const handleSubmit = async () => {
        const values = await form.validateFields();
        const { cover, pdf, ...rest } = values;
        const formData = new FormData();
        formData.append("title", rest.title);
        formData.append("author", rest.author);
        formData.append("description", rest.description || "");
        formData.append("publishingHouse", rest.nxb);
        formData.append("type", rest.type);
        if (cover?.[0]?.originFileObj) {
            formData.append("files", cover[0].originFileObj);
        }
        if (pdf?.[0]?.originFileObj) {
            formData.append("files", pdf[0].originFileObj);
        }
        const success = await handleCreate(formData);
        if (success) {
            addBook.closeModal();
            form.resetFields();
            handleRefreshTableData();
        }
    };
    const addBook = useModal({
        title: 'Thêm sách mới',
        content: _jsx(AddBookForm, { form: form }),
        handleOk: handleSubmit,
        okText: creating ? "Đang thêm sách..." : "Thêm sách",
        cancelText: "Huỷ",
        footer: (_, { OkBtn, CancelBtn }) => (_jsxs(_Fragment, { children: [_jsx(CancelBtn, {}), _jsx(OkBtn, {})] }))
    });
    return (_jsxs("div", { className: "mx-auto px-4 overflow-hidden", children: [_jsx("div", { className: "flex justify-end mb-4", children: _jsx(Button, { type: "primary", onClick: addBook.openModal, children: "Th\u00EAm s\u00E1ch" }) }), _jsx("div", { className: "book-list-wrapper", children: _jsx(BookList, { isRefresh: isTableDataUpdated }) }), addBook.modal] }));
};
export default AddBookPage;
