import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import { BookInterface } from "./interface/book-interface";
import useAuth from "../../hooks/useAuth";

interface BookProps {
    book: BookInterface;
}

export const BookComponent = ({ book }: BookProps) => {
    const {isStudent} = useAuth();
    const navigate = useNavigate();
    const defaultImage = "/default_image.jpg";

    return (
        <div
            className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden border hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => {
                if (isStudent)
                    navigate(`/student/reading-books/book/${book.id}`);
            }}
        >
            {/* Image Section */}
            <div className="relative h-36">
                <Image
                    src={book.coverImageUrl}
                    alt={book.title}
                    className="w-full h-56 object-cover"
                    fallback={defaultImage}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-white font-bold text-lg">
                    {book.title}
                </div>
            </div>

            {/* Book Details Section */}
            <div className="p-6 space-y-4">
                <p className="text-gray-800">
                    <span className="font-semibold">Tác giả: </span>
                    <span className="font-normal">{book.author}</span>
                </p>
                <p className="text-gray-800">
                    <span className="font-semibold">NXB: </span>
                    <span className="font-normal">{book.publishingHouse}</span>
                </p>
            </div>
        </div>
    );
};
