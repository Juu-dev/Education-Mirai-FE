import React from 'react';
import { Button, Card, Table } from 'antd';
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
  { title: 'Tổng số sách', dataIndex: 'amount', key: 'amount' },
  { title: 'Đã cho mượn', dataIndex: 'borrowed', key: 'borrowed' },
  { title: 'Nhà xuất bản', dataIndex: 'pushingHouse', key: 'pushingHouse' },
];

const StatisticalPage: React.FC = () => {
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
      <Card title="Thông tin thư viện vật lý" className="p-4">
        <Table
            dataSource={bookData}
            columns={bookColumns}
            pagination={false}
            size="small"
        />
      </Card>

      {/* Footer Actions */}
      <div className="flex justify-end gap-4 mt-6">
        <Button type="default">Cập nhật thông tin</Button>
        <Button type="primary">Duyệt tài liệu</Button>
      </div>
    </div>
  );
};

export default StatisticalPage;
