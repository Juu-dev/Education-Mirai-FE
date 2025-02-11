import { jsx as _jsx } from "react/jsx-runtime";
import { Card } from 'antd';
import { Pie } from '@ant-design/plots';
const classData = [
    { type: '5A', value: 100 },
    { type: '5B', value: 80 },
    { type: '5C', value: 70 },
];
const ProgressSummary = () => {
    const config = {
        appendPadding: 10,
        data: classData,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6, // Makes it a donut chart
        color: ['#6C63FF', '#FF6F61', '#48C774'], // Custom colors for each section
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{percentage}', // Show percentage inside each partition
            style: {
                textAlign: 'center',
                fontSize: 6,
            },
        },
        interactions: [{ type: 'element-active' }], // Adds hover interaction
        tooltip: {
            formatter: (datum) => ({
                name: datum.type,
                value: `${datum.value} cuốn`,
            }),
        },
        statistic: {
            title: {
                content: 'Tổng cộng',
            },
            content: {
                content: `${classData.reduce((acc, cur) => acc + cur.value, 0)} cuốn`,
            },
        },
    };
    return (_jsx(Card, { title: "Th\u1ED1ng k\u00EA truy c\u1EADp theo t\u1EEBng kh\u1ED1i", extra: _jsx("a", { href: "#", children: "Xem b\u00E1o c\u00E1o" }), className: "p-4", children: _jsx(Pie, { ...config }) }));
};
export default ProgressSummary;
