import { useState } from "react";
import { AssignmentList } from "../../components/assignment/AssignmentList";
import { useNavigate } from "react-router-dom";

const assignments = [
    {
        id: 1,
        title: "BÀI TẬP TOÁN TUẦN 1 - PHÂN SỐ",
        description: "Complete the assignment for fractions.",
        dueDate: "2023-10-15",
        isCompleted: false,
        tags: ["Tuần 1", "Toán", "Chương 1"],
        time: "50'",
    },
    {
        id: 2,
        title: "BÀI TẬP TOÁN TUẦN 2 - SỐ HỌC",
        description: "Complete the assignment for numbers.",
        dueDate: "2023-10-15",
        isCompleted: false,
        tags: ["Tuần 2", "Toán", "Chương 2"],
        time: "50'",
    },
    {
        id: 3,
        title: "BÀI TẬP TOÁN TUẦN 3 - ĐẠI SỐ",
        description: "Complete the assignment for algebra.",
        dueDate: "2023-10-15",
        isCompleted: false,
        tags: ["Tuần 3", "Toán", "Chương 3"],
        time: "50'",
    },
    {
        id: 4,
        title: "BÀI TẬP TOÁN TUẦN 4 - HÌNH HỌC",
        description: "Complete the assignment for geometry.",
        dueDate: "2023-10-15",
        isCompleted: false,
        tags: ["Tuần 4", "Toán", "Chương 4"],
        time: "50'",
    },
    {
        id: 5,
        title: "BÀI TẬP TOÁN TUẦN 5 - XÁC SUẤT",
        description: "Complete the assignment for probability.",
        dueDate: "2023-10-15",
        isCompleted: false,
        tags: ["Tuần 5", "Toán", "Chương 5"],
        time: "50'",
    },
    {
        id: 6,
        title: "BÀI TẬP TOÁN TUẦN 6 - LÝ THUYẾT SỐ",
        description: "Complete the assignment for number theory.",
        dueDate: "2023-10-15",
        isCompleted: false,
        tags: ["Tuần 6", "Toán", "Chương 6"],
        time: "50'",
    },
]

export const AssignmentPage = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [assignmentList, setAssignmentList] = useState(assignments);

    // const handleCompleteAssignment = (id: number) => {
    //     setAssignmentList((prevAssignments) =>
    //         prevAssignments.map((assignment) =>
    //             assignment.id === id
    //                 ? { ...assignment, isCompleted: true }
    //                 : assignment
    //         )
    //     );
    // };

    const handleDoAssignment = (id: number) => {
        navigate(`/student/assignments/${id}`);
    }

    return (
        <div>
            <AssignmentList assignments={assignmentList} onComplete={handleDoAssignment} />
        </div>
    );
}
