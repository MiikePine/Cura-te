
"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@terapias/db/supabase";
import { Search, MapPin, ChevronDown, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setSellers } from "../../store/userSlice";
import { RootState, AppDispatch } from "../../store/store";
import UserCard from "@terapias/components/userCard";
import { motion } from "framer-motion";
import { therapies } from "../../data/homeData";

// Lista de cantões suíços
const swissCantons = [
  "Aargau", "Appenzell Ausserrhoden", "Appenzell Innerrhoden", "Basel-Landschaft", "Basel-Stadt",
  "Bern", "Fribourg", "Geneva", "Glarus", "Graubünden", "Jura", "Lucerne", "Neuchâtel", "Nidwalden",
  "Obwalden", "Schaffhausen", "Schwyz", "Solothurn", "St. Gallen", "Thurgau", "Ticino", "Uri",
  "Valais", "Vaud", "Zug", "Zurich",
];

// Variantes de animação
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const dropdownAnimation = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

type Seller = {
  useruid: string;
  name: string | null;
  email: string | null;
  title: string | null;
  image: string | null;
  rating: number | null;
  reviews: number | null;
  location: string | null;
  languages: string[] | null;
  experience: string | null;
  certifications: string[] | null;
  availability: string[] | null;
  price: string | null;
  bio: string | null;
  teaching_style: string | null;
  next_available: string | null;
  verified: boolean | null;
  featured: boolean | null;
  student_count: number | null;
  session_types: { name: string; duration: string; price: string; description: string }[] | null;
  specialties: string[];
};

