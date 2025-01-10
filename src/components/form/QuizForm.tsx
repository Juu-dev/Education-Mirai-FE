import React, { useState } from "react";
import { Button, Input, Form, List, Typography, Divider } from "antd";

const QuizForm: React.FC = () => {
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        question: "",
        answers: ["", "", "", ""],
    });

    const updateAnswer = (index: number, value: string) => {
        const updatedAnswers = [...currentQuestion.answers];
        updatedAnswers[index] = value;
        setCurrentQuestion({ ...currentQuestion, answers: updatedAnswers });
    };

    const addQuestion = () => {
        if (!currentQuestion.question.trim() || currentQuestion.answers.some((a) => !a.trim())) {
            return alert("Vui lòng nhập đầy đủ thông tin câu hỏi và đáp án.");
        }
        setQuestions([...questions, currentQuestion]);
        setCurrentQuestion({ question: "", answers: ["", "", "", ""] });
    };

    return (
        <>
            <div style={{ display: "flex", gap: "16px" }}>
                {/* Phần bên trái: Nhập câu hỏi */}
                <div style={{ flex: 1, borderRight: "1px solid #f0f0f0", paddingRight: "16px" }}>
                    <Typography.Title level={5}>Nhập câu hỏi</Typography.Title>
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
                            <Form.Item key={index} label={`Đáp án ${String.fromCharCode(65 + index)}`}>
                                <Input
                                    value={answer}
                                    onChange={(e) => updateAnswer(index, e.target.value)}
                                    placeholder={`Nhập đáp án ${String.fromCharCode(65 + index)}`}
                                />
                            </Form.Item>
                        ))}
                        <Button type="primary" block onClick={addQuestion}>
                            Thêm câu hỏi
                        </Button>
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

            {/* Danh sách câu hỏi đã thêm */}
            <Divider />
            <Typography.Title level={5}>Danh sách câu hỏi đã thêm</Typography.Title>
            <List
                dataSource={questions}
                renderItem={(item, index) => (
                    <List.Item>
                        <Button>{index + 1}</Button>
                    </List.Item>
                )}
            />
        </>
    );
};

export default QuizForm;
