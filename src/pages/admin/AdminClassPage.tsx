import { Avatar, Button, Input, Table, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import AdminAssignmentModal from "../../components/modal/AdminAssignmentModal";
import { AssignmentDetails } from "../../components/assignment/interface/assginment-interface";

// Mock data for students
const studentData = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: "Nguyễn Bình An",
    birthDate: "09/03/2004",
    parentName: "Bình Tống",
    phone: "0914549798",
}));

// Mock data for student groups
const studentGroups = [
    { id: "1", name: "Group A" },
    { id: "2", name: "Group B" },
    { id: "3", name: "Group C" },
];

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

const AdminClassPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Function to show the modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Function to handle closing the modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Function to handle form submission from modal
    const handleAssign = (values: AssignmentDetails) => {
        console.log("Assignment Details:", values);
        // Here you can call an API or perform any action to create the assignment
        setIsModalVisible(false);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Profile Section */}
            <Card className="mb-4">
                <div className="flex items-center space-x-4">
                    <Avatar size={64} src="https://i.pravatar.cc/150?img=4" />
                    <div className="flex-grow">
                        <h2 className="text-xl font-semibold">Đặng Tuấn Linh</h2>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="text-gray-500">Lớp chủ nhiệm:</div>
                            <div className="text-gray-900">5A</div>
                            <div className="text-gray-500">Số lượng học sinh:</div>
                            <div className="text-gray-900">30</div>
                            <div className="text-gray-500">Mã số:</div>
                            <div className="text-gray-900">20120122</div>
                            <div className="text-gray-500">Ngày sinh:</div>
                            <div className="text-gray-900">14/10/2012</div>
                            <div className="text-gray-500">Email:</div>
                            <div className="text-gray-900">nga4@gmail.com</div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Search Section */}
            <Card className="mb-4">
                <div className="grid grid-cols-3 gap-4">
                    <Input placeholder="Tìm kiếm theo ID" />
                    <Input placeholder="Tìm kiếm theo tên" />
                    <Input placeholder="Tìm kiếm theo sdt" />
                    <Button type="primary">Tìm kiếm</Button>
                </div>
            </Card>

            {/* Student Table Section */}
            <Card className="flex-grow mb-4 overflow-auto">
                <Table 
                    columns={columns} 
                    dataSource={studentData} 
                    pagination={{ pageSize: 10 }} 
                />
            </Card>

            {/* Footer Buttons Section (sticky to the bottom of the page) */}
            <div className="mt-auto bg-white p-4 flex justify-end space-x-4">
                <Button type="primary">Xem lịch báo giảng</Button>
                <Button type="primary" onClick={showModal}>Giao bài tập</Button>
                <Button type="primary">Điểm danh</Button>
            </div>

            {/* Assignment Modal */}
            <AdminAssignmentModal
                visible={isModalVisible}
                onCancel={handleCancel}
                onAssign={handleAssign}
                groups={studentGroups}  // Pass the group data here
            />
        </div>
    );
};

export default AdminClassPage;
