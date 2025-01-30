import React, { createContext, useContext, useState } from 'react';
import { AdminState } from '../types';

const AdminContext = createContext<{
  admin: AdminState;
  setAdmin: (admin: AdminState) => void;
}>({
  admin: { isAdmin: false, password: '' },
  setAdmin: () => {},
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<AdminState>({ isAdmin: false, password: 'admin123' });

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);