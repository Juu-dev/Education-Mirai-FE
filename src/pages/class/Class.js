import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StudentSection } from "./StudentSection";
import { QuizSection } from "./QuizSection";
import { ExerciseSection } from "./ExerciseSection";
import { useLocation } from "react-router-dom";
import PageTitle from "../../components/common/SectionTitle";
import useAuth from "../../hooks/useAuth";
const Class = () => {
    const location = useLocation();
    const { classId, className, teacherName, studentCount } = location.state || {};
    const { me } = useAuth();
    return (_jsxs("div", { className: "flex flex-col min-h-screen", children: [_jsxs("div", { className: "bg-gray-100 p-4 mb-4", children: [_jsx(PageTitle, { title: `Lớp ${className || me?.class?.name}` }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Gi\u00E1o vi\u00EAn: ", teacherName || me?.name || "N/A", " | S\u0129 s\u1ED1: ", studentCount || me?.class?.amount || 0] })] }), _jsx(StudentSection, { classId: classId }), _jsxs("div", { className: "flex gap-4 mb-4", children: [_jsx(QuizSection, { classId: classId }), _jsx(ExerciseSection, { classId: classId })] })] }));
};
export default Class;
