import React, { useState } from 'react';
import { Card, Col, Row, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Mock Data
const initialTeachers = [
    { id: 1, name: 'Teacher 1' },
    { id: 2, name: 'Teacher 2' },
    { id: 3, name: 'Teacher 3' },
];

const initialClasses = [
    { id: 1, name: 'Class 1A', teachers: [] },
    { id: 2, name: 'Class 2B', teachers: [] },
    { id: 3, name: 'Class 2C', teachers: [] },
    { id: 4, name: 'Class 3C', teachers: [] },
    { id: 5, name: 'Class 4C', teachers: [] },
    { id: 6, name: 'Class 5C', teachers: [] },
    { id: 7, name: 'Class 6C', teachers: [] },
    { id: 8, name: 'Class 7C', teachers: [] },
    { id: 11, name: 'Class 1A', teachers: [] },
    { id: 12, name: 'Class 2B', teachers: [] },
    { id: 13, name: 'Class 2C', teachers: [] },
    { id: 14, name: 'Class 3C', teachers: [] },
    { id: 15, name: 'Class 4C', teachers: [] },
    { id: 16, name: 'Class 5C', teachers: [] },
    { id: 17, name: 'Class 6C', teachers: [] },
    { id: 18, name: 'Class 7C', teachers: [] },
];

const TeacherAssignment = () => {
    const [teachers, setTeachers] = useState(initialTeachers);
    const [classes, setClasses] = useState(initialClasses);

    const handleDrop = (teacherId, classId) => {
        const teacher = teachers.find((t) => t.id === teacherId);
        const updatedTeachers = teachers.filter((t) => t.id !== teacherId);
        const updatedClasses = classes.map((c) =>
            c.id === classId
                ? { ...c, teachers: [...c.teachers, teacher] }
                : c
        );
        setTeachers(updatedTeachers);
        setClasses(updatedClasses);
    };

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TEACHER',
        item: { id: 1 },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'TEACHER',
        drop: (item, monitor) => handleDrop(item.id, 1), // Thả vào lớp 1 (ví dụ)
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    return (
        <div className="p-4 space-y-4">
            <Row gutter={16}>
                <Col span={8} style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                    <Card title="Teachers" className="bg-white shadow-md h-[90vh]">
                        {teachers.map((teacher) => (
                            <div
                                key={teacher.id}
                                ref={drag}
                                className="cursor-pointer bg-blue-100 p-2 my-2 rounded"
                            >
                                {teacher.name}
                            </div>
                        ))}
                    </Card>
                </Col>

                <Col key="class" span={16} style={{ height: '90vh', overflowY: 'auto' }}>
                    <Row gutter={8}>
                        {classes.map((classItem) => (
                            <Col key={classItem.id} span={8}>
                                <Card title={classItem.name} className="bg-white shadow-md" ref={drop}>
                                    <div className="space-y-2">
                                        {classItem.teachers.length === 0 ? (
                                            <div className="text-gray-500">No teachers assigned</div>
                                        ) : (
                                            classItem.teachers.map((teacher) => (
                                                <div key={teacher.id} className="bg-green-100 p-2 rounded">
                                                    {teacher.name}
                                                </div>
                                            ))
                                        )}
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
                </Col>
            </Row>
        </div>
    );
};

const App = () => (
    <DndProvider backend={HTML5Backend}>
        <TeacherAssignment />
    </DndProvider>
);

export default App;
