"use client"

import React from 'react';
import Image from 'next/image';
import { Camera, Edit2, Save, MapPin, Star, Calendar, Users, Award, Clock, Verified, Mail, Phone, Globe } from 'lucide-react';

interface AccountOverviewProps {
  profile: any;
  user: any;
  isEditing: boolean;
  onEditClick: () => void;
  onSaveClick: () => void;
}

export const AccountOverview: React.FC<AccountOverviewProps> = ({
  profile,
  user,
  isEditing,
  onEditClick,
  onSaveClick,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C9A92] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          {/* Left Section: Profile Image and Basic Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Image Section */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-[#7C9A92]/20 transition-all duration-300 group-hover:ring-[#7C9A92]/40">
                <Image
                  src={profile?.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'}
                  alt={profile?.name || "User Profile"}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  width={200}
                  height={200}
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-[#7C9A92] p-3 rounded-full text-white hover:bg-[#6A8B83] transition-all duration-300 shadow-lg transform hover:scale-105 hover:rotate-12">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            {/* Basic Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-3xl font-bold text-[#4A6670]">
                  {profile?.name || user?.email}
                </h2>
                {profile?.verified && (
                  <Verified className="w-6 h-6 text-[#7C9A92]" />
                )}
              </div>
              <p className="text-lg text-[#7C9A92] font-medium mb-2">
                {profile?.title || 'Holistic Practitioner'}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-[#4A6670]/80">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile?.location || 'Location not set'}
                </div>
                {profile?.email && (
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {profile.email}
                  </div>
                )}
                {profile?.phone && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {profile.phone}
                  </div>
                )}
                {profile?.website && (
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-1" />
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" 
                       className="text-[#7C9A92] hover:text-[#6A8B83] transition-colors">
                      Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section: Action Button */}
          <button
            onClick={isEditing ? onSaveClick : onEditClick}
            className="flex items-center px-6 py-3 bg-[#7C9A92] text-white rounded-lg hover:bg-[#6A8B83] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {isEditing ? (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="w-5 h-5 mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {/* Member Since */}
          <div className="bg-[#F8F5F1] p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:bg-[#F8F5F1]/80">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Calendar className="w-6 h-6 text-[#7C9A92]" />
              </div>
              <div>
                <p className="text-sm text-[#7C9A92] font-medium">Member Since</p>
                <p className="text-lg font-semibold text-[#4A6670]">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  }) : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Total Sessions */}
          <div className="bg-[#F8F5F1] p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:bg-[#F8F5F1]/80">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Users className="w-6 h-6 text-[#7C9A92]" />
              </div>
              <div>
                <p className="text-sm text-[#7C9A92] font-medium">Total Sessions</p>
                <p className="text-lg font-semibold text-[#4A6670]">
                  {profile?.totalSessions || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="bg-[#F8F5F1] p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:bg-[#F8F5F1]/80">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Award className="w-6 h-6 text-[#7C9A92]" />
              </div>
              <div>
                <p className="text-sm text-[#7C9A92] font-medium">Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-[#4A6670]">
                    {profile?.rating?.toFixed(1) || '0.0'}
                  </p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (profile?.rating || 0)
                            ? 'text-[#E6B17E] fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-[#F8F5F1] p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:bg-[#F8F5F1]/80">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Clock className="w-6 h-6 text-[#7C9A92]" />
              </div>
              <div>
                <p className="text-sm text-[#7C9A92] font-medium">Response Time</p>
                <p className="text-lg font-semibold text-[#4A6670]">
                  {profile?.responseTime || '< 24h'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tags/Specialties */}
        {profile?.specialties && profile.specialties.length > 0 && (
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {profile.specialties.map((specialty: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#7C9A92]/10 text-[#7C9A92] rounded-full text-sm font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};