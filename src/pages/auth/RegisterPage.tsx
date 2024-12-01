import React from 'react';
import RegisterForm  from '@/components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div>      
      <div className="flex justify-center w-full items-center h-screen">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;