import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Card, message, Modal, Pagination, Segmented, Space, Table } from "antd";
import { useState } from "react";
import { columnsReceived, columnsSent } from "./column";
import useFetchApi from "../../hooks/useFetchApi";
import { receivedTaskPath, sentTaskPath } from "../../helpers/api-params/auth";
import useEditApi from "../../hooks/useEditApi";
export const RequestTable = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [viewMode, setViewMode] = useState('received');
    const [selectedTask, setSelectedTask] = useState(null);
    const sentTaskApi = useFetchApi(sentTaskPath);
    const receivedTaskApi = useFetchApi(receivedTaskPath);
    const taskEdit = useEditApi({
        url: `/tasks/${selectedTask?.id}`,
        fullResp: true,
        handleSuccess: () => message.success("Sửa trạng thái yêu cầu thành công!"),
        handleError: () => message.error("Sửa trạng thái yêu cầu thất bại, vui lòng thử lại.")
    });
    const handleRowClick = (task) => {
        setSelectedTask(task);
    };
    const handleClose = () => {
        setIsModalVisible(false);
        setSelectedTask(null);
    };
    const sourceTaskApi = viewMode === "received" ? receivedTaskApi : sentTaskApi;
    const handleStatusChange = async (status) => {
        await taskEdit.handleEdit({ status });
        sourceTaskApi.setFetched(false);
    };
    const columns = viewMode === "received" ? columnsReceived(handleStatusChange) : columnsSent(handleStatusChange);
    const handlePageChange = (page) => {
        sourceTaskApi?.fetchApi(undefined, {
            params: {
                page,
                pageSize: sourceTaskApi.pagination?.pageSize || 10
            }
        });
    };
    return (_jsx(_Fragment, { children: _jsxs(Space, { direction: "vertical", style: { width: '100%' }, children: [_jsxs(Card, { title: "Ph\u00E2n c\u00F4ng c\u00F4ng vi\u1EC7c", className: "mt-6", children: [_jsx(Space, { children: _jsx("div", { className: "bg-gray-100 p-2.5 rounded-lg mb-5 font-bold", children: _jsx(Segmented, { value: viewMode, onChange: setViewMode, options: [
                                        { label: 'Yêu Cầu Được Giao', value: "received" },
                                        { label: 'Yêu Cầu Gửi Đi', value: "sent" },
                                    ] }) }) }), _jsx(Table, { columns: columns, dataSource: sourceTaskApi.data, pagination: false, onRow: (record) => ({
                                onClick: () => handleRowClick(record),
                            }) }), _jsx(Pagination, { align: "end", current: sourceTaskApi?.pagination?.page, total: sourceTaskApi?.count, pageSize: sourceTaskApi?.pagination?.pageSize, onChange: handlePageChange, showSizeChanger: false, className: "custom-pagination mt-3" })] }), _jsx(Modal, { title: "Chi ti\u1EBFt c\u00F4ng vi\u1EC7c", open: isModalVisible, onCancel: handleClose, footer: [
                        _jsx(Button, { onClick: handleClose, children: "\u0110\u00F3ng" }, "back"),
                        _jsx(Button, { type: "primary", onClick: handleClose, children: "Ho\u00E0n th\u00E0nh" }, "submit"),
                    ], width: 800, centered: true, children: selectedTask && (_jsxs(_Fragment, { children: [_jsxs("p", { children: [_jsx("strong", { children: "T\u00EAn nhi\u1EC7m v\u1EE5:" }), " ", selectedTask.task] }), _jsxs("p", { children: [_jsx("strong", { children: "Ng\u01B0\u1EDDi giao:" }), " ", viewMode === "received" ? selectedTask.assignedBy : selectedTask.assignedTo] }), _jsxs("p", { children: [_jsx("strong", { children: "Deadline:" }), " ", selectedTask.deadline] }), _jsxs("p", { children: [_jsx("strong", { children: "N\u1ED9i dung:" }), " ", selectedTask.content] }), _jsxs("p", { children: [_jsx("strong", { children: "Tr\u1EA1ng th\u00E1i:" }), " ", selectedTask.status] })] })) })] }) }));
};
