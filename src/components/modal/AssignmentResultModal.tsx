import { useState } from "react";
import { Button, Modal, Progress } from "antd";

// Dummy modal content
const AssignmentResultModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [elapsedTime, setElapsedTime] = useState("00:00:10"); // Simulated time
    const [scorePercentage, setScorePercentage] = useState(80); // Simulated score

    // Simulate fetch API (currently commented out)
    // const fetchResults = async () => {
    //     try {
    //         const response = await fetch("/api/assignment-result");
    //         const data = await response.json();
    //         // Set results in the state
    //         setScorePercentage(data.scorePercentage);
    //         setElapsedTime(data.elapsedTime);
    //     } catch (error) {
    //         console.error("Error fetching assignment result:", error);
    //     }
    // };

    const showModal = () => {
        // Simulate fetching result data
        // fetchResults(); // Uncomment this when API is available
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const reloadPage = () => {
        window.location.reload(); // Simulate reloading the page
    };

    const viewResults = () => {
        // Simulate viewing the answers
        setIsModalVisible(false);
        console.log("Viewing answers...");
    };

    return (
        <>
            {/* Button to trigger the modal */}
            <Button type="primary" onClick={showModal}>
                Submit Answers
            </Button>

            {/* Modal */}
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
        </>
    );
};

export default AssignmentResultModal;
