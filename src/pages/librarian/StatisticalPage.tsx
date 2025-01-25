import React, { useState } from 'react';
import {Button, Card, Table, Upload, message, Radio, Pagination} from 'antd';
import { Line } from '@ant-design/charts';
import * as XLSX from 'xlsx';
import useCreateApi from "../../hooks/useCreateApi.ts";
import useFetchApi from "../../hooks/useFetchApi.ts";
import useAuth from "../../hooks/useAuth.ts";
import useModal from "../../hooks/modal/useModal.tsx";

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
  { title: 'Nhà xuất bản', dataIndex: 'publishingHouse', key: 'publishingHouse' },
];

const StatisticalPage: React.FC = () => {
  const { isPrincipal } = useAuth();
  const [previewData, setPreviewData] = useState([]);
    const [importMode, setImportMode] = useState<string | null>(null);

  const bookImportBulk = useCreateApi({
    url: "/books-imports/bulk",
    successMsg: "Duyệt tài liệu thành công!",
    errorMsg: "Duyệt tài liệu thất bại, vui lòng thử lại.",
    fullResp: true,
  });

  const bookImportBulkOverride = useCreateApi({
    url: "/books-imports/bulk-override",
    successMsg: "Duyệt tài liệu thành công!",
    errorMsg: "Duyệt tài liệu thất bại, vui lòng thử lại.",
    fullResp: true,
  });

  const bookImport = useFetchApi({ url: "/books-imports/pagination", auth: true });
  const overviewBook = useFetchApi({ url: "/books-imports/overview", auth: true });

  console.log("overviewBook: ", overviewBook.data)

  const handlePageChange = (page: number) => {
    bookImport?.fetchApi(undefined, {
      params: {
        page,
        pageSize: bookImport.pagination?.pageSize || 10
      }
    });
  };

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: ['name', 'amount', 'borrowed amount', 'year of publication', 'publishing house'] });

      setPreviewData(json.slice(1) as any[]);
      previewImport.openModal();
    };

    reader.onerror = () => {
      message.error('Có lỗi xảy ra khi đọc file!');
    };

    reader.readAsArrayBuffer(file);
    return false;
  };

  const handleConfirm = async () => {
    if (!importMode) {
      message.warning('Vui lòng chọn chế độ nhập dữ liệu!');
      return;
    }

    const data = previewData.map((e: any) => ({
      amount: e.amount,
      borrowedAmount: e["borrowed amount"],
      title: e.name,
      yearOfPublication: String(e["year of publication"]),
      publishingHouse: String(e["publishing house"]),
    }));

    if (importMode === 'normal') {
      await bookImportBulk.handleCreate(data);
    } else if (importMode === 'override') {
      await bookImportBulkOverride.handleCreate(data);
    }

    bookImport.setFetched(false);
    setPreviewData([]);
    setImportMode(null);
    previewImport.closeModal();
    message.success('Dữ liệu đã được cập nhật!');
  };

  const previewImport = useModal({
    title: "Xem trước dữ liệu",
    okText: "Xác nhận",
    handleOk: handleConfirm,
    cancelText: "Hủy",
    width: 800,
    content: (
        <Table
          dataSource={previewData}
          columns={[
            { title: 'Sách', dataIndex: 'name', key: 'name' },
            { title: 'Tổng số sách', dataIndex: 'amount', key: 'amount' },
            { title: 'Đã cho mượn', dataIndex: 'borrowed amount', key: 'borrowed' },
            { title: 'Năm xuất bản', dataIndex: 'year of publication', key: 'yearOfPublication' },
            { title: 'Nhà xuất bản', dataIndex: 'publishing house', key: 'publishingHouse' },
          ]}
          pagination={false}
          size="small"
        />
    ),
    footer: (_, { OkBtn, CancelBtn }) => (
        <div className="flex flex-col justify-end gap-5 mt-2">
            <Radio.Group
                onChange={(e) => setImportMode(e.target.value)}
                value={importMode}
            >
                <Radio value="normal">Không xoá dữ liệu cũ</Radio>
                <Radio value="override">Xoá dữ liệu cũ</Radio>
            </Radio.Group>
            <div className="flex items-end justify-end gap-2">
                <CancelBtn/>
                <OkBtn />
            </div>
        </div>
    ),
  });

    return (
        <div className="p-6">
            <div className="grid gap-4 mb-6">
                <Card className="p-4">
                    <h3 className="text-center font-semibold mb-4">Thống kê mượn sách</h3>
                    <Line {...lineConfig} />
                </Card>
            </div>

            {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold">{overviewBook?.data.totalBookTitles}</div>
              <div>Số đầu sách</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold">{overviewBook?.data.totalBorrowedBooks}</div>
              <div>Số sách đang cho mượn</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold">{overviewBook?.data.totalBooks - overviewBook?.data.totalBorrowedBooks}</div>
              <div>Số sách còn lại</div>
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
          <Pagination
              align="end"
              current={bookImport?.pagination?.page}
              total={bookImport?.count}
              pageSize={bookImport?.pagination?.pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
              className="custom-pagination mt-3"
          />
        </Card>

        {!isPrincipal && (
            <div className="flex justify-end gap-4 mt-6">
              <Upload
                  beforeUpload={handleUpload}
                  accept=".xlsx, .xls"
                  showUploadList={false}
              >
                <Button type="primary">Duyệt tài liệu</Button>
              </Upload>
            </div>
        )}
        {previewImport.modal}
      </div>
  );
};

export default StatisticalPage;
