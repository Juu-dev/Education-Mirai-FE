import { Breadcrumb } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '../../constants/paths';
import type { BreadCrumbItem } from '../../types';

const items: BreadCrumbItem[] = [
  {
    path: PATHS.HOME,
    title: 'Home',
  },
];

function itemRender(currentRoute: any, params: any, items: string | any[]) {
  const isLast = currentRoute?.title === items[items.length - 1]?.title;

  if (isLast) return <span className="font-semibold text-[16px]">{currentRoute.title}</span>;

  return (
    <Link to={`${currentRoute.path}`} className="font-semibold text-[16px]">
      {currentRoute.title}
    </Link>
  );
}

export default function BreadCrumb({ itemsProps = [] }: { itemsProps?: BreadCrumbItem[] }) {
  return (
    <Breadcrumb
      itemRender={itemRender}
      items={[...items, ...itemsProps]}
      separator={<span className="text-[16px]">/</span>}
    />
  );
}
