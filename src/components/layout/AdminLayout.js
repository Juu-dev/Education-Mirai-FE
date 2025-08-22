import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, useLocation, Link } from "react-router-dom";
import logo from "../../assets/logo/san-sang.png";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import useAuth from "../../hooks/useAuth";
import { Role } from "../../constants/roles/role";
const AdminLayout = () => {
    const { me, logout_CallFromUI } = useAuth();
    const role = me?.role;
    const location = useLocation();
    const menuItems = [
        { key: "profile", label: _jsx(Link, { to: "/profile", children: "H\u1ED3 s\u01A1" }) },
        { key: "settings", label: _jsx(Link, { to: "/settings", children: "C\u00E0i \u0111\u1EB7t" }) },
        {
            key: "logout",
            label: (_jsx("span", { onClick: logout_CallFromUI, className: "text-red-500", children: "\u0110\u0103ng xu\u1EA5t" })),
        },
    ];
    const sidebarItems = role === Role.Librarian
        ? [
            { key: "/librarian/dashboard", label: "Bảng điều khiển" },
            { key: "/library", label: "Thư viện" },
            { key: "/librarian/document", label: "Tài liệu" },
            { key: "/librarian/books", label: "Thêm sách" },
        ]
        : role === Role.Teacher
            ? [
                { key: "/teacher/dashboard", label: "Bảng điều khiển" },
                { key: "/teacher/class", label: "Trường" },
                { key: "/teacher/document", label: "Tài liệu" },
                { key: "/teacher/request", label: "Gửi yêu cầu" },
                // { key: "/teacher/settings", label: "Tài khoản" },
            ]
            : [
                { key: "/principal/dashboard", label: "Bảng điều khiển" },
                { key: "/library", label: "Thư viện" },
                { key: "/principal/school", label: "Trường" },
                { key: "/principal/document", label: "Tài liệu" },
                { key: "/principal/request", label: "Gửi yêu cầu" },
                { key: "/principal/teacher-assignment", label: "Phân bổ giáo viên" },
            ];
    const isActive = (path) => location.pathname === path; // Kiểm tra xem đường dẫn hiện tại có khớp không
    return (_jsxs("div", { className: "flex min-h-screen w-screen", children: [_jsxs("aside", { className: "bg-gray-800 text-white w-64 max-h-screen flex flex-col fixed top-0 left-0 bottom-0", children: [_jsx("div", { className: "p-4 flex items-center justify-center", children: _jsx("img", { src: logo, alt: "logo", className: "h-10" }) }), _jsx(Menu, { theme: "dark", mode: "inline", defaultSelectedKeys: [location.pathname], className: "flex-grow", children: sidebarItems.map((item) => (_jsx(Menu.Item, { className: isActive(item.key) ? "bg-gray-700" : "", children: _jsx(Link, { to: item.key, children: item.label }) }, item.key))) }), _jsx("div", { className: "flex flex-col items-center py-6", children: _jsx(Dropdown, { overlay: _jsx(Menu, { items: menuItems }), trigger: ['click'], children: _jsx(Avatar, { size: "large", icon: _jsx(UserOutlined, {}), style: { backgroundColor: '#87d068', cursor: 'pointer' } }) }) })] }), _jsx("main", { className: "flex-grow bg-gray-100 p-4 ml-64 overflow-auto", children: _jsx(Outlet, {}) })] }));
};
export default AdminLayout;
