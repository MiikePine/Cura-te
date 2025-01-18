"use client"

import React from 'react';
import { User, Calendar, Settings, CreditCard } from 'lucide-react';

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'billing', icon: CreditCard, label: 'Billing' },
  ];

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="border-b border-[#E8DED1]">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm ${
                activeTab === id
                  ? 'border-[#7C9A92] text-[#7C9A92]'
                  : 'border-transparent text-[#4A6670] hover:text-[#7C9A92] hover:border-[#7C9A92]'
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};