"use client";

import React, { useState } from "react";
import Link from "next/link";
import { therapies } from "../data/homeData"; // Certifica-te de que o caminho está correto
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

// Definindo as variantes para animação
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function TherapiesGrid() {
  const [visibleTherapies, setVisibleTherapies] = useState(12);

  const loadMoreTherapies = () => {
    setVisibleTherapies((prev) => Math.min(prev + 12, therapies.length));
  };

  return (
    <section className="py-16 bg-[#F8F5F1] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título fora do grid */}
        <h2 className="text-3xl font-bold text-[#4A6670] mb-10 text-center bg-gradient-to-r from-[#7C9A92] to-[#4A6670] bg-clip-text text-transparent">
          Explore Our Practices
        </h2>

        {/* Grid com animação */}
        <motion.div
  initial="hidden"
  animate="visible"
  variants={stagger}
  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
>
  {therapies.slice(0, visibleTherapies).map((therapy) => (
    <motion.div key={therapy.name} variants={fadeIn} initial="hidden" animate="visible">
      <Link
        href={therapy.path}
        className="group bg-white rounded-lg p-4 shadow-sm hover:shadow-lg hover:bg-[#E6B17E]/10 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center"
      >
        <div className="bg-[#7C9A92]/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
          <therapy.icon className="h-6 w-6 text-[#7C9A92] group-hover:text-[#E6B17E] transition-colors" />
        </div>
        <h3 className="text-sm font-semibold text-[#4A6670] group-hover:text-[#E6B17E] transition-colors text-center">
          {therapy.name}
        </h3>
        <p className="text-xs text-[#7C9A92] mt-1 text-center">{therapy.description}</p>
      </Link>
    </motion.div>
  ))}
</motion.div>

        {/* Botão "See More" */}
        {visibleTherapies < therapies.length && (
          <div className="text-center mt-12">
            <motion.button
              onClick={loadMoreTherapies}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-[#7C9A92] text-white rounded-lg hover:bg-[#E6B17E] transition-colors text-base font-medium shadow-sm"
            >
              See More Therapies <ChevronDown className="h-5 w-5 ml-2" />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}