import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { CommentSection } from "../../components/book/comment/CommentSection";
import { Button } from "antd";
import useFetchApi from "../../hooks/useFetchApi";
export const BookDetailPage = () => {
    const { id } = useParams();
    const booksApi = useFetchApi({
        url: `/books/${id}`,
        auth: true,
    });
    const book = booksApi?.data;
    const handleReadClick = () => {
        if (book?.contentPdfUrl) {
            window.open(book.contentPdfUrl, "_blank");
        }
    };
    return (_jsxs("div", { className: "max-w-5xl mx-auto mt-10 p-4 space-y-10", children: [_jsxs("div", { className: "flex gap-10", children: [_jsx("img", { src: book?.coverImageUrl, alt: book?.title, className: "w-2/5 rounded-lg shadow-lg" }), _jsxs("div", { className: "flex flex-1 space-y-6 flex-col justify-between", children: [_jsxs("div", { className: "flex-1 space-y-6", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("h1", { className: "text-4xl font-bold text-blue-700", children: book?.title }), _jsxs("div", { className: "flex items-center space-x-1", children: [Array(5)
                                                        .fill(0)
                                                        .map((_, index) => (_jsx("span", { className: `${index < Math.floor(book?.evaluate || 0)
                                                            ? "text-yellow-400"
                                                            : "text-gray-300"} text-xl`, children: "\u2605" }, index))), _jsxs("span", { className: "text-gray-600", children: ["(", book?.evaluate || 0, ")"] })] })] }), _jsxs("p", { className: "text-lg text-gray-700", children: [_jsx("span", { className: "font-semibold", children: "T\u00E1c gi\u1EA3: " }), book?.author] }), _jsxs("p", { className: "text-lg text-gray-700", children: [_jsx("span", { className: "font-semibold", children: "NXB: " }), book?.publishingHouse] }), _jsxs("p", { className: "text-lg text-gray-700", children: [_jsx("span", { className: "font-semibold", children: "M\u00F4 t\u1EA3: " }), book?.description] })] }), _jsxs("div", { className: "flex space-between gap-x-3", children: [_jsx(Button, { type: "primary", className: "w-1/2", onClick: handleReadClick, children: "\u0110\u1ECDc" }), _jsx(Button, { type: "default", className: "w-1/2 bg-green-500 text-white hover:bg-green-300", children: "B\u00E0i t\u1EADp \u0111i k\u00E8m" })] })] }), "2"] }), _jsx(CommentSection, { bookId: book?.id?.toString() || '' })] }));
};
