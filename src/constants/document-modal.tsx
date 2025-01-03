import {Button, Checkbox} from "antd";
import {DownloadOutlined} from "@ant-design/icons";

export const TEMPLATE_COLUMNS = [
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
    }];

export const SHARE_LIST_COLUMNS = [
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
