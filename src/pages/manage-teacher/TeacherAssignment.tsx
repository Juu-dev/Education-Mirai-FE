import { useState } from 'react';
import { Card, Col, Row, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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

    return (
        <div className="p-4 space-y-4">
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Teachers" className="bg-white shadow-md h-[90vh]">
                        {teachers.map((teacher) => (
                            <div key={teacher.id} className="bg-blue-100 p-2 my-2 rounded">
                                {teacher.name}
                            </div>
                        ))}
                    </Card>
                </Col>

                <Col key="class" span={16}>
                    <Row gutter={8}>
                        {classes.map((classItem) => (
                            <Col key={classItem.id} span={8}>
                                <Card title={classItem.name} className="bg-white shadow-md">
                                    <Select
                                        placeholder="Select Teacher"
                                        style={{ width: '100%' }}
                                    >
                                        {teachers.map((teacher) => (
                                            <Select.Option key={teacher.id} value={teacher.id}>
                                                {teacher.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default TeacherAssignment;
