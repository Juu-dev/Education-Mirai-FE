import { Avatar, Button, Input, Table, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, {useState} from "react";
import AdminAssignmentModal from "../../components/modal/AdminAssignmentModal";
import { AssignmentDetails } from "../../components/assignment/interface/assginment-interface";
import PageTitle from "../../components/common/SectionTitle";
import { Typography } from "antd";
import {
    ASSIGNMENT_DATA,
    STUDENT_GROUPS,
} from "../../constants/mocks/class";
import StudentProfileModal from "../../components/admin/modal/StudentProfileModal";
import AttendanceModal from "../../components/admin/modal/AttendanceModal";
import AssignmentModal from "../../components/admin/modal/AssignmentModal";
import useFetchApi from "../../hooks/useFetchApi.ts";
import {formatDate} from "../../helpers/date.ts";
import useAuth from "../../hooks/useAuth.ts";

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
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isProfileModalVisible, setIsProfileModalVisible] =
        useState<boolean>(false);
    const [isAttendanceModalVisible, setIsAttendanceModalVisible] =
        useState<boolean>(false);
    const [isAssignmentModalVisible, setIsAssignmentModalVisible] =
        useState<boolean>(false);
    const [selectedStudent, setSelectedStudent] =
        useState<AssignmentDetails | null>(null); // State for selected student
    // const studentData = generateStudentData(50);

    const {me} = useAuth()
    const {data: teacher} = useFetchApi({url: `/teachers/user/${me?.id || ""}`, auth: true})
    console.log("id class:", me)
    const {data: students} = useFetchApi({url: `/students/class/${me?.teacher?.classId || ""}`, auth: true})

    const parseTeacherData  = (data: any) => ({
        avatar: "https://i.pravatar.cc/150?img=4",
        name: data?.name,
        class: data?.class?.name,
        studentCount: data?.class?.amount,
        code: data?.id,
        birthDate: formatDate(data?.dob),
        email: data?.user?.email,
    })

    const parseData = (data: any) => data?.map((e: any) => ({
        key: e.id,
        id: e.id,
        userId: e.userId,
        classId: e.classId,
        metadataUrl: e.metadataUrl,
        name: e.name,
        birthDate: formatDate(e.birthDate),
        parentName: e.parentName,
        level: e.level,
    }))

    // Function to show the modal
    const showModal = () => setIsModalVisible(true);

    // Function to handle closing the modal
    const handleCancel = () => setIsModalVisible(false);

    // Function to handle form submission from modal
    const handleAssign = (values: AssignmentDetails) => {
        console.log("Assignment Details:", values);
        setIsModalVisible(false);
    };

    const showProfileModal = (student: AssignmentDetails) => {
        setSelectedStudent(student);
        setIsProfileModalVisible(true);
    };

    const handleCancelProfileModal = () => {
        setIsProfileModalVisible(false);
        setSelectedStudent(null); // Reset the selected student
    };

    const showAttendanceModal = () => setIsAttendanceModalVisible(true);
    const handleCancelAttendanceModal = () =>
        setIsAttendanceModalVisible(false);

    const showAssignmentModal = () => setIsAssignmentModalVisible(true);
    const handleCancelAssignmentModal = () =>
        setIsAssignmentModalVisible(false);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Profile Section */}
            <ProfileSection teacher={parseTeacherData(teacher)} />
            {/* Search Section */}
            <SearchSection />

            {/* Student Table Section */}
            <Card className="flex-grow mb-4 overflow-auto">
                <PageTitle title="Danh sách học sinh" className="mb-3" />
                <Table
                    columns={columns}
                    dataSource={parseData(students)}
                    pagination={{ pageSize: 10 }}
                    onRow={(record) => ({
                        onClick: () => showProfileModal(record),
                    })}
                />
            </Card>

            {/* Footer Buttons Section */}
            <FooterButtons
                onShowModal={showModal}
                onShowAttendanceModal={showAttendanceModal}
            />

            {/* Assignment Modal */}
            <AdminAssignmentModal
                visible={isModalVisible}
                onCancel={handleCancel}
                onAssign={handleAssign}
                groups={STUDENT_GROUPS}
            />

            <StudentProfileModal
                visible={isProfileModalVisible}
                onCancel={handleCancelProfileModal}
                studentData={selectedStudent}
            />

            <AttendanceModal
                visible={isAttendanceModalVisible}
                onCancel={handleCancelAttendanceModal}
                studentData={parseData(students)} // Truyền dữ liệu học sinh vào modal
            />

            <AssignmentModal
                visible={isAssignmentModalVisible}
                onCancel={handleCancelAssignmentModal}
                assignmentData={ASSIGNMENT_DATA}
            />
        </div>
    );
};

const SearchSection: React.FC = () => (
    <Card className="mb-4 shadow-md">
        <PageTitle title="Lớp" className="mb-3" />

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

const FooterButtons: React.FC<{
    onShowModal: () => void;
    onShowAttendanceModal: () => void;
}> = ({ onShowModal, onShowAttendanceModal }) => (
    <div className="mt-auto bg-white p-4 flex justify-end space-x-4">
        <Button type="primary">Xem lịch báo giảng</Button>
        <Button type="primary" onClick={onShowModal}>
            Giao bài tập
        </Button>
        <Button type="primary" onClick={onShowAttendanceModal}>
            Điểm danh
        </Button>
    </div>
);

const { Title, Text } = Typography;
const ProfileSection: React.FC<{ teacher: any }> = ({ teacher }) => {
    console.log(teacher);
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

                        <Text strong className="col-span-1">
                            Mã số:
                        </Text>
                        <Text className="col-span-4">{teacher.code}</Text>

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
