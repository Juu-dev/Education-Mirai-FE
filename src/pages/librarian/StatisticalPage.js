import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Card, Table, Upload, message, Radio, Pagination } from 'antd';
import { Line } from '@ant-design/charts';
import * as XLSX from 'xlsx';
import useCreateApi from "../../hooks/useCreateApi";
import useFetchApi from "../../hooks/useFetchApi";
import useAuth from "../../hooks/useAuth";
import useModal from "../../hooks/modal/useModal";
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
const StatisticalPage = () => {
    const { isPrincipal } = useAuth();
    const [previewData, setPreviewData] = useState([]);
    const [importMode, setImportMode] = useState(null);
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
    console.log("overviewBook: ", overviewBook.data);
    const handlePageChange = (page) => {
        bookImport?.fetchApi(undefined, {
            params: {
                page,
                pageSize: bookImport.pagination?.pageSize || 10
            }
        });
    };
    const handleUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet, { header: ['name', 'amount', 'borrowed amount', 'year of publication', 'publishing house'] });
            setPreviewData(json.slice(1));
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
        const data = previewData.map((e) => ({
            amount: e.amount,
            borrowedAmount: e["borrowed amount"],
            title: e.name,
            yearOfPublication: String(e["year of publication"]),
            publishingHouse: String(e["publishing house"]),
        }));
        if (importMode === 'normal') {
            await bookImportBulk.handleCreate(data);
        }
        else if (importMode === 'override') {
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
        content: (_jsx(Table, { dataSource: previewData, columns: [
                { title: 'Sách', dataIndex: 'name', key: 'name' },
                { title: 'Tổng số sách', dataIndex: 'amount', key: 'amount' },
                { title: 'Đã cho mượn', dataIndex: 'borrowed amount', key: 'borrowed' },
                { title: 'Năm xuất bản', dataIndex: 'year of publication', key: 'yearOfPublication' },
                { title: 'Nhà xuất bản', dataIndex: 'publishing house', key: 'publishingHouse' },
            ], pagination: false, size: "small" })),
        footer: (_, { OkBtn, CancelBtn }) => (_jsxs("div", { className: "flex flex-col justify-end gap-5 mt-2", children: [_jsxs(Radio.Group, { onChange: (e) => setImportMode(e.target.value), value: importMode, children: [_jsx(Radio, { value: "normal", children: "Kh\u00F4ng xo\u00E1 d\u1EEF li\u1EC7u c\u0169" }), _jsx(Radio, { value: "override", children: "Xo\u00E1 d\u1EEF li\u1EC7u c\u0169" })] }), _jsxs("div", { className: "flex items-end justify-end gap-2", children: [_jsx(CancelBtn, {}), _jsx(OkBtn, {})] })] })),
    });
    return (_jsxs("div", { className: "p-6", children: [_jsx("div", { className: "grid gap-4 mb-6", children: _jsxs(Card, { className: "p-4", children: [_jsx("h3", { className: "text-center font-semibold mb-4", children: "Th\u1ED1ng k\u00EA m\u01B0\u1EE3n s\u00E1ch" }), _jsx(Line, { ...lineConfig })] }) }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsx(Card, { children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold", children: overviewBook?.data.totalBookTitles }), _jsx("div", { children: "S\u1ED1 \u0111\u1EA7u s\u00E1ch" })] }) }), _jsx(Card, { children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold", children: overviewBook?.data.totalBorrowedBooks }), _jsx("div", { children: "S\u1ED1 s\u00E1ch \u0111ang cho m\u01B0\u1EE3n" })] }) }), _jsx(Card, { children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold", children: overviewBook?.data.totalBooks - overviewBook?.data.totalBorrowedBooks }), _jsx("div", { children: "S\u1ED1 s\u00E1ch c\u00F2n l\u1EA1i" })] }) })] }), _jsxs(Card, { title: "Th\u00F4ng tin th\u01B0 vi\u1EC7n v\u1EADt l\u00FD", className: "p-4", children: [_jsx(Table, { dataSource: bookImport.data, columns: bookColumns, pagination: false, size: "small" }), _jsx(Pagination, { align: "end", current: bookImport?.pagination?.page, total: bookImport?.count, pageSize: bookImport?.pagination?.pageSize, onChange: handlePageChange, showSizeChanger: false, className: "custom-pagination mt-3" })] }), !isPrincipal && (_jsx("div", { className: "flex justify-end gap-4 mt-6", children: _jsx(Upload, { beforeUpload: handleUpload, accept: ".xlsx, .xls", showUploadList: false, children: _jsx(Button, { type: "primary", children: "Duy\u1EC7t t\u00E0i li\u1EC7u" }) }) })), previewImport.modal] }));
};
export default StatisticalPage;
