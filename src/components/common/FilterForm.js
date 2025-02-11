import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DatePicker, Input } from 'antd';
import dayjs from 'dayjs';
const FilterForm = ({ total, page, searchKey, className }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const from = searchParams.get('from') || '';
    const to = searchParams.get('to') || '';
    const search = searchParams.get('search') || '';
    const [filterData, setFilterData] = useState({});
    const rangePresets = [
        { label: 'Today', value: [dayjs().add(0, 'd'), dayjs()] },
        { label: 'Yesterday', value: [dayjs().add(-1, 'd'), dayjs().add(-1, 'd')] },
        { label: '7 days', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: '14 days', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: '30 days', value: [dayjs().add(-30, 'd'), dayjs()] },
    ];
    const onSearch = (value) => {
        if (!value) {
            searchParams.delete('search');
            setSearchParams({
                ...Object.fromEntries(searchParams),
            });
            setFilterData((prev) => {
                const newFilterData = { ...prev };
                delete newFilterData.search;
                return newFilterData;
            });
        }
        else {
            setSearchParams({
                ...Object.fromEntries(searchParams),
                search: value || '',
            });
            setFilterData((prev) => ({ ...prev, search: value }));
        }
    };
    const onRangeChange = (_, dateStrings) => {
        if (!dateStrings[0] && !dateStrings[1]) {
            searchParams.delete('from');
            searchParams.delete('to');
            setSearchParams({
                ...Object.fromEntries(searchParams),
            });
            setFilterData((prev) => {
                const newFilterData = { ...prev };
                delete newFilterData.from;
                delete newFilterData.to;
                return newFilterData;
            });
        }
        else {
            setSearchParams({
                ...Object.fromEntries(searchParams),
                from: dateStrings[0] || '',
                to: dateStrings[1] || '',
            });
            setFilterData((prev) => ({ ...prev, from: dateStrings[0], to: dateStrings[1] }));
        }
    };
    useEffect(() => {
        searchKey(filterData);
    }, [filterData]);
    return (_jsxs("div", { className: `flex gap-3 items-center mt-6${className ? ` ${className}` : ''}`, children: [_jsx(Input.Search, { defaultValue: search, placeholder: "Search", onSearch: onSearch, className: "w-[300px]" }), _jsx(DatePicker.RangePicker, { popupClassName: "text-[12px]", presets: [...rangePresets], format: "YYYY-MM-DD", onChange: onRangeChange, value: [from ? dayjs(from) : undefined, to ? dayjs(to) : undefined] }), _jsxs("p", { children: ["Total:", ' ', _jsxs("span", { className: "font-semibold text-primary", children: [total, " ", page] })] })] }));
};
export default FilterForm;
