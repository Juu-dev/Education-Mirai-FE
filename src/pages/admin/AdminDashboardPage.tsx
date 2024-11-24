import { Avatar, Button, Table, Card, Progress, Modal } from "antd";
import { CheckOutlined, PaperClipOutlined, SendOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

interface Task {
    key: number;
    task: string;
    assignedBy: string;
    action: string;
}

const goals = {
    current: 10,
    target: 20,
}

const columns: ColumnsType<Task> = [
    {
        title: "STT",
        dataIndex: "key",
        key: "key",
    },
    {
        title: "Công việc",
        dataIndex: "task",
        key: "task",
    },
    {
        title: "Giao bởi",
        dataIndex: "assignedBy",
        key: "assignedBy",
    },
    {
        title: "Hành động",
        key: "action",
        render: () => (
            <div className="flex space-x-2">
                <Button icon={<CheckOutlined />} type="primary" />
                <Button icon={<SendOutlined />} type="default" />
            </div>
        ),
    },
];

const tasks: Task[] = [
    { key: 1, task: "Bổ sung hồ sơ abcxyz", assignedBy: "Hiệu trưởng", action: "" },
    { key: 2, task: "Bổ sung hồ sơ abcxyz", assignedBy: "Hiệu trưởng", action: "" },
    { key: 3, task: "Bổ sung hồ sơ abcxyz", assignedBy: "Hiệu trưởng", action: "" },
];

const taskDetailsData = {
    title: "Bổ sung hồ sơ",
    status: "Chưa hoàn thành",
    dateRange: "09/05/2024 - 10/05/2024",
    assignedBy: "Hiệu trưởng",
    content: "Em cần bổ sung xxx tài liệu",
    attachment: "file.pdf",
};

const upcomingLessons = [
    {
        id: 1,
        title: "Luyện từ và câu",
        summary: "Dấu câu",
        time: "8:00 - 9:00",
    },
    {
        id: 2,
        title: "Luyện từ và câu",
        summary: "Dấu câu",
        time: "9:00 - 10:00",
    },
];

const upcomingSchedule = [
    {
        date: "14/10/2024",
        events: [
            {
                time: "09:30 am",
                event: "Khai giảng năm học",
            },
            {
                time: "10:00 am",
                event: "Khai giảng năm học",
            },
            {
                time: "12:00 pm",
                event: "Bế mạc",
            },
        ],
    },
    {
        date: "15/10/2024",
        events: [
            {
                time: "08:00 am",
                event: "Họp giáo viên",
            },
            {
                time: "01:00 pm",
                event: "Thi học kỳ 1",
            },
        ],
    },
];

const AdminDashboard = () => {
    const { me } = useContext(AuthContext);
    
    console.log('check me data', me);
    // State for modal visibility
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Function to show modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Function to close modal
    const handleClose = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            {/* Top Section */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Profile Card */}
                <Card className="col-span-2 p-4">
                    <div className="flex items-center space-x-4">
                        <Avatar size={64} src="https://i.pravatar.cc/150?img=3" />
                        <div className="flex-grow">
                            <h2 className="text-lg font-semibold">Nguyễn Văn A</h2>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <div className="text-gray-500">Vai trò</div>
                                <div className="text-gray-900">Giáo viên</div>
                                <div className="text-gray-500">Lớp chủ nhiệm</div>
                                <div className="text-gray-900">12A1</div>
                                <div className="text-gray-500">Email</div>
                                <div className="text-gray-900">{me?.email}</div>
                                <div className="text-gray-500">Tài liệu đã duyệt</div>
                                <div className="text-gray-900">20</div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Target Goals */}
                <Card className="flex items-center justify-center text-lg font-bold">
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-gray-500 text-center">
                            {goals.current} <span className="text-gray-500">/ {goals.target} mục tiêu</span>
                        </div>
                        <Progress 
                            type="dashboard"
                            percent={(goals.current / goals.target) * 100}
                            className="mt-2" // Add margin-top for spacing
                        />
                    </div>
                </Card>
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <Card>
                    <div className="text-center">
                        <div className="text-2xl font-bold">45/45</div>
                        <div>Tổng số học sinh</div>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <div className="text-2xl font-bold">25/25</div>
                        <div>Tổng số tiết dạy</div>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <div className="text-2xl font-bold">01/10</div>
                        <div>Tổng số yêu cầu</div>
                    </div>
                </Card>
            </div>

            {/* Upcoming Lessons and Tasks */}
            <div className="grid grid-cols-2 gap-4">
                {/* Upcoming Lessons */}
                <Card title="Các tiết sắp tới" className="p-4">
                    {upcomingLessons.map((lesson) => (
                        <div className="mb-4" key={lesson.id}>
                            <h3 className="font-bold">Tiết {lesson.id}: {lesson.title}</h3>
                            <p>Tóm tắt: {lesson.summary}</p>
                            <p>{lesson.time}</p>
                            <div className="flex space-x-2 mt-2">
                                <Button type="primary" icon={<CheckOutlined />}>
                                    Xác nhận
                                </Button>
                                <Button icon={<SendOutlined />}>Gửi yêu cầu</Button>
                            </div>
                        </div>
                    ))}
                </Card>

                 {/* Upcoming Schedule */}
                 <Card title="Lịch sắp tới" className="p-4">
                    {upcomingSchedule.map((schedule, index) => (
                        <div key={index} className="mb-4">
                            {/* Render the date */}
                            <h3 className="font-bold text-lg mb-2">{schedule.date}</h3>

                            {/* Render the events for this date */}
                            <ul className="space-y-2">
                                {schedule.events.map((event, idx) => (
                                    <li className="flex items-center justify-between" key={idx}>
                                        <span>{event.time}</span>
                                        <span>{event.event}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </Card>
            </div>

            {/* Task Table */}
            <Card title="Phân công công việc" className="mt-6">
                <Table
                    columns={columns}
                    dataSource={tasks}
                    pagination={false}
                    onRow={() => {
                        return {
                            onClick: () => showModal(), // Click row to show modal
                        };
                    }}
                />
            </Card>

            {/* Task Detail Modal */}
            <Modal
                title={taskDetailsData.title}
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
                width={800}    // Increase modal width
                centered       // Center the modal
            >
                <p><strong>Tên nhiệm vụ:</strong> {taskDetailsData.title}</p>
                <p><strong>Trạng thái:</strong> {taskDetailsData.status}</p>
                <p><strong>Thời gian:</strong> {taskDetailsData.dateRange}</p>
                <p><strong>Được giao bởi:</strong> {taskDetailsData.assignedBy}</p>
                <p><strong>Nội dung:</strong> {taskDetailsData.content}</p>
                <p><strong>Đính kèm:</strong> <PaperClipOutlined /> {taskDetailsData.attachment}</p>
            </Modal>
        </div>
    );
};

export default AdminDashboard;
