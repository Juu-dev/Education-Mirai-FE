import { Button, Result, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export const AssignmentResult = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Nhận dữ liệu từ location.state
    const { mark, totalRightQuestion, totalQuestions } = location.state || {};

    if (!location.state) {
        return (
            <Result
                status="error"
                title="Không có dữ liệu để hiển thị kết quả!"
                extra={
                    <Button type="primary" onClick={() => navigate("/")}>
                        Quay lại trang chủ
                    </Button>
                }
            />
        );
    }

    return (
        <Result
            status="success"
            title="Bạn đã hoàn thành bài tập!"
            subTitle={
                <div>
                    <Title level={5}>Kết quả của bạn:</Title>
                    <Text strong>Điểm: </Text>
                    <Text>
                        {mark.toFixed(2)} (
                        {totalRightQuestion}/{totalQuestions} câu đúng)
                    </Text>
                </div>
            }
            extra={[
                <Button
                    type="primary"
                    key="back"
                    onClick={() => navigate("/student/assignments")}
                >
                    Quay lại danh sách bài tập
                </Button>,
                <Button key="retry" onClick={() => navigate(0)}>
                    Làm lại bài tập
                </Button>,
            ]}
        />
    );
};

export default AssignmentResult;
