"use client"

import React from 'react';
import { Book, Award, Clock } from 'lucide-react';


export const Step2Content = ({ formData, setFormData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#4A6670] mb-8">Professional Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-[#4A6670] mb-2">Specialties</label>
          <div className="relative">
            <Book className="absolute left-3 top-3 h-5 w-5 text-[#7C9A92]" />
            <input
              type="text"
              placeholder="Add specialties (comma separated)"
              className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
              value={formData.specialties.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                specialties: e.target.value.split(',').map(specialty => specialty.trim())
              })}
            />
          </div>
        </div>

        <div>
          <label className="block text-[#4A6670] mb-2">Certifications</label>
          <div className="relative">
            <Award className="absolute left-3 top-3 h-5 w-5 text-[#7C9A92]" />
            <input
              type="text"
              placeholder="Add certifications (comma separated)"
              className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
              value={formData.certifications.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                certifications: e.target.value.split(',').map(cert => cert.trim())
              })}
            />
          </div>
        </div>

        <div>
          <label className="block text-[#4A6670] mb-2">Years of Experience</label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 h-5 w-5 text-[#7C9A92]" />
            <input
              type="text"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
              placeholder="e.g., 5+ years"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#4A6670] mb-2">About You</label>
          <textarea
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            className="w-full p-4 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#7C9A92] min-h-[150px]"
            placeholder="Tell us about your journey and experience..."
          />
        </div>

        <div>
          <label className="block text-[#4A6670] mb-2">Your Approach</label>
          <textarea
            value={formData.approach}
            onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
            className="w-full p-4 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#7C9A92] min-h-[150px]"
            placeholder="Describe your healing approach and methodology..."
          />
        </div>
      </div>
    </div>
  );
};