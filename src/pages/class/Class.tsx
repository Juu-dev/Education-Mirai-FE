import React from "react";
import {StudentSection} from "./StudentSection.tsx";
import {QuizSection} from "./QuizSection.tsx";
import {ExerciseSection} from "./ExerciseSection.tsx";
import {useLocation} from "react-router-dom";
import PageTitle from "../../components/common/SectionTitle.tsx";
import useAuth from "../../hooks/useAuth.ts";

const Class: React.FC = () => {
    const location = useLocation();
    const { classId, className, teacherName, studentCount } = location.state || {};

    const {me} = useAuth()

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-gray-100 p-4 mb-4">
                <PageTitle title={`Lớp ${className || me?.class?.name}`}/>
                <p className="text-sm text-gray-600">
                    Giáo viên: {teacherName || me?.name || "N/A"} | Sĩ số: {studentCount || me?.class?.amount || 0}
                </p>
            </div>

            <StudentSection classId={classId}/>

            <div className="flex gap-4 mb-4">
                <QuizSection classId={classId}/>
                <ExerciseSection classId={classId}/>
            </div>

        </div>
    );
};

export default Class;
