import React from 'react';
import { Card, CardContent } from './ui/card';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}

export function StatsCard({ icon, label, value, className = '' }: StatsCardProps) {
  return (
    <Card className={className}>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="p-3 rounded-full bg-blue-50">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <h3 className="text-2xl font-semibold">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}