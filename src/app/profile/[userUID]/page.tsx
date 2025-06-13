
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  MapPin,
  Star,
  ShieldCheck,
  Calendar,
  MessageCircle,
  Clock,
  Globe,
  Languages,
  Award,
  Feather,
  Sparkles,
} from "lucide-react";
import { supabase } from "@terapias/db/supabase";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Database } from "../../../../supabase/database.types";

type SellerRow = Database["public"]["Tables"]["seller"]["Row"];

interface SellerTherapy {
  therapy: { name: string };
}

interface SessionType {
  name: string;
  duration: string;
  price: string;
  description: string;
}

interface RawSeller extends SellerRow {
  seller_therapies: SellerTherapy[];
}

interface Seller extends Omit<RawSeller, "seller_therapies" | "session_types"> {
  specialties: string[];
  session_types: SessionType[] | null;
}

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const scaleIn = { hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.2 } } };

export default function SellerProfile() {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { useruid } = useParams();

  useEffect(() => {
    const fetchSeller = async () => {
      if (!useruid) {
        setError("No practitioner ID provided");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("seller")
          .select(`
            useruid,
            created_at,
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
            lat,
            lng,
            seller_therapies (
              therapy:therapies (name)
            )
          `)
          .eq("useruid", useruid)
          .single();

        if (error) throw error;

        if (!data) {
          setError("No practitioner found with this ID");
          setSeller(null);
        } else {
          const rawSeller = data as unknown as RawSeller;
          const sellerWithSpecialties: Seller = {
            ...rawSeller,
            specialties: rawSeller.seller_therapies?.map((st) => st.therapy.name) || [],
            session_types: Array.isArray(rawSeller.session_types)
              ? (rawSeller.session_types as unknown as SessionType[])
              : null,
          };
          setSeller(sellerWithSpecialties);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load practitioner profile");
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [useruid]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5F1] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-12 w-12 border-4 border-[#7C9A92] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className="min-h-screen bg-[#F8F5F1] flex items-center justify-center">
        <p className="text-[#4A6670] text-lg">{error || "No practitioner found"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F1] font-sans">
      {/* Hero Section */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative bg-gradient-to-b from-[#7C9A92] to-[#4A6670] text-white py-24 overflow-hidden"
      >
        <Image
          src={seller.image || "https://images.unsplash.com/photo-1517495307481-d59b8bf8b80e?auto=format&fit=crop&q=80"}
          alt="Background"
          className="absolute inset-0 opacity-20 object-cover"
          width={1920}
          height={1080}
          priority
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-[#E8DED1] hover:text-[#E6B17E] flex items-center mb-6 text-sm">
            <span className="mr-2">←</span> Back to Home
          </Link>
          <motion.div variants={stagger} className="flex flex-col md:flex-row items-center gap-8">
            <motion.div variants={scaleIn} className="relative">
              <Image
                src={seller.image || "https://via.placeholder.com/150"}
                alt={seller.name || "Profile picture"}
                width={160}
                height={160}
                className="w-40 h-40 rounded-full object-cover border-4 border-[#E8DED1] shadow-lg"
              />
              {seller.verified && (
                <div className="absolute bottom-0 right-0 bg-[#E6B17E] text-white p-2 rounded-full shadow-md">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              )}
              {seller.featured && (
                <div className="absolute top-0 left-0 bg-[#E6B17E] text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Featured
                </div>
              )}
            </motion.div>
            <div className="text-center md:text-left">
              <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-bold mb-3">
                {seller.name || "Unnamed Practitioner"}
              </motion.h1>
              <motion.p variants={fadeIn} className="text-xl text-[#E8DED1] mb-4">
                {seller.title || "Holistic Practitioner"}
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-wrap gap-4 mb-6 justify-center md:justify-start">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-[#E8DED1] mr-2" />
                  <span className="text-[#E8DED1]">{seller.location || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-[#E6B17E] mr-2" />
                  <span className="text-[#E8DED1]">
                    {seller.rating ? seller.rating.toFixed(1) : "N/A"} ({seller.reviews || 0} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-[#E8DED1] mr-2" />
                  <span className="text-[#E8DED1]">{seller.student_count || 0} students</span>
                </div>
              </motion.div>
              <motion.div variants={fadeIn} className="flex gap-4 justify-center md:justify-start">
                <Link
                  href="#message"
                  className="inline-flex items-center px-6 py-3 bg-[#F8F5F1] text-[#4A6670] rounded-full hover:bg-[#E8DED1] transition-all duration-300 text-sm font-medium shadow-sm"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Link>
                <Link
                  href="#book"
                  className="inline-flex items-center px-6 py-3 bg-[#E6B17E] text-white rounded-full hover:bg-[#D9A066] transition-all duration-300 text-sm font-medium shadow-sm"
                >
                  Book Now <Calendar className="h-4 w-4 ml-2" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial="hidden" whileInView="visible" variants={stagger} className="space-y-12">
          {/* About Section */}
          <motion.section variants={fadeIn} className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-[#4A6670] mb-4">About</h2>
            <p className="text-[#7C9A92] text-lg leading-relaxed">
              {seller.bio || "Dedicated to guiding you toward balance and well-being through holistic practices."}
            </p>
            {seller.teaching_style && (
              <div className="mt-6">
                <h3 className="text-xl font-medium text-[#4A6670] mb-2">Teaching Style</h3>
                <p className="text-[#7C9A92] text-lg leading-relaxed">{seller.teaching_style}</p>
              </div>
            )}
          </motion.section>

          {/* Specialties Section */}
          <motion.section variants={fadeIn} className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-[#4A6670] mb-4">Specialties</h2>
            <div className="flex flex-wrap gap-3">
              {seller.specialties.length > 0 ? (
                seller.specialties.map((specialty, index) => (
                  <motion.span
                    key={index}
                    variants={fadeIn}
                    className="inline-flex items-center bg-[#7C9A92]/10 text-[#7C9A92] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#7C9A92]/20 transition-colors"
                  >
                    <Feather className="h-4 w-4 mr-2" />
                    {specialty}
                  </motion.span>
                ))
              ) : (
                <p className="text-[#7C9A92] text-lg">No specialties listed.</p>
              )}
            </div>
          </motion.section>

          {/* Session Types Section */}
          <motion.section variants={stagger} className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-[#4A6670] mb-6">Session Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seller.session_types && seller.session_types.length > 0 ? (
                seller.session_types.map((session, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="border border-[#E8DED1] rounded-xl p-6 hover:bg-[#F8F5F1] transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-medium text-[#4A6670]">{session.name}</h3>
                        <p className="text-[#7C9A92] text-sm flex items-center">
                          <Clock className="h-4 w-4 mr-2" /> {session.duration}
                        </p>
                      </div>
                      <span className="text-[#E6B17E] font-semibold text-lg">{session.price}</span>
                    </div>
                    <p className="text-[#7C9A92] text-sm mb-4">{session.description}</p>
                    <Link
                      href="#book"
                      className="inline-block text-[#7C9A92] hover:text-[#E6B17E] text-sm font-medium"
                    >
                      Book This Session
                    </Link>
                  </motion.div>
                ))
              ) : (
                <p className="text-[#7C9A92] text-lg col-span-2">No session types available.</p>
              )}
            </div>
          </motion.section>

          {/* Quick Info Section */}
          <motion.section variants={stagger} className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-[#4A6670] mb-6">Quick Info</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div variants={fadeIn} className="flex items-center gap-3">
                <Star className="h-6 w-6 text-[#E6B17E]" />
                <div>
                  <p className="text-[#4A6670] font-medium text-lg">{seller.rating ? seller.rating.toFixed(1) : "N/A"}</p>
                  <p className="text-[#7C9A92] text-sm">{seller.reviews || 0} reviews</p>
                </div>
              </motion.div>
              <motion.div variants={fadeIn} className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-[#7C9A92]" />
                <div>
                  <p className="text-[#4A6670] font-medium text-lg">{seller.student_count || 0}</p>
                  <p className="text-[#7C9A92] text-sm">Students</p>
                </div>
              </motion.div>
              <motion.div variants={fadeIn} className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-[#7C9A92]" />
                <div>
                  <p className="text-[#4A6670] font-medium text-lg">{seller.experience || "N/A"}</p>
                  <p className="text-[#7C9A92] text-sm">Experience</p>
                </div>
              </motion.div>
              {seller.languages && seller.languages.length > 0 && (
                <motion.div variants={fadeIn} className="flex items-center gap-3">
                  <Languages className="h-6 w-6 text-[#7C9A92]" />
                  <div>
                    <p className="text-[#4A6670] font-medium text-lg">{seller.languages.join(", ")}</p>
                    <p className="text-[#7C9A92] text-sm">Languages</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>

          {/* Availability Section */}
          <motion.section variants={stagger} className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-[#4A6670] mb-6">Availability</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {seller.availability && seller.availability.length > 0 ? (
                seller.availability.map((slot, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="bg-[#F8F5F1] p-4 rounded-xl flex items-center justify-between"
                  >
                    <span className="text-[#4A6670] font-medium">{slot.split(" ")[0]}</span>
                    <span className="text-[#7C9A92] text-sm">{slot.split(" ").slice(1).join(" ") || "All day"}</span>
                  </motion.div>
                ))
              ) : (
                <p className="text-[#7C9A92] text-lg col-span-3">No availability listed.</p>
              )}
            </div>
            {seller.next_available && (
              <motion.p variants={fadeIn} className="mt-6 text-[#7C9A92] text-lg">
                <Calendar className="inline h-5 w-5 mr-2" />
                Next available: {new Date(seller.next_available).toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </motion.p>
            )}
          </motion.section>

          {/* Certifications Section */}
          <motion.section variants={stagger} className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-[#4A6670] mb-6">Certifications</h2>
            <div className="space-y-4">
              {seller.certifications && seller.certifications.length > 0 ? (
                seller.certifications.map((cert, index) => (
                  <motion.div key={index} variants={fadeIn} className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-[#7C9A92]" />
                    <span className="text-[#7C9A92] text-lg">{cert}</span>
                  </motion.div>
                ))
              ) : (
                <p className="text-[#7C9A92] text-lg">No certifications listed.</p>
              )}
            </div>
          </motion.section>

          {/* Location Section (if lat/lng are provided) */}
          {(seller.lat || seller.lng) && (
            <motion.section variants={fadeIn} className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-3xl font-semibold text-[#4A6670] mb-6">Location</h2>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-6 w-6 text-[#7C9A92]" />
                <span className="text-[#7C9A92] text-lg">{seller.location || "N/A"}</span>
              </div>
              <p className="text-[#7C9A92] text-sm">Map integration coming soon!</p>
            </motion.section>
          )}
        </motion.div>
      </main>

      {/* Call to Action Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        className="bg-gradient-to-r from-[#7C9A92] to-[#4A6670] text-white py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Healing Journey</h2>
          <p className="text-lg text-[#E8DED1] mb-8 max-w-2xl mx-auto">
            Connect with {seller.name || "this practitioner"} to experience the transformative power of holistic wellness.
          </p>
          <Link
            href="#book"
            className="inline-flex items-center px-8 py-4 bg-[#E6B17E] text-white rounded-full hover:bg-[#D9A066] transition-all duration-300 text-base font-medium shadow-md"
          >
            Book a Session <Sparkles className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#4A6670] text-[#E8DED1] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            © 2025 Luzia. All rights reserved. |{" "}
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
