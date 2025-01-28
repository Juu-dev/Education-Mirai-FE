import { useParams } from "react-router-dom";
import { CommentSection } from "../../components/book/comment/CommentSection";
import { BookInterface } from "../../components/book/interface/book-interface";
import { Button } from "antd";
import useFetchApi from "../../hooks/useFetchApi";

export const BookDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    const booksApi = useFetchApi<BookInterface[]>({
        url: `/books/${id}`,
        auth: true,
    });

    const book = booksApi?.data

    const handleReadClick = () => {
        if (book?.contentPdfUrl) {
            window.open(book.contentPdfUrl, "_blank");
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 p-4 space-y-10">
            {/* First Section: Book Info */}
            <div className="flex gap-10">
                <img
                    src={book?.coverImageUrl}
                    alt={book?.title}
                    className="w-2/5 rounded-lg shadow-lg"
                />
                <div className="flex flex-1 space-y-6 flex-col justify-between">
                    <div className="flex-1 space-y-6">
                        <div className="flex justify-between">
                            <h1 className="text-4xl font-bold text-blue-700">{book?.title}</h1>
                            {/* Rating Stars */}
                            <div className="flex items-center space-x-1">
                                {Array(5)
                                    .fill(0)
                                    .map((_, index) => (
                                        <span
                                            key={index}
                                            className={`${
                                                index < Math.floor(book?.evaluate || 0)
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                            } text-xl`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                <span className="text-gray-600">({book?.evaluate || 0})</span>
                            </div>
                        </div>
                        <p className="text-lg text-gray-700">
                            <span className="font-semibold">Tác giả: </span>
                            {book?.author}
                        </p>
                        <p className="text-lg text-gray-700">
                            <span className="font-semibold">NXB: </span>
                            {book?.publishingHouse}
                        </p>
                        <p className="text-lg text-gray-700">
                            <span className="font-semibold">Mô tả: </span>
                            {book?.description}
                        </p>
                    </div>

                    {/* Read Button */}
                    <div className="flex space-between gap-x-3">
                        <Button type="primary" className="w-1/2" onClick={handleReadClick}>
                            Đọc
                        </Button>
                        <Button type="default" className="w-1/2 bg-green-500 text-white hover:bg-green-300">
                            Bài tập đi kèm
                        </Button>
                    </div>
                </div>2
            </div>

            {/* Second Section: Comments */}
            <CommentSection bookId={book?.id?.toString() || ''} />
        </div>
    );
};
