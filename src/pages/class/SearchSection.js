import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Card, Input } from "antd";
import PageTitle from "../../components/common/SectionTitle";
const SearchSection = () => (_jsxs(Card, { className: "mb-4 shadow-md", children: [_jsx(PageTitle, { title: "L\u1EDBp", className: "mb-3" }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Input, { placeholder: "T\u00ECm ki\u1EBFm theo ID", className: "flex-1 border rounded-md", allowClear: true }), _jsx(Input, { placeholder: "T\u00ECm ki\u1EBFm theo t\u00EAn", className: "flex-1 border rounded-md", allowClear: true }), _jsx(Input, { placeholder: "T\u00ECm ki\u1EBFm theo s\u1ED1 \u0111i\u1EC7n tho\u1EA1i", className: "flex-1 border rounded-md", allowClear: true }), _jsxs(Button, { type: "primary", className: "h-10 w-32", children: [" ", "T\u00ECm ki\u1EBFm"] })] })] }));
export default SearchSection;
