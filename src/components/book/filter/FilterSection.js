import { jsx as _jsx } from "react/jsx-runtime";
import { Select } from "antd";
const { Option } = Select;
export const FilterSection = ({ filters, onFilterChange }) => {
    return (_jsx("div", { className: "filter-section p-4 mb-6 bg-white shadow-lg rounded-lg", children: _jsx("div", { className: "grid grid-cols-3 gap-4", children: filters.map((filter) => (_jsx(Select, { placeholder: filter.label, style: { width: "100%" }, onChange: (value) => onFilterChange(value, filter.key), children: filter.options.map((option) => (_jsx(Option, { value: option.value, children: option.label }, option.value))) }, filter.key))) }) }));
};
