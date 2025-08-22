import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Button, Input, Form, Typography, Divider, Space, message, Switch } from "antd";
import useCreateApi from "../../hooks/useCreateApi";
import ListAddedQuestions from "./QuizEditForm/ListAddedQuestions";
import PreviewQuestion from "./QuizEditForm/PreviewQuestion";
const QUESTION_DEFAULT = {
    question: "",
    answers: ["", "", "", ""],
    isCorrect: [false, false, false, false]
};
const QuizForm = ({ onClose }) => {
    const quiz = useCreateApi({
        url: "/quizzes",
        fullResp: true,
    });
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [quizTitle, setQuizTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(QUESTION_DEFAULT);
    const [editingIndex, setEditingIndex] = useState(null);
    const updateAnswer = (index, value) => {
        const updatedAnswers = [...currentQuestion.answers];
        updatedAnswers[index] = value;
        setCurrentQuestion({ ...currentQuestion, answers: updatedAnswers });
    };
    const toggleCorrectAnswer = (index) => {
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
        }
        else {
            setQuestions([...questions, currentQuestion]);
        }
        setCurrentQuestion(QUESTION_DEFAULT);
    };
    const editQuestion = (index) => {
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
        await quiz.handleCreate(data, () => message.success("Tạo bài quiz thành công!"), () => message.error("Tạo bài quiz thất bại, vui lòng thử lại."));
        setQuestions([]);
        setCurrentQuestion(QUESTION_DEFAULT);
        setEditingIndex(null);
        onClose();
    };
    const toggleQuestionSelection = (index) => {
        if (selectedQuestions.includes(index)) {
            setSelectedQuestions(selectedQuestions.filter((i) => i !== index));
        }
        else {
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
    return (_jsxs(_Fragment, { children: [_jsx(Form, { layout: "vertical", children: _jsx(Form.Item, { label: "T\u00EAn b\u00E0i quiz", children: _jsx(Input, { value: quizTitle, onChange: (e) => setQuizTitle(e.target.value), placeholder: "Nh\u1EADp t\u00EAn b\u00E0i quiz" }) }) }), _jsx(Divider, {}), _jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { className: "flex-1 border-r border-r-gray-200 pr-4", children: [_jsx(Typography.Title, { level: 5, children: editingIndex !== null ? "Chỉnh sửa câu hỏi" : "Nhập câu hỏi" }), _jsxs(Form, { layout: "vertical", children: [_jsx(Form.Item, { label: "\u0110\u1EC1 b\u00E0i", children: _jsx(Input.TextArea, { value: currentQuestion.question, onChange: (e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value }), placeholder: "Nh\u1EADp \u0111\u1EC1 b\u00E0i" }) }), _jsx(Divider, {}), _jsx(Typography.Text, { children: "Nh\u1EADp c\u00E1c \u0111\u00E1p \u00E1n:" }), currentQuestion.answers.map((answer, index) => (_jsx(Form.Item, { label: _jsxs("div", { className: "flex gap-2", children: [_jsx("span", { children: `Đáp án ${String.fromCharCode(65 + index)}` }), _jsx(Switch, { checked: currentQuestion.isCorrect[index], onChange: () => toggleCorrectAnswer(index), className: "ms-2", checkedChildren: "\u0110\u00FAng", unCheckedChildren: "Sai" })] }), children: _jsx(Input, { value: answer, onChange: (e) => updateAnswer(index, e.target.value), placeholder: `Nhập đáp án ${String.fromCharCode(65 + index)}` }) }, index))), _jsxs(Space, { className: "w-full", children: [_jsx(Button, { type: "primary", block: true, onClick: addOrUpdateQuestion, children: editingIndex !== null ? "Cập nhật câu hỏi" : "Thêm câu hỏi" }), editingIndex !== null && (_jsx(Button, { block: true, onClick: () => {
                                                    setCurrentQuestion(QUESTION_DEFAULT);
                                                    setEditingIndex(null);
                                                }, children: "H\u1EE7y" }))] })] })] }), _jsx(PreviewQuestion, { currentQuestion: currentQuestion })] }), _jsx(Divider, {}), _jsx(ListAddedQuestions, { questions: questions, selectedQuestions: selectedQuestions, toggleQuestionSelection: toggleQuestionSelection, deleteSelectedQuestions: deleteSelectedQuestions, editingIndex: editingIndex, editQuestion: editQuestion }), _jsx(Divider, {}), _jsx(Button, { type: "primary", block: true, onClick: handleSubmitQuiz, children: "T\u1EA1o b\u00E0i quiz" })] }));
};
export default QuizForm;
