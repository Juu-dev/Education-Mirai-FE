import React, { useState } from 'react';
import { Button } from 'antd';
import { BookList } from "../../components/book/BookList";


import AddBookModal from "../../components/library/modal/AddBookModal.tsx";

export const LibrarianAddBookPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
    const [isTableDataUpdated, setIsTableDataUpdated] = useState(false);
    const handleRefreshTableData = () => {
        setIsTableDataUpdated(prev => !prev);
    };

  // Open and Close Modal
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

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
        <BookList isRefresh={isTableDataUpdated} />
      </div>

      <AddBookModal isVisible={isModalVisible} onCancel={closeModal} onUploadSuccess={handleRefreshTableData} />
    </div>
  );
};

export default LibrarianAddBookPage;
