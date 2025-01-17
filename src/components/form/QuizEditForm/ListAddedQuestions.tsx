import React from "react";
import { Button, Typography } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';

interface ListAddedQuestionsProps {
    questions: any
    selectedQuestions: any
    toggleQuestionSelection: (id: number) => void
    deleteSelectedQuestions: () => void
    editQuestion: (index: number) => void
    editingIndex: number | null
}

const ListAddedQuestions: React.FC<ListAddedQuestionsProps> = ({
   questions,
   selectedQuestions,
   toggleQuestionSelection,
   deleteSelectedQuestions,
   editQuestion,
   editingIndex
}: ListAddedQuestionsProps) => {
    console.log("selectedQuestions: ", selectedQuestions)
    console.log("editingIndex: ", editingIndex)
    const isFocusText = (index: number) => editingIndex === index || selectedQuestions.includes(index)
    return (
        <>
            <div className="flex justify-between">
                <Typography.Title level={5}>Danh sách câu hỏi đã thêm</Typography.Title>
                {selectedQuestions.length > 0 &&
                    <Button type="primary" danger onClick={deleteSelectedQuestions}>
                        Xác nhận xoá
                    </Button>
                }
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(30px,1fr))] gap-4 pb-10">
                {questions.map((item, index) => (
                    <div
                        key={index}
                        className={`group relative border p-2 rounded cursor-pointer flex items-center justify-center ${selectedQuestions.includes(index) ? "bg-red-400" : ""} ${(isFocusText(index)) && "bg-blue-400"}`}
                        onClick={() => editQuestion(index)}
                    >
                        <Typography.Text className={(isFocusText(index)) ? "text-white" : "text-black"} strong>{index + 1}</Typography.Text>
                        <CloseCircleOutlined
                            className="absolute -top-2 -right-2 text-red-500 bg-white rounded-full cursor-pointer hidden group-hover:block"
                            onClick={() => toggleQuestionSelection(index)}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default ListAddedQuestions;
