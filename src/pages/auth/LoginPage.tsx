import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;