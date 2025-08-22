import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Card, Col, message, Row, Select } from 'antd';
import useFetchApi from "../../hooks/useFetchApi";
import { useEffect, useState } from "react";
import useCreateApi from "../../hooks/useCreateApi";
const TeacherAssignment = () => {
    const [assignedTeachers, setAssignedTeachers] = useState({});
    const [teacherCount, setTeacherCount] = useState({});
    const assignTeachers = useCreateApi({
        url: "/users/assign-teacher",
        fullResp: true,
    });
    const handleTeacherChange = (classId, teacherId) => {
        setAssignedTeachers((prev) => ({
            ...prev,
            [classId]: teacherId
        }));
    };
    const classes = useFetchApi({
        url: "/classes/pagination",
        auth: false,
        initQueries: { pageSize: 1000 },
        presentData: (data) => data.map((e) => ({
            classId: e.id,
            className: `Lớp ${e.name}`,
            teacher: {
                id: e.user[0]?.id,
                name: e?.user[0]?.name,
            }
        }))
    });
    const teachers = useFetchApi({
        url: `/users/teacher`,
        auth: true,
        presentData: (data) => data.map(e => ({
            id: e.id,
            name: e.name,
        }))
    });
    useEffect(() => {
        if (classes.data.length) {
            const initialAssignments = classes.data.reduce((acc, classItem) => {
                if (classItem.teacher?.id) {
                    acc[classItem.classId] = classItem.teacher.id;
                }
                return acc;
            }, {});
            setAssignedTeachers(initialAssignments);
        }
    }, [classes.data]);
    useEffect(() => {
        const count = classes.data.reduce((acc, classItem) => {
            const teacherId = assignedTeachers[classItem.classId];
            if (teacherId) {
                acc[teacherId] = (acc[teacherId] || 0) + 1;
            }
            return acc;
        }, {});
        setTeacherCount(count);
    }, [assignedTeachers, classes.data]);
    const saveAssignments = async (assignments) => {
        await assignTeachers.handleCreate({ school: assignments }, () => message.success("Phân bổ giáo viên thành công!"), () => message.error("Phân bổ giáo viên thất bại, vui lòng thử lại."));
        classes.setFetched(false);
    };
    return (_jsxs("div", { className: "p-4 space-y-4", children: [_jsx(Row, { gutter: 16, children: _jsx(Col, { span: 24, style: { textAlign: "right", marginBottom: "16px" }, children: _jsx(Button, { type: "primary", onClick: () => {
                            const formattedAssignments = Object.entries(assignedTeachers).map(([classId, teacherId]) => ({
                                classId,
                                teacherId,
                            }));
                            saveAssignments(formattedAssignments);
                        }, children: "L\u01B0u" }) }) }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 8, style: { position: 'sticky', top: 0, zIndex: 10 }, children: _jsx(Card, { title: "Gi\u00E1o vi\u00EAn", className: "bg-white shadow-md h-[90vh]", children: _jsx("div", { className: "max-h-[calc(100vh-200px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-rounded-lg", children: teachers.data.map((teacher) => {
                                    const isTeacherAssignedMultiple = teacherCount[teacher.id] > 1;
                                    const isTeacherAssigned = assignedTeachers && Object.values(assignedTeachers).includes(teacher.id);
                                    return (_jsx("div", { className: `p-2 border-b last:border-b-0 hover:bg-gray-100 transition duration-200 ease-in-out ${isTeacherAssigned ? (isTeacherAssignedMultiple ? 'bg-red-200' : 'bg-green-200') : ''}`, children: teacher.name }, teacher.id));
                                }) }) }) }), _jsx(Col, { span: 16, style: { height: '90vh', overflowY: 'auto' }, children: _jsx(Row, { gutter: [8, 16], children: classes.data.map((classItem) => {
                                const teacherId = assignedTeachers[classItem.classId];
                                const isTeacherAssignedMultiple = teacherCount[teacherId] > 1;
                                return (_jsx(Col, { span: 8, children: _jsx(Card, { title: classItem.className, className: `bg-white shadow-md ${isTeacherAssignedMultiple ? 'bg-red-200' : ''}`, children: _jsx(Select, { placeholder: "Ch\u1ECDn Gi\u00E1o vi\u00EAn", style: { width: '100%' }, value: teacherId || classItem.teacher?.id, onChange: (value) => handleTeacherChange(classItem.classId, value), children: teachers.data?.map((teacher) => (_jsx(Select.Option, { value: teacher.id, children: teacher.name }, teacher.id))) }) }) }, classItem.classId));
                            }) }) }, "class")] })] }));
};
export default TeacherAssignment;
