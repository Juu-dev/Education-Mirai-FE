import { useNavigate } from "react-router-dom";
import { BookInterface } from "./interface/book-interface";

interface BookProps {
    book: BookInterface;
}

export const BookComponent = ({ book }: BookProps) => {
    const navigate = useNavigate();
    return (
        <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden border hover:shadow-xl transition-shadow duration-300"
        onClick={() => {
                console.log(book.id)
                navigate(`/user/reading-books/book/${book.id}`)
            }}
        >
            {/* Image Section */}
            <div className="relative">
                <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-full h-56 object-cover"
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
                    <span className="font-normal">{book.nxb}</span>
                </p>
            </div>
        </div>
    );
};
