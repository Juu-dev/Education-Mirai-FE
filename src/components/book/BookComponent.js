import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import useAuth from "../../hooks/useAuth";
export const BookComponent = ({ book }) => {
    const { isStudent } = useAuth();
    const navigate = useNavigate();
    const defaultImage = "/default_image.jpg";
    return (_jsxs("div", { className: "max-w-sm bg-white rounded-lg shadow-lg overflow-hidden border hover:shadow-xl transition-shadow duration-300 cursor-pointer", onClick: () => {
            if (isStudent)
                navigate(`/student/reading-books/book/${book.id}`);
        }, children: [_jsxs("div", { className: "relative h-36", children: [_jsx(Image, { src: book.coverImageUrl, alt: book.title, className: "w-full h-56 object-cover", fallback: defaultImage }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" }), _jsx("div", { className: "absolute bottom-2 left-2 text-white font-bold text-lg", children: book.title })] }), _jsxs("div", { className: "p-6 space-y-4", children: [_jsxs("p", { className: "text-gray-800", children: [_jsx("span", { className: "font-semibold", children: "T\u00E1c gi\u1EA3: " }), _jsx("span", { className: "font-normal", children: book.author })] }), _jsxs("p", { className: "text-gray-800", children: [_jsx("span", { className: "font-semibold", children: "NXB: " }), _jsx("span", { className: "font-normal", children: book.publishingHouse })] })] })] }));
};
