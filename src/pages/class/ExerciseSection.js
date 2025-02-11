import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import PageTitle from "../../components/common/SectionTitle";
import { Button, Card, Pagination, Table } from "antd";
import { useState } from "react";
import useConfirmModal from "../../hooks/modal/useConfirmModal";
import useDeleteApi from "../../hooks/useDeleteApi";
import useFetchApi from "../../hooks/useFetchApi";
import { exerciseFetchPath } from "../../helpers/api-params/auth";
import AssignmentForm from "../../components/form/AssignmentForm";
import AssignmentEditForm from "../../components/form/AssignmentEditForm";
import useModal from "../../hooks/modal/useModal";
import useAuth from "../../hooks/useAuth";
import { columnsExercise } from "./column";
import { AssignmentDetail } from "./AssignmentDetail";
export const ExerciseSection = ({ classId }) => {
    const { isPrincipal } = useAuth();
    const url = isPrincipal ? `/exercises/pagination/${classId}` : "/exercises/pagination/class";
    const [selectedAssignments, setSelectedAssignments] = useState(null);
    const deleteExerciseApi = useDeleteApi({ url: `/exercises/${selectedAssignments?.id}` });
    const exercisesFetchApi = useFetchApi({
        ...exerciseFetchPath,
        url: url,
    });
    const assignment = useModal({
        title: "Tạo và giao bài tập",
        content: _jsx(AssignmentForm, { onSuccess: () => {
                assignment.closeModal();
                exercisesFetchApi.setFetched(false);
            } }),
    });
    const assignmentEdit = useModal({
        title: "Sửa bài tập đã giao",
        content: _jsx(AssignmentEditForm, { assignment: selectedAssignments, onSuccess: () => {
                exercisesFetchApi.setFetched(false);
                assignmentEdit.closeModal();
            } }),
    });
    const assignmentDetail = useModal({
        title: "Xem chi tiết bài tập",
        content: _jsx(AssignmentDetail, { assignment: selectedAssignments }),
    });
    const confirmDeleteExercise = useConfirmModal({
        content: (_jsxs("p", { children: ["B\u1EA1n c\u00F3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\u00F3a b\u00E0i t\u1EADp", " ", _jsx("strong", { children: selectedAssignments?.name }), "?", _jsx("br", {}), "Thao t\u00E1c n\u00E0y kh\u00F4ng th\u1EC3 ho\u00E0n t\u00E1c."] })),
        handleOk: async () => {
            if (selectedAssignments) {
                await deleteExerciseApi.handleDelete();
                exercisesFetchApi.setFetched(false);
                confirmDeleteExercise.closeModal();
            }
        },
    });
    const handlePageChange = (page) => {
        exercisesFetchApi?.fetchApi(url, { params: { page, pageSize: exercisesFetchApi.pagination?.pageSize || 10 } });
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Card, { className: "flex-1 flex-grow mb-4 overflow-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-3", children: [_jsx(PageTitle, { title: "Danh s\u00E1ch b\u00E0i t\u1EADp" }), _jsx(Button, { type: "primary", onClick: assignment.openModal, children: "Giao b\u00E0i t\u1EADp" })] }), _jsx(Table, { columns: columnsExercise(assignmentEdit, confirmDeleteExercise, assignmentDetail), dataSource: exercisesFetchApi.data, pagination: false, onRow: (record) => ({
                            onClick: () => {
                                setSelectedAssignments(record);
                            },
                        }) }), _jsx(Pagination, { align: "end", current: exercisesFetchApi?.pagination?.page, total: exercisesFetchApi?.count, pageSize: exercisesFetchApi?.pagination?.pageSize, onChange: handlePageChange, showSizeChanger: false, className: "custom-pagination mt-3" })] }), assignment.modal, assignmentEdit.modal, assignmentDetail.modal, confirmDeleteExercise.modal] }));
};
