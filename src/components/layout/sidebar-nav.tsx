import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

interface SidebarNavProps {
  items: NavItem[];
  isOpen: boolean;
}

export function SidebarNav({ items, isOpen }: SidebarNavProps) {
  return (
    <nav className="mt-8">
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {isOpen && <span>{item.label}</span>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}