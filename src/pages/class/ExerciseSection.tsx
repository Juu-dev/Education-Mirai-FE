import PageTitle from "../../components/common/SectionTitle.tsx";
import {Button, Card, Table} from "antd";
import {useState} from "react";
import useConfirmModal from "../../hooks/modal/useConfirmModal.tsx";
import useDeleteApi from "../../hooks/useDeleteApi.ts";
import useFetchApi from "../../hooks/useFetchApi.ts";
import {exerciseFetchPath} from "../../helpers/api-params/auth.ts";
import AssignmentForm from "../../components/form/AssignmentForm.tsx";
import AssignmentEditForm from "../../components/form/AssignmentEditForm.tsx";
import useModal from "../../hooks/modal/useModal.tsx";
import useAuth from "../../hooks/useAuth.ts";
import {columnsExercise} from "./column.tsx";
import {AssignmentDetail} from "./AssignmentDetail.tsx";

export const ExerciseSection = ({classId}) => {
    const {isPrincipal} = useAuth()
    const [selectedAssignments, setSelectedAssignments] = useState(null);

    const deleteExerciseApi = useDeleteApi({url: `/exercises/${selectedAssignments?.id}`})

    const exercisesFetchApi = useFetchApi({
        ...exerciseFetchPath,
        url: isPrincipal ? `/exercises/pagination/${classId}` : "/exercises/pagination/class",
    })

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

    const assignmentDetail = useModal({
        title: "Xem chi tiết bài tập",
        content: <AssignmentDetail
            assignment={selectedAssignments}
        />,
    })

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

    return (
        <>
            <Card className="flex-1 flex-grow mb-4 overflow-auto">
                <div className="flex justify-between items-center mb-3">
                    <PageTitle title="Danh sách bài tập"/>
                    <Button type="primary" onClick={assignment.openModal}>
                        Giao bài tập
                    </Button>
                </div>
                <Table
                    columns={columnsExercise(assignmentEdit, confirmDeleteExercise, assignmentDetail)}
                    dataSource={exercisesFetchApi.data}
                    pagination={{pageSize: 10}}
                    onRow={(record: any) => ({
                        onClick: () => {
                            setSelectedAssignments(record)
                        },
                    })}
                />
            </Card>
            {assignment.modal}
            {assignmentEdit.modal}
            {assignmentDetail.modal}
            {confirmDeleteExercise.modal}
        </>
    )
}
