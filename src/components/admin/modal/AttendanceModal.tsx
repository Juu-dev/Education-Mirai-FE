import React from "react";
import { Modal, Table, Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

interface AttendanceModalProps {
    visible: boolean;
    onCancel: () => void;
    studentData: any[];
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({
    visible,
    onCancel,
    studentData,
}) => {
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Hành động",
            key: "action",
            render: () => (
                <div className="flex space-x-2">
                    <Button icon={<UserAddOutlined />} />
                </div>
            ),
        },
    ];

    return (
        <Modal
            title="Điểm danh"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="check" type="primary">
                    Điểm danh
                </Button>,
                <Button key="checkAll" type="primary">
                    Điểm danh tất cả
                </Button>,
            ]}
            width={600}
            bodyStyle={{ maxHeight: "500px", overflowY: "auto" }}>
            <Table
                columns={columns}
                dataSource={studentData}
                pagination={false}
                scroll={{ y: 400 }}
            />
        </Modal>
    );
};

export default AttendanceModal;
