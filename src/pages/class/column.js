import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
export const columnsStudent = (studentProfile, confirmDelete) => ([
    {
        title: "Tên",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Ngày sinh",
        dataIndex: "birthDate",
        key: "birthDate",
    },
    {
        title: "Tên phụ huynh",
        dataIndex: "parentName",
        key: "parentName",
    },
    {
        title: "SDT",
        dataIndex: "phone",
        key: "phone",
    },
    {
        title: "Hành động",
        key: "action",
        render: () => (_jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { icon: _jsx(EditOutlined, {}), onClick: studentProfile.openModal }), _jsx(Button, { icon: _jsx(DeleteOutlined, {}), onClick: confirmDelete.openModal })] }))
    }
]);
export const columnsQuiz = (quizEdit, confirmDelete) => ([
    {
        title: "Tên",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Số câu hỏi",
        dataIndex: "amount",
        key: "amount",
    },
    {
        title: "Hành động",
        key: "action",
        render: () => (_jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { icon: _jsx(EditOutlined, {}), onClick: quizEdit.openModal }), _jsx(Button, { icon: _jsx(DeleteOutlined, {}), onClick: confirmDelete.openModal })] })),
    },
]);
export const columnsExercise = (assignmentEdit, confirmDelete, viewDetails) => ([
    {
        title: "Tên",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Thời gian giới hạn",
        dataIndex: "timeOut",
        key: "timeOut",
    },
    {
        title: "Số học sinh đã hoàn thành",
        dataIndex: "allDoneStudent",
        key: "allDoneStudent",
    },
    {
        title: "Hành động",
        key: "action",
        render: () => (_jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { icon: _jsx(EditOutlined, {}), onClick: assignmentEdit.openModal }), _jsx(Button, { icon: _jsx(DeleteOutlined, {}), onClick: confirmDelete.openModal }), _jsx(Button, { icon: _jsx(EyeOutlined, {}), onClick: viewDetails.openModal })] })),
    },
]);
