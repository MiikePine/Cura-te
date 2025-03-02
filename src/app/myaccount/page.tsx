"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@terapias/db/supabase";
import { AccountOverview } from "./components/AccountOverview";
import { NavigationTabs } from "./components/NavigationTabs";
import { Tables, TablesUpdate } from "../../../supabase/database.types";

type Seller = Tables<"seller">;
type SellerUpdate = TablesUpdate<"seller">;

interface User {
  id: string;
  email?: string;
}

const MyAccount: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Seller | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [formData, setFormData] = useState<SellerUpdate>({
    useruid: "",
    name: null,
    title: null,
    bio: null,
    location: null,
    email: null,
    image: null,
    availability: null,
  });

  useEffect(() => {
    const getUserProfile = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Erro ao obter sessão:", sessionError);
        return;
      }

      if (session) {
        setUser(session.user);

        const { data, error } = await supabase
          .from("seller")
          .select("*")
          .eq("useruid", session.user.id) // Já está correto
          .single();

        if (error) {
          console.error("Erro ao consultar tabela seller:", error);
          return;
        }

        if (data) {
          setProfile(data);
          setFormData({
            useruid: data.useruid || "",
            name: data.name ?? null,
            title: data.title ?? null,
            bio: data.bio ?? null,
            location: data.location ?? null,
            email: data.email || session.user.email || null,
            image: data.image ?? null,
            availability: data.availability ?? null,
          });
        }
      }
    };

    getUserProfile();
  }, []);

  const handleSaveProfile = async () => {
    if (!user) {
      console.error("Utilizador não disponível");
      return;
    }

    try {
      const { error } = await supabase
        .from("seller")
        .update(formData)
        .eq("useruid", user.id); // Já está correto

      if (error) throw error;

      setIsEditing(false);
      setProfile((prevProfile) => {
        if (!prevProfile) return null;
        return {
          ...prevProfile,
          ...formData,
          useruid: prevProfile.useruid,
          name: formData.name ?? prevProfile.name,
          title: formData.title ?? prevProfile.title,
          bio: formData.bio ?? prevProfile.bio,
          location: formData.location ?? prevProfile.location,
          email: formData.email ?? prevProfile.email,
          image: formData.image ?? prevProfile.image,
          availability: formData.availability ?? prevProfile.availability,
        };
      });
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
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
      </div>
    </div>
  );
};

export default MyAccount;