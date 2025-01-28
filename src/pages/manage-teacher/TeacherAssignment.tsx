import { Card, Col, Row, Select } from 'antd';
import useFetchApi from "../../hooks/useFetchApi.ts";

const TeacherAssignment = () => {
    // classesPagination.data :IClassesPaginationData
    const classes = useFetchApi({
        url: "/classes/pagination",
        auth: false,
        initQueries: {pageSize: 10},
        presentData: (data) => data.map((e) => ({
            id: e.id,
            name: `Lớp ${e.name}`,
            teacher: {
                id: e.user[0]?.id,
                name: e?.user[0]?.name,
            }
        }))
    })

    const teachers = useFetchApi({
        url: `/users/teacher`,
        auth: true,
        presentData: (data) => data.map(e => ({
            id: e.id,
            name: e.name,
        }))
    })

    return (
        <div className="p-4 space-y-4">
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Giáo viên" className="bg-white shadow-md h-[90vh]">
                        <div
                            className="max-h-[calc(100vh-200px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-rounded-lg">
                            {teachers.data.map((teacher: any) => (
                                <div
                                    key={teacher.id}
                                    className="p-2 border-b last:border-b-0 hover:bg-gray-100 transition duration-200 ease-in-out"
                                >
                                    {teacher.name}
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>

                <Col key="class" span={16}>
                    <Row gutter={8}>
                        {classes.data.map((classItem: any) => (
                            <Col key={classItem.id} span={8}>
                                <Card title={classItem.name} className="bg-white shadow-md">
                                    <Select
                                        placeholder="Chọn Giáo viên"
                                        style={{ width: '100%' }}
                                    >
                                        {teachers.data?.map((teacher: any) => (
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
