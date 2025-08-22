import {Avatar, Card} from "antd";
import useAuth from "../../hooks/useAuth";
import {Role} from "../../constants/roles/role";

const roleName = {
    [Role.Teacher]: "Giáo Viên",
    [Role.Student]: "Học Sinh",
    [Role.Principal]: "Hiệu Trưởng",
    [Role.Librarian]: "Thủ thư",
}

export const ProfileCard = () => {
    const {me} = useAuth();
    console.log("me: ", me)
    return (<Card className="col-span-2 p-4">
        <div className="flex items-center space-x-4">
            <Avatar size={64} src="https://i.pravatar.cc/150?img=3" />
            <div className="flex-grow">
                <h2 className="text-lg font-semibold">{me?.name}</h2>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="text-gray-500">Vai trò</div>
                    <div className="text-gray-900">{roleName[me?.role]}</div>
                    <div className="text-gray-500">Lớp chủ nhiệm</div>
                    <div className="text-gray-900">{me?.class?.name}</div>
                    <div className="text-gray-500">Email</div>
                    <div className="text-gray-900">{me?.email}</div>
                    <div className="text-gray-500">Tài liệu đã duyệt</div>
                    <div className="text-gray-900">20</div>
                </div>
            </div>
        </div>
    </Card>)
}
