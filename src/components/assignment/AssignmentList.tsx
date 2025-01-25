import {AssignmentCard} from "./AssignmentCard.tsx";
import useFetchApi from "../../hooks/useFetchApi.ts";
import {useNavigate} from "react-router-dom";
import {Col, Pagination, Row} from "antd";

export const AssignmentList = () => {
    const documentsApi = useFetchApi({
        url: `/exercises/pagination/class`,
        auth: true,
        initQueries: { page: 1, pageSize: 8 },
    })
    const navigate = useNavigate();
    const gotoAssignmentDetail = (id: string) => navigate(`/student/assignments/${id}`);

    const handlePageChange = (page: number) => {
        documentsApi?.fetchApi(`/exercises/pagination/class`, { params: { page, pageSize: documentsApi.pagination?.pageSize || 8 } });
    };

    return (
        <>
            <Row gutter={16}>
                {documentsApi?.data.map((assignment) => (
                    <Col span={6}>
                        <AssignmentCard
                            assignment={assignment}
                            gotoDetailPage={gotoAssignmentDetail}
                        />
                    </Col>
                ))}
            </Row>
            <Pagination
                align="center"
                current={documentsApi?.pagination?.page}
                total={documentsApi?.count}
                pageSize={documentsApi?.pagination?.pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
                className="custom-pagination mt-3"
            />
        </>
    );
};
