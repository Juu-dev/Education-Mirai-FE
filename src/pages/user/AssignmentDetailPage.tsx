import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Typography, Tag, Radio, Divider, Pagination, Modal, Progress } from "antd";
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { useCountdown } from "../../hooks/useCountdown";

const mockAssignments = [
    {
        id: 1,
        title: "BÀI TẬP TOÁN TUẦN 1 - PHÂN SỐ",
        description: "Complete the assignment for fractions.",
        dueDate: "2023-10-15",
        isCompleted: false,
        tags: ["Tuần 1", "Toán", "Chương 1"],
        time: "50'",
        questions: [
            {
                id: 1,
                question: "Câu 1. 1/2 + 1/5 = ?",
                options: ["0.75", "0.35", "0.15", "0.45"],
            },
            {
                id: 2,
                question: "Câu 2. 3/4 - 1/3 = ?",
                options: ["0.25", "0.45", "0.35", "0.5"],
            },
            {
                id: 3,
                question: "Câu 3. 2/5 + 4/5 = ?",
                options: ["1", "0.6", "1.2", "0.9"],
            },
            {
                id: 4,
                question: "Câu 4. 5/6 - 1/3 = ?",
                options: ["0.33", "0.5", "0.67", "0.83"],
            },
            {
                id: 5,
                question: "Câu 5. 7/8 + 1/8 = ?",
                options: ["0.75", "1", "0.875", "1.125"],
            },
            {
                id: 6,
                question: "Câu 6. 3/5 + 2/10 = ?",
                options: ["0.5", "0.7", "0.6", "0.9"],
            },
            {
                id: 7,
                question: "Câu 7. 1/4 + 3/4 = ?",
                options: ["0.25", "1", "0.75", "0.5"],
            },
            {
                id: 8,
                question: "Câu 8. 4/5 - 2/5 = ?",
                options: ["0.2", "0.4", "0.5", "0.6"],
            },
        ],
    },
    {
        id: 2,
        title: "BÀI TẬP TOÁN TUẦN 2 - SỐ HỌC",
        description: "Complete the assignment for numbers.",
        dueDate: "2023-10-22",
        isCompleted: false,
        tags: ["Tuần 2", "Toán", "Chương 2"],
        time: "50'",
        questions: [
            {
                id: 1,
                question: "Câu 1. 2 + 3 = ?",
                options: ["4", "5", "6", "7"],
            },
            {
                id: 2,
                question: "Câu 2. 10 - 7 = ?",
                options: ["1", "2", "3", "4"],
            },
        ],
    },
    // Add more assignments and questions as needed
];

const { Title, Text } = Typography;

export const AssignmentDetailPage = () => {
    const { id } = useParams<{ id: string }>(); // Get the assignment ID from the URL
    const navigate = useNavigate();

    const assignment = mockAssignments.find((assignment) => assignment.id === parseInt(id || '', 10));

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4; // Number of questions per page
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
    const [elapsedTime] = useState("00:00:10"); // Simulated time
    const [scorePercentage] = useState(80); // Simulated score

    // Countdown timer setup (assuming assignment time is in minutes, convert to seconds)
    const initialTime = 50 * 60; // 50 minutes in seconds
    const [time, resetCountdown] = useCountdown(initialTime);

    // Convert time in seconds to minutes and seconds format
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // If the assignment is not found, return an error message
    if (!assignment) {
        return <div>Assignment not found!</div>;
    }

    // Calculate the questions for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedQuestions = assignment.questions.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const showModal = () => {
        // Simulate fetching result data
        // fetchResults(); // Uncomment this when API is available
        resetCountdown(0); // Stop the countdown timer
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const reloadPage = () => {
        window.location.reload(); // Simulate reloading the page
    };

    const viewResults = () => {
        setIsModalVisible(false);
        console.log("Viewing answers...");
    };

    return (
        <div className="p-6">
            {/* Header Section with Go Back, Countdown Timer, and Submit Buttons */}
            <div className="flex justify-between items-center mb-6">
                <Button
                    icon={<ArrowLeftOutlined />}
                    type="link"
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </Button>

                <div className="flex items-center space-x-4">
                    {/* Countdown Timer */}
                    <div className="text-lg font-bold text-red-500">
                        {formatTime(time)}
                    </div>

                    {/* Submit Assignment Button */}
                    <Button
                        icon={<SaveOutlined />}
                        type="primary"
                        onClick={showModal} // Trigger modal on submit
                    >
                        Submit Assignment
                    </Button>
                </div>
            </div>
            <hr />
            <div className="bg-white p-6 shadow-md rounded-lg">
                {/* Assignment Info */}
                <Title level={2} className="mb-2">{assignment.title}</Title>
                <Text type="secondary" className="block mb-1">
                    Due Date: {assignment.dueDate}
                </Text>
                <Text className="block mb-4">
                    {assignment.description}
                </Text>
                <div className="mb-4 space-x-2">
                    {assignment.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </div>

                {/* Divider for better spacing */}
                <Divider />

                {/* Quiz Section */}
                <div>
                    {paginatedQuestions.map((question) => (
                        <div
                            key={question.id}
                            className="mb-6 border-b pb-4 last:border-b-0"
                        >
                            <Title level={4} className="mb-4">
                                {question.question}
                            </Title>
                            <Radio.Group className="space-y-2">
                                {question.options.map((option, index) => (
                                    <Radio key={index} value={option}>
                                        {option}
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center">
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={assignment.questions.length}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />
                </div>
            </div>

            {/* Modal for displaying results */}
            <Modal
                title={
                    <div className="text-center">
                        <h2 className="text-lg font-semibold">ĐỀ THI BÀI TẬP TOÁN TUẦN 1 - PHÂN SỐ</h2>
                    </div>
                }
                centered
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="flex justify-center">
                    <div className="text-center">
                        <Progress
                            type="circle"
                            percent={scorePercentage}
                            width={200}
                            strokeWidth={15}
                        />
                        <p className="mt-4">Thời gian làm bài: <span id="elapsed-time">{elapsedTime}</span></p>
                    </div>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                    <Button className="btnx0" onClick={reloadPage}>
                        LÀM LẠI
                    </Button>
                    <Button type="primary" className="btnx1" onClick={viewResults}>
                        XEM BÀI LÀM
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default AssignmentDetailPage;
