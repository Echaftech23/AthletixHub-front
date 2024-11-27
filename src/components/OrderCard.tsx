import React from 'react';
import { Clock, CheckCircle2, Timer } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import StatusBadge from './StatusBadge';

interface OrderCardProps {
  order: Order;
}

function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-semibold">
              {order.customerInitials}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{order.customerName}</h3>
              <p className="text-sm text-gray-500">Order #{order.id}</p>
            </div>
          </div>
          <StatusBadge status={order.status} />
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span>{order.time}</span>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-4">
        <table className="w-full">
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className="text-sm">
                <td className="py-1 text-gray-700">{item.quantity}x</td>
                <td className="py-1 text-gray-900">{item.name}</td>
                <td className="py-1 text-right text-gray-900">${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {order.additionalItems > 0 && (
          <p className="text-sm text-gray-500 mt-2">+{order.additionalItems} more items</p>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <div className="text-gray-900 font-semibold">
          Total: ${order.total.toFixed(2)}
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
            See Details
          </button>
          <button className="px-4 py-2 text-sm bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 font-medium">
            Pay Bill
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;