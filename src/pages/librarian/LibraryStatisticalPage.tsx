import React from 'react';
import { Button, Card, Modal, Table } from 'antd';
import { Line } from '@ant-design/charts';
import ProgressSummary from '../../components/library/ProgressSummary';

const borrowData = [
  { date: '01', count: 20 },
  { date: '02', count: 35 },
  { date: '03', count: 40 },
  { date: '04', count: 50 },
  { date: '05', count: 80 },
  { date: '06', count: 70 },
  { date: '07', count: 90 },
  { date: '08', count: 100 },
  { date: '09', count: 95 },
  { date: '10', count: 110 },
  { date: '11', count: 85 },
  { date: '12', count: 120 },
];

const bookData = [
  { key: '1', name: 'SGK Toán 1', borrowedBy: 'Nguyễn Thu Phương' },
  { key: '2', name: 'SGK Toán 1', borrowedBy: 'Nguyễn Thu Phương' },
  { key: '3', name: 'SGK Toán 1', borrowedBy: 'Nguyễn Thu Phương' },
];

const lineConfig = {
  data: borrowData,
  height: 250,
  xField: 'date',
  yField: 'count',
  color: '#5B8FF9',
  point: { size: 8, shape: 'circle' },
  lineStyle: { stroke: '#5B8FF9' },
  smooth: true,
};

const bookColumns = [
  { title: 'Sách', dataIndex: 'name', key: 'name' },
  { title: 'Người xem', dataIndex: 'borrowedBy', key: 'borrowedBy' },
];

const LibraryStatisticalPage: React.FC = () => {
    const showModal = () => console.log('Row clicked');
    const [isDocumentModalVisible, setIsDocumentModalVisible] = React.useState(false);

    const openDocumentModal = () => setIsDocumentModalVisible(true);

    const closeDocumentModal = () => setIsDocumentModalVisible(false);

    const requestColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Lớp công tác', dataIndex: 'class', key: 'class' },
        { title: 'Loại tài liệu', dataIndex: 'type', key: 'type' },
        { title: 'Nội dung', dataIndex: 'content', key: 'content' },
        { title: 'Người đăng', dataIndex: 'user', key: 'user' },
        {
            title: 'Hành động',
            key: 'action',
            render: () => (
            <div className="flex gap-2">
                <Button shape="circle" icon={<span>✔</span>} />
                <Button shape="circle" icon={<span>✏️</span>} />
            </div>
            ),
        },
    ];

    // const bookRequestData = [
    //     { key: '1', name: 'SGK Toán 1', borrowedBy: 'Nguyễn Thu Phương' },
    //     { key: '2', name: 'SGK Toán 1', borrowedBy: 'Nguyễn Thu Phương' },
    //     { key: '3', name: 'SGK Toán 1', borrowedBy: 'Nguyễn Thu Phương' },
    // ];

    const bookRequestData = [
        { key: '1', id: '01', name: 'SGK Toán 1', class: '1A', type: 'Ebook', content: 'Sách ...', user: 'Nguyễn Thu Phương' },
        { key: '2', id: '01', name: 'Nguyễn Bình An', class: '1A', type: 'Bài giảng', content: 'Sách ...', user: 'Nguyễn Thu Phương' },
        { key: '3', id: '01', name: 'Nguyễn Bình An', class: '1A', type: 'Bài giảng', content: 'Sách ...', user: 'Nguyễn Thu Phương' },
      ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4 col-span-2">
          <h3 className="text-center font-semibold mb-4">Thống kê mượn sách</h3>
          <Line {...lineConfig} />
        </Card>

        {/* Progress Summary */}
        <ProgressSummary />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold">120</div>
            <div>Số đầu sách</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold">250</div>
            <div>Sách đã xem</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold">45%</div>
            <div>Khối lớp 5</div>
          </div>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left Section: Borrow Statistics */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          

          <Card title="Các sách vừa được xem" className="p-4">
            <Table
                dataSource={bookData}
                columns={bookColumns}
                pagination={false}
                size="small"
            />
          </Card>
          <Card title="Các đầu sách được xem nhiều nhất" className="p-4">
            <Table
              dataSource={bookData}
              columns={bookColumns}
              pagination={false}
              size="small"
              onRow={() => ({
                onClick: showModal,
              })}
            />
          </Card>
        </div>

        {/* Right Section: Class Participation & Latest Books */}
        <div className="grid grid-rows-2 gap-4">
          <Card title="Các lớp đăng ký tham gia đọc sách" className="p-4">
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>5A</span>
                <span>30 cuốn</span>
              </li>
              <li className="flex justify-between">
                <span>5B</span>
                <span>25 cuốn</span>
              </li>
              <li className="flex justify-between">
                <span>5C</span>
                <span>20 cuốn</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
      {/* Modal */}
      <Modal
        width={800}
        title="Duyệt tài liệu"
        open={isDocumentModalVisible}
        onCancel={closeDocumentModal}
        footer={[
          <Button key="cancel" onClick={closeDocumentModal}>
            Hủy
          </Button>,
          <Button key="approve" type="primary" onClick={closeDocumentModal}>
            Phê duyệt tất cả
          </Button>,
        ]}
      >
        <Table dataSource={bookRequestData} columns={requestColumns} pagination={false} size="small" />
      </Modal>

      {/* Footer Actions */}
      <div className="flex justify-end gap-4 mt-6">
        <Button type="default">Cập nhật thông tin</Button>
        <Button type="primary" onClick={openDocumentModal}>Duyệt tài liệu</Button>
      </div>
    </div>
  );
};

export default LibraryStatisticalPage;
