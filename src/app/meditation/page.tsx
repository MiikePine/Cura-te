// "use client"
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import { supabase } from "@terapias/db/supabase";
// import { Search } from "lucide-react";
// import Image from "next/image";
// import { useDispatch, useSelector } from "react-redux";
// import { setSellers } from "../../store/userSlice";
// import { RootState } from "../../store/types"; // Certifique-se de importar o tipo correto

// const Meditation = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const dispatch = useDispatch();
//   const sellers = useSelector((state: RootState) => state.user.sellers);

//   useEffect(() => {
//     const fetchSellers = async () => {
//       const { data, error } = await supabase
//         .from("seller")
//         .select("*")
//         .eq("branch", "Meditação");

//       if (error) {
//         console.error("Error fetching sellers:", error);
//         return;
//       }

//       dispatch(setSellers(data));
//     };

//     fetchSellers();
//   }, [dispatch]);

//   return (
//   //   <div className="min-h-screen bg-[#F8F5F1]">
//   //     {/* Hero Section */}
//   //     <div className="relative bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white overflow-hidden">
//   //       <div className="absolute inset-0">
//   //         <Image
//   //           src="https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&q=80"
//   //           alt="Background"
//   //           className="w-full h-full object-cover opacity-10"
//   //           width={160}
//   //           height={160}
//   //         />
//   //       </div>
//   //       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//   //         <div className="text-center max-w-3xl mx-auto">
//   //           <h1 className="text-4xl md:text-6xl font-bold mb-6">Meditation</h1>
//   //           <p className="text-xl mb-12 text-[#E8DED1]">
//   //             Connect with experienced shamanic healers and embark on a
//   //             transformative spiritual journey
//   //           </p>
//   //           <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
//   //             <div className="flex flex-col md:flex-row gap-4">
//   //               <div className="flex-1 relative">
//   //                 <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#7C9A92]" />
//   //                 <input
//   //                   type="text"
//   //                   placeholder="Search sellers by name or title..."
//   //                   className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
//   //                   value={searchQuery}
//   //                   onChange={(e) => setSearchQuery(e.target.value)}
//   //                 />
//   //               </div>
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </div>

//   //     {/* Sellers Grid */}
//   //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//   //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//   //         {sellers
//   //           .filter(
//   //             (seller) =>
//   //               seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//   //               seller.title.toLowerCase().includes(searchQuery.toLowerCase())
//   //           )
//   //           .map((seller) => (
//   //             <Link key={seller.id} href={`/profile/${seller.name}`}>
//   //               <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
//   //                 <div className="relative">
//   //                   <Image
//   //                     src={seller.image}
//   //                     alt={seller.name}
//   //                     className="w-full h-48 object-cover"
//   //                     width={160}
//   //                     height={160}
//   //                   />
//   //                 </div>
//   //                 <div className="p-6">
//   //                   <h3 className="text-xl font-semibold text-[#4A6670] mb-1">
//   //                     {seller.name}
//   //                   </h3>
//   //                   <p className="text-[#7C9A92] mb-3">
//   //                     Shamanic Meditation Practitioner
//   //                   </p>
//   //                 </div>
//   //               </div>
//   //             </Link>
//   //           ))}
//   //       </div>
//   //     </div>
//   //   </div>
//   // );
// };

// export default Meditation;

