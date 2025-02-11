import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from 'react-router-dom';
const ProtectedRoute = ({ isAllowed, redirectPath = '/', fallback, children, }) => {
    if (!isAllowed)
        return fallback ?? _jsx(Navigate, { to: redirectPath, replace: true });
    return children ?? _jsx(Outlet, {});
};
export default ProtectedRoute;
