import React from "react";
import { Modal, Input, Table, Checkbox, Button } from "antd";
import { SHARE_LIST_DATA } from "../../../constants/mocks/document";

interface Props {
    isVisible: boolean;
    onCancel: () => void;
}

const ShareDocumentModal: React.FC<Props> = ({ isVisible, onCancel }) => {
    const shareListColumns = [
        {
            title: "",
            dataIndex: "checkbox",
            key: "checkbox",
            render: () => <Checkbox />,
        },
        {
            title: "Tên tài liệu",
            dataIndex: "documentName",
            key: "documentName",
        },
        {
            title: "Loại hồ sơ",
            dataIndex: "documentType",
            key: "documentType",
        },
        {
            title: "Đối tượng chia sẻ",
            dataIndex: "sharedWith",
            key: "sharedWith",
        },
    ];

    return (
        <Modal
            title="Share Document"
            visible={isVisible}
            onCancel={onCancel}
            footer={null}>
            <Input.Search
                placeholder="Search by name or email"
                className="mb-4"
            />
            <Table
                dataSource={SHARE_LIST_DATA}
                columns={shareListColumns}
                pagination={false}
            />
            <div className="flex justify-end mt-4">
                <Button type="primary">Chia sẻ</Button>
            </div>
        </Modal>
    );
};

export default ShareDocumentModal;
