import { Pagination } from "antd"; // Ant Design Pagination
import { BookComponent } from "./BookComponent";
import { BookInterface } from "./interface/book-interface";
import useFetchApi from "../../hooks/useFetchApi";
import {useEffect} from "react";

export const BookList = ({isRefresh}) => {
    const { data: books, pagination, count, fetchApi } = useFetchApi<BookInterface[]>({
        url: `/books/pagination`,
        auth: true,
        initQueries: { page: 1, pageSize: 10 },
    });

    const handlePageChange = (page: number) => {
        fetchApi(`/books/pagination`, { params: { page, pageSize: pagination?.pageSize || 10 } });
    };

    const handleRefresh = async () => {
        await fetchApi();
    };

    useEffect(() => {
        handleRefresh().then(() => {});
    }, [isRefresh]);

    return (
        <div className="p-4">
            <div className="grid grid-cols-5 gap-4">
                {books?.map((book) => (
                    <BookComponent key={book.id} book={book} />
                ))}
            </div>

            {/* Ant Design Pagination */}
            <div className="flex justify-center mt-6">
                <Pagination
                    current={pagination?.page}
                    total={count}
                    pageSize={pagination?.pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    className="custom-pagination"
                />
            </div>
        </div>
    );
};
