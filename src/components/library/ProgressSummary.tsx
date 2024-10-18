import React from 'react';
import { Card } from 'antd';
import { Pie } from '@ant-design/plots';

const classData = [
  { type: '5A', value: 100 },
  { type: '5B', value: 80 },
  { type: '5C', value: 70 },
];

const ProgressSummary: React.FC = () => {
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
      formatter: (datum: any) => ({
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

  return (
    <Card
      title="Thống kê truy cập theo từng khối"
      extra={<a href="#">Xem báo cáo</a>}
      className="p-4"
    >
      <Pie {...config} />
    </Card>
  );
};

export default ProgressSummary;
