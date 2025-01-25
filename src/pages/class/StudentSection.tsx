import {Button, Card, Table} from "antd";
import PageTitle from "../../components/common/SectionTitle.tsx";
import {columnsStudent} from "./column.tsx";
import {parseStudentData} from "../../utils/parse-data.ts";
import {useEffect, useState} from "react";
import useModal from "../../hooks/modal/useModal.tsx";
import StudentProfileForm from "../../components/admin/modal/StudentProfileForm.tsx";
import useFetchApi from "../../hooks/useFetchApi.ts";
import useAuth from "../../hooks/useAuth.ts";
import useConfirmModal from "../../hooks/modal/useConfirmModal.tsx";
import useDeleteApi from "../../hooks/useDeleteApi.ts";

export const StudentSection = ({classId}) => {
    const {me} = useAuth()
    const studentsFetchApi = useFetchApi({url: `/students/class/${classId || classId || me?.class.id}`, auth: true})
    const [selectedStudent, setSelectedStudent] = useState(null);

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

    const deleteStudentApi = useDeleteApi({url: `/users/${selectedStudent?.userId}`})

    useEffect(() => {
        if (me?.class.id || classId) {
            studentsFetchApi.fetchApi(`/students/class/${classId || me?.class.id}`)
        }
    }, [me?.class.id, classId]);

    return (
        <>
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
            {studentProfile.modal}
            {attendance.modal}
            {confirmDeleteStudent.modal}
        </>
    )
}
