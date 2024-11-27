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