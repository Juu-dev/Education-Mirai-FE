import { Button, Row } from 'antd';
import React from 'react';

type SectionTitleProps = {
  title: string;
  count?: number;
  isShowButton?: boolean;
  buttonLabel?: string;
  handleButton?: () => void;
  className?: string;
};

function SectionTitle({ title, count, isShowButton, buttonLabel, handleButton, className }: SectionTitleProps) {
  return (
    <Row justify="space-between" className={`${className ? ` ${className}` : ''}`}>
      <h2 className="text-[25px] text-[#214093] leading-[initial] font-bold">
        {title}&nbsp;
        {count && <span className="font-bold text-[#214093]">({count > 0 ? count : 0})</span>}
      </h2>
      {isShowButton && buttonLabel && handleButton && (
        <Button type="primary" onClick={handleButton}>
          {buttonLabel}
        </Button>
      )}
    </Row>
  );
}

export default SectionTitle;
