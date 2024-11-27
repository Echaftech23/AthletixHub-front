import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import { OrderStatus } from '../types';

interface StatusBadgeProps {
  status: OrderStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'ready':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'ready':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-sm font-medium ${getStatusStyles()}`}>
      {getStatusIcon()}
      <span className="capitalize">{status.replace('-', ' ')}</span>
    </div>
  );
}

export default StatusBadge;