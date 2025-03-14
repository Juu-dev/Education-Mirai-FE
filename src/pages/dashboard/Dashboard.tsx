import { Button, Card, Progress } from "antd";
import { CheckOutlined, SendOutlined } from "@ant-design/icons";
import {RequestTable} from "../request/RequestTable";
import {ProfileCard} from "./ProfileCard";
import {SummaryStatistics} from "./SummaryStatistics";
import {UpcomingSchedule} from "./UpcomingSchedule";

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

const Dashboard = () => {
    return (
        <div>
            {/* Top Section */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Profile Card */}
                <ProfileCard />

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
            {/*<SummaryStatistics/>*/}

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
                <UpcomingSchedule/>
            </div>

            {/* Task Table */}
            <RequestTable />
        </div>
    );
};

export default Dashboard;
