import React from "react";
import { Table, Button, Modal } from "antd";
import { TEMPLATE_DATA } from "../../../constants/mocks/document";
import { DownloadOutlined } from "@ant-design/icons";

interface Props {
    isVisible: boolean;
    onCancel: () => void;
    showAddTemplateModal: () => void;
}

const TemplateModal: React.FC<Props> = ({
    isVisible,
    onCancel,
    showAddTemplateModal,
}) => {
    const templateColumns = [
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
            title: "Đối tượng sử dụng",
            dataIndex: "userType",
            key: "userType",
        },
        {
            title: "Tải xuống",
            key: "download",
            render: () => <Button icon={<DownloadOutlined />} />,
        },
    ];

    return (
        <Modal
            title="Lựa chọn template"
            visible={isVisible}
            onCancel={onCancel}
            footer={null}>
            <Table
                dataSource={TEMPLATE_DATA}
                columns={templateColumns}
                pagination={false}
            />
            <div className="flex justify-end mt-4">
                <Button type="primary" onClick={showAddTemplateModal}>
                    Thêm mẫu
                </Button>
            </div>
        </Modal>
    );
};

export default TemplateModal;
