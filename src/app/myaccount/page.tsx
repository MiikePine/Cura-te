"use client"

import React, { useState } from 'react';
import {
  User, Mail, MapPin, Globe, Book, Clock,
  Calendar, Settings, CreditCard, Bell,
  Camera, Edit2, Save, X, LogOut
} from 'lucide-react';
import Image from 'next/image';


interface UserProfile extends RegistrationData {
  memberSince: string;
  totalSessions: number;
  upcomingSessions: number;
  accountStatus: 'active' | 'pending' | 'inactive';
}

const mockUserProfile: UserProfile = {
  email: 'healer@example.com',
  name: 'Sarah Johnson',
  title: 'Shamanic Healer & Reiki Master',
  location: 'Vancouver, Canada',
  languages: ['English', 'French'],
  image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80',
  cover_image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&q=80',
  specialties: ['Energy Healing', 'Chakra Balancing', 'Spiritual Counseling'],
  certifications: ['Reiki Master Level', 'Shamanic Practitioner Certification'],
  experience: '10+ years',
  about: 'Dedicated healer with a passion for helping others find their path to wellness...',
  approach: 'Holistic healing approach combining traditional and modern techniques...',
  session_types: [
    {
      name: 'Initial Consultation',
      duration: '60',
      price: '120',
      description: 'Complete energy assessment and healing plan'
    }
  ],
  availability: {
    timezone: 'PST',
    hours: [
      { day: 'Monday', time: '9:00 AM - 5:00 PM' },
      { day: 'Wednesday', time: '9:00 AM - 5:00 PM' },
      { day: 'Friday', time: '9:00 AM - 3:00 PM' }
    ]
  },
  memberSince: '2023-01-15',
  totalSessions: 142,
  upcomingSessions: 3,
  accountStatus: 'active'
};

export default function MyAccount() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);

  const renderAccountOverview = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80' }
              alt={"nome user"}
              className="w-24 h-24 rounded-full object-cover"
              width={160}
              height={160}
            />
            <button className="absolute bottom-0 right-0 bg-[#7C9A92] p-2 rounded-full text-white">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#4A6670]">nome</h2>
            <p className="text-[#7C9A92]">titulo</p>
            <div className="flex items-center mt-2 text-sm text-[#4A6670]">
              <MapPin className="w-4 h-4 mr-1" />
              localizacao
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center px-4 py-2 bg-[#7C9A92] text-white rounded-lg hover:bg-[#6A8B83] transition-colors"
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-[#F8F5F1] p-4 rounded-lg">
          <div className="text-[#4A6670]">
            <p className="text-sm">Member Since</p>
            <p className="text-xl font-semibold">{new Date(profile.memberSince).toLocaleDateString('en-US')}
            </p>
          </div>
        </div>
        <div className="bg-[#F8F5F1] p-4 rounded-lg">
          <div className="text-[#4A6670]">
            <p className="text-sm">Total Sessions</p>
            <p className="text-xl font-semibold">{profile.totalSessions}</p>
          </div>
        </div>
        <div className="bg-[#F8F5F1] p-4 rounded-lg">
          <div className="text-[#4A6670]">
            <p className="text-sm">Upcoming Sessions</p>
            <p className="text-xl font-semibold">{profile.upcomingSessions}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabs = () => (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="border-b border-[#E8DED1]">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {[
            { id: 'profile', icon: User, label: 'Profile' },
            { id: 'schedule', icon: Calendar, label: 'Schedule' },
            { id: 'settings', icon: Settings, label: 'Settings' },
            { id: 'billing', icon: CreditCard, label: 'Billing' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
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

  const renderProfileContent = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-[#4A6670] mb-4">About Me</h3>
          <p className="text-[#4A6670]">sobre</p>
        </div>

        {/* <div>
          <h3 className="text-lg font-medium text-[#4A6670] mb-4">Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {profile.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#F8F5F1] text-[#7C9A92] rounded-full text-sm"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-[#4A6670] mb-4">Certifications</h3>
          <div className="space-y-2">
            {profile.certifications.map((cert, index) => (
              <div key={index} className="flex items-center text-[#4A6670]">
                <Book className="w-4 h-4 mr-2 text-[#7C9A92]" />
                {cert}
              </div>
            ))}
          </div>
        </div> */}

        {/* <div>
          <h3 className="text-lg font-medium text-[#4A6670] mb-4">Services</h3>
          <div className="space-y-4">
            {profile.session_types.map((session, index) => (
              <div key={index} className="bg-[#F8F5F1] p-4 rounded-lg">
                <h4 className="font-medium text-[#4A6670]">{session.name}</h4>
                <div className="flex items-center mt-2 text-sm text-[#7C9A92]">
                  <Clock className="w-4 h-4 mr-1" />
                  {session.duration} minutes
                  <span className="mx-2">•</span>
                  ${session.price}
                </div>
                <p className="mt-2 text-sm text-[#4A6670]">{session.description}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* <div>
          <h3 className="text-lg font-medium text-[#4A6670] mb-4">Availability</h3>
          <div className="space-y-2">
            {profile.availability.hours.map((schedule, index) => (
              <div key={index} className="flex items-center text-[#4A6670]">
                <Calendar className="w-4 h-4 mr-2 text-[#7C9A92]" />
                <span className="font-medium">{schedule.day}:</span>
                <span className="ml-2">{schedule.time}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F5F1] pb-12">
      <div className="relative bg-gradient-to-br from-[#7C9A92] to-[#4A6670] h-48">
        <div className="absolute inset-0">
          <Image
            src= {'https://via.placeholder.com/1920x400'}
            alt="Cover"
            className="w-full h-full object-cover opacity-10"
            width={160}
            height={160}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        {renderAccountOverview()}
        {renderTabs()}
        {activeTab === 'profile' && renderProfileContent()}
      </div>
    </div>
  );
}