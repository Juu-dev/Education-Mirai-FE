import React, { useState } from 'react';
import { Card, Col, Row, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DragSource, DropTarget } from 'react-dnd';
import { useDrop } from 'react-dnd';

const TeacherAssignment = () => {
    const [teachers, setTeachers] = useState([
        { id: 1, name: 'Teacher 1' },
        { id: 2, name: 'Teacher 2' },
        { id: 3, name: 'Teacher 3' },
    ]);

    const [classes, setClasses] = useState([
        { id: 1, name: 'Class A', teachers: [] },
        { id: 2, name: 'Class B', teachers: [] },
        { id: 3, name: 'Class C', teachers: [] },
    ]);

    const handleDrop = (teacherId, classId) => {
        const newTeachers = teachers.filter(t => t.id !== teacherId);
        const newClasses = classes.map(c =>
            c.id === classId
                ? { ...c, teachers: [...c.teachers, teacherId] }
                : c
        );
        setTeachers(newTeachers);
        setClasses(newClasses);
    };

    return (
        <div className="p-4 space-y-4">
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Teachers" className="bg-white shadow-md">
                        {teachers.map(teacher => (
                            <div
                                key={teacher.id}
                                className="cursor-pointer bg-blue-100 p-2 my-2 rounded"
                                onClick={() => console.log('Teacher selected:', teacher.name)}
                            >
                                {teacher.name}
                            </div>
                        ))}
                    </Card>
                </Col>

                {classes.map(classItem => (
                    <Col key={classItem.id} span={8}>
                        <Card title={classItem.name} className="bg-white shadow-md">
                            <div className="space-y-2">
                                {classItem.teachers.length === 0
                                    ? <div className="text-gray-500">No teachers assigned</div>
                                    : classItem.teachers.map(teacherId => (
                                        <div key={teacherId}>Teacher {teacherId}</div>
                                    ))}
                            </div>
                            <Button
                                type="dashed"
                                className="mt-4 w-full"
                                icon={<PlusOutlined />}
                            >
                                Assign Teacher
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default TeacherAssignment;
