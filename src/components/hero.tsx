"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { therapies } from "../data/homeData";

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="relative bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white py-32 overflow-hidden"
    >
      <Image
        src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&q=80"
        alt="Serenity and Wellness in Nature"
        className="absolute inset-0 opacity-20 object-cover"
        width={1920}
        height={1080}
        priority
        onLoadingComplete={() => console.log("Imagem carregada com sucesso!")}
        onError={(e) => {
          console.error("Erro ao carregar imagem:", {
            src: e.target.src,
            status: e.target.status,
            message: e.message || "Erro desconhecido",
          });
          e.target.src = "https://images.unsplash.com/photo-1611676273915-195e2e68da27?auto=format&fit=crop&q=80";
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold mb-6">
          Your Journey to Inner Balance Begins Here
        </motion.h1>
        <motion.p variants={fadeIn} className="text-xl md:text-2xl mb-10 text-[#E8DED1]">
          Explore holistic practices and connect with Switzerland’s finest wellness guides
        </motion.p>
        <motion.div variants={fadeIn} className="relative bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#7C9A92]" />
              <input
                type="text"
                placeholder="Search for yoga, reiki, meditation..."
                className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
              />
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-10"
                >
                  {therapies
                    .filter((therapy) => therapy.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((therapy) => (
                      <Link
                        key={therapy.name}
                        href={therapy.path}
                        className="flex items-center px-4 py-2 text-[#4A6670] hover:bg-[#E6B17E]/10"
                      >
                        <therapy.icon className="h-5 w-5 mr-2 text-[#7C9A92]" />
                        {therapy.name}
                      </Link>
                    ))}
                </motion.div>
              )}
            </div>
            <button className="bg-[#E6B17E] text-white px-8 py-3 rounded-lg hover:bg-[#D9A066] transition-colors">
              Discover Now
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}