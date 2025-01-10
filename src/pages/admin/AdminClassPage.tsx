import { Avatar, Button, Input, Table, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import AssignmentForm from "../../components/form/AssignmentForm.tsx";
import { AssignmentDetails } from "../../components/assignment/interface/assginment-interface";
import PageTitle from "../../components/common/SectionTitle";
import { Typography } from "antd";
import useFetchApi from "../../hooks/useFetchApi.ts";
import useAuth from "../../hooks/useAuth.ts";
import useModal from "../../hooks/modal/useModal.tsx";
import StudentProfileForm from "../../components/admin/modal/StudentProfileForm.tsx";
import {parseStudentData, parseTeacherData} from "../../utils/parse-data.ts";

// Table columns
const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Ngày sinh",
        dataIndex: "birthDate",
        key: "birthDate",
    },
    {
        title: "Tên phụ huynh",
        dataIndex: "parentName",
        key: "parentName",
    },
    {
        title: "SDT",
        dataIndex: "phone",
        key: "phone",
    },
    {
        title: "Hành động",
        key: "action",
        render: () => (
            <div className="flex space-x-2">
                <Button icon={<EditOutlined />} />
                <Button icon={<DeleteOutlined />} />
            </div>
        ),
    },
];

const AdminClassPage: React.FC = () => {
    const {me} = useAuth()
    const [selectedStudent, setSelectedStudent] = useState<AssignmentDetails | null>(null);
    const studentsApi = useFetchApi({url: `/students/class/${me?.class.id}`, auth: true})

    const assignment = useModal({
        title: "Tạo và giao bài tập",
        content: <AssignmentForm />,
        handleOk: () => {},
    })

    const studentProfile = useModal({
        title: selectedStudent ? selectedStudent.name : "Student Profile",
        content: <StudentProfileForm studentData={selectedStudent} />,
        handleOk: () => {},
    })

    const attendanceFooter = [
        <Button key="check" type="primary">
            Điểm danh
        </Button>,
        <Button key="checkAll" type="primary">
            Điểm danh tất cả
        </Button>,
    ]
    const attendance = useModal({
        title: "Danh sách học sinh",
        content: <StudentProfileForm studentData={parseStudentData(studentsApi.data)} />,
        handleOk: () => {},
        footer: attendanceFooter
    })

    useEffect(() => {
        if (me?.id) {
            studentsApi.fetchApi(`/students/class/${me?.class.id}`)
        }
    }, [me?.id]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Profile Section */}
            <ProfileSection teacher={parseTeacherData(me)}/>
            {/* Search Section */}
            <SearchSection/>

            {/* Student Table Section */}
            <Card className="flex-grow mb-4 overflow-auto">
                <PageTitle title="Danh sách học sinh" className="mb-3"/>
                <Table
                    columns={columns}
                    dataSource={parseStudentData(studentsApi.data)}
                    pagination={{pageSize: 10}}
                    onRow={(record: any) => ({
                        onClick: () => {
                            setSelectedStudent(record)
                            studentProfile.openModal()
                        },
                    })}
                />
            </Card>

            <div className="mt-auto bg-white p-4 flex justify-end space-x-4">
                <Button type="primary">Xem lịch báo giảng</Button>
                <Button type="primary" onClick={assignment.openModal}>
                    Giao bài tập
                </Button>
                <Button type="primary" onClick={attendance.openModal}>
                    Điểm danh
                </Button>
            </div>

            {assignment.modal}
            {studentProfile.modal}
            {attendance.modal}
        </div>
    );
};

const SearchSection: React.FC = () => (
    <Card className="mb-4 shadow-md">
        <PageTitle title="Lớp" className="mb-3"/>

        <div className="flex items-center space-x-4">
            <Input
                placeholder="Tìm kiếm theo ID"
                className="flex-1 border rounded-md"
                allowClear
            />
            <Input
                placeholder="Tìm kiếm theo tên"
                className="flex-1 border rounded-md"
                allowClear
            />
            <Input
                placeholder="Tìm kiếm theo số điện thoại"
                className="flex-1 border rounded-md"
                allowClear
            />
            <Button type="primary" className="h-10 w-32">
                {" "}
                {/* Thay đổi kích thước nút ở đây */}
                Tìm kiếm
            </Button>
        </div>
    </Card>
);

const { Title, Text } = Typography;
const ProfileSection: React.FC<{ teacher: any }> = ({ teacher }) => {
    return (
        <Card className="mb-4">
            <div className="flex items-center space-x-4">
                <Avatar
                    size={64}
                    src="https://i.pravatar.cc/150?img=4"
                    style={{ marginBottom: "auto" }}
                />
                <div className="flex-grow">
                    <Title level={3} className="text-gray-800 mb-0">
                        {teacher.name}
                    </Title>
                    <div className="grid grid-cols-5 gap-2 mt-2">
                        <Text strong className="col-span-1">
                            Lớp chủ nhiệm:
                        </Text>
                        <Text className="col-span-4">{teacher.class}</Text>

                        <Text strong className="col-span-1">
                            Số lượng học sinh:
                        </Text>
                        <Text className="col-span-4">
                            {teacher.studentCount}
                        </Text>

                        {/*<Text strong className="col-span-1">*/}
                        {/*    Mã số:*/}
                        {/*</Text>*/}
                        {/*<Text className="col-span-4">{teacher.code}</Text>*/}

                        <Text strong className="col-span-1">
                            Ngày sinh:
                        </Text>
                        <Text className="col-span-4">{teacher.birthDate}</Text>

                        <Text strong className="col-span-1">
                            Email:
                        </Text>
                        <Text className="col-span-4">{teacher.email}</Text>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AdminClassPage;
