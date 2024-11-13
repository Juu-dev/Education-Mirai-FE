// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Role } from '../../constants/roles/routes';

type ProtectedRouteProps = {
  allowedRole: Role;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRole }) => {
  const {me} = useAuth()
  const role = me?.role

  if (!role) {
    return <Navigate to="/login" />;
  }

  if (role && allowedRole !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
