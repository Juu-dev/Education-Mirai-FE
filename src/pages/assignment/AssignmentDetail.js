import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchApi from "../../hooks/useFetchApi";
import { Button, Card, Radio, Space, Typography } from "antd";
import { useCountdown } from "../../hooks/useCountdown";
import useAuth from "../../hooks/useAuth";
import useCreateApi from "../../hooks/useCreateApi";
import { formatTime } from "../../helpers/date";
const { Title, Text } = Typography;
export const AssignmentDetail = () => {
    const { me } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: exerciseData, loading } = useFetchApi({
        url: `/exercises/${id}`,
        auth: true,
    });
    const answersApi = useCreateApi({
        url: "/answers",
        successMsg: "Gửi đáp án thành công!",
        errorMsg: "Gửi đáp án thất bại, vui lòng thử lại.",
        fullResp: true,
    });
    const [time, resetCountdown] = useCountdown(30);
    const [answers, setAnswers] = useState({});
    useEffect(() => {
        if (exerciseData?.timeOut) {
            resetCountdown(exerciseData.timeOut * 60);
        }
    }, [exerciseData?.timeOut, resetCountdown]);
    useEffect(() => {
        if (time === 0 && exerciseData) {
            handleSubmit();
        }
    }, [time]);
    const handleOptionChange = (questionId, optionId) => {
        setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    };
    const handleSubmit = async () => {
        const payload = {
            studentId: me?.id,
            exerciseId: id,
            answers: Object.entries(answers).map(([questionId, optionId]) => ({
                questionId,
                optionId,
            })),
        };
        const response = await answersApi.handleCreate(payload);
        if (response?.result) {
            navigate("/student/result", {
                state: {
                    mark: response?.result.mark,
                    totalRightQuestion: (response?.result.mark / 10) * exerciseData?.quiz?.questions.length,
                    totalQuestions: exerciseData?.quiz?.questions.length,
                },
            });
        }
    };
    return (_jsxs("div", { style: { padding: "20px" }, children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx(Title, { level: 2, children: exerciseData?.name }), _jsx(Text, { children: exerciseData?.description })] }), _jsx("div", { className: "text-lg font-bold text-red-500", children: formatTime(time) })] }), _jsx("div", { style: { marginTop: "20px" }, children: exerciseData?.quiz?.questions.map((question, index) => (_jsx(Card, { title: `Câu ${index + 1}: ${question.content}`, style: { marginBottom: "20px" }, children: _jsx(Radio.Group, { onChange: (e) => handleOptionChange(question.id, e.target.value), value: answers[question.id], children: _jsx(Space, { direction: "vertical", children: question.options.map((option) => (_jsx(Radio, { value: option.id, children: option.content }, option.id))) }) }) }, question.id))) }), _jsx(Button, { type: "primary", onClick: handleSubmit, loading: loading, disabled: Object.keys(answers).length !== exerciseData?.quiz?.questions.length || loading, children: "Submit Quiz" })] }));
};
export default AssignmentDetail;
