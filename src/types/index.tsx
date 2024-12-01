import { ReactNode } from "react";

// src/types/index.ts
export interface User {
    id: string;
    username: string;
    phone: string;
    email: string;
}
  
export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    username: string;
    phone: string;
    email: string;
    password: string;
}

export type OrderStatus = 'ready' | 'in-progress' | 'completed';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerInitials: string;
  status: OrderStatus;
  time: string;
  items: OrderItem[];
  total: number;
  additionalItems: number;
}

export interface EventDto {
  _id: ReactNode;
  title: string;
  description: string;
  date: string;
  time: string;
  address: {
    venue: string;
    location: string;
  };
  price: number;
  capacity: number;
  imageUrl: string;
}