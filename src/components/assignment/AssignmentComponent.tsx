import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { AssignmentInterface } from "./interface/assginment-interface";

interface AssignmentComponentProps {
    assignment: AssignmentInterface;
    onComplete: (id: number) => void;
}

export const AssignmentComponent: React.FC<AssignmentComponentProps> = ({ assignment, onComplete }) => {
    return (
        <div className="col-lg-4 col-md-6 col-12 p-4">
            {/* Custom Card Container */}
            <div className="bg-white shadow-lg rounded-lg h-full flex flex-col p-6" data-aos="fade-up">
                {/* Title */}
                <h3 className="text-xl font-semibold mb-4 text-black">{assignment.title}</h3>

                {/* Description */}
                <div className="content mb-4 text-gray-800 text-lg flex-grow">
                    {assignment.description}
                </div>

                {/* Tags */}
                <div className="tags mb-4 space-x-2">
                    <span className="inline-flex items-center px-2 py-1 text-sm font-medium bg-red-100 text-red-800 rounded">
                        <ClockCircleOutlined className="mr-1" /> {assignment.time}
                    </span>
                    {assignment.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Button */}
                <button
                    className={`w-full mt-auto py-2 rounded text-white ${
                        assignment.isCompleted ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    onClick={() => onComplete(assignment.id)}
                    disabled={assignment.isCompleted}
                >
                    {assignment.isCompleted ? "Đã hoàn thành" : "LÀM BÀI"}
                </button>
            </div>
        </div>
    );
};
