import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import logo from "../../assets/logo/san-sang.png";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Input, Select } from "antd";
import useAuth from "../../hooks/useAuth";
import { Role } from "../../constants/roles/role";
import { Option } from "antd/es/mentions";
const { Search } = Input;
const UserLayout = () => {
    const { me } = useAuth();
    const role = me?.role;
    const location = useLocation(); // Get the current location
    // Dynamic route matcher for /user/reading-books/book/:id
    const bookDetailMatch = useMatch("/student/reading-books/book/:id");
    const assignmentDetailMatch = useMatch("/student/assignments/:id");
    const menuItems = [
        { key: "profile", label: _jsx("a", { href: "/profile", children: "Profile" }) },
        { key: "settings", label: _jsx("a", { href: "/settings", children: "Settings" }) },
        {
            key: "logout",
            label: (_jsx("a", { href: "/login", className: "text-red-500", children: "Logout" })),
        },
    ];
    const isActive = (path) => {
        // Check if the current path matches a static path
        if (location.pathname === path)
            return true;
        // For dynamic path /user/reading-books/book/:id
        if (path === "/student/reading-books/book/:id" && bookDetailMatch) {
            return true;
        }
        // For dynamic path /user/assignments/:id
        if (path === "/student/assignments/:id" && assignmentDetailMatch) {
            return true;
        }
        return false;
    };
    const onSearch = (value) => console.log("Search:", value);
    const handleFilterChange = (value) => {
        console.log("Selected Filter:", value);
    };
    return (_jsx("div", { className: "flex min-h-screen w-screen", children: _jsxs("div", { className: "flex flex-col flex-grow", children: [_jsxs("div", { className: "bg-white shadow p-4 flex justify-between items-center", children: [_jsx("div", { children: _jsx("img", { src: logo, alt: "logo", className: "h-8" }) }), _jsxs("nav", { className: "space-x-6", children: [_jsx("a", { href: "/student/books", className: `${isActive("/student/books")
                                        ? "text-blue-500 font-bold"
                                        : "text-gray-700"} hover:text-gray-900`, children: "Th\u01B0 vi\u1EC7n" }), _jsx("a", { href: "/student/reading-books", className: `${isActive("/student/reading-books") || isActive("/student/reading-books/book/:id")
                                        ? "text-blue-500 font-bold"
                                        : "text-gray-700"} hover:text-gray-900`, children: "\u0110\u1ECDc s\u00E1ch" }), _jsx("a", { href: "/student/assignments", className: `${isActive("/student/assignments") || isActive("/student/assignments/:id")
                                        ? "text-blue-500 font-bold"
                                        : "text-gray-700"} hover:text-gray-900`, children: "B\u00E0i t\u1EADp" })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Search, { placeholder: "Search...", onSearch: onSearch, enterButton: true, style: { width: 300 } }), _jsxs(Select, { placeholder: "Th\u1EC3 lo\u1EA1i", style: { width: 120 }, onChange: handleFilterChange, children: [_jsx(Option, { value: "all", children: "All" }), _jsx(Option, { value: "books", children: "Books" }), _jsx(Option, { value: "videos", children: "Videos" }), _jsx(Option, { value: "exercises", children: "Exercises" })] })] }), _jsxs("div", { className: "flex", children: [_jsx(BellOutlined, { className: "pr-3", style: { fontSize: "1.5rem", color: "#000000" } }), _jsx(Dropdown, { className: "w-max", menu: { items: menuItems }, trigger: ["click"], children: _jsxs("div", { className: "flex items-center cursor-pointer", children: [_jsx(Avatar, { size: 32, icon: _jsx(UserOutlined, {}) }), _jsxs("div", { className: "px-2", children: [_jsx("div", { className: "ml-2 text-gray-700", children: "John Doe" }), _jsx("div", { className: "ml-2 text-blue-700", children: role === Role.Teacher
                                                            ? "Giáo viên"
                                                            : role === Role.Principal
                                                                ? "Hiệu trưởng"
                                                                : role === Role.Student
                                                                    ? "Học sinh"
                                                                    : "Thủ thư" })] })] }) })] })] }), _jsx("main", { className: "flex-grow p-6 bg-gray-100", children: _jsx("div", { className: "bg-white p-6 rounded-lg shadow", children: _jsx(Outlet, {}) }) })] }) }));
};
export default UserLayout;
