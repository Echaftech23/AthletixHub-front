import React from 'react';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </header>
  );
}