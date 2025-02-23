import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="text-4xl font-bold mb-6">Ready to Embrace Your Wellness?</h2>
        <p className="text-[#E8DED1] mb-8 max-w-2xl mx-auto text-lg">
          Join a vibrant community of holistic practitioners and seekers in Switzerland. Start today — your first step is free!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="bg-[#E6B17E] text-white px-8 py-3 rounded-lg hover:bg-[#D9A066] transition-colors"
          >
            Share Your Practice
          </Link>
          <Link
            href="/practitioners"
            className="bg-white text-[#4A6670] px-8 py-3 rounded-lg hover:bg-[#E8DED1] transition-colors"
          >
            Find Your Guide
          </Link>
        </div>
      </motion.div>
    </section>
  );
}