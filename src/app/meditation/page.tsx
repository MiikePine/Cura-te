"use client";
import React, { useState, useEffect } from "react";
import {
  Search, Heart, Star, MapPin, Book,
  Calendar, Users, CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { supabase } from "@terapias/db/supabase";

interface Seller {
  userUID: number;
  name: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  languages: string[];
  experience: string;
  specialties: string[];
  certifications: string[];
  availability: string[];
  price: string;
  bio: string;
  teachingStyle: string;
  nextAvailable: string;
  verified: boolean;
  featured: boolean;
  studentCount: number;
  sessionTypes: {
    name: string;
    duration: string;
    price: string;
    description: string;
  }[];
}

export default function MeditationSeller() {
  const [sellers, setSellers] = useState<Seller[]>([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const { data, error } = await supabase
        .from("seller")
        .select("*")
        .contains("specialties", ["Meditation"]);
  console.log("perfis meditacao,", data)
        if (error) {
          console.error("Error fetching sellers:", error.message, error.details);
          return;
        }
  
        setSellers(data || []);
      } catch (err) {
        console.error("Unexpected error fetching sellers:", err);
      }
    };
  
    fetchSellers();
  }, []); 

  const renderSellerCard = (seller: Seller) => (
    <div
      key={seller.userUID}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative">
        <Image
          src={seller.image}
          alt={seller.name}
          width={400}
          height={300}
          className="w-full h-64 object-cover"
        />
        {seller.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-[#4A6670] text-white rounded-full text-sm">
            Featured Seller
          </div>
        )}
        {seller.verified && (
          <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
            <CheckCircle className="h-5 w-5 text-[#7C9A92]" />
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-[#4A6670]">{seller.name}</h3>
            <p className="text-[#7C9A92] text-sm">{seller.title}</p>
          </div>
          <button className="text-[#7C9A92] hover:text-[#4A6670] transition-colors">
            <Heart className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center mb-4">
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          <span className="ml-1 font-semibold text-[#4A6670]">
            {seller.rating}
          </span>
          <span className="mx-1 text-[#7C9A92]">•</span>
          <span className="text-[#7C9A92]">{seller.reviews} reviews</span>
        </div>

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center text-[#4A6670]">
            <MapPin className="h-4 w-4 mr-2 text-[#7C9A92]" />
            {seller.location}
          </div>
          {/* <div className="flex items-center text-[#4A6670]">
            <Globe className="h-4 w-4 mr-2 text-[#7C9A92]" />
            {seller.languages(", ")}
          </div> */}
          <div className="flex items-center text-[#4A6670]">
            <Book className="h-4 w-4 mr-2 text-[#7C9A92]" />
            {seller.experience} experience
          </div>
          <div className="flex items-center text-[#4A6670]">
            <Users className="h-4 w-4 mr-2 text-[#7C9A92]" />
            {seller.studentCount}+ students taught
          </div>
          <div className="flex items-center text-[#4A6670]">
            <Calendar className="h-4 w-4 mr-2 text-[#7C9A92]" />
            Next available: {seller.nextAvailable}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {seller.specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#F8F5F1] text-[#7C9A92] rounded-full text-sm"
            >
              {specialty}
            </span>
          ))}
        </div>

        <div className="border-t border-[#E8DED1] pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-[#7C9A92]">Starting from</p>
              <p className="text-lg font-bold text-[#4A6670]">{seller.price}</p>
            </div>
            <div className="space-x-2">
              <button className="px-4 py-2 border border-[#7C9A92] text-[#7C9A92] rounded-lg hover:bg-[#F8F5F1] transition-colors">
                View Profile
              </button>
              <button className="px-4 py-2 bg-[#7C9A92] text-white rounded-lg hover:bg-[#6A8B83] transition-colors">
                Book Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F5F1]">
       <div className="relative bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&q=80"
                  alt="Background"
                  className="w-full h-full object-cover opacity-10"
                  width={160}
                  height={160}
                />
              </div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center max-w-3xl mx-auto">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">Reiki</h1>
                  <p className="text-xl mb-12 text-[#E8DED1]">
                    Connect with experienced shamanic healers and embark on a
                    transformative spiritual journey
                  </p>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#7C9A92]" />
                        <input
                          type="text"
                          placeholder="Search sellers by name or title..."
                          className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
                          // value={searchQuery}
                          // onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sellers.map(renderSellerCard)}
        </div>
      </div>
    </div>
  );
}
