import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { BookSection } from "./BookSection";
export const UserBookSection = () => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "container mx-auto px-4 overflow-hidden", children: [_jsxs("div", { className: "book-list-wrapper mb-4", children: [_jsxs("div", { className: "flex justify-between mb-4", children: [_jsx("h2", { className: "text-2xl font-normal text-blue-700", children: "S\u00E1ch gi\u00E1o khoa" }), _jsx(Button, { type: "primary", onClick: () => {
                                    navigate('/student/reading-books');
                                }, children: "Xem th\u00EAm" })] }), _jsx(BookSection, { isRefresh: false, type: "textBooks" })] }), _jsxs("div", { className: "book-list-wrapper mb-4", children: [_jsxs("div", { className: "flex justify-between mb-4", children: [_jsx("h2", { className: "text-2xl font-normal text-blue-700", children: "S\u00E1ch tham kh\u1EA3o" }), _jsx(Button, { type: "primary", onClick: () => {
                                    navigate('/student/reading-books');
                                }, children: "Xem th\u00EAm" })] }), _jsx(BookSection, { isRefresh: false, type: "referenceBooks" })] }), _jsxs("div", { className: "book-list-wrapper mb-4", children: [_jsxs("div", { className: "flex justify-between mb-4", children: [_jsx("h2", { className: "text-2xl font-normal text-blue-700", children: "S\u00E1ch n\u00F3i" }), _jsx(Button, { type: "primary", onClick: () => {
                                    navigate('/student/reading-books');
                                }, children: "Xem th\u00EAm" })] }), _jsx(BookSection, { isRefresh: false, type: "audioBooks" })] })] }));
};
