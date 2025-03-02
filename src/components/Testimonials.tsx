import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { testimonials } from "../data/homeData";
import { Star } from "lucide-react";

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
const stagger = { visible: { transition: { staggerChildren: 0.2 } } };

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          className="text-4xl font-bold text-[#4A6670] text-center mb-12"
        >
          Voices of Transformation
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              variants={fadeIn}
              key={testimonial.id}
              className="bg-[#F8F5F1] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-[#E6B17E] fill-current" />
                ))}
              </div>
              <p className="text-[#4A6670] mb-6 italic">&quot{testimonial.content}&quot</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  width={150}
                  height={150}
                />
                <div>
                  <p className="font-semibold text-[#4A6670]">{testimonial.author}</p>
                  <p className="text-sm text-[#7C9A92]">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}