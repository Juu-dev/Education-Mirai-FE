import PageTitle from "../../components/common/SectionTitle.tsx";
import {Button, Card, Pagination, Table} from "antd";
import {columnsQuiz} from "./column.tsx";
import useModal from "../../hooks/modal/useModal.tsx";
import QuizForm from "../../components/form/QuizForm.tsx";
import QuizEditForm from "../../components/form/QuizEditForm";
import useConfirmModal from "../../hooks/modal/useConfirmModal.tsx";
import {useState} from "react";
import useDeleteApi from "../../hooks/useDeleteApi.ts";
import useFetchApi from "../../hooks/useFetchApi.ts";
import {quizFetchPath} from "../../helpers/api-params/auth.ts";

export const QuizSection = ({classId}) => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    const quizzesFetchApi = useFetchApi(quizFetchPath)
    const deleteQuizApi = useDeleteApi({url: `/quizzes/${selectedQuiz?.id}`})
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

    const handlePageChange = (page: number) => {
        quizzesFetchApi?.fetchApi(`/quizzes/pagination`, { params: { page, pageSize: quizzesFetchApi.pagination?.pageSize || 5 } });
    };

    return (
        <>
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
                    pagination={false}
                    onRow={(record: any) => ({
                        onClick: () => {
                            setSelectedQuiz(record)
                        },
                    })}
                />
                <Pagination
                    align="end"
                    current={quizzesFetchApi?.pagination?.page}
                    total={quizzesFetchApi?.count}
                    pageSize={quizzesFetchApi?.pagination?.pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    className="custom-pagination mt-3"
                />
            </Card>
            {quiz.modal}
            {quizEdit.modal}
            {confirmDeleteQuiz.modal}
        </>
    )
}
