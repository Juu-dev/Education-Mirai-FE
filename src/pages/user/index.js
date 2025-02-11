import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router';
import { Sidebar, CommonHeader } from '../../components/layout';
const UserPage = () => {
    return (_jsxs("div", { className: 'flex w-full', children: [_jsx(Sidebar, {}), _jsxs("div", { className: 'w-full flex flex-col', children: [_jsx(CommonHeader, {}), _jsx(Outlet, {})] })] }));
};
export default UserPage;
