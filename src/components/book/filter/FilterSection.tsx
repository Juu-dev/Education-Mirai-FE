import React from "react";
import { Select } from "antd";

const { Option } = Select;

interface FilterOption {
    value: string;
    label: string;
}

interface Filter {
    label: string;
    key: string;
    options: FilterOption[];
}

interface FilterSectionProps {
    filters: Filter[];
    onFilterChange: (value: string, filterKey: string) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {
    return (
        <div className="filter-section p-4 mb-6 bg-white shadow-lg rounded-lg">
            <div className="grid grid-cols-3 gap-4">
                {filters.map((filter) => (
                    <Select
                        key={filter.key}
                        placeholder={filter.label}
                        style={{ width: "100%" }}
                        onChange={(value) => onFilterChange(value, filter.key)}
                    >
                        {filter.options.map((option) => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                ))}
            </div>
        </div>
    );
};
