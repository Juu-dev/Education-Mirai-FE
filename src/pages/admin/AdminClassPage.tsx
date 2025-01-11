import { Button, Table, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import AssignmentForm from "../../components/form/AssignmentForm.tsx";
import { AssignmentDetails } from "../../components/assignment/interface/assginment-interface";
import PageTitle from "../../components/common/SectionTitle";
import useFetchApi from "../../hooks/useFetchApi.ts";
import useAuth from "../../hooks/useAuth.ts";
import useModal from "../../hooks/modal/useModal.tsx";
import StudentProfileForm from "../../components/admin/modal/StudentProfileForm.tsx";
import {parseStudentData, parseTeacherData} from "../../utils/parse-data.ts";
import ProfileSection from "./ProfileSection.tsx";
import SearchSection from "./SearchSection.tsx";
import useDeleteApi from "../../hooks/useDeleteApi.ts";

const AdminClassPage: React.FC = () => {
    const {me} = useAuth()
    const [selectedStudent, setSelectedStudent] = useState<AssignmentDetails | null>(null);
    const studentsApi = useFetchApi({url: `/students/class/${me?.class.id}`, auth: true})
    const deleteStudentApi = useDeleteApi({url: `/users/${selectedStudent?.userId}`})


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

    const confirmDelete = useModal({
        title: "Xác nhận xóa",
        content: (
            <p>
                Bạn có chắc chắn muốn xóa học sinh{" "}
                <strong>{selectedStudent?.name}</strong>?
                <br/>
                Thao tác này không thể hoàn tác.
            </p>
        ),
        handleOk: async () => {
            if (selectedStudent) {
                await deleteStudentApi.handleDelete();
                studentsApi.setFetched(false)
                confirmDelete.closeModal()
            }
        },
        footer: (_, { OkBtn, CancelBtn }) => (
            <>
                <CancelBtn />
                <OkBtn />
            </>
        )
    });

    useEffect(() => {
        if (me?.id) {
            studentsApi.fetchApi(`/students/class/${me?.class.id}`)
        }
    }, [me?.id]);

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
                    <Button icon={<EditOutlined />} onClick={studentProfile.openModal}/>
                    <Button icon={<DeleteOutlined />} onClick={confirmDelete.openModal}/>
                </div>
            ),
        },
    ];

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
                        },
                    })}
                />
            </Card>

            <Card className="flex-grow mb-4 overflow-auto">
                <PageTitle title="Danh sách bài tập" className="mb-3"/>
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
            {confirmDelete.modal}
        </div>
    );
};

export default AdminClassPage;
