import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Empty, Pagination } from "antd"; // Ant Design Pagination
import { BookComponent } from "./BookComponent";
import useFetchApi from "../../hooks/useFetchApi";
import { useEffect } from "react";
export const BookList = ({ isRefresh }) => {
    const booksApi = useFetchApi({
        url: `/books/pagination`,
        auth: true,
        initQueries: { page: 1, pageSize: 10 },
    });
    const handlePageChange = (page) => {
        booksApi?.fetchApi(`/books/pagination`, { params: { page, pageSize: booksApi.pagination?.pageSize || 10 } });
    };
    useEffect(() => {
        booksApi.setFetched(false);
    }, [isRefresh]);
    return (_jsx("div", { className: "p-4", children: booksApi?.data?.length ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "grid grid-cols-5 gap-4", children: booksApi?.data?.map((book) => (_jsx(BookComponent, { book: book }, book.id))) }), _jsx("div", { className: "flex justify-center mt-6", children: _jsx(Pagination, { current: booksApi?.pagination?.page, total: booksApi?.count, pageSize: booksApi?.pagination?.pageSize, onChange: handlePageChange, showSizeChanger: false, className: "custom-pagination" }) })] })) : (_jsx("div", { className: "col-span-5 flex justify-center", children: _jsx(Empty, { image: Empty.PRESENTED_IMAGE_SIMPLE }) })) }));
};
