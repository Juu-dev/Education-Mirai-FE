import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Typography } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';
const ListAddedQuestions = ({ questions, selectedQuestions, toggleQuestionSelection, deleteSelectedQuestions, editQuestion, editingIndex }) => {
    console.log("selectedQuestions: ", selectedQuestions);
    console.log("editingIndex: ", editingIndex);
    const isFocusText = (index) => editingIndex === index || selectedQuestions.includes(index);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between", children: [_jsx(Typography.Title, { level: 5, children: "Danh s\u00E1ch c\u00E2u h\u1ECFi \u0111\u00E3 th\u00EAm" }), selectedQuestions.length > 0 &&
                        _jsx(Button, { type: "primary", danger: true, onClick: deleteSelectedQuestions, children: "X\u00E1c nh\u1EADn xo\u00E1" })] }), _jsx("div", { className: "grid grid-cols-[repeat(auto-fill,minmax(30px,1fr))] gap-4 pb-10", children: questions.map((item, index) => (_jsxs("div", { className: `group relative border p-2 rounded cursor-pointer flex items-center justify-center ${selectedQuestions.includes(index) ? "bg-red-400" : ""} ${(isFocusText(index)) && "bg-blue-400"}`, onClick: () => editQuestion(index), children: [_jsx(Typography.Text, { className: (isFocusText(index)) ? "text-white" : "text-black", strong: true, children: index + 1 }), _jsx(CloseCircleOutlined, { className: "absolute -top-2 -right-2 text-red-500 bg-white rounded-full cursor-pointer hidden group-hover:block", onClick: () => toggleQuestionSelection(index) })] }, index))) })] }));
};
export default ListAddedQuestions;
