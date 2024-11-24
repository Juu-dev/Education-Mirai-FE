import React from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import logo from "../../assets/logo/san-sang.png";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Input, Select } from "antd";
import useAuth from "../../hooks/useAuth";
import { Role } from "../../constants/roles/role.ts";
import { Option } from "antd/es/mentions";

const { Search } = Input;

const UserLayout: React.FC = () => {
    const { me } = useAuth();
    const role = me?.role;
    const location = useLocation(); // Get the current location

    // Dynamic route matcher for /user/reading-books/book/:id
    const bookDetailMatch = useMatch("/student/reading-books/book/:id");
    const assignmentDetailMatch = useMatch("/student/assignments/:id");

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

    const isActive = (path: string) => {
        // Check if the current path matches a static path
        if (location.pathname === path) return true;

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

    const onSearch = (value: string) => console.log("Search:", value);

    const handleFilterChange = (value: string) => {
        console.log("Selected Filter:", value);
    };

    return (
        <div className="flex min-h-screen w-screen">
            <div className="flex flex-col flex-grow">
                {/* Navbar */}
                <div className="bg-white shadow p-4 flex justify-between items-center">
                    <div>
                        <img src={logo} alt="logo" className="h-8" />
                    </div>
                    <nav className="space-x-6">
                        <a
                            href="/student/books"
                            className={`${
                                isActive("/student/books")
                                    ? "text-blue-500 font-bold"
                                    : "text-gray-700"
                            } hover:text-gray-900`}
                        >
                            Thư viện
                        </a>
                        <a
                            href="/student/reading-books"
                            className={`${
                                isActive("/student/reading-books") || isActive("/student/reading-books/book/:id")
                                    ? "text-blue-500 font-bold"
                                    : "text-gray-700"
                            } hover:text-gray-900`}
                        >
                            Đọc sách
                        </a>
                        {/* <a
                            href="/notifications"
                            className={`${
                                isActive("/notifications")
                                    ? "text-blue-500 font-bold"
                                    : "text-gray-700"
                            } hover:text-gray-900`}
                        >
                            Video
                        </a> */}
                        <a
                            href="/student/assignments"
                            className={`${
                                isActive("/student/assignments") || isActive("/student/assignments/:id")
                                    ? "text-blue-500 font-bold"
                                    : "text-gray-700"
                            } hover:text-gray-900`}
                        >
                            Bài tập
                        </a>
                    </nav>
                    <div className="flex items-center space-x-4">
                        {/* Search Bar with Filter Dropdown */}
                        <Search
                            placeholder="Search..."
                            onSearch={onSearch}
                            enterButton
                            style={{ width: 300 }}
                        />
                        <Select
                            placeholder="Thể loại"
                            style={{ width: 120 }}
                            onChange={handleFilterChange}
                        >
                            <Option value="all">All</Option>
                            <Option value="books">Books</Option>
                            <Option value="videos">Videos</Option>
                            <Option value="exercises">Exercises</Option>
                        </Select>
                    </div>
                    <div className="flex">
                        <BellOutlined
                            className="pr-3"
                            style={{ fontSize: "1.5rem", color: "#000000" }}
                        />
                        <Dropdown className="w-max" menu={{ items: menuItems }} trigger={["click"]}>
                            <div className="flex items-center cursor-pointer">
                                <Avatar size={32} icon={<UserOutlined />} />
                                <div className="px-2">
                                    <div className="ml-2 text-gray-700">John Doe</div>
                                    <div className="ml-2 text-blue-700">
                                        {role === Role.Teacher
                                            ? "Giáo viên"
                                            : role === Role.Principal
                                            ? "Hiệu trưởng"
                                            : role === Role.Student
                                            ? "Học sinh"
                                            : "Thủ thư"}
                                    </div>
                                </div>
                            </div>
                        </Dropdown>
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-grow p-6 bg-gray-100">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserLayout;
