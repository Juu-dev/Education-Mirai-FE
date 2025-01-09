import { Button } from "antd"

import { BookList } from "../../components/book/BookList"
import { useNavigate } from "react-router-dom"

export const UserBookList = () => {
    const navigate  = useNavigate();

    return (
        <div className="container mx-auto px-4 overflow-hidden">
            <div className="book-list-wrapper mb-4">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-normal text-blue-700">Sách giáo khoa</h2>
                    <Button type="primary" onClick={() => {
                        navigate('/student/reading-books')
                    }}>
                        Xem thêm
                    </Button>
                </div>
                <BookList />
            </div>
            <div className="book-list-wrapper mb-4">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-normal text-blue-700">Sách tham khảo</h2>
                    <Button type="primary" onClick={() => {
                        navigate('/student/reading-books')
                    }}>
                        Xem thêm
                    </Button>
                </div>
                <BookList />
            </div>
            <div className="book-list-wrapper mb-4">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-normal text-blue-700">Sách nói</h2>
                    <Button type="primary" onClick={() => {
                        navigate('/student/reading-books')
                    }}>
                        Xem thêm
                    </Button>
                </div>
                <BookList />
            </div>
        </div>
    )
}
