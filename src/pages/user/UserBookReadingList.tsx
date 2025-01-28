import { BookList } from "../../components/book/BookList"
import { FilterSection } from "../../components/book/filter/FilterSection"
import { filters } from "../../constants/mocks/filters";
// import { books } from "../../constants/mocks/book";
// import { debounce } from "../../utils/debounce";
// import useFetchApi from "../../hooks/useFetchApi";
// import {BookInterface} from "../../components/book/interface/book-interface";
// import { useEffect, useState, useCallback } from "react";

export const UserBookReadingList = () => {

    // const loadMoreBooks = useCallback(() => {
    //     const currentLength = displayedBooks.length;
    //     const moreBooks = books.slice(currentLength, currentLength + 10);
    //
    //     if (moreBooks.length > 0) {
    //         setDisplayedBooks((prevBooks) => [...prevBooks, ...moreBooks]);
    //     }
    //
    //     if (displayedBooks.length >= books.length) {
    //         setHasMore(false);
    //     }
    // }, [displayedBooks]);

    // const handleScroll = debounce(() => {
    //     if (!hasMore) return;
    //
    //     const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    //     const threshold = document.documentElement.offsetHeight - 200;
    //
    //     if (scrollPosition >= threshold) {
    //         loadMoreBooks();
    //     }
    // }, 200);

    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, [handleScroll]);

    // Handle filter change
    const handleFilterChange = (value: string, filterKey: string) => {
        console.log(`Selected ${filterKey}:`, value);

        // You can update your book filtering logic here
        // Example: Filter by author or genre based on filterKey and value
        // let updatedBooks = books;

        // if (filterKey === "author" && value !== "all") {
        //     updatedBooks = books.filter((book) => book.author === value);
        // } else if (filterKey === "genre" && value !== "all") {
        //     updatedBooks = books.filter((book) => book.title.toLowerCase().includes(value));
        // }

        // setFilteredBooks(updatedBooks);
    };


    return (
        <div className="container mx-auto px-4 overflow-hidden">
            {/* Filter Section */}
            <FilterSection filters={filters} onFilterChange={handleFilterChange} />

            {/* Book List */}
            <div className="book-list-wrapper mb-4 overflow-auto">
                <BookList/>
            </div>
        </div>
    )
}
