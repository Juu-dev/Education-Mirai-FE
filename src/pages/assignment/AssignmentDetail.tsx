import { useEffect, useState } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import useFetchApi from "../../hooks/useFetchApi.ts";
import { Button, Card, Radio, Space, Typography } from "antd";
import { useCountdown } from "../../hooks/useCountdown.tsx";
import useAuth from "../../hooks/useAuth.ts";
import useCreateApi from "../../hooks/useCreateApi.ts";

const { Title, Text } = Typography;

export const AssignmentDetail = () => {
    const {me} = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { data: exerciseData, loading } = useFetchApi({
        url: `/exercises/${id}`,
        auth: true
    });

    const answersApi = useCreateApi({
        url: "/answers",
        successMsg: "Gửi đáp án thành công!",
        errorMsg: "Gửi đáp án thất bại, vui lòng thử lại.",
        fullResp: true,
    })

    const [time, resetCountdown] = useCountdown(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    useEffect(() => {
        if (exerciseData?.timeOut) {
            resetCountdown(exerciseData.timeOut * 60);
        }
    }, [exerciseData?.timeOut, resetCountdown]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleOptionChange = (questionId: string, optionId: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    };

    const handleSubmit = async () => {
        const payload = {
            studentId: me?.id,
            exerciseId: id,
            answers: Object.entries(answers).map(([questionId, optionId]) => ({
                questionId,
                optionId
            }))
        };

        const response = await answersApi.handleCreate(payload);

        if (response?.result) {
            navigate("/student/result");
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ padding: "20px" }}>
            <div className="flex justify-between items-start">
                <div>
                    <Title level={2}>{exerciseData?.name}</Title>
                    <Text>{exerciseData?.description}</Text>
                </div>
                <div className="text-lg font-bold text-red-500">
                    {formatTime(time)}
                </div>
            </div>
            <div style={{ marginTop: "20px" }}>
                {exerciseData?.quiz?.questions.map((question: any, index: number) => (
                    <Card
                        key={question.id}
                        title={`Câu ${index+1}: ${question.content}`}
                        style={{ marginBottom: "20px" }}
                    >
                        <Radio.Group
                            onChange={(e) =>
                                handleOptionChange(question.id, e.target.value)
                            }
                            value={answers[question.id]}
                        >
                            <Space direction="vertical">
                                {question.options.map((option: any) => (
                                    <Radio
                                        key={option.id}
                                        value={option.id}
                                    >
                                        {option.content}
                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>
                    </Card>
                ))}
            </div>
            <Button
                type="primary"
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== exerciseData?.quiz?.questions.length}
            >
                Submit Quiz
            </Button>
        </div>
    );
};

export default AssignmentDetail;
