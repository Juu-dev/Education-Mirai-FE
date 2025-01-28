// src/components/ProtectedRoute
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  fallback?: React.ReactNode;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
   isAllowed,
   redirectPath = '/',
   fallback,
   children, }) => {
  if (!isAllowed) return fallback ?? <Navigate to={redirectPath} replace />;

  return children ?? <Outlet />;
};

export default ProtectedRoute;
