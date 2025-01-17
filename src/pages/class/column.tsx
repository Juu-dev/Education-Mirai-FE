import {Button} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

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
        render: () => (
            <div className="flex space-x-2">
                <Button icon={<EditOutlined />} onClick={studentProfile.openModal}/>
                <Button icon={<DeleteOutlined />} onClick={confirmDelete.openModal}/>
            </div>
        )
    }
])

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
        render: () => (
            <div className="flex space-x-2">
                <Button icon={<EditOutlined />} onClick={quizEdit.openModal}/>
                <Button icon={<DeleteOutlined />} onClick={confirmDelete.openModal}/>
            </div>
        ),
    },
])

export const columnsExercise = (assignmentEdit, confirmDelete) => ([
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
        render: () => (
            <div className="flex space-x-2">
                <Button icon={<EditOutlined />} onClick={assignmentEdit.openModal}/>
                <Button icon={<DeleteOutlined />} onClick={confirmDelete.openModal}/>
            </div>
        ),
    },
])
