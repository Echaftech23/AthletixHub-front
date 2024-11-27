import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/auth/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) { return <Navigate to="/login" replace /> }
  
  return <>{children}</>;
};

export default AuthGuard;