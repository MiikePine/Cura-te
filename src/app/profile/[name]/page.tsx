"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  MapPin, Star, Shield, Calendar, MessageCircle, 
  Clock, Globe, Languages, Video, Users, PhoneCall, 
  CheckCircle, Award, Feather 
} from 'lucide-react';
import { supabase } from '../../../db/supabase';
import Image from 'next/image';

interface Seller {
  id: number;
  name: string;
  branch: string;
  email: string;
  coverImage?: string;
  image?: string;
  title?: string;
  location?: string;
}

export default function SellerProfile() {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

   
  useEffect(() => {
    const fetchSeller = async () => {
      const name = params.name;

      if (!name) {
        console.error("No seller name in URL");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("seller")
          .select("*")
          .eq("name", name);

        if (error) {
          console.error("Error fetching seller:", error.message);
        } else if (data.length === 0) {
          console.warn("No seller found with the specified name.");
        } else {
          setSeller(data[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [params.name]);

  if (loading) return <div>Loading...</div>;
  if (!seller) return <div>No seller data found</div>;


  return (
    <>
    <div className="min-h-screen bg-[#F8F5F1]">
      {/* Cover Image */}
      <div className="relative h-64 md:h-96">
      
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 -mt-32 mb-8">
          <div className="relative">
          {seller.image ? (
  <Image
    src={seller.image}
    alt={seller.location || "Profile picture"}
    width={150}
    height={150}
    className="w-48 h-48 rounded-xl object-cover border-4 border-white shadow-lg"
  />
) : (
  <div className="w-48 h-48 rounded-xl bg-gray-200 flex items-center justify-center">
    <span>No Image</span>
  </div>
)}
              <div className="absolute top-4 right-4 bg-[#7C9A92]/90 text-white px-3 py-1 rounded-full text-sm flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                Verified
              </div>
          </div>
          <div className="flex-1 pt-4 md:pt-16">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-[#4A6670]">{seller.name}</h1>
                  <p className="text-[#7C9A92] text-lg">Mestre Reiki</p>
                  <div className="flex items-center mt-2">
                    <MapPin className="h-5 w-5 text-[#7C9A92]" />
                    <span className="ml-2 text-[#7C9A92]">{seller.location}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Star className="h-5 w-5 text-[#E6B17E]" />
                    <span className="ml-1 text-[#4A6670] font-medium">5</span>
                    <span className="ml-1 text-[#7C9A92]">120 reviews</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col md:items-end gap-4">
                  <div className="flex gap-4">
                    <button className="flex items-center justify-center px-6 py-3 border border-[#7C9A92] text-[#7C9A92] rounded-lg hover:bg-[#F8F5F1] transition-colors">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Message
                    </button>
                    <button className="flex items-center justify-center px-6 py-3 bg-[#7C9A92] text-white rounded-lg hover:bg-[#6A8B83] transition-colors">
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Session
                    </button>
                  </div>
                  <span className="text-[#7C9A92]">Next available: segunda-feira</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#4A6670] mb-6">About</h2>
              <p className="text-[#7C9A92] mb-8 leading-relaxed">eu sou mestre de reiko</p>
              <h3 className="text-xl font-semibold text-[#4A6670] mb-4">My Approach</h3>
              <p className="text-[#7C9A92] leading-relaxed">dsdsds</p>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#4A6670] mb-6">Specialties</h2>
              <div className="flex flex-wrap gap-3">
               
                  <span
                   
                    className="bg-[#F8F5F1] text-[#7C9A92] px-4 py-2 rounded-full text-sm flex items-center"
                  >
                    <Feather className="h-4 w-4 mr-2" />
                   {seller.branch}
                  </span>
              
              </div>
            </div>

            {/* Session Types */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#4A6670] mb-6">Session Types</h2>
              <div className="space-y-6">
           
                  <div className="border-b border-[#E8DED1] last:border-0 pb-6 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-[#4A6670]">{seller.name}</h3>
                        <p className="text-[#7C9A92]">3h</p>
                      </div>
                      <span className="text-lg font-semibold text-[#7C9A92]">400$</span>
                    </div>
                    <p className="text-[#7C9A92]">descricao </p>
                  </div>
               
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#4A6670] mb-6">Client Testimonials</h2>
              <div className="space-y-6">
                  <div  className="border-b border-[#E8DED1] last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-4">
                      {/* <img
                        src={}
                        alt={}
                        className="w-12 h-12 rounded-full object-cover"
                      /> */}
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-[#4A6670]">antonio</h3>
                          <span className="text-sm text-[#7C9A92]">03-05-2034</span>
                        </div>
                        <div className="flex mb-2">
                          
                        </div>
                        <p className="text-[#7C9A92]">wdwd</p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4A6670] mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-[#7C9A92] mr-3" />
                  <span className="text-[#7C9A92]">expeirneica .... experience</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-[#7C9A92] mr-3" />
                  <span className="text-[#7C9A92]">Agualva</span>
                </div>
                <div className="flex items-center">
                  <Languages className="h-5 w-5 text-[#7C9A92] mr-3" />
                  <span className="text-[#7C9A92]">ingles, portugues</span>
                </div>
              </div>
            </div>

            {/* Session Options */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4A6670] mb-4">Session Options</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#F8F5F1] rounded-lg">
                  <div className="flex items-center">
                    <Video className="h-5 w-5 text-[#7C9A92] mr-3" />
                    <span className="text-[#7C9A92]">Online Session</span>
                  </div>
                  <CheckCircle className="h-5 w-5 text-[#7C9A92]" />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F8F5F1] rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-[#7C9A92] mr-3" />
                    <span className="text-[#7C9A92]">In-Person Session</span>
                  </div>
                  <CheckCircle className="h-5 w-5 text-[#7C9A92]" />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F8F5F1] rounded-lg">
                  <div className="flex items-center">
                    <PhoneCall className="h-5 w-5 text-[#7C9A92] mr-3" />
                    <span className="text-[#7C9A92]">Phone Consultation</span>
                  </div>
                  <CheckCircle className="h-5 w-5 text-[#7C9A92]" />
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4A6670] mb-4">Certifications</h3>
              <div className="space-y-3">
                  <div  className="flex items-center">
                    <Award className="h-5 w-5 text-[#7C9A92] mr-3" />
                    <span className="text-[#7C9A92]">ddd</span>
                  </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4A6670] mb-4">Availability</h3>
              <p className="text-[#7C9A92] mb-4"></p>
              <div className="space-y-4">
                  <div  className="flex justify-between items-center">
                    <span className="text-[#7C9A92]">terca feira</span>
                    <span className="text-[#7C9A92]">e43</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
