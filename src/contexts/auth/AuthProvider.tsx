import React, { useState, useEffect } from 'react';
import axiosInstance from '@/api/config/axios';
import { AuthContext } from './AuthContext';
import { User, RegisterDto, LoginDto } from '@/types';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load token and user from local storage on app start
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('authUser');
    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const register = async (data: RegisterDto) => {
    try {
      await axiosInstance.post('/auth/register', data);
      console.log('Registration successful!');
    } catch (error) { console.error('Registration failed:', error); throw error; }
  };

  const login = async (data: LoginDto) => {
    try {
      const response = await axiosInstance.post('/auth/login', data);
      const { access_token, user } = response.data;

      setToken(access_token);
      setUser(user);

      localStorage.setItem('authToken', access_token);
      localStorage.setItem('authUser', JSON.stringify(response.data.user));

    } catch (error) { console.error('Login failed:', error); throw error; }
  };

  const logout = () => {
    try {
      setToken(null);
      setUser(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');

    } catch (error) { console.error('Logout failed:', error); throw error; }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};