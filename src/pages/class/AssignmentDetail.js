import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table } from "antd";
import useFetchApi from "../../hooks/useFetchApi";
import { formatDateTime } from "../../helpers/date";
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
    });
    return (_jsxs("div", { children: [_jsxs("p", { children: [_jsx("strong", { children: "T\u00EAn b\u00E0i t\u1EADp:" }), " ", assignment?.name] }), _jsxs("p", { children: [_jsx("strong", { children: "Th\u1EDDi gian gi\u1EDBi h\u1EA1n:" }), " ", assignment?.timeOut] }), _jsxs("p", { children: [_jsx("strong", { children: "S\u1ED1 h\u1ECDc sinh \u0111\u00E3 ho\u00E0n th\u00E0nh:" }), " ", assignment?.allDoneStudent] }), _jsx(Table, { columns: columns, dataSource: exercise?.data, rowKey: "id", pagination: { pageSize: 5 } })] }));
};
