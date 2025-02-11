import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Button, Modal, Progress } from "antd";
// Dummy form content
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
    return (_jsxs(_Fragment, { children: [_jsx(Button, { type: "primary", onClick: showModal, children: "Submit Answers" }), _jsxs(Modal, { title: _jsx("div", { className: "text-center", children: _jsx("h2", { className: "text-lg font-semibold", children: "\u0110\u1EC0 THI B\u00C0I T\u1EACP TO\u00C1N TU\u1EA6N 1 - PH\u00C2N S\u1ED0" }) }), centered: true, visible: isModalVisible, onCancel: handleCancel, footer: null, children: [_jsx("div", { className: "flex justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(Progress, { type: "circle", percent: scorePercentage, width: 200, strokeWidth: 15 }), _jsxs("p", { className: "mt-4", children: ["Th\u1EDDi gian l\u00E0m b\u00E0i: ", _jsx("span", { id: "elapsed-time", children: elapsedTime })] })] }) }), _jsxs("div", { className: "mt-6 flex justify-center space-x-4", children: [_jsx(Button, { className: "btnx0", onClick: reloadPage, children: "L\u00C0M L\u1EA0I" }), _jsx(Button, { type: "primary", className: "btnx1", onClick: viewResults, children: "XEM B\u00C0I L\u00C0M" })] })] })] }));
};
export default AssignmentResultModal;
