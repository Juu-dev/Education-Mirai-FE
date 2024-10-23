import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DatePicker, Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import dayjs from 'dayjs';

interface FilterFormProps {
  total: number;
  page: string;
  searchKey: (data: any) => void;
  className?: string;
}

const FilterForm = ({ total, page, searchKey, className }: FilterFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const search = searchParams.get('search') || '';
  const [filterData, setFilterData] = useState<any>({});

  const rangePresets: any = [
    { label: 'Today', value: [dayjs().add(0, 'd'), dayjs()] },
    { label: 'Yesterday', value: [dayjs().add(-1, 'd'), dayjs().add(-1, 'd')] },
    { label: '7 days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: '14 days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: '30 days', value: [dayjs().add(-30, 'd'), dayjs()] },
  ];

  const onSearch: SearchProps['onSearch'] = (value) => {
    if (!value) {
      searchParams.delete('search');
      setSearchParams({
        ...Object.fromEntries(searchParams),
      });
      setFilterData((prev: any) => {
        const newFilterData = { ...prev };
        delete newFilterData.search;

        return newFilterData;
      });
    } else {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        search: value || '',
      });
      setFilterData((prev: any) => ({ ...prev, search: value }));
    }
  };

  const onRangeChange = (_: any, dateStrings: string[]) => {
    if (!dateStrings[0] && !dateStrings[1]) {
      searchParams.delete('from');
      searchParams.delete('to');
      setSearchParams({
        ...Object.fromEntries(searchParams),
      });
      setFilterData((prev: any) => {
        const newFilterData = { ...prev };
        delete newFilterData.from;
        delete newFilterData.to;

        return newFilterData;
      });
    } else {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        from: dateStrings[0] || '',
        to: dateStrings[1] || '',
      });
      setFilterData((prev: any) => ({ ...prev, from: dateStrings[0], to: dateStrings[1] }));
    }
  };

  useEffect(() => {
    searchKey(filterData);
  }, [filterData]);

  return (
    <div className={`flex gap-3 items-center mt-6${className ? ` ${className}` : ''}`}>
      <Input.Search defaultValue={search} placeholder="Search" onSearch={onSearch} className="w-[300px]" />
      <DatePicker.RangePicker
        popupClassName="text-[12px]"
        presets={[...rangePresets]}
        format="YYYY-MM-DD"
        onChange={onRangeChange}
        value={[from ? dayjs(from) : undefined, to ? dayjs(to) : undefined] as any}
      />
      <p>
        Total:{' '}
        <span className="font-semibold text-primary">
          {total} {page}
        </span>
      </p>
    </div>
  );
};

export default FilterForm;
