// src/pages/DashboardPage.tsx
import React, { useContext } from 'react';
import { AuthContext } from '@/contexts/auth/AuthContext';
import Navbar  from '@/components/ui/Navbar';

export const DashboardPage: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.username}!</h1>
        <p>This is the dashboard page.</p>
      </div>
    </div>
  );
};