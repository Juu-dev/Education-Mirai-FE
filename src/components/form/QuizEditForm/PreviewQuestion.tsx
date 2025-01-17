import React from "react";
import { Typography } from "antd";

interface CreateQuizQuestionProps {
    question: string;
    answers: string[];
    isCorrect: boolean[];
}

interface UpdateQuizQuestionProps {
    content: string;
    options: {
        content: string;
        isCorrect: boolean;
    }[];
}

interface PreviewQuestionProps {
    currentQuestion: UpdateQuizQuestionProps | CreateQuizQuestionProps;
}

const PreviewQuestion: React.FC<PreviewQuestionProps> = ({ currentQuestion }: PreviewQuestionProps) => {
    const isUpdate = (currentQuestion as UpdateQuizQuestionProps).options !== undefined;

    return (
        <div className="flex-1 pl-4">
            <Typography.Title level={5}>Preview</Typography.Title>
            <div>
                <Typography.Text strong>Đề bài:</Typography.Text>
                <div className="mb-4 p-2 bg-[#f9f9f9]">
                    {isUpdate ? (currentQuestion as UpdateQuizQuestionProps).content : (currentQuestion as CreateQuizQuestionProps).question || "Chưa có nội dung đề bài."}
                </div>

                <Typography.Text strong>Đáp án:</Typography.Text>
                <div>
                    {isUpdate ? (
                        (currentQuestion as UpdateQuizQuestionProps).options.map((answer, index) => (
                            <div
                                key={index}
                                className={`mb-2 p-2 border border-[#d9d9d9] rounded ${
                                    answer.isCorrect ? 'bg-green-600 text-white' : ''
                                }`}
                            >
                                {String.fromCharCode(65 + index)}. {answer.content || "Chưa có nội dung đáp án."}
                            </div>
                        ))
                    ) : (
                        (currentQuestion as CreateQuizQuestionProps).answers.map((answer, index) => (
                            <div
                                key={index}
                                className={`mb-2 p-2 border border-[#d9d9d9] rounded ${
                                    (currentQuestion as CreateQuizQuestionProps).isCorrect[index] ? 'bg-green-600 text-white' : ''
                                }`}
                            >
                                {String.fromCharCode(65 + index)}. {answer || "Chưa có nội dung đáp án."}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreviewQuestion;
