import {Button, Table, Card} from "antd";
import React, {useEffect, useState} from "react";
import AssignmentForm from "../../components/form/AssignmentForm.tsx";
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
import AssignmentEditForm from "../../components/form/AssignmentEditForm.tsx";
import useConfirmModal from "../../hooks/modal/useConfirmModal.tsx";
import {exerciseFetchPath, quizFetchPath} from "../../helpers/api-params/auth.ts";
import QuizEditForm from "../../components/form/QuizEditForm";

const ClassPage: React.FC = () => {
    const {me} = useAuth()
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedAssignments, setSelectedAssignments] = useState(null);
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    const studentsFetchApi = useFetchApi({url: `/students/class/${me?.class.id}`, auth: true})
    const quizzesFetchApi = useFetchApi(quizFetchPath)
    const exercisesFetchApi = useFetchApi(exerciseFetchPath)

    const deleteStudentApi = useDeleteApi({url: `/users/${selectedStudent?.userId}`})
    const deleteExerciseApi = useDeleteApi({url: `/exercises/${selectedAssignments?.id}`})
    const deleteQuizApi = useDeleteApi({url: `/quizzes/${selectedQuiz?.id}`})

    const assignment = useModal({
        title: "Tạo và giao bài tập",
        content: <AssignmentForm
            onSuccess={() => {
                assignment.closeModal();
                exercisesFetchApi.setFetched(false)
            }}
        />,
    })
    const assignmentEdit = useModal({
        title: "Sửa bài tập đã giao",
        content: <AssignmentEditForm
            assignment={selectedAssignments}
            onSuccess={() => {
                exercisesFetchApi.setFetched(false)
                assignmentEdit.closeModal()
            }}
        />,
    })

    const quiz = useModal({
        title: "Tạo Quiz",
        content: <QuizForm onClose={() => {
            quiz.closeModal();
            quizzesFetchApi.setFetched(false);
        }} />,
        handleOk: () => {},
        width: 900
    })

    const quizEdit = useModal({
        title: "Sửa Quiz",
        content: <QuizEditForm
            quiz={selectedQuiz?.origin}
            onSuccess={() => {
                quizzesFetchApi.setFetched(false);
                quizEdit.closeModal()
            }}
        />,
        handleOk: () => {},
        width: 900
    })

    const studentProfile = useModal({
        title: selectedStudent ? selectedStudent.name : "Student Profile",
        content: <StudentProfileForm studentData={selectedStudent} />,
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
        content: <StudentProfileForm studentData={parseStudentData(studentsFetchApi.data)} />,
        handleOk: () => {},
        footer: attendanceFooter
    })

    const confirmDeleteStudent = useConfirmModal({
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
                studentsFetchApi.setFetched(false)
                confirmDeleteStudent.closeModal()
            }
        }
    });

    const confirmDeleteExercise = useConfirmModal({
        content: (
            <p>
                Bạn có chắc chắn muốn xóa bài tập{" "}
                <strong>{selectedAssignments?.name}</strong>?
                <br/>
                Thao tác này không thể hoàn tác.
            </p>
        ),
        handleOk: async () => {
            if (selectedAssignments) {
                await deleteExerciseApi.handleDelete();
                exercisesFetchApi.setFetched(false)
                confirmDeleteExercise.closeModal()
            }
        },
    });

    const confirmDeleteQuiz = useConfirmModal({
        content: (
            <p>
                Bạn có chắc chắn muốn xóa quiz{" "}
                <strong>{selectedQuiz?.name}</strong>?
                <br/>
                Thao tác này không thể hoàn tác.
            </p>
        ),
        handleOk: async () => {
            if (selectedQuiz) {
                await deleteQuizApi.handleDelete();
                quizzesFetchApi.setFetched(false)
                confirmDeleteQuiz.closeModal()
            }
        },
    });

    useEffect(() => {
        if (me?.id) {
            studentsFetchApi.fetchApi(`/students/class/${me?.class.id}`)
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
                    columns={columnsStudent(studentProfile, confirmDeleteStudent)}
                    dataSource={parseStudentData(studentsFetchApi.data)}
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
                        columns={columnsQuiz(quizEdit, confirmDeleteQuiz)}
                        dataSource={quizzesFetchApi.data}
                        pagination={{pageSize: 10}}
                        onRow={(record: any) => ({
                            onClick: () => {
                                setSelectedQuiz(record)
                            },
                        })}
                    />
                </Card>
                <Card className="flex-1 flex-grow mb-4 overflow-auto">
                    <div className="flex justify-between items-center mb-3">
                        <PageTitle title="Danh sách bài tập"/>
                    </div>
                    <Table
                        columns={columnsExercise(assignmentEdit, confirmDeleteExercise)}
                        dataSource={exercisesFetchApi.data}
                        pagination={{pageSize: 10}}
                        onRow={(record: any) => ({
                            onClick: () => {
                                setSelectedAssignments(record)
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
            {assignmentEdit.modal}
            {quiz.modal}
            {quizEdit.modal}

            {studentProfile.modal}
            {attendance.modal}

            {confirmDeleteStudent.modal}
            {confirmDeleteQuiz.modal}
            {confirmDeleteExercise.modal}

        </div>
    );
};

export default ClassPage;
