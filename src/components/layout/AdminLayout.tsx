import { Outlet, useLocation, Link } from "react-router-dom";
import logo from "../../assets/logo/san-sang.png";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import useAuth from "../../hooks/useAuth";
import { Role } from "../../constants/roles/role.ts";

const AdminLayout = () => {
    const { me } = useAuth(); // Lấy vai trò từ context
    const role = me?.role
    const location = useLocation(); // Lấy đường dẫn hiện tại

    // Menu thả xuống cho hồ sơ
    const menuItems = [
        { key: "profile", label: <Link to="/profile">Hồ sơ</Link> },
        { key: "settings", label: <Link to="/settings">Cài đặt</Link> },
        {
            key: "logout",
            label: (
                <Link to="/login" className="text-red-500">
                    Đăng xuất
                </Link>
            ),
        },
    ];

    // Các mục sidebar động dựa trên vai trò
    const sidebarItems =
        role === Role.Librarian
            ? [
                { key: "/librarian/dashboard", label: "Bảng điều khiển" },
                { key: "/librarian/library", label: "Thư viện" },
                { key: "/librarian/document", label: "Tài liệu" },
                { key: "/librarian/books", label: "Thêm sách" },
                { key: "/librarian/reports", label: "Gửi yêu cầu" },
                { key: "/librarian/settings", label: "Tài khoản" },
            ]
            : role === Role.Teacher
            ? [
                    { key: "/teacher/dashboard", label: "Bảng điều khiển" },
                    { key: "/teacher/class", label: "Trường" },
                    { key: "/teacher/document", label: "Tài liệu" },
                    { key: "/teacher/reports", label: "Gửi yêu cầu" },
                    { key: "/teacher/settings", label: "Tài khoản" },
                ]
            : [
                { key: "/principal/dashboard", label: "Bảng điều khiển" },
                { key: "/principal/class", label: "Trường" },
                { key: "/principal/document", label: "Tài liệu" },
                { key: "/principal/reports", label: "Gửi yêu cầu" },
                { key: "/principal/settings", label: "Tài khoản" },
            ];

    const isActive = (path: string) => location.pathname === path; // Kiểm tra xem đường dẫn hiện tại có khớp không

    return (
        <div className="flex min-h-screen w-screen">
            {/* Thanh bên */}
            <aside className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
                <div className="p-4 flex items-center justify-center">
                    <img src={logo} alt="logo" className="h-10" />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[location.pathname]}
                    className="flex-grow"
                >
                    {sidebarItems.map((item) => (
                        <Menu.Item
                            key={item.key}
                            className={isActive(item.key) ? "bg-gray-700" : ""}>
                            <Link to={item.key}>{item.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
                <div className="flex flex-col items-center py-6">
                    <BellOutlined
                        style={{ fontSize: "1.5rem", color: "#ffffff" }}
                    />
                    <Dropdown
                        overlay={<Menu items={menuItems} />}
                        trigger={['click']}
                    >
                        <Avatar
                            size="large"
                            icon={<UserOutlined />}
                            style={{ backgroundColor: '#87d068', cursor: 'pointer' }}
                        />
                    </Dropdown>
                </div>
            </aside>
            {/* Nội dung chính */}
            <main className="flex-grow bg-gray-100 p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
