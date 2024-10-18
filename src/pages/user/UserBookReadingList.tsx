import book1 from "../../assets/book/book1.png"
import book2 from "../../assets/book/book2.png"
import book3 from "../../assets/book/book3.png"
import book4 from "../../assets/book/book4.png"
import { BookList } from "../../components/book/BookList"
import { FilterSection } from "../../components/book/filter/FilterSection"

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


export const UserBookReadingList = () => {
    // const [filteredBooks, setFilteredBooks] = useState(books);

    // Example filters
    const filters = [
        {
            label: "Môn học",
            key: "subject",
            options: [
                { value: "all", label: "All" },
                { value: "Toán", label: "Toán" },
                { value: "Văn", label: "Văn" },
                { value: "Anh", label: "Anh" },
                { value: "Lý", label: "Lý" },
                { value: "Hóa", label: "Hóa" },
                { value: "Sinh", label: "Sinh" },
                { value: "Sử", label: "Sử" },
                { value: "Địa", label: "Địa" },
                { value: "GDCD", label: "GDCD" },
            ],
        }, 
        {
            label: "Tác giả",
            key: "author",
            options: [
                { value: "Nguyễn Văn A", label: "Nguyễn Văn A" },
                { value: "Trần Văn B", label: "Trần Văn B" },
            ],
        },
        {
            label: "NXB",
            key: "nxb",
            options: [
                { value: "NXB Giáo dục", label: "NXB Giáo dục" },
                { value: "NXB Kim Đồng", label: "NXB Kim Đồng" },
            ],
        },
        {
            label: "Đánh giá",
            key: "rating",
            options: [
                { value: "all", label: "All" },
                { value: "4", label: "4" },
                { value: "5", label: "5" },
            ],
        },
        {
            label: "Lớp",
            key: "grade",
            options: [
                { value: "all", label: "All" },
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" },
                { value: "6", label: "6" },
                { value: "7", label: "7" },
                { value: "8", label: "8" },
                { value: "9", label: "9" },
                { value: "10", label: "10" },
                { value: "11", label: "11" },
                { value: "12", label: "12" },
            ],
        }, 
        {
            label: "Năm xuất bản",
            key: "year",
            options: [
                { value: "all", label: "All" },
                { value: "2021", label: "2021" },
                { value: "2020", label: "2020" },
                { value: "2019", label: "2019" },
                { value: "2018", label: "2018" },
                { value: "2017", label: "2017" },
                { value: "2016", label: "2016" },
                { value: "2015", label: "2015" },
                { value: "2014", label: "2014" },
                { value: "2013", label: "2013" },
                { value: "2012", label: "2012" },
                { value: "2011", label: "2011" },
                { value: "2010", label: "2010" },
            ],
        }
        // Add more filters as needed
    ];

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
            <div className="book-list-wrapper mb-4">
                <BookList books={books} />
            </div>
        </div>
    )
}
