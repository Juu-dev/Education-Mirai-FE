import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import {Card} from "antd";

interface AssignmentCardProps {
    assignment: any;
    gotoDetailPage: (id: string) => void;
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment, gotoDetailPage }) => {
    const truncateText = (text: string, maxLength: number): string => {
        if (!text) return "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <Card bordered={false}>
            <h3 className="text-xl font-semibold mb-4 text-black">
                {truncateText(assignment?.name, 50)}
            </h3>

            <div className="mb-4 text-gray-800 text-lg">
                {truncateText(assignment?.description, 100)}
            </div>

            <div className="tags mb-4 space-x-2">
                <span
                    className="inline-flex items-center px-2 py-1 text-sm font-medium bg-red-100 text-red-800 rounded">
                    <ClockCircleOutlined className="mr-1"/> {assignment.timeOut} phút
                </span>
            </div>

            <button
                className={`w-full py-2 rounded text-white ${
                    assignment?.isCompleted ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={() => gotoDetailPage(assignment?.id)}
                disabled={assignment?.isCompleted}
            >
                {assignment?.isCompleted ? "Đã hoàn thành" : "LÀM BÀI"}
            </button>
        </Card>

    );
};
