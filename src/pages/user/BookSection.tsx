import {Empty, Pagination} from "antd"; // Ant Design Pagination

import useFetchApi from "../../hooks/useFetchApi";
import {useEffect} from "react";
import {BookInterface} from "../../components/book/interface/book-interface.ts";
import {BookComponent} from "../../components/book/BookComponent.tsx";

export const BookSection = ({isRefresh, type}: {isRefresh: boolean, type: string}) => {
    const booksApi = useFetchApi<BookInterface[]>({
        url: `/books/pagination`,
        auth: true,
        initQueries: { page: 1, pageSize: 10, type },
    });

    const handlePageChange = (page: number) => {
        booksApi?.fetchApi(`/books/pagination`, { params: { page, pageSize: booksApi.pagination?.pageSize || 10, type }});
    };

    useEffect(() => {
        booksApi.setFetched(false)
    }, [isRefresh]);

    return (
        <div className="p-4">
            {booksApi?.data?.length ? (
                <>
                    <div className="grid grid-cols-5 gap-4">
                        {booksApi?.data?.map((book: any) => (
                            <BookComponent key={book.id} book={book}/>
                        ))}
                    </div>
                    <div className="flex justify-center mt-6">
                        <Pagination
                            current={booksApi?.pagination?.page}
                            total={booksApi?.count}
                            pageSize={booksApi?.pagination?.pageSize}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                            className="custom-pagination"
                        />
                    </div>
                </>
            ) : (
                <div className="col-span-5 flex justify-center">
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                </div>
            )}


        </div>
    );
};
