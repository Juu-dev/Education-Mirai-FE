import {Button, Card, Modal, Pagination, Segmented, Space, Table} from "antd";
import {useState} from "react";
import {columnsReceived, columnsSent} from "./column.tsx";
import useFetchApi from "../../hooks/useFetchApi.ts";
import {receivedTaskPath, sentTaskPath} from "../../helpers/api-params/auth.ts";

export const RequestTable = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [viewMode, setViewMode] = useState<'received' | 'sent'>('received');
    const [selectedTask, setSelectedTask] = useState<any | null>(null);

    const handleRowClick = (task: any) => {
        setSelectedTask(task);
        setIsModalVisible(true);
    };

    const handleClose = () => {
        setIsModalVisible(false);
        setSelectedTask(null);
    };

    const sentTaskApi = useFetchApi(sentTaskPath)
    const receivedTaskApi = useFetchApi(receivedTaskPath)

    const sourceTaskApi = viewMode === "received" ? receivedTaskApi : sentTaskApi;
    const columns = viewMode === "received" ? columnsReceived : columnsSent;

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
                        <Segmented
                            value={viewMode}
                            onChange={setViewMode}
                            options={[
                                { label: 'Yêu Cầu Được Giao', value: "received" },
                                { label: 'Yêu Cầu Gửi Đi', value: "sent" },
                            ]}
                            style={{
                                backgroundColor: '#f0f0f0',
                                padding: '5px 10px',
                                borderRadius: '8px',
                                marginBottom: '20px',
                                fontWeight: 'bold',
                            }}
                        />
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
