import {Button, Card, Modal, Pagination, Segmented, Space, Table} from "antd";
import {useState} from "react";
import {columnsReceived, columnsSent} from "./column";
import useFetchApi from "../../hooks/useFetchApi";
import {receivedTaskPath, sentTaskPath} from "../../helpers/api-params/auth";
import useEditApi from "../../hooks/useEditApi";

export const RequestTable = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [viewMode, setViewMode] = useState<'received' | 'sent'>('received');
    const [selectedTask, setSelectedTask] = useState<any | null>(null);

    const sentTaskApi = useFetchApi(sentTaskPath)
    const receivedTaskApi = useFetchApi(receivedTaskPath)

    const taskEdit = useEditApi({
        url: `/tasks/${selectedTask?.id}`,
        successMsg: "Sửa trạng thái yêu cầu thành công!",
        errorMsg: "Sửa trạng thái yêu cầu thất bại, vui lòng thử lại.",
        fullResp: true,
    })

    const handleRowClick = (task: any) => {
        setSelectedTask(task);
    };

    const handleClose = () => {
        setIsModalVisible(false);
        setSelectedTask(null);
    };

    const sourceTaskApi = viewMode === "received" ? receivedTaskApi : sentTaskApi;

    const handleStatusChange = async (status: any) => {
        await taskEdit.handleEdit({status});
        sourceTaskApi.setFetched(false)
    }

    const columns: any = viewMode === "received" ? columnsReceived(handleStatusChange) : columnsSent(handleStatusChange);

    const handlePageChange = (page: number) => {
        sourceTaskApi?.fetchApi(undefined, {
            params: {
                page,
                pageSize: sourceTaskApi.pagination?.pageSize || 10
            }
        });
    };

    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Card title="Phân công công việc" className="mt-6">
                    <Space>
                        <div className="bg-gray-100 p-2.5 rounded-lg mb-5 font-bold">
                            <Segmented
                                value={viewMode}
                                onChange={setViewMode as any}
                                options={[
                                    {label: 'Yêu Cầu Được Giao', value: "received"},
                                    {label: 'Yêu Cầu Gửi Đi', value: "sent"},
                                ]}
                            />
                        </div>
                    </Space>

                    <Table
                        columns={columns}
                        dataSource={sourceTaskApi.data}
                        pagination={false}
                        onRow={(record) => ({
                            onClick: () => handleRowClick(record),
                        })}
                    />

                    <Pagination
                        align="end"
                        current={sourceTaskApi?.pagination?.page}
                        total={sourceTaskApi?.count}
                        pageSize={sourceTaskApi?.pagination?.pageSize}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                        className="custom-pagination mt-3"
                    />
                </Card>

                {/* Task Detail Modal */}
                <Modal
                    title="Chi tiết công việc"
                    open={isModalVisible}
                    onCancel={handleClose}
                    footer={[
                        <Button key="back" onClick={handleClose}>
                            Đóng
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleClose}>
                            Hoàn thành
                        </Button>,
                    ]}
                    width={800}
                    centered
                >
                    {selectedTask && (
                        <>
                            <p><strong>Tên nhiệm vụ:</strong> {selectedTask.task}</p>
                            <p><strong>Người giao:</strong> {viewMode === "received" ? selectedTask.assignedBy : selectedTask.assignedTo}</p>
                            <p><strong>Deadline:</strong> {selectedTask.deadline}</p>
                            <p><strong>Nội dung:</strong> {selectedTask.content}</p>
                            <p><strong>Trạng thái:</strong> {selectedTask.status}</p>
                        </>
                    )}
                </Modal>
            </Space>
        </>
    )
}
