import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Result, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
const { Title, Text } = Typography;
export const AssignmentResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Nhận dữ liệu từ location.state
    const { mark, totalRightQuestion, totalQuestions } = location.state || {};
    if (!location.state) {
        return (_jsx(Result, { status: "error", title: "Kh\u00F4ng c\u00F3 d\u1EEF li\u1EC7u \u0111\u1EC3 hi\u1EC3n th\u1ECB k\u1EBFt qu\u1EA3!", extra: _jsx(Button, { type: "primary", onClick: () => navigate("/"), children: "Quay l\u1EA1i trang ch\u1EE7" }) }));
    }
    return (_jsx(Result, { status: "success", title: "B\u1EA1n \u0111\u00E3 ho\u00E0n th\u00E0nh b\u00E0i t\u1EADp!", subTitle: _jsxs("div", { children: [_jsx(Title, { level: 5, children: "K\u1EBFt qu\u1EA3 c\u1EE7a b\u1EA1n:" }), _jsx(Text, { strong: true, children: "\u0110i\u1EC3m: " }), _jsxs(Text, { children: [mark.toFixed(2), " (", totalRightQuestion, "/", totalQuestions, " c\u00E2u \u0111\u00FAng)"] })] }), extra: [
            _jsx(Button, { type: "primary", onClick: () => navigate("/student/assignments"), children: "Quay l\u1EA1i danh s\u00E1ch b\u00E0i t\u1EADp" }, "back"),
            _jsx(Button, { onClick: () => navigate(0), children: "L\u00E0m l\u1EA1i b\u00E0i t\u1EADp" }, "retry"),
        ] }));
};
export default AssignmentResult;
