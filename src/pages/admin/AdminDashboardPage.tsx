import { Avatar, Button, Card, Progress } from "antd";
import { CheckOutlined, SendOutlined } from "@ant-design/icons";
import useAuth from "../../hooks/useAuth.ts";
import {Role} from "../../constants/roles/role.ts";
import {RequestTable} from "../request/RequestTable.tsx";

const goals = {
    current: 10,
    target: 20,
}

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

const roleName = {
    [Role.Teacher]: "Giáo Viên",
    [Role.Student]: "Học Sinh",
    [Role.Principal]: "Hiệu Trưởng",
    [Role.Librarian]: "Thủ thư",
}

const AdminDashboard = () => {
    const {me} = useAuth();

    return (
        <div>
            {/* Top Section */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Profile Card */}
                <Card className="col-span-2 p-4">
                    <div className="flex items-center space-x-4">
                        <Avatar size={64} src="https://i.pravatar.cc/150?img=3" />
                        <div className="flex-grow">
                            <h2 className="text-lg font-semibold">{me?.teacher?.name}</h2>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <div className="text-gray-500">Vai trò</div>
                                <div className="text-gray-900">{roleName[me?.role]}</div>
                                <div className="text-gray-500">Lớp chủ nhiệm</div>
                                <div className="text-gray-900">{me?.teacher?.class?.name}</div>
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
            <RequestTable />
        </div>
    );
};

export default AdminDashboard;
