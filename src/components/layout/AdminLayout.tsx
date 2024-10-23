import { Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/logo/san-sang.png";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import { useRole } from "../../context/RoleContext";
import { Role } from "../../constants/roles/routes";

const AdminLayout = () => {
    const { role } = useRole(); // Get the role from the context
    const location = useLocation(); // Get the current location

    // Menu for the profile dropdown
    const menuItems = [
        { key: "profile", label: <a href="/profile">Profile</a> },
        { key: "settings", label: <a href="/settings">Settings</a> },
        {
            key: "logout",
            label: (
                <a href="/login" className="text-red-500">
                    Logout
                </a>
            ),
        },
    ];

    // Dynamic sidebar items based on role
    const sidebarItems =
        role === Role.Librarian
            ? [
                  { key: "/librarian/dashboard", label: "Dashboard" },
                  { key: "/librarian/library", label: "Thư viện" }, // Changed for librarian
                  { key: "/librarian/document", label: "Tài liệu" },
                  { key: "/librarian/books", label: "Thêm sách" },
                  { key: "/librarian/reports", label: "Gửi yêu cầu" },
                  { key: "/librarian/settings", label: "Tài khoản" },
              ]
            : [
                  { key: "/admin/dashboard", label: "Dashboard" },
                  { key: "/admin/class", label: "Lớp" }, // For admin or other roles
                  { key: "/admin/document", label: "Tài liệu" },
                  { key: "/admin/reports", label: "Gửi yêu cầu" },
                  { key: "/admin/settings", label: "Tài khoản" },
              ];

    const isActive = (path: string) => location.pathname === path; // Check if current path is active

    return (
        <div className="flex min-h-screen w-screen">
            {/* Sidebar */}
            <aside className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
                <div className="p-4 flex items-center justify-center">
                    <img src={logo} alt="logo" className="h-10" />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[location.pathname]}
                    className="flex-grow">
                    {sidebarItems.map((item) => (
                        <Menu.Item
                            key={item.key}
                            className={isActive(item.key) ? "bg-gray-700" : ""}>
                            <a href={item.key}>{item.label}</a>
                        </Menu.Item>
                    ))}
                </Menu>
                <div className="flex flex-col items-center py-6">
                    <BellOutlined
                        style={{ fontSize: "1.5rem", color: "#ffffff" }}
                    />
                    <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                        <div className="flex items-center cursor-pointer mt-4">
                            <Avatar size={32} icon={<UserOutlined />} />
                            <div className="px-2">
                                <div className="ml-2 text-white">John Doe</div>
                                <div className="ml-2 text-blue-400">
                                    {role === Role.Admin
                                        ? "Administrator"
                                        : role === Role.Librarian
                                        ? "Librarian"
                                        : "User"}
                                </div>
                            </div>
                        </div>
                    </Dropdown>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow p-6 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
