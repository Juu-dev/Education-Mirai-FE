import React, { useState } from "react";
import {Button, Input, Form, Typography, Divider, Space, message, Switch} from "antd";
import { CloseOutlined } from '@ant-design/icons';
import useCreateApi from "../../hooks/useCreateApi.ts";

const QuizForm: React.FC = () => {
    const quiz = useCreateApi({
        url: "/quizzes",
        successMsg: "Tạo bài quiz thành công!",
        errorMsg: "Tạo bài quiz thất bại, vui lòng thử lại.",
        fullResp: true,
    })

    const [quizTitle, setQuizTitle] = useState<string>("");
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        question: "",
        answers: ["", "", "", ""],
        isCorrect: [false, false, false, false]
    });
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

        setCurrentQuestion({ question: "", answers: ["", "", "", ""], isCorrect: [false, false, false, false] });
    };


    const editQuestion = (index: number) => {
        setCurrentQuestion(questions[index]);
        setEditingIndex(index);
    };

    const deleteQuestion = (index: number) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
        if (editingIndex === index) {
            setCurrentQuestion({ question: "", answers: ["", "", "", ""], isCorrect: [false, false, false, false] });
            setEditingIndex(null);
        }
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
        setCurrentQuestion({ question: "", answers: ["", "", "", ""], isCorrect: [false, false, false, false] });
        setEditingIndex(null);
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

            <div style={{ display: "flex", gap: "16px" }}>
                {/* Phần bên trái: Nhập câu hỏi */}
                <div style={{ flex: 1, borderRight: "1px solid #f0f0f0", paddingRight: "16px" }}>
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
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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

                        <Space style={{ width: "100%" }}>
                            <Button type="primary" block onClick={addOrUpdateQuestion}>
                                {editingIndex !== null ? "Cập nhật câu hỏi" : "Thêm câu hỏi"}
                            </Button>
                            {editingIndex !== null && (
                                <Button
                                    block
                                    onClick={() => {
                                        setCurrentQuestion({ question: "", answers: ["", "", "", ""] });
                                        setEditingIndex(null);
                                    }}
                                >
                                    Hủy
                                </Button>
                            )}
                        </Space>
                    </Form>
                </div>

                {/* Phần bên phải: Preview */}
                <div style={{ flex: 1, paddingLeft: "16px" }}>
                    <Typography.Title level={5}>Preview</Typography.Title>
                    <div>
                        <Typography.Text strong>Đề bài:</Typography.Text>
                        <div style={{ marginBottom: "16px", padding: "8px", background: "#f9f9f9" }}>
                            {currentQuestion.question || "Chưa có nội dung đề bài."}
                        </div>
                        <Typography.Text strong>Đáp án:</Typography.Text>
                        <div>
                            {currentQuestion.answers.map((answer, index) => (
                                <div
                                    key={index}
                                    style={{
                                        marginBottom: "8px",
                                        padding: "8px",
                                        background: "#f6f8fa",
                                        border: "1px solid #d9d9d9",
                                        borderRadius: "4px",
                                    }}
                                >
                                    {String.fromCharCode(65 + index)}. {answer || "Chưa có nội dung đáp án."}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Divider />
            <Typography.Title level={5}>Danh sách câu hỏi đã thêm</Typography.Title>
            <div
                className="grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] gap-4 pb-10"
            >
                {questions.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => editQuestion(index)}
                        className="group relative w-6 p-1 bg-gray-100 border border-gray-300 hover:shadow-md transition-shadow flex items-center justify-center rounded"
                    >
                        <Button
                            danger
                            icon={<CloseOutlined onClick={() => deleteQuestion(index)} />}
                            className="absolute -top-4 -right-4 border-none bg-transparent text-red-500 shadow-none hidden group-hover:block"
                            style={{
                                background: "transparent",
                            }}
                        />
                        <Typography.Text strong>{index + 1}</Typography.Text>
                    </div>
                ))}
            </div>

            <Divider />
            <Button type="primary" block onClick={handleSubmitQuiz}>
                Tạo bài quiz
            </Button>
        </>
    );
};

export default QuizForm;
