import {Button, Card, Modal, Segmented, Space, Table} from "antd";
import {useState} from "react";
import {columnsReceived, columnsSent} from "./column.tsx";
import useFetchApi from "../../hooks/useFetchApi.ts";
import {formatDate} from "../../helpers/date.ts";

export const RequestTable = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [viewMode, setViewMode] = useState<'received' | 'sent'>('received');
    const [selectedTask, setSelectedTask] = useState<any | null>(null);

    const handleRowClick = (task: any) => {
        setSelectedTask(task);
        setIsModalVisible(true);
    };

    // Đóng form
    const handleClose = () => {
        setIsModalVisible(false);
        setSelectedTask(null);
    };

    const sentTaskApi = useFetchApi({
        url: "/tasks/sent-mode",
        auth: true,
        presentData: (data) => data.map((item: any) => ({
            key: item.id,
            task: item.title,
            assignedTo: item.assignee?.name || "Hiệu trưởng",
            deadline: formatDate(item.endTime),
            content: item.description,
            status: item.status
        }))
    })
    const receivedTaskApi = useFetchApi({
        url: "/tasks/received-mode",
        auth: true,
        presentData: (data) => data.map((item: any) => ({
            key: item.id,
            task: item.title,
            assignedBy: item.assignee?.name || "Hiệu trưởng",
            deadline: formatDate(item.endTime),
            content: item.description,
            status: item.status
        }))
    })

    const dataSource = viewMode === "received" ? receivedTaskApi.data : sentTaskApi.data;
    const columns = viewMode === "received" ? columnsReceived : columnsSent;

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
                                marginBottom: '20px', // Add margin for spacing
                                fontWeight: 'bold', // Highlight text
                            }}
                        />
                    </Space>

                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                        onRow={(record) => ({
                            onClick: () => handleRowClick(record), // Nhấn vào hàng để chọn task
                        })}
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
                    width={800}    // Increase form width
                    centered       // Center the form
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
