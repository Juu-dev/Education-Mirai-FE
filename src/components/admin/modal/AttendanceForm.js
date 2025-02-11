import { jsx as _jsx } from "react/jsx-runtime";
import { Table, Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
const AttendanceForm = ({ studentData }) => {
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
            render: () => (_jsx("div", { className: "flex space-x-2", children: _jsx(Button, { icon: _jsx(UserAddOutlined, {}) }) })),
        },
    ];
    return (
    // <Modal
    //     title="Danh sách học sinh"
    //     visible={visible}
    //     onCancel={onCancel}
    //     footer={[
    //         <Button key="check" type="primary">
    //             Điểm danh
    //         </Button>,
    //         <Button key="checkAll" type="primary">
    //             Điểm danh tất cả
    //         </Button>,
    //     ]}
    //     width={600}
    //     bodyStyle={{ maxHeight: "500px", overflowY: "auto" }}>
    _jsx(Table, { columns: columns, dataSource: studentData, pagination: false, scroll: { y: 400 } })
    // </Modal>
    );
};
export default AttendanceForm;