"use client"
import React, { useState } from 'react';
import {
  Search, Filter, Star, MapPin, Globe, Book,
  Clock, Heart, Calendar, Award, MessageSquare,
  Users, ChevronDown, Sliders, CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Teacher {
  id: number;
  name: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  languages: string[];
  experience: string;
  specialties: string[];
  certifications: string[];
  availability: string[];
  price: string;
  bio: string;
  teachingStyle: string;
  nextAvailable: string;
  verified: boolean;
  featured: boolean;
  studentCount: number;
  sessionTypes: {
    name: string;
    duration: string;
    price: string;
    description: string;
  }[];
}

const teachers: Teacher[] = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    title: "Mindfulness & Vipassana Meditation Teacher",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: 128,
    location: "Vancouver, BC",
    languages: ["English", "Mandarin"],
    experience: "15+ years",
    specialties: ["Vipassana", "MBSR", "Corporate Mindfulness"],
    certifications: [
      "PhD in Buddhist Studies",
      "Certified MBSR Instructor",
      "Mindfulness Teacher Training - Oxford"
    ],
    availability: [
      "Mon-Wed: 9:00 AM - 5:00 PM",
      "Sat: 10:00 AM - 2:00 PM"
    ],
    price: "From $120/session",
    bio: "Dr. Chen combines traditional Buddhist meditation practices with modern mindfulness techniques...",
    teachingStyle: "Compassionate and scientific approach, emphasizing practical applications...",
    nextAvailable: "Tomorrow",
    verified: true,
    featured: true,
    studentCount: 1200,
    sessionTypes: [
      {
        name: "1:1 Meditation Guidance",
        duration: "60 min",
        price: "$120",
        description: "Personalized meditation instruction and practice"
      },
      {
        name: "Group Meditation",
        duration: "90 min",
        price: "$45",
        description: "Small group meditation session (max 6 people)"
      }
    ]
  },
  {
    id: 2,
    name: "Master Karma Rinchen",
    title: "Tibetan Buddhist Meditation Master",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80",
    rating: 5.0,
    reviews: 89,
    location: "Dharamsala, India (Online)",
    languages: ["English", "Tibetan"],
    experience: "25+ years",
    specialties: ["Tibetan Buddhism", "Dzogchen", "Dream Yoga"],
    certifications: [
      "Certified Tibetan Buddhist Teacher",
      "Advanced Meditation Instructor"
    ],
    availability: [
      "Tue-Thu: 7:00 AM - 3:00 PM",
      "Sun: 7:00 AM - 12:00 PM"
    ],
    price: "From $150/session",
    bio: "A respected master in the Nyingma tradition, teaching authentic Tibetan meditation practices...",
    teachingStyle: "Traditional approach with modern accessibility...",
    nextAvailable: "3 days",
    verified: true,
    featured: true,
    studentCount: 850,
    sessionTypes: [
      {
        name: "Private Teaching",
        duration: "90 min",
        price: "$150",
        description: "One-on-one traditional Buddhist teaching"
      }
    ]
  },
  // Add more teachers...
];

const specialtyFilters = [
  "All Specialties",
  "Vipassana",
  "Mindfulness",
  "Zen",
  "Tibetan Buddhism",
  "Transcendental Meditation",
  "Corporate Mindfulness",
  "Beginner-Friendly"
];

const experienceFilters = [
  "Any Experience",
  "5+ years",
  "10+ years",
  "20+ years"
];

const languageFilters = [
  "Any Language",
  "English",
  "Mandarin",
  "Hindi",
  "Spanish",
  "Portuguese"
];

