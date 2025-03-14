import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Card, Progress } from "antd";
import { CheckOutlined, SendOutlined } from "@ant-design/icons";
import { RequestTable } from "../request/RequestTable";
import { ProfileCard } from "./ProfileCard";
import { UpcomingSchedule } from "./UpcomingSchedule";
const goals = {
    current: 10,
    target: 20,
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
const Dashboard = () => {
    return (_jsxs("div", { children: [_jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsx(ProfileCard, {}), _jsx(Card, { className: "flex items-center justify-center text-lg font-bold", children: _jsxs("div", { className: "flex flex-col items-center justify-center", children: [_jsxs("div", { className: "text-gray-500 text-center", children: [goals.current, " ", _jsxs("span", { className: "text-gray-500", children: ["/ ", goals.target, " m\u1EE5c ti\u00EAu"] })] }), _jsx(Progress, { type: "dashboard", percent: (goals.current / goals.target) * 100, className: "mt-2" // Add margin-top for spacing
                                 })] }) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(Card, { title: "C\u00E1c ti\u1EBFt s\u1EAFp t\u1EDBi", className: "p-4", children: upcomingLessons.map((lesson) => (_jsxs("div", { className: "mb-4", children: [_jsxs("h3", { className: "font-bold", children: ["Ti\u1EBFt ", lesson.id, ": ", lesson.title] }), _jsxs("p", { children: ["T\u00F3m t\u1EAFt: ", lesson.summary] }), _jsx("p", { children: lesson.time }), _jsxs("div", { className: "flex space-x-2 mt-2", children: [_jsx(Button, { type: "primary", icon: _jsx(CheckOutlined, {}), children: "X\u00E1c nh\u1EADn" }), _jsx(Button, { icon: _jsx(SendOutlined, {}), children: "G\u1EEDi y\u00EAu c\u1EA7u" })] })] }, lesson.id))) }), _jsx(UpcomingSchedule, {})] }), _jsx(RequestTable, {})] }));
};
export default Dashboard;
