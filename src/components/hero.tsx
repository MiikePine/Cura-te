
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, MapPin, ChevronDown, Globe, Users } from "lucide-react";
import { motion } from "framer-motion";
import { therapies } from "../data/homeData"; // Adjust path as needed
import Link from "next/link";

// Swiss cantons
const swissCantons = [
  "Aargau", "Appenzell Ausserrhoden", "Appenzell Innerrhoden", "Basel-Landschaft", "Basel-Stadt",
  "Bern", "Fribourg", "Geneva", "Glarus", "Graubünden", "Jura", "Lucerne", "Neuchâtel", "Nidwalden",
  "Obwalden", "Schaffhausen", "Schwyz", "Solothurn", "St. Gallen", "Thurgau", "Ticino", "Uri",
  "Valais", "Vaud", "Zug", "Zurich",
];

// Session types
const sessionTypes = ["À distância", "Presencialmente"];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const dropdownAnimation = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCanton, setSelectedCanton] = useState("");
  const [selectedSessionType, setSelectedSessionType] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCantonFocused, setIsCantonFocused] = useState(false);
  const [isSessionTypeFocused, setIsSessionTypeFocused] = useState(false);

  // Handle search submission (placeholder for actual search logic)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Example: Redirect to a search results page with query parameters
    console.log({
      therapy: searchQuery,
      canton: selectedCanton,
      sessionType: selectedSessionType,
    });
    // TODO: Implement actual search navigation, e.g., router.push(`/search?therapy=${searchQuery}&canton=${selectedCanton}&session=${selectedSessionType}`)
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="relative bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white py-24 md:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/zenImage.jpg"
        alt="Mandala Meditation in Nature"
        className="absolute inset-0 opacity-20 object-cover"
        width={1920}
        height={1080}
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          variants={fadeIn}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
        >
          Discover Your Path to Inner Peace
        </motion.h1>
        <motion.p
          variants={fadeIn}
          className="text-lg sm:text-xl md:text-2xl text-[#E8DED1] mb-10 max-w-3xl mx-auto"
        >
          Connect with Switzerland’s finest holistic practitioners and explore transformative therapies.
        </motion.p>

        {/* Search Form */}
        <motion.form
          variants={fadeIn}
          onSubmit={handleSearch}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg max-w-5xl mx-auto border border-[#E8DED1]/20"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Therapy Search */}
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92]"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search for Yoga, Reiki, Meditation..."
                className="w-full pl-12 pr-12 py-4 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#E6B17E] text-base shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                aria-label="Search for therapies"
              />
              {searchQuery && (
                <ChevronDown
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92] cursor-pointer"
                  aria-hidden="true"
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
                  {therapies
                    .filter((therapy) => therapy.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((therapy) => (
                      <Link
                        key={therapy.name}
                        href={therapy.path}
                        className="flex items-center px-4 py-3 text-[#4A6670] hover:bg-[#E6B17E]/10 transition-colors"
                        onClick={() => setIsSearchFocused(false)}
                      >
                        <therapy.icon className="h-5 w-5 mr-3 text-[#7C9A92]" aria-hidden="true" />
                        <span className="text-base">{therapy.name}</span>
                      </Link>
                    ))}
                </motion.div>
              )}
            </div>

            {/* Canton Selection */}
            <div className="relative flex-1 z-100">
              <MapPin
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92]"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Select a Canton..."
                className="w-full pl-12 pr-12 py-4 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#E6B17E] text-base shadow-sm"
                value={selectedCanton}
                onChange={(e) => setSelectedCanton(e.target.value)}
                onFocus={() => setIsCantonFocused(true)}
                onBlur={() => setTimeout(() => setIsCantonFocused(false), 200)}
                aria-label="Select a canton"
              />
              <ChevronDown
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92] cursor-pointer"
                aria-hidden="true"
              />
              {isCantonFocused && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownAnimation}
                  className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-xl max-h-60 overflow-y-auto z-20 border border-[#E8DED1]"
                >
                  {swissCantons
                    .filter((canton) => canton.toLowerCase().includes(selectedCanton.toLowerCase()))
                    .map((canton) => (
                      <div
                        key={canton}
                        onClick={() => {
                          setSelectedCanton(canton);
                          setIsCantonFocused(false);
                        }}
                        className="z-100  flex items-center px-4 py-3 text-[#4A6670] hover:bg-[#E6B17E]/10 transition-colors cursor-pointer"
                        role="option"
                        aria-selected={selectedCanton === canton}
                      >
                        <MapPin className="h-5 w-5 mr-3 text-[#7C9A92]" aria-hidden="true" />
                        <span className="text-base">{canton}</span>
                      </div>
                    ))}
                </motion.div>
              )}
            </div>

            {/* Session Type Selection */}
            <div className="relative flex-1">
              <Globe
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92]"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="À distância or Presencialmente..."
                className="w-full pl-12 pr-12 py-4 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#E6B17E] text-base shadow-sm"
                value={selectedSessionType}
                onChange={(e) => setSelectedSessionType(e.target.value)}
                onFocus={() => setIsSessionTypeFocused(true)}
                onBlur={() => setTimeout(() => setIsSessionTypeFocused(false), 200)}
                aria-label="Select session type"
              />
              <ChevronDown
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92] cursor-pointer"
                aria-hidden="true"
              />
              {isSessionTypeFocused && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownAnimation}
                  className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-xl max-h-60 overflow-y-auto z-20 border border-[#E8DED1]"
                >
                  {sessionTypes
                    .filter((type) => type.toLowerCase().includes(selectedSessionType.toLowerCase()))
                    .map((type) => (
                      <div
                        key={type}
                        onClick={() => {
                          setSelectedSessionType(type);
                          setIsSessionTypeFocused(false);
                        }}
                        className="flex items-center px-4 py-3 text-[#4A6670] hover:bg-[#E6B17E]/10 transition-colors cursor-pointer"
                        role="option"
                        aria-selected={selectedSessionType === type}
                      >
                        {type === "À distância" ? (
                          <Globe className="h-5 w-5 mr-3 text-[#7C9A92]" aria-hidden="true" />
                        ) : (
                          <Users className="h-5 w-5 mr-3 text-[#7C9A92]" aria-hidden="true" />
                        )}
                        <span className="text-base">{type}</span>
                      </div>
                    ))}
                </motion.div>
              )}
            </div>

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-8 py-4 bg-[#E6B17E] text-white rounded-lg hover:bg-[#D9A066] transition-colors text-base font-medium shadow-md"
              aria-label="Discover practitioners"
            >
              Discover Now
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.section>
  );
}
