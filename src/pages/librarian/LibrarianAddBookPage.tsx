import React, { useState } from 'react';
import { Button, Input, Modal, Form } from 'antd';
import { BookList } from "../../components/book/BookList";

import book1 from "../../assets/book/book1.png";
import book2 from "../../assets/book/book2.png";
import book3 from "../../assets/book/book3.png";
import book4 from "../../assets/book/book4.png";

const books = [
    {
        id: 1,
        title: "Sách tiếng việt 1",
        author: "Nguyễn Văn A",
        image: book1,
        description: "Sách tiếng việt 1",
        nxb: "NXB Giáo dục",
        rating: 4,
    },
    {
        id: 2,
        title: "Sách tiếng việt 2",
        author: "Nguyễn Văn A",
        image: book2,
        description: "Sách tiếng việt 2",
        nxb: "NXB Giáo dục",
        rating: 3,
    },
    {
        id: 3,
        title: "Sách tin học 3",
        author: "Nguyễn Văn A",
        image: book3,
        description: "Sách tin học 3",
        nxb: "NXB Giáo dục",
        rating: 4,
    },
    {
        id: 4,
        title: "Sách tin học 4",
        author: "Nguyễn Văn A",
        image: book4,
        description: "Sách tin học 4",
        nxb: "NXB Giáo dục",
        rating: 5,
    },
    {
        id: 5,
        title: "Sách tin học 3",
        author: "Nguyễn Văn A",
        image: book3,
        description: "Sách tin học 3",
        nxb: "NXB Giáo dục",
        rating: 4,
    },
    {
        id: 6,
        title: "Sách tiếng việt 1",
        author: "Nguyễn Văn A",
        image: book1,
        description: "Sách tiếng việt 1",
        nxb: "NXB Giáo dục",
        rating: 4,
    },
    {
        id: 7,
        title: "Sách tiếng việt 2",
        author: "Nguyễn Văn A",
        image: book2,
        description: "Sách tiếng việt 2",
        nxb: "NXB Giáo dục",
        rating: 3,
    },
    {
        id: 8,
        title: "Sách tin học 3",
        author: "Nguyễn Văn A",
        image: book3,
        description: "Sách tin học 3",
        nxb: "NXB Giáo dục",
        rating: 4,
    },
    {
        id: 9,
        title: "Sách tin học 4",
        author: "Nguyễn Văn A",
        image: book4,
        description: "Sách tin học 4",
        nxb: "NXB Giáo dục",
        rating: 5,
    },
    {
        id: 10,
        title: "Sách tin học 3",
        author: "Nguyễn Văn A",
        image: book3,
        description: "Sách tin học 3",
        nxb: "NXB Giáo dục",
        rating: 4,
    },
    {
        id: 11,
        title: "Sách tiếng việt 1",
        author: "Nguyễn Văn A",
        image: book1,
        description: "Sách tiếng việt 1",
        nxb: "NXB Giáo dục",
        rating: 4,
    },
    {
        id: 12,
        title: "Sách tiếng việt 2",
        author: "Nguyễn Văn A",
        image: book2,
        description: "Sách tiếng việt 2",
        nxb: "NXB Giáo dục",
        rating: 3,
    },
    {
        id: 13,
        title: "Sách tin học 3",
        author: "Nguyễn Văn A",
        image: book3,
        description: "Sách tin học 3",
        nxb: "NXB Giáo dục",
        rating: 4,
    },
    {
        id: 14,
        title: "Sách tin học 4",
        author: "Nguyễn Văn A",
        image: book4,
        description: "Sách tin học 4",
        nxb: "NXB Giáo dục",
        rating: 5,
    },
    {
        id: 15,
        title: "Sách tin học 3",
        author: "Nguyễn Văn A",
        image: book3,
        description: "Sách tin học 3",
        nxb: "NXB Giáo dục",
        rating: 4,
    },
    {
        id: 16,
        title: "Sách tiếng việt 1",
        author: "Nguyễn Văn A",
        image: book1,
        description: "Sách tiếng việt 1",
        nxb: "NXB Giáo dục",
        rating: 4,
    },
    {
        id: 17,
        title: "Sách tiếng việt 2",
        author: "Nguyễn Văn A",
        image: book2,
        description: "Sách tiếng việt 2",
        nxb: "NXB Giáo dục",
        rating: 3,
    },
    {
        id: 18,
        title: "Sách tin học 3",
        author: "Nguyễn Văn A",
        image: book3,
        description: "Sách tin học 3",
        nxb: "NXB Giáo dục",
        rating: 4,
    },
    {
        id: 19,
        title: "Sách tin học 4",
        author: "Nguyễn Văn A",
        image: book4,
        description: "Sách tin học 4",
        nxb: "NXB Giáo dục",
        rating: 5,
    },
    {
        id: 20,
        title: "Sách tin học 3",
        author: "Nguyễn Văn A",
        image: book3,
        description: "Sách tin học 3",
        nxb: "NXB Giáo dục",
        rating: 4,
    },
]

export const LibrarianAddBookPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Open and Close Modal
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  // Handle Form Submission
  const handleAddBook = (values: any) => {
    console.log("Book added:", values);
    closeModal();
    form.resetFields(); // Reset the form after submission
  };

  return (
    <div className="container mx-auto px-4 overflow-hidden">
      {/* Thêm sách Button */}
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={openModal}>
          Thêm sách
        </Button>
      </div>

      {/* Book List */}
      <div className="book-list-wrapper">
        <BookList books={books} />
      </div>

      {/* Add Book Modal */}
      <Modal
        title="Thêm sách mới"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null} // Custom footer with Form submission button
      >
        <Form layout="vertical" form={form} onFinish={handleAddBook}>
          <Form.Item
            name="title"
            label="Tên sách"
            rules={[{ required: true, message: 'Vui lòng nhập tên sách' }]}
          >
            <Input placeholder="Nhập tên sách" />
          </Form.Item>

          <Form.Item
            name="author"
            label="Tác giả"
            rules={[{ required: true, message: 'Vui lòng nhập tác giả' }]}
          >
            <Input placeholder="Nhập tên tác giả" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
          >
            <Input.TextArea rows={4} placeholder="Nhập mô tả sách" />
          </Form.Item>

          <Form.Item
            name="nxb"
            label="Nhà xuất bản"
            rules={[{ required: true, message: 'Vui lòng nhập NXB' }]}
          >
            <Input placeholder="Nhập nhà xuất bản" />
          </Form.Item>

          <Form.Item
            name="rating"
            label="Đánh giá"
            rules={[{ required: true, message: 'Vui lòng nhập đánh giá (1-5)' }]}
          >
            <Input type="number" min={1} max={5} placeholder="Nhập đánh giá (1-5)" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Thêm sách
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LibrarianAddBookPage;
