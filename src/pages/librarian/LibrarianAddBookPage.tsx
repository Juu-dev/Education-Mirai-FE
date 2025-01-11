import React, { useState } from 'react';
import {Button, Form} from 'antd';
import { BookList } from "../../components/book/BookList";


import AddBookForm from "../../components/library/form/AddBookForm.tsx";
import useCreateApiFormData from "../../hooks/useCreateApiFormData.ts";
import useModal from "../../hooks/modal/useModal.tsx";

export const LibrarianAddBookPage: React.FC = () => {
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
        formData.append("evaluate", rest.rating);

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
            handleRefreshTableData()
        }
    };

    const addBook = useModal({
      title: 'Thêm sách mới',
      content: <AddBookForm form={form} />,
      handleOk: handleSubmit,
      okText: creating ? "Đang thêm sách..." : "Thêm sách",
      cancelText: "Huỷ",
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
            <CancelBtn />
            <OkBtn />
        </>
      )
    })

  return (
    <div className="container mx-auto px-4 overflow-hidden">
      {/* Thêm sách Button */}
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={addBook.openModal}>
          Thêm sách
        </Button>
      </div>

      {/* Book List */}
      <div className="book-list-wrapper">
        <BookList isRefresh={isTableDataUpdated} />
      </div>
        {addBook.modal}
    </div>
  );
};

export default LibrarianAddBookPage;
