import React from 'react';
import { LayoutDashboard, BarChart3, Users, FileText, Settings, Menu } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Users, label: 'Customers' },
  { icon: FileText, label: 'Documents' },
  { icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  return (
    <div className="h-screen w-64 bg-sidebar text-white p-4 flex flex-col">
      <div className="flex items-center gap-2 px-2 py-4">
        <Menu className="h-6 w-6" />
        <span className="text-xl font-bold">ElaAdmin</span>
      </div>
      
      <nav className="mt-8">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-white/10'
                    : 'hover:bg-white/5'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}