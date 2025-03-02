"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, CheckCircle } from "lucide-react";

interface UserCardProps {
  useruid: string;
  name: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  experience: string;
  studentCount: number;
  nextAvailable: string;
  specialties: string[];
  price: string;
  verified: boolean;
  email: string;
  featured: boolean;
}

export default function UserCard({
  useruid,
  name,
  title,
  image,
  rating,
  reviews,
  location,
  experience,
  studentCount,
  nextAvailable,
  specialties,
  price,
  verified,
 
 
}: UserCardProps) {
  return (
    <Link href={`/profile/${useruid}`} className="block">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border border-[#E6B17E]/30">
        {/* Imagem e informações principais */}
        <div className="flex items-center space-x-4">
          <Image
            src={image || "https://via.placeholder.com/150"}
            alt={name}
            width={80}
            height={80}
            className="rounded-full object-cover w-20 h-20 border-2 border-[#E6B17E]/50"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#4A6670] flex items-center gap-2">
              {name} {verified && <CheckCircle className="text-[#E6B17E] w-5 h-5" />}
            </h3>
            <p className="text-sm text-[#7C9A92]">{title}</p>
            <p className="text-xs text-[#7C9A92]">{location}</p>
            <p className="text-xs text-[#7C9A92]">{specialties?.[0] || "Holistic Therapy"}</p>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-sm text-[#4A6670] flex items-center gap-1">
            <Star className="text-[#E6B17E] w-4 h-4" /> {rating} ({reviews} reviews)
          </p>
          <p className="text-sm text-[#4A6670]">Experience: {experience} years</p>
          <p className="text-sm text-[#4A6670]">Students: {studentCount}+</p>
          <p className="text-sm text-[#4A6670]">Next Available: {nextAvailable}</p>
          <p className="text-sm font-medium text-[#E6B17E]">Price: {price}</p>
        </div>
      </div>
    </Link>
  );
}
