import { Table } from "antd";
import useFetchApi from "../../hooks/useFetchApi";
import {formatDateTime} from "../../helpers/date";

export const AssignmentDetail = ({ assignment }) => {
    // Cột bảng cho học sinh
    const columns = [
        {
            title: "Tên học sinh",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ngày hoàn thành",
            dataIndex: "completionDate",
            key: "completionDate",
        },
        {
            title: "Điểm",
            dataIndex: "score",
            key: "score",
        },
    ];

    const exercise = useFetchApi({
        url: `/exercises/student/${assignment?.id}`,
        auth: true,
        presentData: (data) => data?.answers.map(e => ({
            id: e.id,
            name: e?.user?.name,
            completionDate: formatDateTime(e.createdAt),
            score: e.mark
        }))
    })

    return (
            <div>
                <p><strong>Tên bài tập:</strong> {assignment?.name}</p>
                <p><strong>Thời gian giới hạn:</strong> {assignment?.timeOut}</p>
                <p><strong>Số học sinh đã hoàn thành:</strong> {assignment?.allDoneStudent}</p>
                <Table
                    columns={columns}
                    dataSource={exercise?.data}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                />
            </div>
    );
};
