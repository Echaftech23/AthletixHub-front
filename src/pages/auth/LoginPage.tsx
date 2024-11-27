import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import Navbar  from '@/components/ui/Navbar';

export const LoginPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <LoginForm />
      </div>
    </div>
  );
};