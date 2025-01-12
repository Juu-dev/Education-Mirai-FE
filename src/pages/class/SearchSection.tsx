import React from "react";
import {Button, Card, Input} from "antd";
import PageTitle from "../../components/common/SectionTitle.tsx";

const SearchSection: React.FC = () => (
    <Card className="mb-4 shadow-md">
        <PageTitle title="Lớp" className="mb-3"/>

        <div className="flex items-center space-x-4">
            <Input
                placeholder="Tìm kiếm theo ID"
                className="flex-1 border rounded-md"
                allowClear
            />
            <Input
                placeholder="Tìm kiếm theo tên"
                className="flex-1 border rounded-md"
                allowClear
            />
            <Input
                placeholder="Tìm kiếm theo số điện thoại"
                className="flex-1 border rounded-md"
                allowClear
            />
            <Button type="primary" className="h-10 w-32">
                {" "}
                {/* Thay đổi kích thước nút ở đây */}
                Tìm kiếm
            </Button>
        </div>
    </Card>
);

export default SearchSection;
