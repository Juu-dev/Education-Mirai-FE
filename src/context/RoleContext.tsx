import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Role } from '../constants/roles/routes';

type RoleContextType = {
  role: Role | null;
  setRole: (role: Role) => void;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role | null>(() => {
    const savedRole = localStorage.getItem('role');
    return savedRole ? (savedRole as Role) : null;
  });

  // Save the role to localStorage whenever it changes
  useEffect(() => {
    if (role) {
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('role');
    }
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) throw new Error('useRole must be used within a RoleProvider');
  return context;
};
