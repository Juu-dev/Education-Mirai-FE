import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { AssignmentCard } from "./AssignmentCard";
import useFetchApi from "../../hooks/useFetchApi";
import { useNavigate } from "react-router-dom";
import { Col, Pagination, Row } from "antd";
export const AssignmentList = () => {
    const documentsApi = useFetchApi({
        url: `/exercises/pagination/class`,
        auth: true,
        initQueries: { page: 1, pageSize: 8 },
    });
    const navigate = useNavigate();
    const gotoAssignmentDetail = (id) => navigate(`/student/assignments/${id}`);
    const handlePageChange = (page) => {
        documentsApi?.fetchApi(`/exercises/pagination/class`, { params: { page, pageSize: documentsApi.pagination?.pageSize || 8 } });
    };
    return (_jsxs(_Fragment, { children: [_jsx(Row, { gutter: 16, children: documentsApi?.data.map((assignment) => (_jsx(Col, { span: 6, children: _jsx(AssignmentCard, { assignment: assignment, gotoDetailPage: gotoAssignmentDetail }) }))) }), _jsx(Pagination, { align: "center", current: documentsApi?.pagination?.page, total: documentsApi?.count, pageSize: documentsApi?.pagination?.pageSize, onChange: handlePageChange, showSizeChanger: false, className: "custom-pagination mt-3" })] }));
};
