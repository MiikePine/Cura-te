"use client"

import React from 'react';
import { Bell, Shield, Lock } from 'lucide-react';

interface SettingsFormProps {
  notificationSettings: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    marketingEmails: boolean;
    sessionReminders: boolean;
    newMessages: boolean;
  };
  securitySettings: {
    twoFactorAuth: boolean;
    loginNotifications: boolean;
    deviceHistory: boolean;
  };
  onNotificationChange: (key: string, value: boolean) => void;
  onSecurityChange: (key: string, value: boolean) => void;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  notificationSettings,
  securitySettings,
  onNotificationChange,
  onSecurityChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Notifications */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-[#4A6670] mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notification Settings
        </h3>
        <div className="space-y-4">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-[#4A6670] font-medium">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
                <p className="text-sm text-[#7C9A92]">
                  Receive notifications about {key.toLowerCase()}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => onNotificationChange(key, !value)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7C9A92]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7C9A92]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-[#4A6670] mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Security Settings
        </h3>
        <div className="space-y-4">
          {Object.entries(securitySettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-[#4A6670] font-medium">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
                <p className="text-sm text-[#7C9A92]">
                  Enable additional security for your account
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => onSecurityChange(key, !value)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7C9A92]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7C9A92]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Password Change */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-[#4A6670] mb-4 flex items-center">
          <Lock className="w-5 h-5 mr-2" />
          Change Password
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#4A6670] mb-2">Current Password</label>
            <input
              type="password"
              className="w-full p-2 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4A6670] mb-2">New Password</label>
            <input
              type="password"
              className="w-full p-2 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4A6670] mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full p-2 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92]"
            />
          </div>
          <button className="bg-[#7C9A92] text-white px-4 py-2 rounded-lg hover:bg-[#6A8B83] transition-colors">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};