export default function Practitioners() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTherapy, setSelectedTherapy] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isTherapyFocused, setIsTherapyFocused] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [visibleSellers, setVisibleSellers] = useState(12);
  const [locations, setLocations] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const sellers = useSelector((state: RootState) => state.user.sellers) as Seller[];

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        // Buscar todos os vendedores com suas terapias
        const { data: sellersData, error: sellersError } = await supabase
          .from("seller")
          .select(`
            useruid,
            name,
            email,
            title,
            image,
            rating,
            reviews,
            location,
            languages,
            experience,
            certifications,
            availability,
            price,
            bio,
            teaching_style,
            next_available,
            verified,
            featured,
            student_count,
            session_types,
            seller_therapies (
              therapy:therapies (name)
            )
          `)
          .order("rating", { ascending: false });

        if (sellersError) throw sellersError;

        // Mapear especialidades
        const sellersWithSpecialties = sellersData.map((seller) => ({
          ...seller,
          specialties: seller.seller_therapies?.map((st: { therapy: { name: string } }) => st.therapy.name) || [],
        }));

        dispatch(setSellers(sellersWithSpecialties));

        // Extrair localizações únicas
        const uniqueLocations = Array.from(
          new Set(sellersWithSpecialties.map((seller: Seller) => seller.location || ""))
        ).filter(Boolean);
        setLocations(uniqueLocations);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers();
  }, [dispatch]);

  // Filtrar vendedores com base nos filtros
  const filteredSellers = sellers.filter(
    (seller) =>
      (searchQuery === "" ||
        seller.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seller.title?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedTherapy === "" ||
        seller.specialties.some((specialty) => specialty.toLowerCase().includes(selectedTherapy.toLowerCase()))) &&
      (selectedLocation === "" || seller.location?.toLowerCase().includes(selectedLocation.toLowerCase()))
  );

  const loadMoreSellers = () => {
    setVisibleSellers((prev) => Math.min(prev + 12, filteredSellers.length));
  };

  return (
    <div className="min-h-screen bg-[#F8F5F1] font-sans">
      {/* Hero Section com Motor de Busca */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white py-32 md:py-40 overflow-hidden"
      >
        <Image
          src="/zenImage.jpg"
          alt="Holistic Practitioners Background"
          className="absolute inset-0 opacity-20 object-cover"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            variants={fadeIn}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Find Your Holistic Practitioner
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-lg sm:text-xl md:text-2xl text-[#E8DED1] mb-10 max-w-3xl mx-auto"
          >
            Connect with Switzerland’s top holistic practitioners for transformative therapies.
          </motion.p>

          {/* Formulário de Pesquisa */}
          <motion.div
            variants={fadeIn}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg max-w-4xl mx-auto border border-[#E8DED1]/20"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Pesquisa por Nome ou Título */}
              <div className="relative flex-1">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92]"
                />
                <input
                  type="text"
                  placeholder="Search by name or title..."
                  className="w-full pl-12 pr-12 py-4 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#E6B17E] text-base shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />
                {searchQuery && (
                  <ChevronDown
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92] cursor-pointer"
                  />
                )}
                {isSearchFocused && searchQuery && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownAnimation}
                    className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-xl max-h-60 overflow-y-auto z-20 border border-[#E8DED1]"
                  >
                    {filteredSellers
                      .slice(0, 5)
                      .map((seller) => (
                        <Link
                          key={seller.useruid}
                          href={`/profile/${seller.useruid}`}
                          className="flex items-center px-4 py-3 text-[#4A6670] hover:bg-[#E6B17E]/10 transition-colors"
                        >
                          <Image
                            src={seller.image || "https://via.placeholder.com/150"}
                            alt={seller.name || "Practitioner"}
                            width={32}
                            height={32}
                            className="rounded-full mr-3"
                          />
                          <span className="text-base">{seller.name || "Unnamed Practitioner"}</span>
                        </Link>
                      ))}
                  </motion.div>
                )}
              </div>

              {/* Filtro por Terapia */}
              <div className="relative flex-1">
                <Filter
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92]"
                />
                <input
                  type="text"
                  placeholder="Select a therapy..."
                  className="w-full pl-12 pr-12 py-4 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#E6B17E] text-base shadow-sm"
                  value={selectedTherapy}
                  onChange={(e) => setSelectedTherapy(e.target.value)}
                  onFocus={() => setIsTherapyFocused(true)}
                  onBlur={() => setTimeout(() => setIsTherapyFocused(false), 200)}
                />
                <ChevronDown
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92] cursor-pointer"
                />
                {isTherapyFocused && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownAnimation}
                    className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-xl max-h-60 overflow-y-auto z-20 border border-[#E8DED1]"
                  >
                    {therapies
                      .filter((therapy) => therapy.name.toLowerCase().includes(selectedTherapy.toLowerCase()))
                      .map((therapy) => (
                        <div
                          key={therapy.name}
                          onClick={() => {
                            setSelectedTherapy(therapy.name);
                            setIsTherapyFocused(false);
                          }}
                          className="flex items-center px-4 py-3 text-[#4A6670] hover:bg-[#E6B17E]/10 transition-colors cursor-pointer"
                        >
                          <therapy.icon className="h-5 w-5 mr-3 text-[#7C9A92]" />
                          <span className="text-base">{therapy.name}</span>
                        </div>
                      ))}
                  </motion.div>
                )}
              </div>

              {/* Filtro por Localização */}
              <div className="relative flex-1">
                <MapPin
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92]"
                />
                <input
                  type="text"
                  placeholder="Select a location..."
                  className="w-full pl-12 pr-12 py-4 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#E6B17E] text-base shadow-sm"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  onFocus={() => setIsLocationFocused(true)}
                  onBlur={() => setTimeout(() => setIsLocationFocused(false), 200)}
                />
                <ChevronDown
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92] cursor-pointer"
                />
                {isLocationFocused && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownAnimation}
                    className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-xl max-h-60 overflow-y-auto z-20 border border-[#E8DED1]"
                  >
                    {[...swissCantons, ...locations]
                      .filter((location) => location.toLowerCase().includes(selectedLocation.toLowerCase()))
                      .map((location) => (
                        <div
                          key={location}
                          onClick={() => {
                            setSelectedLocation(location);
                            setIsLocationFocused(false);
                          }}
                          className="flex items-center px-4 py-3 text-[#4A6670] hover:bg-[#E6B17E]/10 transition-colors cursor-pointer"
                        >
                          <MapPin className="h-5 w-5 mr-3 text-[#7C9A92]" />
                          <span className="text-base">{location}</span>
                        </div>
                      ))}
                  </motion.div>
                )}
              </div>

              {/* Botão de Pesquisa */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#E6B17E] text-white rounded-lg hover:bg-[#D9A066] transition-colors text-base font-medium shadow-md"
              >
                Search
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Practitioners Grid Section */}
      <section className="py-16 bg-[#F8F5F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-3xl font-bold text-[#4A6670] mb-10 text-center bg-gradient-to-r from-[#7C9A92] to-[#4A6670] bg-clip-text text-transparent"
          >
            Our Holistic Practitioners
          </motion.h2>

          {filteredSellers.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredSellers.slice(0, visibleSellers).map((seller) => (
                <motion.div key={seller.useruid} variants={fadeIn}>
                  <UserCard
                    useruid={seller.useruid}
                    name={seller.name || "Unnamed Practitioner"}
                    title={seller.title || "Holistic Practitioner"}
                    image={seller.image || "https://via.placeholder.com/150"}
                    rating={seller.rating || 0}
                    reviews={seller.reviews || 0}
                    location={seller.location || "Unknown Location"}
                    experience={seller.experience || "N/A"}
                    studentCount={seller.student_count || 0}
                    nextAvailable={seller.next_available || "N/A"}
                    specialties={seller.specialties || []}
                    price={seller.price || "N/A"}
                    verified={seller.verified || false}
                    email={seller.email || ""}
                    featured={seller.featured || false}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center">
              <p className="text-[#7C9A92] text-lg mb-4">No practitioners found matching your search.</p>
              <p className="text-[#4A6670] text-sm">Try adjusting your filters or check back later for new listings.</p>
            </div>
          )}

          {/* Botão "Load More" */}
          {visibleSellers < filteredSellers.length && (
            <div className="text-center mt-12">
              <motion.button
                onClick={loadMoreSellers}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-[#7C9A92] text-white rounded-lg hover:bg-[#E6B17E] transition-colors text-base font-medium shadow-sm"
              >
                Load More <ChevronDown className="h-5 w-5 ml-2" />
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        className="py-16 bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-lg text-[#E8DED1] mb-8 max-w-2xl mx-auto">
            Connect with our community of skilled holistic practitioners or share your own healing gifts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-3 bg-[#E6B17E] text-white rounded-lg hover:bg-[#D9A066] transition-colors"
            >
              Become a Practitioner
            </Link>
            <Link
              href="/"
              className="px-8 py-3 bg-white text-[#4A6670] rounded-lg hover:bg-[#E8DED1] transition-colors"
            >
              Explore More
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#4A6670] text-[#E8DED1] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            © 2025 Cura-te. All rights reserved. |{" "}
            <Link href="/contact" className="hover:text-[#E6B17E] transition-colors">
              Contact Us
            </Link>{" "}
            |{" "}
            <Link href="/about" className="hover:text-[#E6B17E] transition-colors">
              About
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
