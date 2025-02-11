import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from "antd";
const PreviewQuestion = ({ currentQuestion }) => {
    const isUpdate = currentQuestion.options !== undefined;
    return (_jsxs("div", { className: "flex-1 pl-4", children: [_jsx(Typography.Title, { level: 5, children: "Preview" }), _jsxs("div", { children: [_jsx(Typography.Text, { strong: true, children: "\u0110\u1EC1 b\u00E0i:" }), _jsx("div", { className: "mb-4 p-2 bg-[#f9f9f9]", children: isUpdate ? currentQuestion.content : currentQuestion.question || "Chưa có nội dung đề bài." }), _jsx(Typography.Text, { strong: true, children: "\u0110\u00E1p \u00E1n:" }), _jsx("div", { children: isUpdate ? (currentQuestion.options.map((answer, index) => (_jsxs("div", { className: `mb-2 p-2 border border-[#d9d9d9] rounded ${answer.isCorrect ? 'bg-green-600 text-white' : ''}`, children: [String.fromCharCode(65 + index), ". ", answer.content || "Chưa có nội dung đáp án."] }, index)))) : (currentQuestion.answers.map((answer, index) => (_jsxs("div", { className: `mb-2 p-2 border border-[#d9d9d9] rounded ${currentQuestion.isCorrect[index] ? 'bg-green-600 text-white' : ''}`, children: [String.fromCharCode(65 + index), ". ", answer || "Chưa có nội dung đáp án."] }, index)))) })] })] }));
};
export default PreviewQuestion;
