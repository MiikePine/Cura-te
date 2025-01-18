"use client"

import React, { useState, useEffect } from 'react';
import { supabase } from '@terapias/db/supabase';
import { AccountOverview } from './components/AccountOverview';
import { NavigationTabs } from './components/NavigationTabs';
import { ProfileForm } from './components/ProfileForm';
import { SettingsForm } from './components/SettingsForm';
import { useRouter } from "next/navigation";
import { ProfileFormData } from './types';

const MyAccount: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    sessionReminders: true,
    newMessages: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    deviceHistory: true,
  });

  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    title: '',
    bio: '',
    location: '',
    email: '',
    phone: '',
    website: '',
    socialMedia: {
      instagram: '',
      facebook: '',
      linkedin: '',
    },
    specialties: [],
    languages: [],
    education: [],
    certifications: [],
    hourlyRate: 0,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
  });

  useEffect(() => {
    const getUserProfile = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error fetching session:", sessionError);
        return;
      }
  
      if (session) {
        setUser(session.user);
  
        const { data, error } = await supabase
          .from('seller')
          .select('*')
          .eq('userUID', session.user.id)
          .single();
          
        if (error) {
          console.error("Error fetching user profile:", error);
        } else if (data) {
          setProfile(data);
          setFormData({
            name: data.name || '',
            title: data.title || '',
            bio: data.bio || '',
            location: data.location || '',
            email: data.email || session.user.email,
            phone: data.phone || '',
            website: data.website || '',
            socialMedia: data.socialMedia || {
              instagram: '',
              facebook: '',
              linkedin: '',
            },
            specialties: data.specialties || [],
            languages: data.languages || [],
            education: data.education || [],
            certifications: data.certifications || [],
            hourlyRate: data.hourlyRate || 0,
            availability: data.availability || {
              monday: true,
              tuesday: true,
              wednesday: true,
              thursday: true,
              friday: true,
              saturday: false,
              sunday: false,
            },
          });
        }
      }
    };
  
    getUserProfile();
  }, []);

  const handleSaveProfile = async () => {
    try {
      const { error } = await supabase
        .from('seller')
        .update(formData)
        .eq('userUID', user.id);

      if (error) throw error;
      
      setIsEditing(false);
      setProfile({ ...profile, ...formData });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSecurityChange = (key: string, value: boolean) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8F5F1] pb-12">
      <div className="relative bg-gradient-to-br from-[#7C9A92] to-[#4A6670] h-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        <AccountOverview
          profile={profile}
          user={user}
          isEditing={isEditing}
          onEditClick={() => setIsEditing(true)}
          onSaveClick={handleSaveProfile}
        />
        <NavigationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        {activeTab === 'profile' && (
          <ProfileForm
            formData={formData}
            isEditing={isEditing}
            onFormChange={setFormData}
          />
        )}
        {activeTab === 'settings' && (
          <SettingsForm
            notificationSettings={notificationSettings}
            securitySettings={securitySettings}
            onNotificationChange={handleNotificationChange}
            onSecurityChange={handleSecurityChange}
          />
        )}
      </div>
    </div>
  );
};

export default MyAccount;