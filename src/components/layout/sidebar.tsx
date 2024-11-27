import React, { useState } from 'react';
import { LayoutDashboard, Calendar, Users, FileText, Settings, Menu } from 'lucide-react';
import { SidebarNav } from './sidebar-nav';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Calendar, label: 'Events' },
  { icon: Users, label: 'Particapants' },
  { icon: FileText, label: 'Documents' },
  { icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`h-screen bg-sidebar text-white p-4 flex flex-col transition-width duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex items-center gap-3 px-2 py-4">
        <button onClick={toggleSidebar}>
          <Menu className="h-6 w-6 mt-1 cursor-pointer" />
        </button>
        {isSidebarOpen && <span className="text-xl font-bold">ElaAdmin</span>}
      </div>
      <SidebarNav items={menuItems} isOpen={isSidebarOpen} />
    </div>
  );
}