"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@terapias/db/supabase";
import UserCard from "@terapias/components/userCard";

// Define the SellerTherapy type for the seller_therapies relationship
interface SellerTherapy {
  therapy: {
    name: string;
  };
}

// Define the raw Seller type as returned by Supabase (before transformation)
interface RawSeller {
  useruid: string;
  name: string;
  email: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  languages: string[];
  experience: string;
  certifications: string[];
  availability: string[];
  price: string;
  bio: string;
  teachingStyle: string;
  nextAvailable: string;
  verified: boolean;
  featured: boolean;
  studentCount: number;
  sessionTypes: { name: string; duration: string; price: string; description: string }[];
  seller_therapies: SellerTherapy[];
}

// Updated Seller interface with transformed specialties
interface Seller {
  useruid: string;
  name: string;
  email: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  languages: string[];
  experience: string;
  specialties: string[]; // Transformed from seller_therapies
  certifications: string[];
  availability: string[];
  price: string;
  bio: string;
  teachingStyle: string;
  nextAvailable: string;
  verified: boolean;
  featured: boolean;
  studentCount: number;
  sessionTypes: { name: string; duration: string; price: string; description: string }[];
}

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
const stagger = { visible: { transition: { staggerChildren: 0.2 } } };

export default function FeaturedPractitioners() {
  const [sellers, setSellers] = useState<Seller[]>([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const { data, error } = await supabase
          .from("seller")
          .select(`
            *,
            seller_therapies (
              therapy:therapies (name)
            )
          `)
          .limit(6);

        if (error) throw error;

        // Map the data to transform seller_therapies into specialties
        const sellersWithSpecialties: Seller[] = (data as RawSeller[]).map((seller: RawSeller) => ({
          ...seller,
          specialties: seller.seller_therapies?.map((st: SellerTherapy) => st.therapy.name) || [],
        }));

        setSellers(sellersWithSpecialties || []);
      } catch (err) {
        console.error("Error fetching sellers:", err);
      }
    };
    fetchSellers();
  }, []);

  return (
    <section className="py-20 bg-[#F8F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          className="flex justify-between items-center mb-10"
        >
          <h2 className="text-4xl font-bold text-[#4A6670]">Featured Wellness Guides</h2>
          <Link href="/practitioners" className="text-[#E6B17E] hover:text-[#D9A066] flex items-center">
            See All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sellers.map((seller) => (
            <motion.div variants={fadeIn} key={seller.useruid}>
              <UserCard
                email={seller.email}
                useruid={seller.useruid}
                name={seller.name}
                title={seller.title}
                image={seller.image}
                rating={seller.rating}
                reviews={seller.reviews}
                location={seller.location}
                experience={seller.experience}
                studentCount={seller.studentCount}
                nextAvailable={seller.nextAvailable}
                specialties={seller.specialties}
                price={seller.price}
                verified={seller.verified}
                featured={seller.featured}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}