import { Button, Table, Card } from "antd";
import React, {useEffect, useState} from "react";
import AssignmentForm, {AssignmentDetails} from "../../components/form/AssignmentForm.tsx";
import PageTitle from "../../components/common/SectionTitle.tsx";
import useFetchApi from "../../hooks/useFetchApi.ts";
import useAuth from "../../hooks/useAuth.ts";
import useModal from "../../hooks/modal/useModal.tsx";
import StudentProfileForm from "../../components/admin/modal/StudentProfileForm.tsx";
import {parseStudentData, parseTeacherData} from "../../utils/parse-data.ts";
import ProfileSection from "./ProfileSection.tsx";
import SearchSection from "./SearchSection.tsx";
import useDeleteApi from "../../hooks/useDeleteApi.ts";
import QuizForm from "../../components/form/QuizForm.tsx";
import {columnsExercise, columnsQuiz, columnsStudent} from "./column.tsx";

const ClassPage: React.FC = () => {
    const {me} = useAuth()
    const [selectedStudent, setSelectedStudent] = useState<AssignmentDetails | null>(null);
    const studentsApi = useFetchApi({url: `/students/class/${me?.class.id}`, auth: true})
    const quizzesFetchApi = useFetchApi({
        url: "/quizzes/pagination",
        auth: true,
        presentData: (data) => data.map(e => ({
            id: e.id,
            name: e.title,
            amount: e._count.questions,
            allDoneStudent: 0
        }))
    })
    const exercisesFetchApi = useFetchApi({
        url: "/exercises/pagination",
        auth: true,
        presentData: (data) => data.map(e => ({
            id: e.id,
            name: e.name,
            timeOut: e.timeOut,
            allDoneStudent: 0
        }))
    })
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

    const quiz = useModal({
        title: "Tạo Quiz",
        content: <QuizForm />,
        handleOk: () => {},
        width: 900
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

    return (
        <div className="flex flex-col min-h-screen">
            <ProfileSection teacher={parseTeacherData(me)}/>
            <SearchSection/>

            {/* Student Table Section */}
            <Card className="flex-grow mb-4 overflow-auto">
                <PageTitle title="Danh sách học sinh" className="mb-3"/>
                <Table
                    columns={columnsStudent(studentProfile, confirmDelete)}
                    dataSource={parseStudentData(studentsApi.data)}
                    pagination={{pageSize: 10}}
                    onRow={(record: any) => ({
                        onClick: () => {
                            setSelectedStudent(record)
                        },
                    })}
                />
            </Card>

            <div className="flex gap-4 mb-4">
                <Card className="flex-1 flex-grow mb-4 overflow-auto">
                    <div className="flex justify-between items-center mb-3">
                        <PageTitle title="Danh sách quiz"/>
                        <Button type="primary" onClick={quiz.openModal}>
                            Thêm quiz
                        </Button>
                    </div>
                    <Table
                        columns={columnsQuiz(studentProfile, confirmDelete)}
                        dataSource={quizzesFetchApi.data}
                        pagination={{pageSize: 10}}
                        onRow={(record: any) => ({
                            onClick: () => {
                                setSelectedStudent(record)
                                studentProfile.openModal()
                            },
                        })}
                    />
                </Card>
                <Card className="flex-1 flex-grow mb-4 overflow-auto">
                    <div className="flex justify-between items-center mb-3">
                        <PageTitle title="Danh sách bài tập"/>
                    </div>
                    <Table
                        columns={columnsExercise(studentProfile, confirmDelete)}
                        dataSource={exercisesFetchApi.data}
                        pagination={{pageSize: 10}}
                        onRow={(record: any) => ({
                            onClick: () => {
                                setSelectedStudent(record)
                                studentProfile.openModal()
                            },
                        })}
                    />
                </Card>
            </div>

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
            {quiz.modal}
        </div>
    );
};

export default ClassPage;
