/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
  active?: boolean;
}

interface SidebarNavProps {
  items: NavItem[];
  isOpen: boolean;
  activeItem: string;
  onItemClick: (path: string) => void;
}

export function SidebarNav({ items, isOpen, activeItem, onItemClick }: SidebarNavProps) {
  const location = useLocation();

  return (
    <nav className="mt-8">
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              to={item.path}
              onClick={() => onItemClick(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {isOpen && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}