export default function MeditationTeachers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedExperience, setSelectedExperience] = useState("Any Experience");
  const [selectedLanguage, setSelectedLanguage] = useState("Any Language");
  const [showFilters, setShowFilters] = useState(false);

  const renderTeacherCard = (teacher: Teacher) => (
    <div key={teacher.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <Image
          src={teacher.image}
          alt={teacher.name}
          width={400}
          height={300}
          className="w-full h-64 object-cover"
        />
        {teacher.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-[#4A6670] text-white rounded-full text-sm">
            Featured Teacher
          </div>
        )}
        {teacher.verified && (
          <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
            <CheckCircle className="h-5 w-5 text-[#7C9A92]" />
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-[#4A6670]">{teacher.name}</h3>
            <p className="text-[#7C9A92] text-sm">{teacher.title}</p>
          </div>
          <button className="text-[#7C9A92] hover:text-[#4A6670] transition-colors">
            <Heart className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center mb-4">
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          <span className="ml-1 font-semibold text-[#4A6670]">{teacher.rating}</span>
          <span className="mx-1 text-[#7C9A92]">•</span>
          <span className="text-[#7C9A92]">{teacher.reviews} reviews</span>
        </div>

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center text-[#4A6670]">
            <MapPin className="h-4 w-4 mr-2 text-[#7C9A92]" />
            {teacher.location}
          </div>
          <div className="flex items-center text-[#4A6670]">
            <Globe className="h-4 w-4 mr-2 text-[#7C9A92]" />
            {teacher.languages.join(", ")}
          </div>
          <div className="flex items-center text-[#4A6670]">
            <Book className="h-4 w-4 mr-2 text-[#7C9A92]" />
            {teacher.experience} experience
          </div>
          <div className="flex items-center text-[#4A6670]">
            <Users className="h-4 w-4 mr-2 text-[#7C9A92]" />
            {teacher.studentCount}+ students taught
          </div>
          <div className="flex items-center text-[#4A6670]">
            <Calendar className="h-4 w-4 mr-2 text-[#7C9A92]" />
            Next available: {teacher.nextAvailable}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {teacher.specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#F8F5F1] text-[#7C9A92] rounded-full text-sm"
            >
              {specialty}
            </span>
          ))}
        </div>

        <div className="border-t border-[#E8DED1] pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-[#7C9A92]">Starting from</p>
              <p className="text-lg font-bold text-[#4A6670]">{teacher.price}</p>
            </div>
            <div className="space-x-2">
              <button className="px-4 py-2 border border-[#7C9A92] text-[#7C9A92] rounded-lg hover:bg-[#F8F5F1] transition-colors">
                View Profile
              </button>
              <button className="px-4 py-2 bg-[#7C9A92] text-white rounded-lg hover:bg-[#6A8B83] transition-colors">
                Book Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F5F1]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80"
            alt="Meditation Background"
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Meditation Teacher
            </h1>
            <p className="text-xl mb-12 text-[#E8DED1]">
              Connect with experienced meditation teachers and start your journey to inner peace
            </p>

            {/* Search and Filter Bar */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#7C9A92]" />
                  <input
                    type="text"
                    placeholder="Search by name, specialty, or location..."
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-6 py-3 bg-white text-[#4A6670] rounded-lg hover:bg-[#E8DED1] transition-colors"
                >
                  <Sliders className="h-5 w-5 mr-2" />
                  Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white border-b border-[#E8DED1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Specialty Filter */}
              <div>
                <label className="block text-sm font-medium text-[#4A6670] mb-2">
                  Specialty
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full p-3 bg-[#F8F5F1] rounded-lg text-[#4A6670] border-none focus:ring-2 focus:ring-[#7C9A92]"
                >
                  {specialtyFilters.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Filter */}
              <div>
                <label className="block text-sm font-medium text-[#4A6670] mb-2">
                  Experience Level
                </label>
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="w-full p-3 bg-[#F8F5F1] rounded-lg text-[#4A6670] border-none focus:ring-2 focus:ring-[#7C9A92]"
                >
                  {experienceFilters.map((exp) => (
                    <option key={exp} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Filter */}
              <div>
                <label className="block text-sm font-medium text-[#4A6670] mb-2">
                  Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full p-3 bg-[#F8F5F1] rounded-lg text-[#4A6670] border-none focus:ring-2 focus:ring-[#7C9A92]"
                >
                  {languageFilters.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Bar */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-[#4A6670]">50+</p>
              <p className="text-[#7C9A92]">Verified Teachers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#4A6670]">1,000+</p>
              <p className="text-[#7C9A92]">Happy Students</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#4A6670]">15+</p>
              <p className="text-[#7C9A92]">Meditation Styles</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#4A6670]">4.8/5</p>
              <p className="text-[#7C9A92]">Average Rating</p>
            </div>
          </div>
        </div>

        {/* Featured Teachers Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#4A6670] mb-6">Featured Teachers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.filter(t => t.featured).map(renderTeacherCard)}
          </div>
        </div>

        {/* All Teachers Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#4A6670]">All Teachers</h2>
            <div className="flex items-center space-x-4">
              <span className="text-[#7C9A92]">Sort by:</span>
              <select className="bg-white border border-[#E8DED1] rounded-lg px-4 py-2 text-[#4A6670]">
                <option>Recommended</option>
                <option>Rating: High to Low</option>
                <option>Price: Low to High</option>
                <option>Experience</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map(renderTeacherCard)}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-white text-[#7C9A92] px-8 py-3 rounded-lg hover:bg-[#E8DED1] transition-colors">
            Load More Teachers
          </button>
        </div>
      </div>
    </div>
  );
}