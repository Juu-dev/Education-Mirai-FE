import { Button } from "antd"

import book1 from "../../assets/book/book1.png"
import book2 from "../../assets/book/book2.png"
import book3 from "../../assets/book/book3.png"
import book4 from "../../assets/book/book4.png"
import { BookList } from "../../components/book/BookList"
import { useNavigate } from "react-router-dom"

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
]

export const UserBookList = () => {
    const navigate  = useNavigate()
    return (
        <div className="container mx-auto px-4 overflow-hidden">
            <div className="book-list-wrapper mb-4">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-normal text-blue-700">Sách giáo khoa</h2>
                    <Button type="primary" onClick={() => {
                        navigate('/user/reading-books')
                    }}>
                        Xem thêm
                    </Button>
                </div>
                <BookList books={books} />
            </div>
            <div className="book-list-wrapper mb-4">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-normal text-blue-700">Sách tham khảo</h2>
                    <Button type="primary" onClick={() => {
                        navigate('/user/reading-books')
                    }}>
                        Xem thêm
                    </Button>
                </div>
                <BookList books={books} />
            </div>
            <div className="book-list-wrapper mb-4">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-normal text-blue-700">Sách nói</h2>
                    <Button type="primary" onClick={() => {
                        navigate('/user/reading-books')
                    }}>
                        Xem thêm
                    </Button>
                </div>
                <BookList books={books} />
            </div>
        </div>
    )
}
