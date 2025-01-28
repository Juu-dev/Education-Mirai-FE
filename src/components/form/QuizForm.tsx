import React, { useState } from "react";
import {Button, Input, Form, Typography, Divider, Space, message, Switch} from "antd";
import useCreateApi from "../../hooks/useCreateApi";
import ListAddedQuestions from "./QuizEditForm/ListAddedQuestions";
import PreviewQuestion from "./QuizEditForm/PreviewQuestion";

interface QuizFormProps {
    onClose: () => void
}

const QUESTION_DEFAULT = {
    question: "",
    answers: ["", "", "", ""],
    isCorrect: [false, false, false, false]
}

const QuizForm: React.FC<QuizFormProps> = ({onClose}: QuizFormProps) => {
    const quiz = useCreateApi({
        url: "/quizzes",
        successMsg: "Tạo bài quiz thành công!",
        errorMsg: "Tạo bài quiz thất bại, vui lòng thử lại.",
        fullResp: true,
    })

    const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

    const [quizTitle, setQuizTitle] = useState<string>("");
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(QUESTION_DEFAULT);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const updateAnswer = (index: number, value: string) => {
        const updatedAnswers = [...currentQuestion.answers];
        updatedAnswers[index] = value;
        setCurrentQuestion({ ...currentQuestion, answers: updatedAnswers });
    };

    const toggleCorrectAnswer = (index: number) => {
        const updatedIsCorrect = [...currentQuestion.isCorrect];
        updatedIsCorrect[index] = !updatedIsCorrect[index];
        setCurrentQuestion({ ...currentQuestion, isCorrect: updatedIsCorrect });
    };


    const addOrUpdateQuestion = () => {
        if (!currentQuestion.question.trim() || currentQuestion.answers.some((a) => !a.trim())) {
            return alert("Vui lòng nhập đầy đủ thông tin câu hỏi và đáp án.");
        }

        if (editingIndex !== null) {
            const updatedQuestions = [...questions];
            updatedQuestions[editingIndex] = currentQuestion;
            setQuestions(updatedQuestions);
            setEditingIndex(null);
        } else {
            setQuestions([...questions, currentQuestion]);
        }

        setCurrentQuestion(QUESTION_DEFAULT);
    };


    const editQuestion = (index: number) => {
        setCurrentQuestion(questions[index]);
        setEditingIndex(index);
    };

    const handleSubmitQuiz = async () => {
        if (questions.length === 0) {
            return message.warning("Không có câu hỏi");
        }

        const data = {
            title: quizTitle,
            questions: questions.map((q) => ({
                content: q.question,
                answers: q.answers.map((answer, index) => ({
                    content: answer,
                    isCorrect: q.isCorrect[index],
                })),
            })),
        };

        await quiz.handleCreate(data);

        setQuestions([]);
        setCurrentQuestion(QUESTION_DEFAULT);
        setEditingIndex(null);
        onClose();
    };

    const toggleQuestionSelection = (index: number) => {
        if (selectedQuestions.includes(index)) {
            setSelectedQuestions(selectedQuestions.filter((i) => i !== index));
        } else {
            setSelectedQuestions([...selectedQuestions, index]);
        }
    };

    // Delete selected questions
    const deleteSelectedQuestions = async () => {
        if (selectedQuestions.length === 0) {
            return message.warning("Vui lòng chọn ít nhất một câu hỏi để xóa.");
        }

        const updatedQuestions = questions.filter((_, index) => !selectedQuestions.includes(index));
        setQuestions(updatedQuestions);
        setSelectedQuestions([]);
    };

    return (
        <>
            {/* Nhập tên bài quiz */}
            <Form layout="vertical">
                <Form.Item label="Tên bài quiz">
                    <Input
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        placeholder="Nhập tên bài quiz"
                    />
                </Form.Item>
            </Form>
            <Divider />

            <div className="flex gap-4">
                {/* Phần bên trái: Nhập câu hỏi */}
                <div className="flex-1 border-r border-r-gray-200 pr-4">
                    <Typography.Title level={5}>
                        {editingIndex !== null ? "Chỉnh sửa câu hỏi" : "Nhập câu hỏi"}
                    </Typography.Title>
                    <Form layout="vertical">
                        <Form.Item label="Đề bài">
                            <Input.TextArea
                                value={currentQuestion.question}
                                onChange={(e) =>
                                    setCurrentQuestion({ ...currentQuestion, question: e.target.value })
                                }
                                placeholder="Nhập đề bài"
                            />
                        </Form.Item>
                        <Divider />
                        <Typography.Text>Nhập các đáp án:</Typography.Text>
                        {currentQuestion.answers.map((answer, index) => (
                            <Form.Item
                                key={index}
                                label={
                                    <div className="flex gap-2">
                                        <span>{`Đáp án ${String.fromCharCode(65 + index)}`}</span>
                                        <Switch
                                            checked={currentQuestion.isCorrect[index]}
                                            onChange={() => toggleCorrectAnswer(index)}
                                            className="ms-2"
                                            checkedChildren="Đúng"
                                            unCheckedChildren="Sai"
                                        />
                                    </div>
                                }
                            >
                                <Input
                                    value={answer}
                                    onChange={(e) => updateAnswer(index, e.target.value)}
                                    placeholder={`Nhập đáp án ${String.fromCharCode(65 + index)}`}
                                />
                            </Form.Item>
                        ))}

                        <Space className="w-full">
                            <Button type="primary" block onClick={addOrUpdateQuestion}>
                                {editingIndex !== null ? "Cập nhật câu hỏi" : "Thêm câu hỏi"}
                            </Button>
                            {editingIndex !== null && (
                                <Button
                                    block
                                    onClick={() => {
                                        setCurrentQuestion(QUESTION_DEFAULT);
                                        setEditingIndex(null);
                                    }}
                                >
                                    Hủy
                                </Button>
                            )}
                        </Space>
                    </Form>
                </div>

                <PreviewQuestion currentQuestion={currentQuestion} />
            </div>

            <Divider />
            <ListAddedQuestions
                questions={questions}
                selectedQuestions={selectedQuestions}
                toggleQuestionSelection={toggleQuestionSelection}
                deleteSelectedQuestions={deleteSelectedQuestions}
                editingIndex={editingIndex}
                editQuestion={editQuestion}
            />

            <Divider />
            <Button type="primary" block onClick={handleSubmitQuiz}>
                Tạo bài quiz
            </Button>
        </>
    );
};

export default QuizForm;
