"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  MapPin,
  Star,
  Shield,
  Calendar,
  MessageCircle,
  Clock,
  Globe,
  Languages,
  Video,
  Users,
  CheckCircle,
  Award,
  Feather,
} from "lucide-react";
import { supabase } from "../../../db/supabase";
import Image from "next/image";

interface Seller {
  userUID: string;
  name: string;
  email: string;
  branch: string;
  coverImage?: string;
  image?: string;
  title?: string;
  location?: string;
  specialties?: string;
  language?: string;
}

export default function SellerProfile() {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);

  const { userUID } = useParams(); // Captura o 'userUID' da URL

  useEffect(() => {
    console.log("Received userUID from URL:", userUID); // Debug para verificar o parâmetro

    const fetchSeller = async () => {
      if (!userUID) {
        console.error("No seller userUID in URL");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("seller")
          .select("*")
          .eq("userUID", userUID); // Busca por 'userUID'

        if (error) {
          console.error("Error fetching seller:", error.message);
        } else if (data.length === 0) {
          console.warn("No seller found with userUID:", userUID);
        } else {
          console.log("Seller fetched:", data[0]);
          setSeller(data[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [userUID]);

  if (loading) return <div>Loading...</div>;
  if (!seller) return <div>No seller data found for userUID: {userUID}</div>;

  return (
    <div className="min-h-screen bg-[#F8F5F1]">
      {/* Cover Image */}
      <div className="relative h-64 md:h-96">
        <Image
          src={seller.coverImage || "https://images.unsplash.com/photo-1517495307481-d59b8bf8b80e?auto=format&fit=crop&q=80"}
          alt="Cover"
          className="absolute inset-0 object-cover w-full h-full"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 -mt-32 mb-8">
          <div className="relative">
            {seller.image ? (
              <Image
                src={seller.image}
                alt={seller.name || "Profile picture"}
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
                  <p className="text-[#7C9A92] text-lg">{seller.title || "Mestre Reiki"}</p>
                  <div className="flex items-center mt-2">
                    <MapPin className="h-5 w-5 text-[#7C9A92]" />
                    <span className="ml-2 text-[#7C9A92]">{seller.location || "N/A"}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Star className="h-5 w-5 text-[#E6B17E]" />
                    <span className="ml-1 text-[#4A6670] font-medium">5</span>
                    <span className="ml-1 text-[#7C9A92]">(120 reviews)</span>
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
                  <span className="text-[#7C9A92]">Next available: Monday</span>
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
              <p className="text-[#7C9A92] mb-8 leading-relaxed">{seller.branch || "I am a Reiki master."}</p>
              <h3 className="text-xl font-semibold text-[#4A6670] mb-4">My Approach</h3>
              <p className="text-[#7C9A92] leading-relaxed">Personalized energy healing tailored to your needs.</p>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#4A6670] mb-6">Specialties</h2>
              <div className="flex flex-wrap gap-3">
                {seller.specialties ? (
                  <span className="bg-[#F8F5F1] text-[#7C9A92] px-4 py-2 rounded-full text-sm flex items-center">
                    <Feather className="h-4 w-4 mr-2" />
                    {seller.specialties}
                  </span>
                ) : (
                  <span className="text-[#7C9A92]">No specialties listed.</span>
                )}
              </div>
            </div>

            {/* Session Types */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#4A6670] mb-6">Session Types</h2>
              <div className="space-y-6">
                <div className="border-b border-[#E8DED1] pb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-[#4A6670]">{seller.name} Session</h3>
                      <p className="text-[#7C9A92]">1 hour</p>
                    </div>
                    <span className="text-lg font-semibold text-[#7C9A92]">{seller.price || "N/A"}</span>
                  </div>
                  <p className="text-[#7C9A92]">A personalized Reiki healing session.</p>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#4A6670] mb-6">Client Testimonials</h2>
              <div className="space-y-6">
                <div className="border-b border-[#E8DED1] pb-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-[#4A6670]">Anonymous</h3>
                        <span className="text-sm text-[#7C9A92]">2025-02-22</span>
                      </div>
                      <p className="text-[#7C9A92]">Amazing experience, highly recommend!</p>
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
                  <span className="text-[#7C9A92]">5+ years experience</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-[#7C9A92] mr-3" />
                  <span className="text-[#7C9A92]">Switzerland</span>
                </div>
                <div className="flex items-center">
                  <Languages className="h-5 w-5 text-[#7C9A92] mr-3" />
                  <span className="text-[#7C9A92]">{seller.language || "English"}</span>
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
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4A6670] mb-4">Certifications</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-[#7C9A92] mr-3" />
                  <span className="text-[#7C9A92]">Reiki Master Certification</span>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4A6670] mb-4">Availability</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#7C9A92]">Monday</span>
                  <span className="text-[#7C9A92]">10:00 - 14:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}