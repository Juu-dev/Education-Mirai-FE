import {Button, Card, Col, Row, Select} from 'antd';
import useFetchApi from "../../hooks/useFetchApi";
import {useEffect, useState} from "react";
import useCreateApi from "../../hooks/useCreateApi";

const TeacherAssignment = () => {
    const [assignedTeachers, setAssignedTeachers] = useState<{ [key: string]: string }>({});
    const [teacherCount, setTeacherCount] = useState<{ [key: string]: number }>({});

    const assignTeachers = useCreateApi({
        url: "/users/assign-teacher",
        successMsg: "Phân bổ giáo viên thành công!",
        errorMsg: "Phân bổ giáo viên thất bại, vui lòng thử lại.",
        fullResp: true,
    });

    const handleTeacherChange = (classId: string, teacherId: string) => {
        setAssignedTeachers((prev) => ({
            ...prev,
            [classId]: teacherId
        }));
    };

    const classes = useFetchApi({
        url: "/classes/pagination",
        auth: false,
        initQueries: {pageSize: 1000},
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
            const initialAssignments: any = classes.data.reduce((acc: { [key: string]: string }, classItem: any) => {
                if (classItem.teacher?.id) {
                    acc[classItem.classId] = classItem.teacher.id;
                }
                return acc;
            }, {});
            setAssignedTeachers(initialAssignments);
        }
    }, [classes.data]);

    useEffect(() => {
        const count: any = classes.data.reduce((acc: { [key: string]: number }, classItem: any) => {
            const teacherId = assignedTeachers[classItem.classId];
            if (teacherId) {
                acc[teacherId] = (acc[teacherId] || 0) + 1;
            }
            return acc;
        }, {});
        setTeacherCount(count);
    }, [assignedTeachers, classes.data]);

    const saveAssignments = async (assignments: { classId: string; teacherId: string }[]) => {
        await assignTeachers.handleCreate({school: assignments});
        classes.setFetched(false);
    };

    return (
        <div className="p-4 space-y-4">
            <Row gutter={16}>
                <Col span={24} style={{ textAlign: "right", marginBottom: "16px" }}>
                    <Button
                        type="primary"
                        onClick={() => {
                            const formattedAssignments = Object.entries(assignedTeachers).map(([classId, teacherId]) => ({
                                classId,
                                teacherId,
                            }));
                            saveAssignments(formattedAssignments);
                        }}
                    >
                        Lưu
                    </Button>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={8} style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                    <Card title="Giáo viên" className="bg-white shadow-md h-[90vh]">
                        <div className="max-h-[calc(100vh-200px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-rounded-lg">
                            {teachers.data.map((teacher: any) => {
                                const isTeacherAssignedMultiple = teacherCount[teacher.id] > 1;
                                const isTeacherAssigned = assignedTeachers && Object.values(assignedTeachers).includes(teacher.id);

                                return (
                                    <div
                                        key={teacher.id}
                                        className={`p-2 border-b last:border-b-0 hover:bg-gray-100 transition duration-200 ease-in-out ${
                                            isTeacherAssigned ? (isTeacherAssignedMultiple ? 'bg-red-200' : 'bg-green-200') : ''
                                        }`}
                                    >
                                        {teacher.name}
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </Col>

                <Col key="class" span={16} style={{ height: '90vh', overflowY: 'auto' }}>
                    <Row gutter={[8, 16]}>
                        {classes.data.map((classItem: any) => {
                            const teacherId = assignedTeachers[classItem.classId];
                            const isTeacherAssignedMultiple = teacherCount[teacherId] > 1;

                            return (
                                <Col key={classItem.classId} span={8}>
                                    <Card
                                        title={classItem.className}
                                        className={`bg-white shadow-md ${isTeacherAssignedMultiple ? 'bg-red-200' : ''}`}
                                    >
                                        <Select
                                            placeholder="Chọn Giáo viên"
                                            style={{ width: '100%' }}
                                            value={teacherId || classItem.teacher?.id}
                                            onChange={(value) => handleTeacherChange(classItem.classId, value)}
                                        >
                                            {teachers.data?.map((teacher: any) => (
                                                <Select.Option key={teacher.id} value={teacher.id}>
                                                    {teacher.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default TeacherAssignment;
