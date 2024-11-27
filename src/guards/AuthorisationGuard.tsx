import React, { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '@/contexts/auth/AuthContext';

interface AuthorisationGuardProps {
  children: React.ReactNode;
}

const AuthorisationGuard: React.FC<AuthorisationGuardProps> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { userId } = useParams<{ userId: string }>();

  if (!user) { return <Navigate to="/login" replace /> }
  
  if (user.id !== userId) { return <Navigate to="/unauthorized" replace /> }

  return <>{children}</>;
};

export default AuthorisationGuard;