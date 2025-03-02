"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  MapPin,
  Star,
  Shield,
  Calendar,
  MessageCircle,
  Clock,
  Globe,
  Languages,
  Award,
  Feather,
} from "lucide-react";
import { supabase } from "@terapias/db/supabase";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Database } from "../../../../supabase/database.types"; // Adjust path as needed

type SellerRow = Database["public"]["Tables"]["seller"]["Row"];

// Define SellerTherapy to match potential array response
interface SellerTherapy {
  therapy: { name: string }[];
}

// Define SessionType for clarity
interface SessionType {
  name: string;
  duration: string;
  price: string;
  description: string;
}

// Define RawSeller with seller_therapies typed correctly
interface RawSeller extends SellerRow {
  seller_therapies: SellerTherapy[];
}

// Define transformed Seller type for the component
interface Seller extends Omit<RawSeller, "seller_therapies" | "session_types"> {
  specialties: string[];
  session_types: SessionType[] | null; // Adjusted to match SellerRow and handle null
}

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const scaleIn = { hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.2 } } };

export default function SellerProfile() {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);
  const [specialties, setSpecialties] = useState<string[]>([]);

  const { useruid } = useParams();

  useEffect(() => {
    const fetchSeller = async () => {
      if (!useruid) {
        console.error("No seller useruid in URL");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
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
          .eq("useruid", useruid)
          .single();

        if (error) throw error;

        if (!data) {
          console.warn("No seller found with useruid:", useruid);
          setSeller(null);
        } else {
          console.log("Raw data from Supabase:", JSON.stringify(data, null, 2)); // Debug log
          const rawSeller = data as unknown as RawSeller;
          const sellerWithSpecialties: Seller = {
            ...rawSeller,
            specialties: rawSeller.seller_therapies?.flatMap((st) => st.therapy.map((t) => t.name)) || [],
            session_types: Array.isArray(rawSeller.session_types)
              ? (rawSeller.session_types as unknown as SessionType[]) // Use unknown as intermediate type
              : null,
          };
          setSeller(sellerWithSpecialties);
          setSpecialties(sellerWithSpecialties.specialties);
          console.log("Seller fetched:", sellerWithSpecialties);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [useruid]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5F1] flex items-center justify-center">
        <p className="text-[#4A6670] text-lg">Loading...</p>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-[#F8F5F1] flex items-center justify-center">
        <p className="text-[#4A6670] text-lg">No practitioner found for useruid: {useruid}</p>
      </div>
    );
  }

  // Rest of the component remains unchanged
  return (
    <div className="min-h-screen bg-[#F8F5F1]">
      {/* Header Section */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative pt-16 pb-24 bg-gradient-to-b from-[#7C9A92]/10 to-[#F8F5F1]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-[#7C9A92] hover:text-[#E6B17E] flex items-center mb-8 text-sm">
            <span className="mr-2">←</span> Back to Home
          </Link>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col md:flex-row items-center md:items-start gap-8"
          >
            {/* Profile Image */}
            <motion.div variants={scaleIn} className="relative">
              <Image
                src={seller.image || "https://via.placeholder.com/150"}
                alt={seller.name || "Profile picture"}
                width={140}
                height={140}
                className="w-36 h-36 rounded-full object-cover border-2 border-[#E8DED1] shadow-md"
              />
              {seller.verified && (
                <div className="absolute bottom-0 right-0 bg-[#E6B17E] text-white p-2 rounded-full shadow-md">
                  <Shield className="h-4 w-4" />
                </div>
              )}
            </motion.div>

            {/* Profile Info */}
            <div className="text-center md:text-left">
              <motion.h1 variants={fadeIn} className="text-4xl font-bold text-[#4A6670] mb-2">
                {seller.name}
              </motion.h1>
              <motion.p variants={fadeIn} className="text-lg text-[#7C9A92] mb-4">
                {seller.title || "Wellness Guide"}
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-[#7C9A92] mr-2" />
                  <span className="text-[#4A6670]">{seller.location || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-[#E6B17E] mr-2" />
                  <span className="text-[#4A6670]">
                    {seller.rating || "N/A"} ({seller.reviews || 0} reviews)
                  </span>
                </div>
              </motion.div>
              <motion.div variants={fadeIn} className="flex gap-4 justify-center md:justify-start">
                <Link
                  href="#message"
                  className="inline-flex items-center px-6 py-2 bg-[#F8F5F1] text-[#4A6670] rounded-full border border-[#E8DED1] hover:bg-[#E8DED1] transition-all duration-300 text-sm font-medium shadow-sm"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Link>
                <Link
                  href="#book"
                  className="inline-flex items-center px-6 py-2 bg-[#E6B17E] text-white rounded-full hover:bg-[#D9A066] transition-all duration-300 text-sm font-medium shadow-sm"
                >
                  Book Now <Calendar className="h-4 w-4 ml-2" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div initial="hidden" whileInView="visible" variants={stagger} className="space-y-12">
          {/* About Section */}
          <motion.section variants={fadeIn} className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#4A6670] mb-4">About Me</h2>
            <p className="text-[#7C9A92] text-base leading-relaxed">
              {seller.bio || "I’m here to guide you on your journey to inner peace and balance."}
            </p>
            {seller.teaching_style && (
              <div className="mt-4">
                <h3 className="text-lg font-medium text-[#4A6670] mb-2">My Approach</h3>
                <p className="text-[#7C9A92] text-base leading-relaxed">{seller.teaching_style}</p>
              </div>
            )}
          </motion.section>

          {/* Specialties */}
          <motion.section variants={fadeIn} className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#4A6670] mb-4">Specialties</h2>
            <div className="flex flex-wrap gap-3">
              {specialties.length > 0 ? (
                specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-[#7C9A92]/10 text-[#7C9A92] px-4 py-1.5 rounded-full text-sm hover:bg-[#7C9A92]/20 transition-colors"
                  >
                    <Feather className="h-4 w-4 mr-2" />
                    {specialty}
                  </span>
                ))
              ) : (
                <p className="text-[#7C9A92] text-base">No specialties listed.</p>
              )}
            </div>
          </motion.section>

          {/* Session Types */}
          <motion.section variants={stagger} className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#4A6670] mb-4">Session Types</h2>
            <div className="space-y-4">
              {seller.session_types && seller.session_types.length > 0 ? (
                seller.session_types.map((session, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="border border-[#E8DED1] rounded-lg p-4 hover:bg-[#F8F5F1] transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-medium text-[#4A6670]">{session.name}</h3>
                        <p className="text-[#7C9A92] text-sm">
                          <Clock className="inline h-4 w-4 mr-1" /> {session.duration}
                        </p>
                      </div>
                      <span className="text-[#E6B17E] font-semibold">{session.price}</span>
                    </div>
                    <p className="text-[#7C9A92] text-sm">{session.description}</p>
                    <Link
                      href="#book"
                      className="inline-block mt-2 text-[#7C9A92] hover:text-[#E6B17E] text-sm font-medium"
                    >
                      Book Now
                    </Link>
                  </motion.div>
                ))
              ) : (
                <p className="text-[#7C9A92] text-base">No session types available.</p>
              )}
            </div>
          </motion.section>

          {/* Quick Info */}
          <motion.section variants={stagger} className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#4A6670] mb-4">Quick Info</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div variants={fadeIn} className="flex items-center">
                <Star className="h-5 w-5 text-[#E6B17E] mr-2" />
                <div>
                  <p className="text-[#4A6670] font-medium">{seller.rating || "N/A"}</p>
                  <p className="text-[#7C9A92] text-sm">{seller.reviews || 0} reviews</p>
                </div>
              </motion.div>
              <motion.div variants={fadeIn} className="flex items-center">
                <Globe className="h-5 w-5 text-[#7C9A92] mr-2" />
                <div>
                  <p className="text-[#4A6670] font-medium">{seller.student_count || 0}</p>
                  <p className="text-[#7C9A92] text-sm">Students</p>
                </div>
              </motion.div>
              <motion.div variants={fadeIn} className="flex items-center">
                <Clock className="h-5 w-5 text-[#7C9A92] mr-2" />
                <div>
                  <p className="text-[#4A6670] font-medium">{seller.experience || "N/A"}</p>
                  <p className="text-[#7C9A92] text-sm">Experience</p>
                </div>
              </motion.div>
              {seller.languages && seller.languages.length > 0 && (
                <motion.div variants={fadeIn} className="flex items-center">
                  <Languages className="h-5 w-5 text-[#7C9A92] mr-2" />
                  <div>
                    <p className="text-[#4A6670] font-medium">{seller.languages.join(", ")}</p>
                    <p className="text-[#7C9A92] text-sm">Languages</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>

          {/* Availability */}
          <motion.section variants={stagger} className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#4A6670] mb-4">Availability</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {seller.availability && seller.availability.length > 0 ? (
                seller.availability.map((slot, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="flex items-center justify-between bg-[#F8F5F1] p-3 rounded-lg"
                  >
                    <span className="text-[#4A6670] font-medium">{slot.split(" ")[0]}</span>
                    <span className="text-[#7C9A92]">{slot.split(" ").slice(1).join(" ")}</span>
                  </motion.div>
                ))
              ) : (
                <p className="text-[#7C9A92] text-base">No availability listed.</p>
              )}
            </div>
          </motion.section>

          {/* Certifications */}
          <motion.section variants={stagger} className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#4A6670] mb-4">Certifications</h2>
            <div className="space-y-3">
              {seller.certifications && seller.certifications.length > 0 ? (
                seller.certifications.map((cert, index) => (
                  <motion.div key={index} variants={fadeIn} className="flex items-center">
                    <Award className="h-5 w-5 text-[#7C9A92] mr-3" />
                    <span className="text-[#7C9A92] text-base">{cert}</span>
                  </motion.div>
                ))
              ) : (
                <p className="text-[#7C9A92] text-base">No certifications listed.</p>
              )}
            </div>
          </motion.section>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-[#4A6670] text-[#E8DED1] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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