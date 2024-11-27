import { LayoutDashboard, BarChart3, Users, FileText, Settings, Menu } from 'lucide-react';
import { SidebarNav } from './sidebar-nav';

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
      <SidebarNav items={menuItems} />
    </div>
  );
}