import React from "react";
import { Search, Calendar, Heart } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.2 } } };

export default function HowItWorks() {
  const steps = [
    { icon: Search, title: "Explore Practices", desc: "Find trusted guides in your area" },
    { icon: Calendar, title: "Book a Session", desc: "Schedule with ease and flexibility" },
    { icon: Heart, title: "Feel the Change", desc: "Embrace your holistic transformation" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          className="text-4xl font-bold text-[#4A6670] text-center mb-12"
        >
          Your Path to Wellness
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {steps.map((step, index) => (
            <motion.div variants={fadeIn} key={index} className="text-center p-6 bg-[#F8F5F1] rounded-lg shadow-sm">
              <div className="bg-[#E6B17E]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-8 w-8 text-[#E6B17E]" />
              </div>
              <h3 className="text-xl font-semibold text-[#4A6670] mb-2">{step.title}</h3>
              <p className="text-[#7C9A92]">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}