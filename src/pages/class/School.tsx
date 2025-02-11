import React, {useEffect, useState} from "react";
import {Table, Input, Button, Pagination} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PageTitle from "../../components/common/SectionTitle";
import useFetchApi from "../../hooks/useFetchApi";
import useDebounce from "../../hooks/useDebounce";
import {useNavigate} from "react-router-dom";

const School = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
    const navigate = useNavigate();

    const classesPagination = useFetchApi({
        url: "/classes/pagination",
        auth: false,
        initQueries: {pageSize: 10},
        presentData: (data) => data.map((e) => ({
            id: e.id,
            className: e.name,
            teacher: e?.user[0]?.name,
            amount: e.amount
        }))
    })

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
            render: (_: any, record: any) => (
                <Button
                    type="primary"
                    className="bg-blue-500"
                    onClick={() => handleViewDetails(record.id, record.className, record.teacher, record.amount )}
                >
                    Xem chi tiết
                </Button>
            ),
        },
    ];

    const handleViewDetails = (classId: string, className: string, teacherName: string, studentCount: string) => {
        navigate("/principal/class", {
            state: {
                classId: classId,
                className: className,
                teacherName: teacherName,
                studentCount: studentCount
            }
        })
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const params: any = {};
        if (searchTerm) params.search = searchTerm;
        classesPagination.fetchApi(`/classes/pagination`, {params});
    }, [debouncedSearchTerm]);

    const handlePageChange = (page: number) => {
        classesPagination?.fetchApi(`/classes/pagination`, { params: { page, pageSize: classesPagination.pagination?.pageSize || 10 } });
    };

    return (
        <div className="p-4">
            <PageTitle title="Danh sách lớp"/>
            <div className="mb-4 flex items-center">
                <Input
                    placeholder="Tìm kiếm theo tên lớp"
                    prefix={<SearchOutlined />}
                    onChange={handleSearch}
                    className="max-w-xs"
                    value={searchTerm}
                />
            </div>
            <Table
                columns={columns}
                dataSource={classesPagination.data}
                bordered
                pagination={false}
            />
            <Pagination
                current={classesPagination?.pagination?.page}
                total={classesPagination?.count}
                pageSize={classesPagination?.pagination?.pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
                align="end"
                className="custom-pagination mt-3"
            />
        </div>
    );
};

export default School;
