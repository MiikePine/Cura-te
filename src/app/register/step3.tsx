"use client"

import React from 'react';
import { Clock, DollarSign, Plus, Minus } from 'lucide-react';

export const Step3Content = ({ formData, setFormData }) => {
  const addSessionType = () => {
    setFormData({
      ...formData,
      session_types: [
        ...formData.session_types,
        { name: '', duration: '', price: '', description: '' }
      ]
    });
  };

  const removeSessionType = (index: number) => {
    const newSessionTypes = formData.session_types.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      session_types: newSessionTypes
    });
  };

  const updateSessionType = (index: number, field: string, value: string) => {
    const newSessionTypes = formData.session_types.map((session, i) => {
      if (i === index) {
        return { ...session, [field]: value };
      }
      return session;
    });
    setFormData({
      ...formData,
      session_types: newSessionTypes
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#4A6670] mb-8">Session Information</h2>
      
      {formData.session_types.map((session, index) => (
        <div key={index} className="bg-[#F8F5F1] p-6 rounded-lg space-y-4 relative">
          {formData.session_types.length > 1 && (
            <button
              onClick={() => removeSessionType(index)}
              className="absolute top-4 right-4 text-[#7C9A92] hover:text-[#4A6670]"
            >
              <Minus className="h-5 w-5" />
            </button>
          )}
          
          <div>
            <label className="block text-[#4A6670] mb-2">Session Name</label>
            <input
              type="text"
              value={session.name}
              onChange={(e) => updateSessionType(index, 'name', e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
              placeholder="e.g., Initial Consultation, Energy Healing Session"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#4A6670] mb-2">Duration</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-5 w-5 text-[#7C9A92]" />
                <input
                  type="text"
                  value={session.duration}
                  onChange={(e) => updateSessionType(index, 'duration', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
                  placeholder="e.g., 60 minutes"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#4A6670] mb-2">Price</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-[#7C9A92]" />
                <input
                  type="text"
                  value={session.price}
                  onChange={(e) => updateSessionType(index, 'price', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
                  placeholder="e.g., $120"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#4A6670] mb-2">Description</label>
            <textarea
              value={session.description}
              onChange={(e) => updateSessionType(index, 'description', e.target.value)}
              className="w-full p-4 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#7C9A92] min-h-[100px]"
              placeholder="Describe what this session includes..."
            />
          </div>
        </div>
      ))}

      <button
        onClick={addSessionType}
        className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-[#7C9A92] rounded-lg text-[#7C9A92] hover:bg-[#F8F5F1] transition-colors"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Another Session Type
      </button>
    </div>
  );
};