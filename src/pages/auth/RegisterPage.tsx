// src/pages/RegisterPage.tsx
import React from 'react';
import RegisterForm  from '@/components/auth/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <div>      
      <div className="flex justify-center items-center h-screen">
        <RegisterForm />
      </div>
    </div>
  );
};