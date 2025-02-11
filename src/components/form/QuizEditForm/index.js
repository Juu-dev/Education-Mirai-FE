import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Button, Input, Form, Typography, Divider, Space, message, Switch } from "antd";
import ListAddedQuestions from "./ListAddedQuestions";
import useEditApi from "../../../hooks/useEditApi";
import PreviewQuestion from "./PreviewQuestion";
const QUESTION_DEFAULT = {
    id: "",
    content: "",
    options: [
        { id: "", content: "", isCorrect: false },
        { id: "", content: "", isCorrect: false },
        { id: "", content: "", isCorrect: false },
        { id: "", content: "", isCorrect: false },
    ],
};
const QuizEditForm = ({ quiz, onSuccess }) => {
    console.log("quiz: ", quiz);
    const quizEdit = useEditApi({
        url: `/quizzes/${quiz?.id}`,
        successMsg: "Sửa bài quiz thành công!",
        errorMsg: "Sửa bài quiz thất bại, vui lòng thử lại.",
        fullResp: true,
    });
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [quizTitle, setQuizTitle] = useState(quiz?.title || "");
    const [questions, setQuestions] = useState(quiz?.questions || []);
    const [currentQuestion, setCurrentQuestion] = useState(QUESTION_DEFAULT);
    const [editingIndex, setEditingIndex] = useState(null);
    useEffect(() => {
        if (quiz) {
            setQuizTitle(quiz.title);
            setQuestions(quiz.questions);
            setCurrentQuestion(questions[0]);
            setEditingIndex(0);
        }
    }, [quiz]);
    const updateOption = (index, value) => {
        const updatedOptions = [...currentQuestion.options];
        updatedOptions[index].content = value;
        setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
    };
    const toggleCorrectOption = (index) => {
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
        }
        else {
            setQuestions([...questions, { ...currentQuestion }]);
        }
        setCurrentQuestion(QUESTION_DEFAULT);
    };
    const editQuestion = (index) => {
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
    return (_jsxs(_Fragment, { children: [_jsx(Form, { layout: "vertical", children: _jsx(Form.Item, { label: "T\u00EAn b\u00E0i quiz", children: _jsx(Input, { value: quizTitle, onChange: (e) => setQuizTitle(e.target.value), placeholder: "Nh\u1EADp t\u00EAn b\u00E0i quiz" }) }) }), _jsx(Divider, {}), _jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { className: "flex-1 border-r border-r-gray-200 pr-4", children: [_jsx(Typography.Title, { level: 5, children: editingIndex !== null ? "Chỉnh sửa câu hỏi" : "Nhập câu hỏi" }), _jsxs(Form, { layout: "vertical", children: [_jsx(Form.Item, { label: "\u0110\u1EC1 b\u00E0i", children: _jsx(Input.TextArea, { value: currentQuestion.content, onChange: (e) => setCurrentQuestion({ ...currentQuestion, content: e.target.value }), placeholder: "Nh\u1EADp \u0111\u1EC1 b\u00E0i" }) }), _jsx(Divider, {}), _jsx(Typography.Title, { level: 5, children: "Nh\u1EADp c\u00E1c \u0111\u00E1p \u00E1n:" }), currentQuestion.options.map((option, index) => (_jsx(Form.Item, { label: _jsxs("div", { className: "flex gap-2", children: [_jsx("span", { children: `Đáp án ${String.fromCharCode(65 + index)}` }), _jsx(Switch, { checked: option.isCorrect, onChange: () => toggleCorrectOption(index), checkedChildren: "\u0110\u00FAng", unCheckedChildren: "Sai" })] }), children: _jsx(Input, { value: option.content, onChange: (e) => updateOption(index, e.target.value), placeholder: `Nhập đáp án ${String.fromCharCode(65 + index)}` }) }, index))), _jsxs(Space, { className: "w-full", children: [_jsx(Button, { type: "primary", block: true, onClick: addOrUpdateQuestion, children: editingIndex !== null ? "Cập nhật câu hỏi" : "Thêm câu hỏi" }), editingIndex !== null && (_jsx(Button, { block: true, onClick: () => {
                                                    setCurrentQuestion(QUESTION_DEFAULT);
                                                    setEditingIndex(null);
                                                }, children: "H\u1EE7y" }))] })] })] }), _jsx(PreviewQuestion, { currentQuestion: currentQuestion })] }), _jsx(Divider, {}), _jsx(ListAddedQuestions, { questions: questions, selectedQuestions: selectedQuestions, toggleQuestionSelection: toggleQuestionSelection, deleteSelectedQuestions: deleteSelectedQuestions, editingIndex: editingIndex, editQuestion: editQuestion }), _jsx(Divider, {}), _jsx(Button, { type: "primary", block: true, onClick: handleSubmitQuiz, children: "L\u01B0u b\u00E0i quiz" })] }));
};
export default QuizEditForm;
