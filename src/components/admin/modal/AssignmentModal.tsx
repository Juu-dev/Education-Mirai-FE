import React from "react";
import { Modal, Table, Button } from "antd";

interface AssignmentModalProps {
    visible: boolean;
    onCancel: () => void;
    assignmentData: any[];
}

const AssignmentModal: React.FC<AssignmentModalProps> = ({
    visible,
    onCancel,
    assignmentData,
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
            title: "Ngày giao",
            dataIndex: "dueDate",
            key: "dueDate",
        },
        {
            title: "Số câu",
            dataIndex: "questionCount",
            key: "questionCount",
        },
        {
            title: "Môn",
            dataIndex: "subject",
            key: "subject",
        },
        {
            title: "Loại",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Hành động",
            key: "action",
            render: () => <Button type="primary">Thêm</Button>,
        },
    ];

    return (
        <Modal
            title="Giao bài tập"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="add" type="primary">
                    Thêm
                </Button>,
                <Button key="cancel" onClick={onCancel}>
                    Hủy
                </Button>,
            ]}
            width={600} // Kích thước cố định của modal
            bodyStyle={{ maxHeight: "400px", overflowY: "auto" }} // Thiết lập chiều cao tối đa và cuộn
        >
            <Table
                columns={columns}
                dataSource={assignmentData}
                pagination={false}
                scroll={{ y: 300 }} // Thêm scroll cho bảng
            />
        </Modal>
    );
};

export default AssignmentModal;
