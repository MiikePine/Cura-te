"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { therapies } from "../data/homeData"; // Certifica-te de que o caminho está correto
import Link from "next/link";

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const dropdownAnimation = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCanton, setSelectedCanton] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCantonFocused, setIsCantonFocused] = useState(false);

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="relative bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white py-32 md:py-40 overflow-hidden"
    >
      {/* Imagem de fundo */}
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

      {/* Conteúdo */}
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

        {/* Formulário de Pesquisa */}
        <motion.div
          variants={fadeIn}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg max-w-4xl mx-auto border border-[#E8DED1]/20"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Pesquisa por Terapia */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92]" />
              <input
                type="text"
                placeholder="Search for Yoga, Reiki, Meditation..."
                className="w-full pl-12 pr-12 py-4 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#E6B17E] text-base shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
              {searchQuery && (
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92] cursor-pointer" />
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
                      >
                        <therapy.icon className="h-5 w-5 mr-3 text-[#7C9A92]" />
                        <span className="text-base">{therapy.name}</span>
                      </Link>
                    ))}
                </motion.div>
              )}
            </div>

            {/* Dropdown de Cantões */}
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92]" />
              <input
                type="text"
                placeholder="Select a Canton..."
                className="w-full pl-12 pr-12 py-4 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#E6B17E] text-base shadow-sm"
                value={selectedCanton}
                onChange={(e) => setSelectedCanton(e.target.value)}
                onFocus={() => setIsCantonFocused(true)}
                onBlur={() => setTimeout(() => setIsCantonFocused(false), 200)}
              />
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92] cursor-pointer" />
              {isCantonFocused && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownAnimation}
                  className="absolute top-full z-50 left-0 mt-2 w-full bg-white rounded-lg shadow-xl max-h-60 overflow-y-auto border border-[#E8DED1]"
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
                        className="flex items-center px-4 py-3 text-[#4A6670] hover:bg-[#E6B17E]/10 transition-colors cursor-pointer"
                      >
                        <MapPin className="h-5 w-5 mr-3 text-[#7C9A92]" />
                        <span className="text-base">{canton}</span>
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
              Discover Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Variante para stagger do conteúdo interno
const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};