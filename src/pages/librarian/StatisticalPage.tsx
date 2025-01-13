import React, { useState } from 'react';
import { Button, Card, Table, Upload, message, Modal } from 'antd';
import { Line } from '@ant-design/charts';
import ProgressSummary from '../../components/library/ProgressSummary';
import * as XLSX from 'xlsx';
import useCreateApi from "../../hooks/useCreateApi.ts";
import useFetchApi from "../../hooks/useFetchApi.ts";

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
  { title: 'Sách', dataIndex: 'title', key: 'title' },
  { title: 'Tổng số sách', dataIndex: 'amount', key: 'amount' },
  { title: 'Đã cho mượn', dataIndex: 'borrowedAmount', key: 'borrowed' },
  { title: 'Năm xuất bản', dataIndex: 'yearOfPublication', key: 'yearOfPublication' },
];

const bookPreviewColumns = [
  { title: 'Sách', dataIndex: 'name', key: 'name' },
  { title: 'Tổng số sách', dataIndex: 'amount', key: 'amount' },
  { title: 'Đã cho mượn', dataIndex: 'borrowed amount', key: 'borrowed' },
  { title: 'Năm xuất bản', dataIndex: 'year of publication', key: 'yearOfPublication' },
];

const StatisticalPage: React.FC = () => {
  const [previewData, setPreviewData] = useState([]); // State lưu dữ liệu preview
  const [isModalVisible, setIsModalVisible] = useState(false); // State quản lý modal

  const bookImportBulk = useCreateApi({
    url: "/books-imports/bulk",
    successMsg: "Duyệt tài liệu thành công!",
    errorMsg: "Duyệt tài liệu thất bại, vui lòng thử lại.",
    fullResp: true,
  });

  const bookImport = useFetchApi({url: "/books-imports/pagination", auth: true})

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: ['name', 'amount', 'borrowed amount', 'year of publication'] });

      setPreviewData(json.slice(1) as any[]); // Lưu dữ liệu vào state preview
      setIsModalVisible(true); // Hiển thị modal preview
    };

    reader.onerror = () => {
      message.error('Có lỗi xảy ra khi đọc file!');
    };

    reader.readAsArrayBuffer(file);
    return false; // Ngăn Ant Design tự tải file lên server
  };

  const handleConfirm = async () => {
    const data = previewData.map((e: object) => ({
      amount: e.amount,
      borrowedAmount: e["borrowed amount"],
      title: e.name,
      yearOfPublication: String(e["year of publication"]),
    }))

    await bookImportBulk.handleCreate(data)

    setPreviewData([]); // Xóa dữ liệu preview
    setIsModalVisible(false); // Ẩn modal
    message.success('Dữ liệu đã được cập nhật!');
  };

  const handleCancel = () => {
    setPreviewData([]); // Xóa dữ liệu preview
    setIsModalVisible(false); // Ẩn modal
  };

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
              dataSource={bookImport.data}
              columns={bookColumns}
              pagination={false}
              size="small"
          />
        </Card>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <Button type="default">Cập nhật thông tin</Button>
          <Upload
              beforeUpload={handleUpload}
              accept=".xlsx, .xls"
              showUploadList={false}
          >
            <Button type="primary">Duyệt tài liệu</Button>
          </Upload>
        </div>

        {/* Preview Modal */}
        <Modal
            title="Xem trước dữ liệu"
            visible={isModalVisible}
            onOk={handleConfirm}
            onCancel={handleCancel}
            okText="Xác nhận"
            cancelText="Hủy"
            width={800}
        >
          <Table
              dataSource={previewData}
              columns={bookPreviewColumns}
              pagination={false}
              size="small"
          />
        </Modal>
      </div>
  );
};

export default StatisticalPage;
