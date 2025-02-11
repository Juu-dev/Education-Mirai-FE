// Mock data for students
export const generateStudentData = (count) => Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: "Nguyễn Bình An",
    birthDate: "09/03/2004",
    parentName: "Bình Tống",
    phone: "0914549798",
}));
// Mock data for student groups
export const STUDENT_GROUPS = [
    { id: "1", name: "Group A" },
    { id: "2", name: "Group B" },
    { id: "3", name: "Group C" },
];
// Mock data for teacher
export const TEACHER = {
    avatar: "https://i.pravatar.cc/150?img=4",
    name: "Đặng Tuấn Linh",
    class: "5A",
    studentCount: 30,
    code: "20120122",
    birthDate: "14/10/2012",
    email: "nga4@gmail.com",
};
export const ASSIGNMENT_DATA = [
    // Dữ liệu ví dụ cho bài tập
    {
        id: 1,
        name: "Bài tập 1",
        assignedDate: "2024-10-01",
        questionCount: 10,
        subject: "Toán",
        type: "Thực hành",
    },
    {
        id: 2,
        name: "Bài tập 2",
        assignedDate: "2024-10-02",
        questionCount: 5,
        subject: "Văn",
        type: "Kiểm tra",
    },
    // Thêm dữ liệu khác nếu cần
];
