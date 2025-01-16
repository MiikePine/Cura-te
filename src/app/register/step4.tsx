"use client"

import React from 'react';
import {  Globe, Plus, Minus } from 'lucide-react';

export const Step4Content = ({ formData, setFormData }) => {
  const addTimeSlot = () => {
    setFormData({
      ...formData,
      availability: {
        ...formData.availability,
        hours: [...formData.availability.hours, { day: '', time: '' }]
      }
    });
  };

  const removeTimeSlot = (index: number) => {
    const newHours = formData.availability.hours.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      availability: {
        ...formData.availability,
        hours: newHours
      }
    });
  };

  const updateTimeSlot = (index: number, field: string, value: string) => {
    const newHours = formData.availability.hours.map((hour, i) => {
      if (i === index) {
        return { ...hour, [field]: value };
      }
      return hour;
    });
    setFormData({
      ...formData,
      availability: {
        ...formData.availability,
        hours: newHours
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#4A6670] mb-8">Availability & Payment</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-[#4A6670] mb-2">Time Zone</label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 h-5 w-5 text-[#7C9A92]" />
            <input
              type="text"
              value={formData.availability.timezone}
              onChange={(e) => setFormData({
                ...formData,
                availability: {
                  ...formData.availability,
                  timezone: e.target.value
                }
              })}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
              placeholder="e.g., GMT-5, EST"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-[#4A6670] mb-2">Available Hours</label>
          {formData.availability.hours.map((hour, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1">
                <select
                  value={hour.day}
                  onChange={(e) => updateTimeSlot(index, 'day', e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-lg text-[#4A6670] border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
                >
                  <option value="">Select Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={hour.time}
                  onChange={(e) => updateTimeSlot(index, 'time', e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                />
              </div>
              {formData.availability.hours.length > 1 && (
                <button
                  onClick={() => removeTimeSlot(index)}
                  className="text-[#7C9A92] hover:text-[#4A6670]"
                >
                  <Minus className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addTimeSlot}
            className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-[#7C9A92] rounded-lg text-[#7C9A92] hover:bg-[#F8F5F1] transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Another Time Slot
          </button>
        </div>

        {/* Payment Information Section */}
        <div className="bg-[#F8F5F1] p-6 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold text-[#4A6670]">Payment Information</h3>
          <p className="text-[#7C9A92]">
            To receive payments from clients, you will need to set up your payment account.
          </p>
          <button
            className="w-full bg-[#7C9A92] text-white px-6 py-3 rounded-lg hover:bg-[#6A8B83] transition-colors flex items-center justify-center"
          >
            Connect with Stripe
          </button>
          <p className="text-sm text-[#7C9A92] text-center">
            Secure payment processing powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
};