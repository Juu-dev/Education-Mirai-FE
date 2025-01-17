import React, {useEffect, useState} from "react";
import {Button, Input, Form, Typography, Divider, Space, message, Switch} from "antd";
import ListAddedQuestions from "./ListAddedQuestions.tsx";
import useEditApi from "../../../hooks/useEditApi.ts";
import PreviewQuestion from "./PreviewQuestion.tsx";

interface QuizEditFormProps {
    quiz?: {
        id: string,
        title: string,
        creatorId: string,
        questions:
            {
                id: string,
                quizId: string,
                content: string,
                options:
                    {
                        id: string,
                        questionId: string,
                        content: string,
                        isCorrect: boolean,
                    }[]
            }[]
    };
    onSuccess: () => void
}

const QUESTION_DEFAULT = {
    id: "",
    content: "",
    options: [
        { id: "", content: "", isCorrect: false },
        { id: "", content: "", isCorrect: false },
        { id: "", content: "", isCorrect: false },
        { id: "", content: "", isCorrect: false },
    ],
}

const QuizEditForm: React.FC<QuizEditFormProps> = ({quiz, onSuccess}: QuizEditFormProps) => {
    console.log("quiz: ", quiz)
    const quizEdit = useEditApi({
        url: `/quizzes/${quiz?.id}`,
        successMsg: "Sửa bài quiz thành công!",
        errorMsg: "Sửa bài quiz thất bại, vui lòng thử lại.",
        fullResp: true,
    })

    const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

    const [quizTitle, setQuizTitle] = useState<string>(quiz?.title || "");
    const [questions, setQuestions] = useState<any[]>(quiz?.questions || []);
    const [currentQuestion, setCurrentQuestion] = useState(QUESTION_DEFAULT);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    useEffect(() => {
        if (quiz) {
            setQuizTitle(quiz.title);
            setQuestions(quiz.questions);
            setCurrentQuestion(questions[0])
            setEditingIndex(0)
        }
    }, [quiz]);

    const updateOption = (index: number, value: string) => {
        const updatedOptions = [...currentQuestion.options];
        updatedOptions[index].content = value;
        setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
    };

    const toggleCorrectOption = (index: number) => {
        const updatedOptions = [...currentQuestion.options];
        updatedOptions[index].isCorrect = !updatedOptions[index].isCorrect;
        setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
    };

    const addOrUpdateQuestion = () => {
        if (!currentQuestion.content.trim() || currentQuestion.options.some((opt) => !opt.content.trim())) {
            return alert("Vui lòng nhập đầy đủ thông tin câu hỏi và đáp án.");
        }

        if (!currentQuestion.options.some((opt) => opt.isCorrect)) {
            return alert("Vui lòng chọn ít nhất một đáp án đúng.");
        }

        if (editingIndex !== null) {
            const updatedQuestions = [...questions];
            updatedQuestions[editingIndex] = currentQuestion;
            setQuestions(updatedQuestions);
            setEditingIndex(null);
        } else {
            setQuestions([...questions, { ...currentQuestion}]);
        }

        setCurrentQuestion(QUESTION_DEFAULT);
    };

    const editQuestion = (index: number) => {
        setCurrentQuestion(questions[index]);
        setEditingIndex(index);
    };

    const handleSubmitQuiz = async () => {
        if (!quizTitle.trim() || questions.length === 0) {
            return message.warning("Vui lòng nhập tên bài quiz và ít nhất một câu hỏi.");
        }

        const data = {
            title: quizTitle,
            questions: questions.map((q) => ({
                id: q.id,
                content: q.content,
                answers: q.options.map((opt) => ({
                    id: opt.id,
                    content: opt.content,
                    isCorrect: opt.isCorrect,
                })),
            })),
        };

        await quizEdit.handleEdit(data);

        setQuestions([]);
        setCurrentQuestion(QUESTION_DEFAULT);
        setEditingIndex(null);
        onSuccess();
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
                <div className="flex-1 border-r border-r-gray-200 pr-4">
                    <Typography.Title level={5}>
                        {editingIndex !== null ? "Chỉnh sửa câu hỏi" : "Nhập câu hỏi"}
                    </Typography.Title>
                    <Form layout="vertical">
                        <Form.Item label="Đề bài">
                            <Input.TextArea
                                value={currentQuestion.content}
                                onChange={(e) =>
                                    setCurrentQuestion({ ...currentQuestion, content: e.target.value })
                                }
                                placeholder="Nhập đề bài"
                            />
                        </Form.Item>
                        <Divider />
                        <Typography.Title level={5}>Nhập các đáp án:</Typography.Title>
                        {currentQuestion.options.map((option, index) => (
                            <Form.Item
                                key={index}
                                label={
                                    <div className="flex gap-2">
                                        <span>{`Đáp án ${String.fromCharCode(65 + index)}`}</span>
                                        <Switch
                                            checked={option.isCorrect}
                                            onChange={() => toggleCorrectOption(index)}
                                            checkedChildren="Đúng"
                                            unCheckedChildren="Sai"
                                        />
                                    </div>
                                }
                            >
                                <Input
                                    value={option.content}
                                    onChange={(e) => updateOption(index, e.target.value)}
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
                Lưu bài quiz
            </Button>
        </>
    );
};

export default QuizEditForm;
