import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button, Row } from 'antd';
function SectionTitle({ title, count, isShowButton, buttonLabel, handleButton, className }) {
    return (_jsxs(Row, { justify: "space-between", className: `${className ? ` ${className}` : ''}`, children: [_jsxs("h2", { className: "text-[25px] text-[#214093] leading-[initial] font-bold", children: [title, "\u00A0", count && _jsxs("span", { className: "font-bold text-[#214093]", children: ["(", count > 0 ? count : 0, ")"] })] }), isShowButton && buttonLabel && handleButton && (_jsx(Button, { type: "primary", onClick: handleButton, children: buttonLabel }))] }));
}
export default SectionTitle;
