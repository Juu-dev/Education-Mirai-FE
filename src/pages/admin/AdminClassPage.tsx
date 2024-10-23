import { Avatar, Button, Input, Table, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import AdminAssignmentModal from "../../components/modal/AdminAssignmentModal";
import { AssignmentDetails } from "../../components/assignment/interface/assginment-interface";
import PageTitle from "../../components/common/SectionTitle";
import { Typography } from "antd";
import {
    generateStudentData,
    STUDENT_GROUPS,
    TEACHER,
} from "../../constants/mocks/class";

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
    const studentData = generateStudentData(50);

    // Function to show the modal
    const showModal = () => setIsModalVisible(true);

    // Function to handle closing the modal
    const handleCancel = () => setIsModalVisible(false);

    // Function to handle form submission from modal
    const handleAssign = (values: AssignmentDetails) => {
        console.log("Assignment Details:", values);
        setIsModalVisible(false);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Profile Section */}
            <ProfileSection teacher={TEACHER} />
            {/* Search Section */}
            <SearchSection />

            {/* Student Table Section */}
            <Card className="flex-grow mb-4 overflow-auto">
                <PageTitle title="Danh sách học sinh" className="mb-3" />
                <Table
                    columns={columns}
                    dataSource={studentData}
                    pagination={{ pageSize: 10 }}
                />
            </Card>

            {/* Footer Buttons Section */}
            <FooterButtons onShowModal={showModal} />

            {/* Assignment Modal */}
            <AdminAssignmentModal
                visible={isModalVisible}
                onCancel={handleCancel}
                onAssign={handleAssign}
                groups={STUDENT_GROUPS}
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

const FooterButtons: React.FC<{ onShowModal: () => void }> = ({
    onShowModal,
}) => (
    <div className="mt-auto bg-white p-4 flex justify-end space-x-4">
        <Button type="primary">Xem lịch báo giảng</Button>
        <Button type="primary" onClick={onShowModal}>
            Giao bài tập
        </Button>
        <Button type="primary">Điểm danh</Button>
    </div>
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
