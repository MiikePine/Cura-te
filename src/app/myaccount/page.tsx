'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from '@terapias/db/supabase';
import { AccountOverview } from './components/AccountOverview';
import { NavigationTabs } from './components/NavigationTabs';
// import { SettingsForm } from './components/SettingsForm';
import { Tables, TablesUpdate } from '../../types/database.types';

type Seller = Tables<'seller'>;
type SellerUpdate = TablesUpdate<'seller'>;

interface User {
  id: string;
  email?: string;
}

const MyAccount: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Seller | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // const [notificationSettings, ] = useState({
  //   emailNotifications: true,
  //   smsNotifications: false,
  //   marketingEmails: true,
  //   sessionReminders: true,
  //   newMessages: true,
  // });

  // const [securitySettings, ] = useState({
  //   twoFactorAuth: false,
  //   loginNotifications: true,
  //   deviceHistory: true,
  // });

  const [formData, setFormData] = useState<SellerUpdate>({
    userUID: '', // Obrigatório em Seller, então deve ser string
    name: null, // Alterado para null para alinhar com SellerUpdate
    tittle: null,
    description: null,
    location: null,
    email: null,
    phone: null,
    branch: null,
    image: null,
    specialties: null, // Alterado para null para ser consistente
    availability: null,
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
            userUID: data.userUID || '', // userUID é obrigatório
            name: data.name ?? null, // Usa ?? para lidar com null/undefined
            tittle: data.tittle ?? null,
            description: data.description ?? null,
            location: data.location ?? null,
            email: data.email || session.user.email || null,
            phone: data.phone ?? null,
            branch: data.branch ?? null,
            image: data.image ?? null,
            specialties: data.specialties ?? null,
            availability: data.availability ?? null,
          });
        }
      }
    };

    getUserProfile();
  }, []);



  const handleSaveProfile = async () => {
    if (!user) {
      console.error('User is not available');
      return;
    }
  
    try {
      const { error } = await supabase
        .from('seller')
        .update(formData)
        .eq('userUID', user.id);
  
      if (error) throw error;
  
      setIsEditing(false);
      setProfile((prevProfile) => {
        if (!prevProfile) return null; // Se não havia profile antes, não criamos um novo
        return {
          ...prevProfile,
          ...formData,
          userUID: prevProfile.userUID, // Garante que userUID (obrigatório) não seja sobrescrito
          name: formData.name ?? prevProfile.name, // Preserva ou atualiza
          tittle: formData.tittle ?? prevProfile.tittle,
          description: formData.description ?? prevProfile.description,
          location: formData.location ?? prevProfile.location,
          email: formData.email ?? prevProfile.email,
          phone: formData.phone ?? prevProfile.phone,
          branch: formData.branch ?? prevProfile.branch,
          image: formData.image ?? prevProfile.image,
          specialties: formData.specialties ?? prevProfile.specialties,
          availability: formData.availability ?? prevProfile.availability,
        };
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
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
        {/* {activeTab === 'settings' && (
          <SettingsForm
            notificationSettings={notificationSettings}
            securitySettings={securitySettings}
           
          />
        )} */}
      </div>
    </div>
  );
};

export default MyAccount;