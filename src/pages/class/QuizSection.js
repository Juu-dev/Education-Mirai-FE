import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import PageTitle from "../../components/common/SectionTitle";
import { Button, Card, Pagination, Table } from "antd";
import { columnsQuiz } from "./column";
import useModal from "../../hooks/modal/useModal";
import QuizForm from "../../components/form/QuizForm";
import QuizEditForm from "../../components/form/QuizEditForm";
import useConfirmModal from "../../hooks/modal/useConfirmModal";
import { useState } from "react";
import useDeleteApi from "../../hooks/useDeleteApi";
import useFetchApi from "../../hooks/useFetchApi";
import { quizFetchPath } from "../../helpers/api-params/auth";
export const QuizSection = ({ classId }) => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const quizzesFetchApi = useFetchApi(quizFetchPath);
    const deleteQuizApi = useDeleteApi({ url: `/quizzes/${selectedQuiz?.id}` });
    const quiz = useModal({
        title: "Tạo Quiz",
        content: _jsx(QuizForm, { onClose: () => {
                quiz.closeModal();
                quizzesFetchApi.setFetched(false);
            } }),
        handleOk: () => { },
        width: 900
    });
    const quizEdit = useModal({
        title: "Sửa Quiz",
        content: _jsx(QuizEditForm, { quiz: selectedQuiz?.origin, onSuccess: () => {
                quizzesFetchApi.setFetched(false);
                quizEdit.closeModal();
            } }),
        handleOk: () => { },
        width: 900
    });
    const confirmDeleteQuiz = useConfirmModal({
        content: (_jsxs("p", { children: ["B\u1EA1n c\u00F3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\u00F3a quiz", " ", _jsx("strong", { children: selectedQuiz?.name }), "?", _jsx("br", {}), "Thao t\u00E1c n\u00E0y kh\u00F4ng th\u1EC3 ho\u00E0n t\u00E1c."] })),
        handleOk: async () => {
            if (selectedQuiz) {
                await deleteQuizApi.handleDelete();
                quizzesFetchApi.setFetched(false);
                confirmDeleteQuiz.closeModal();
            }
        },
    });
    const handlePageChange = (page) => {
        quizzesFetchApi?.fetchApi(`/quizzes/pagination`, { params: { page, pageSize: quizzesFetchApi.pagination?.pageSize || 5 } });
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Card, { className: "flex-1 flex-grow mb-4 overflow-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-3", children: [_jsx(PageTitle, { title: "Danh s\u00E1ch quiz" }), _jsx(Button, { type: "primary", onClick: quiz.openModal, children: "Th\u00EAm quiz" })] }), _jsx(Table, { columns: columnsQuiz(quizEdit, confirmDeleteQuiz), dataSource: quizzesFetchApi.data, pagination: false, onRow: (record) => ({
                            onClick: () => {
                                setSelectedQuiz(record);
                            },
                        }) }), _jsx(Pagination, { align: "end", current: quizzesFetchApi?.pagination?.page, total: quizzesFetchApi?.count, pageSize: quizzesFetchApi?.pagination?.pageSize, onChange: handlePageChange, showSizeChanger: false, className: "custom-pagination mt-3" })] }), quiz.modal, quizEdit.modal, confirmDeleteQuiz.modal] }));
};
