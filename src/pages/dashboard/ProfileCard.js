import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Card } from "antd";
import useAuth from "../../hooks/useAuth";
import { Role } from "../../constants/roles/role";
const roleName = {
    [Role.Teacher]: "Giáo Viên",
    [Role.Student]: "Học Sinh",
    [Role.Principal]: "Hiệu Trưởng",
    [Role.Librarian]: "Thủ thư",
};
export const ProfileCard = () => {
    const { me } = useAuth();
    console.log("me: ", me);
    return (_jsx(Card, { className: "col-span-2 p-4", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Avatar, { size: 64, src: "https://i.pravatar.cc/150?img=3" }), _jsxs("div", { className: "flex-grow", children: [_jsx("h2", { className: "text-lg font-semibold", children: me?.name }), _jsxs("div", { className: "grid grid-cols-2 gap-2 mt-2", children: [_jsx("div", { className: "text-gray-500", children: "Vai tr\u00F2" }), _jsx("div", { className: "text-gray-900", children: roleName[me?.role] }), _jsx("div", { className: "text-gray-500", children: "L\u1EDBp ch\u1EE7 nhi\u1EC7m" }), _jsx("div", { className: "text-gray-900", children: me?.class?.name }), _jsx("div", { className: "text-gray-500", children: "Email" }), _jsx("div", { className: "text-gray-900", children: me?.email }), _jsx("div", { className: "text-gray-500", children: "T\u00E0i li\u1EC7u \u0111\u00E3 duy\u1EC7t" }), _jsx("div", { className: "text-gray-900", children: "20" })] })] })] }) }));
};
