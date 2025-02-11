import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Card } from "antd";
export const AssignmentCard = ({ assignment, gotoDetailPage }) => {
    const truncateText = (text, maxLength) => {
        if (!text)
            return "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };
    return (_jsxs(Card, { bordered: false, children: [_jsx("h3", { className: "text-xl font-semibold mb-4 text-black", children: truncateText(assignment?.name, 50) }), _jsx("div", { className: "mb-4 text-gray-800 text-lg", children: truncateText(assignment?.description, 100) }), _jsx("div", { className: "tags mb-4 space-x-2", children: _jsxs("span", { className: "inline-flex items-center px-2 py-1 text-sm font-medium bg-red-100 text-red-800 rounded", children: [_jsx(ClockCircleOutlined, { className: "mr-1" }), " ", assignment.timeOut, " ph\u00FAt"] }) }), _jsx("button", { className: `w-full py-2 rounded text-white ${assignment?.isCompleted ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`, onClick: () => gotoDetailPage(assignment?.id), disabled: assignment?.isCompleted, children: assignment?.isCompleted ? "Đã hoàn thành" : "LÀM BÀI" })] }));
};
