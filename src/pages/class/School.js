import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Table, Input, Button, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PageTitle from "../../components/common/SectionTitle";
import useFetchApi from "../../hooks/useFetchApi";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
const School = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const navigate = useNavigate();
    const classesPagination = useFetchApi({
        url: "/classes/pagination",
        auth: false,
        initQueries: { pageSize: 10 },
        presentData: (data) => data.map((e) => ({
            id: e.id,
            className: e.name,
            teacher: e?.user[0]?.name,
            amount: e.amount
        }))
    });
    const columns = [
        {
            title: "Tên lớp",
            dataIndex: "className",
            key: "className",
        },
        {
            title: "Giáo viên chủ nhiệm",
            dataIndex: "teacher",
            key: "teacher",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (_jsx(Button, { type: "primary", className: "bg-blue-500", onClick: () => handleViewDetails(record.id, record.className, record.teacher, record.amount), children: "Xem chi ti\u1EBFt" })),
        },
    ];
    const handleViewDetails = (classId, className, teacherName, studentCount) => {
        navigate("/principal/class", {
            state: {
                classId: classId,
                className: className,
                teacherName: teacherName,
                studentCount: studentCount
            }
        });
    };
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    useEffect(() => {
        const params = {};
        if (searchTerm)
            params.search = searchTerm;
        classesPagination.fetchApi(`/classes/pagination`, { params });
    }, [debouncedSearchTerm]);
    const handlePageChange = (page) => {
        classesPagination?.fetchApi(`/classes/pagination`, { params: { page, pageSize: classesPagination.pagination?.pageSize || 10 } });
    };
    return (_jsxs("div", { className: "p-4", children: [_jsx(PageTitle, { title: "Danh s\u00E1ch l\u1EDBp" }), _jsx("div", { className: "mb-4 flex items-center", children: _jsx(Input, { placeholder: "T\u00ECm ki\u1EBFm theo t\u00EAn l\u1EDBp", prefix: _jsx(SearchOutlined, {}), onChange: handleSearch, className: "max-w-xs", value: searchTerm }) }), _jsx(Table, { columns: columns, dataSource: classesPagination.data, bordered: true, pagination: false }), _jsx(Pagination, { current: classesPagination?.pagination?.page, total: classesPagination?.count, pageSize: classesPagination?.pagination?.pageSize, onChange: handlePageChange, showSizeChanger: false, align: "end", className: "custom-pagination mt-3" })] }));
};
export default School;
