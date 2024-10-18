import { useParams } from "react-router-dom";
import { CommentSection } from "../../components/book/comment/CommentSection";
import book1 from "../../assets/book/book1.png";
import book2 from "../../assets/book/book2.png";
import book3 from "../../assets/book/book3.png";
import book4 from "../../assets/book/book4.png";
import { BookInterface } from "../../components/book/interface/book-interface";
import { useEffect, useState } from "react";
import { Button } from "antd";

export const BookDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const books = [
        {
            id: 1,
            title: "Sách tiếng việt 1",
            author: "Nguyễn Văn A",
            image: book1,
            description: "Sách tiếng việt 1",
            nxb: "NXB Giáo dục",
            rating: 4,
        },
        {
            id: 2,
            title: "Sách tiếng việt 2",
            author: "Nguyễn Văn A",
            image: book2,
            description: "Sách tiếng việt 2",
            nxb: "NXB Giáo dục",
            rating: 3,
        },
        {
            id: 3,
            title: "Sách tin học 3",
            author: "Nguyễn Văn A",
            image: book3,
            description: "Sách tin học 3",
            nxb: "NXB Giáo dục",
            rating: 4,
        },
        {
            id: 4,
            title: "Sách tin học 4",
            author: "Nguyễn Văn A",
            image: book4,
            description: "Sách tin học 4",
            nxb: "NXB Giáo dục",
            rating: 5,
        },
        {
            id: 5,
            title: "Sách tin học 3",
            author: "Nguyễn Văn A",
            image: book3,
            description: "Sách tin học 3",
            nxb: "NXB Giáo dục",
            rating: 4,
        },
        {
            id: 6,
            title: "Sách tiếng việt 1",
            author: "Nguyễn Văn A",
            image: book1,
            description: "Sách tiếng việt 1",
            nxb: "NXB Giáo dục",
            rating: 4,
        },
        {
            id: 7,
            title: "Sách tiếng việt 2",
            author: "Nguyễn Văn A",
            image: book2,
            description: "Sách tiếng việt 2",
            nxb: "NXB Giáo dục",
            rating: 3,
        },
        {
            id: 8,
            title: "Sách tin học 3",
            author: "Nguyễn Văn A",
            image: book3,
            description: "Sách tin học 3",
            nxb: "NXB Giáo dục",
            rating: 4,
        },
        {
            id: 9,
            title: "Sách tin học 4",
            author: "Nguyễn Văn A",
            image: book4,
            description: "Sách tin học 4",
            nxb: "NXB Giáo dục",
            rating: 5,
        },
        {
            id: 10,
            title: "Sách tin học 3",
            author: "Nguyễn Văn A",
            image: book3,
            description: "Sách tin học 3",
            nxb: "NXB Giáo dục",
            rating: 4,
        },
        {
            id: 11,
            title: "Sách tiếng việt 1",
            author: "Nguyễn Văn A",
            image: book1,
            description: "Sách tiếng việt 1",
            nxb: "NXB Giáo dục",
            rating: 4,
        },
        {
            id: 12,
            title: "Sách tiếng việt 2",
            author: "Nguyễn Văn A",
            image: book2,
            description: "Sách tiếng việt 2",
            nxb: "NXB Giáo dục",
            rating: 3,
        },
        {
            id: 13,
            title: "Sách tin học 3",
            author: "Nguyễn Văn A",
            image: book3,
            description: "Sách tin học 3",
            nxb: "NXB Giáo dục",
            rating: 4,
        },
        {
            id: 14,
            title: "Sách tin học 4",
            author: "Nguyễn Văn A",
            image: book4,
            description: "Sách tin học 4",
            nxb: "NXB Giáo dục",
            rating: 5,
        },
        {
            id: 15,
            title: "Sách tin học 3",
            author: "Nguyễn Văn A",
            image: book3,
            description: "Sách tin học 3",
            nxb: "NXB Giáo dục",
            rating: 4,
        },
        {
            id: 16,
            title: "Sách tiếng việt 1",
            author: "Nguyễn Văn A",
            image: book1,
            description: "Sách tiếng việt 1",
            nxb: "NXB Giáo dục",
            rating: 4,
        },
        {
            id: 17,
            title: "Sách tiếng việt 2",
            author: "Nguyễn Văn A",
            image: book2,
            description: "Sách tiếng việt 2",
            nxb: "NXB Giáo dục",
            rating: 3,
        },
        {
            id: 18,
            title: "Sách tin học 3",
            author: "Nguyễn Văn A",
            image: book3,
            description: "Sách tin học 3",
            nxb: "NXB Giáo dục",
            rating: 4,
        },
        {
            id: 19,
            title: "Sách tin học 4",
            author: "Nguyễn Văn A",
            image: book4,
            description: "Sách tin học 4",
            nxb: "NXB Giáo dục",
            rating: 5,
        },
        {
            id: 20,
            title: "Sách tin học 3",
            author: "Nguyễn Văn A",
            image: book3,
            description: "Sách tin học 3",
            nxb: "NXB Giáo dục",
            rating: 4,
        },
    ]

    const [book, setBook] = useState<BookInterface | null>(null); // Book state
    // const [loading, setLoading] = useState(true); // Loading state
    // const [error, setError] = useState<string | null>(null); // Error state

    useEffect(() => {
        const book = books.find((book) => book.id.toString() === id);
        setBook(book || null);
    }, [id]);

    // useEffect(() => {
    //     // Function to fetch book details
    //     const fetchBook = async () => {
    //         try {
    //             setLoading(true); // Set loading state to true
    //             const response = await fetch(`/api/books/${id}`); // Fetch book by ID
    //             if (!response.ok) {
    //                 throw new Error("Failed to fetch book details");
    //             }
    //             const data: BookInterface = await response.json();
    //             setBook(data); // Set the book data
    //         } catch (err: any) {
    //             setError(err.message); // Set the error message
    //         } finally {
    //             setLoading(false); // Set loading state to false
    //         }
    //     };

    //     fetchBook();
    // }, [id]);

    // if (loading) {
    //     return <div>Loading...</div>; // Show loading indicator
    // }

    // if (error) {
    //     return <div>Error: {error}</div>; // Show error message if there's an error
    // }

    // if (!book) {
    //     return <div>Book not found</div>; // Handle case when book is not found
    // }

    return (
        <div className="max-w-5xl mx-auto mt-10 p-4 space-y-10">
            {/* First Section: Book Info */}
            <div className="flex gap-10">
                <img
                    src={book?.image}
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
                                                index < Math.floor(book?.rating || 0)
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                            } text-xl`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                <span className="text-gray-600">({book?.rating || 0})</span>
                            </div>
                        </div>
                        <p className="text-lg text-gray-700">
                            <span className="font-semibold">Tác giả: </span>
                            {book?.author}
                        </p>
                        <p className="text-lg text-gray-700">
                            <span className="font-semibold">NXB: </span>
                            {book?.nxb}
                        </p>
                        <p className="text-lg text-gray-700">
                            <span className="font-semibold">Mô tả: </span>
                            {book?.description}
                        </p>
                    </div>

                    {/* Read Button */}
                    <div className="flex space-between gap-x-3">
                        <Button type="primary" className="w-1/2">
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
