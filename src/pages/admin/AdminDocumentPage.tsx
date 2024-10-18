import React, { useState } from 'react';
import { Button, Table, Space, Modal, Upload, message, Input, Select } from 'antd';
import { DownloadOutlined, ShareAltOutlined, FolderAddOutlined, FileAddOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Option } = Select;

// Upload button props
const uploadProps: UploadProps = {
  name: 'file',
  action: '/upload.do', // Example upload URL
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const AdminDocumentPage: React.FC = () => {
  const [isChooseTemplateModalVisible, setIsChooseTemplateModalVisible] = useState(false);
  const [isAddTemplateModalVisible, setIsAddTemplateModalVisible] = useState(false);

  // Sample document data
  const dataSource = [
    {
      key: '1',
      id: '01',
      name: 'Hồ sơ học sinh',
      createdAt: '09/03/2024',
      owner: 'Bình Tống',
    },
    {
      key: '2',
      id: '02',
      name: 'Nguyễn Bình An',
      createdAt: '09/03/2024',
      owner: 'Bình Tống',
    },
  ];

  // Template data for modal
  const templateData = [
    {
      key: '1',
      id: '01',
      name: 'Hồ sơ học sinh',
      userType: 'Hiệu trưởng',
    },
  ];

  const templateColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Đối tượng sử dụng',
      dataIndex: 'userType',
      key: 'userType',
    },
    {
      title: 'Tải xuống',
      key: 'download',
      render: () => <Button icon={<DownloadOutlined />} />,
    },
  ];

  // Table columns configuration
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày khởi tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Đồng sở hữu',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button icon={<DownloadOutlined />} />
          <Button icon={<ShareAltOutlined />} />
        </Space>
      ),
    },
  ];

  // Show modal for choosing template
  const showChooseTemplateModal = () => {
    setIsChooseTemplateModalVisible(true);
  };

  // Show modal for adding template
  const showAddTemplateModal = () => {
    setIsAddTemplateModalVisible(true);
  };

  // Hide modals
  const handleCancelChooseTemplateModal = () => {
    setIsChooseTemplateModalVisible(false);
  };

  const handleCancelAddTemplateModal = () => {
    setIsAddTemplateModalVisible(false);
  }

  return (
    <div className="p-5">
      {/* Button Section */}
      <div className="flex gap-4 pb-3">
        <Button type="primary" icon={<FolderAddOutlined />} className="p-4">
          New Folder
        </Button>
        <Button type="default" icon={<FileAddOutlined />} className="p-4" onClick={showChooseTemplateModal}>
          Use Template
        </Button>
        <Upload {...uploadProps}>
          <Button type="default" icon={<UploadOutlined />} className="p-4">
            Upload
          </Button>
        </Upload>
      </div>

      {/* Table Section */}
      <Table dataSource={dataSource} columns={columns} pagination={false} />

      {/* Modal for template selection */}
      <Modal title="Lựa chọn template" visible={isChooseTemplateModalVisible} onCancel={handleCancelChooseTemplateModal} footer={null}>
        <Table dataSource={templateData} columns={templateColumns} pagination={false} />
        <div className="flex justify-end mt-4">
          <Button type="primary" onClick={showAddTemplateModal}>
            Thêm mẫu
          </Button>
        </div>
      </Modal>

      {/* Modal for adding a new template */}
      <Modal title="Thêm mẫu mới" visible={isAddTemplateModalVisible} onCancel={handleCancelAddTemplateModal} footer={null}>
        <div className="mb-4">
          <div className="mb-2">Tên tài liệu</div>
          <Input placeholder="Enter document name" />
        </div>
        <div className="mb-4">
          <div className="mb-2">Đối tượng sử dụng</div>
          <Select placeholder="Select user type" className="w-full">
            <Option value="student">Student</Option>
            <Option value="teacher">Teacher</Option>
            <Option value="principal">Principal</Option>
          </Select>
        </div>
        <div className="mb-4">
          <div className="mb-2">Đính kèm</div>
          <Upload>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        <div className="flex justify-end mt-4">
          <Button type="primary">Thêm mẫu</Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDocumentPage;
