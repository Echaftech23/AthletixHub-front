import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm />
    </div>
  );
};

export default LoginPage;