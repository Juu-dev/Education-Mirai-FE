import { BookComponent } from "./BookComponent";
import { BookInterface } from "./interface/book-interface";

interface BookProps {
    books: BookInterface[];
}

export const BookList = ({ books }: BookProps) => {
    return (
        <div className="grid grid-cols-5 gap-4">
            {books.map((book) => (
                <BookComponent key={book.id} book={book} />
            ))}
        </div>
    );
};
