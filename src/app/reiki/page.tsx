"use client"

import React, { useState, useEffect } from "react";
import { supabase } from "@terapias/db/supabase";
import { Search } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setSellers } from '../../store/userSlice';
import UserCard from "@terapias/components/userCard";
import { Tables } from '../../types/database.types';
import { RootState, AppDispatch } from '../../store/store';

type Seller = Tables<'seller'>;

const Reiki = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const sellers = useSelector((state: RootState) => state.user.sellers) as Seller[]; // Type assertion para garantir Seller[]

  useEffect(() => {
    const fetchSellers = async () => {
      const { data, error } = await supabase
        .from("seller")
        .select("*")
        .contains("specialties", ["Reiki"]);

      if (error) {
        console.error("Error fetching sellers:", error);
        return;
      }

      dispatch(setSellers(data as Seller[]));
    };

    fetchSellers();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#F8F5F1]">
      {/* Hero Section */}
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sellers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sellers.map((seller) => (
            <UserCard
              key={seller.userUID}
              userUID={Number(seller.userUID)} // Convert string para number
              name={seller.name || "Unnamed Seller"}
              email={seller.email || "No email provided"} // Adicionado
              title={seller.tittle || "No Title"}
              image={seller.image || "https://via.placeholder.com/150"}
              rating={seller.rating || 0}
              reviews={seller.reviews || 0}
              location={seller.location || "Unknown Location"}
              experience={seller.yearsexperience?.toString() || "0"}
              studentCount={0} // Valor padrão, não existe em seller
              nextAvailable={seller.availability?.[0] || "N/A"}
              specialties={seller.specialties || []}
              price={seller.price || "N/A"}
              verified={seller.verified || false}
              featured={false} // Valor padrão, não existe em seller
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reiki;