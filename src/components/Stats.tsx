import React from "react";
import { motion } from "framer-motion";
import { stats } from "../data/homeData";

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
const stagger = { visible: { transition: { staggerChildren: 0.2 } } };

export default function Stats() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div variants={fadeIn} key={stat.id} className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-[#E8DED1] text-sm">{stat.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}