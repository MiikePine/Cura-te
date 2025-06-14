
"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@terapias/db/supabase";
import { Search, MapPin, Globe, Sparkles, Heart, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setSellers } from "../../../store/userSlice";
import UserCard from "@terapias/components/userCard";
import { RootState, AppDispatch } from "../../../store/store";
import { motion } from "framer-motion";
import Link from "next/link";

// Define Seller type
type Seller = {
  useruid: string;
  name: string | null;
  email: string | null;
  title: string | null;
  image: string | null;
  rating: number | null;
  reviews: number | null;
  location: string | null;
  languages: string[] | null;
  experience: string | null;
  certifications: string[] | null;
  availability: string[] | null;
  price: string | null;
  bio: string | null;
  teaching_style: string | null;
  next_available: string | null;
  verified: boolean | null;
  featured: boolean | null;
  student_count: number | null;
  session_types: { name: string; duration: string; price: string; description: string }[] | null;
  specialties?: string[];
};

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardHover = {
  hover: { scale: 1.02, boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)", transition: { duration: 0.3 } },
};

export default function Reiki() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sessionTypeFilter, setSessionTypeFilter] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [isSessionTypeFocused, setIsSessionTypeFocused] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const sellers = useSelector((state: RootState) => state.user.sellers) as Seller[];

  // Fetch Reiki practitioners
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const { data: therapyData, error: therapyError } = await supabase
          .from("therapies")
          .select("id")
          .eq("name", "Reiki")
          .single();

        if (therapyError || !therapyData) {
          console.error("Error fetching Reiki therapy ID:", therapyError);
          return;
        }

        const ReikiTherapyId = therapyData.id;
        const { data: sellerTherapiesData, error: sellerTherapiesError } = await supabase
          .from("seller_therapies")
          .select("seller_id")
          .eq("therapy_id", ReikiTherapyId);

        if (sellerTherapiesError || !sellerTherapiesData) {
          console.error("Error fetching seller_therapies:", sellerTherapiesError);
          return;
        }

        const sellerIds = sellerTherapiesData.map((st) => st.seller_id);
        const { data: sellersData, error: sellersError } = await supabase
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
            session_types
          `)
          .in("useruid", sellerIds)
          .order("rating", { ascending: false });

        if (sellersError) {
          console.error("Error fetching sellers:", sellersError);
          return;
        }

        const sellersWithSpecialties = sellersData.map((seller) => ({
          ...seller,
          specialties: ["Reiki"],
        }));

        dispatch(setSellers(sellersWithSpecialties));
      } catch (err: unknown) {
        console.error("Error in fetchSellers:", err);
      }
    };

    fetchSellers();
  }, [dispatch]);

  // Filter sellers
  const filteredSellers = sellers.filter(
    (seller) =>
      (seller.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seller.title?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (locationFilter === "" || seller.location?.toLowerCase().includes(locationFilter.toLowerCase())) &&
      (sessionTypeFilter === "" ||
        seller.session_types?.some((session) => session.name.toLowerCase().includes(sessionTypeFilter.toLowerCase())))
  );

  const locations = Array.from(new Set(sellers.map((seller) => seller.location || ""))).filter(Boolean);
  const sessionTypes = ["À distância", "Presencialmente"];

  // Workshops data
  const workshops = [
    {
      title: "Reiki Level I Certification",
      description: "Learn the basics of Reiki energy healing in this immersive workshop.",
      date: "March 15, 2025",
      location: "Zurich",
      price: "250 CHF",
      image: "https://images.unsplash.com/photo-1517495307481-d59b8bf8b80e?auto=format&fit=crop&q=80",
    },
    {
      title: "Advanced Reiki Techniques",
      description: "Deepen your practice with advanced energy channeling methods.",
      date: "April 10, 2025",
      location: "Geneva",
      price: "350 CHF",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    },
    {
      title: "Reiki Meditation Retreat",
      description: "A weekend retreat combining Reiki and mindfulness practices.",
      date: "May 20-22, 2025",
      location: "Lausanne",
      price: "500 CHF",
      image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&q=80",
    },
  ];

  // Carousel navigation
  const handleCarouselPrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? workshops.length - 1 : prev - 1));
  };

  const handleCarouselNext = () => {
    setCarouselIndex((prev) => (prev === workshops.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#F8F5F1] font-sans">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white pt-24 pb-32"
      >
        <Image
          src="https://images.unsplash.com/photo-1517495307481-d59b8bf8b80e?auto=format&fit=crop&q=80"
          alt="Reiki Healing"
          className="absolute inset-0 opacity-20 object-cover"
          width={1920}
          height={1080}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            variants={fadeIn}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight"
          >
            Reiki Healing
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-lg sm:text-xl text-[#E8DED1] mb-8 max-w-2xl mx-auto"
          >
            Restore balance and find inner peace with the gentle power of Reiki.
          </motion.p>
          {/* Search Bar */}
          <motion.form
            variants={fadeIn}
            className="sticky top-20 bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-lg max-w-4xl mx-auto border border-[#E8DED1]/20 z-50"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#7C9A92]"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="Search by name or title..."
                  className="w-full pl-12 pr-4 py-3 bg-[#F8F5F1] rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#E6B17E] text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  aria-label="Search practitioners"
                />
              </div>
              <div className="relative flex-1 z-50">
                <MapPin
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#7C9A92]"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="Select a location..."
                  className="w-full pl-12 pr-4 py-3 bg-[#F8F5F1] rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#E6B17E] text-sm"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  onFocus={() => setIsLocationFocused(true)}
                  onBlur={() => setTimeout(() => setIsLocationFocused(false), 200)}
                  aria-label="Select location"
                />
                {isLocationFocused && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={dropdownAnimation}
                    className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-xl max-h-60 overflow-y-auto z-[1000] border border-[#E8DED1]"
                  >
                    <div
                      onClick={() => {
                        setLocationFilter("");
                        setIsLocationFocused(false);
                      }}
                      className="px-4 py-2 text-sm text-[#4A6670] hover:bg-[#E6B17E]/10 cursor-pointer"
                    >
                      All Locations
                    </div>
                    {locations.map((loc) => (
                      <div
                        key={loc}
                        onClick={() => {
                          setLocationFilter(loc);
                          setIsLocationFocused(false);
                        }}
                        className="px-4 py-2 text-sm text-[#4A6670] hover:bg-[#E6B17E]/10 cursor-pointer"
                      >
                        {loc}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
              <div className="relative flex-1 z-50">
                <Globe
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#7C9A92]"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="À distância or Presencialmente..."
                  className="w-full pl-12 pr-4 py-3 bg-[#F8F5F1] rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#E6B17E] text-sm"
                  value={sessionTypeFilter}
                  onChange={(e) => setSessionTypeFilter(e.target.value)}
                  onFocus={() => setIsSessionTypeFocused(true)}
                  onBlur={() => setTimeout(() => setIsSessionTypeFocused(false), 200)}
                  aria-label="Select session type"
                />
                {isSessionTypeFocused && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={dropdownAnimation}
                    className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-xl max-h-60 overflow-y-auto z-[1000] border border-[#E8DED1]"
                  >
                    <div
                      onClick={() => {
                        setSessionTypeFilter("");
                        setIsSessionTypeFocused(false);
                      }}
                      className="px-4 py-2 text-sm text-[#4A6670] hover:bg-[#E6B17E]/10 cursor-pointer"
                    >
                      All Session Types
                    </div>
                    {sessionTypes.map((type) => (
                      <div
                        key={type}
                        onClick={() => {
                          setSessionTypeFilter(type);
                          setIsSessionTypeFocused(false);
                        }}
                        className="px-4 py-2 text-sm text-[#4A6670] hover:bg-[#E6B17E]/10 cursor-pointer"
                      >
                        {type}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.form>
        </div>
      </motion.section>

      {/* About Reiki Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 items-center">
          <motion.div variants={fadeIn} className="md:w-1/2">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
              alt="Reiki Practice"
              className="rounded-2xl shadow-lg object-cover"
              width={600}
              height={400}
            />
          </motion.div>
          <motion.div variants={fadeIn} className="md:w-1/2">
            <h2 className="text-3xl font-bold text-[#4A6670] mb-4">What is Reiki?</h2>
            <p className="text-[#7C9A92] text-lg leading-relaxed mb-4">
              Reiki is a Japanese energy healing technique that promotes relaxation, reduces stress, and restores balance. Through gentle touch or hovering hands, practitioners channel universal energy to support physical, emotional, and spiritual well-being.
            </p>
            <Link
              href="/learn-more/reiki"
              className="text-[#E6B17E] hover:text-[#D9A066] font-medium flex items-center"
            >
              Learn More <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="py-16 bg-[#F8F5F1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-[#4A6670] mb-10 text-center"
          >
            Benefits of Reiki
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: "Stress Relief", desc: "Soothes the mind and reduces anxiety." },
              { icon: Heart, title: "Emotional Balance", desc: "Restores harmony and inner peace." },
              { icon: Zap, title: "Energy Boost", desc: "Revitalizes body and spirit." },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover="hover"
                className="bg-white rounded-2xl p-6 shadow-sm text-center"
                animate={cardHover}
              >
                <div className="bg-[#7C9A92]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-6 w-6 text-[#7C9A92]" />
                </div>
                <h3 className="text-lg font-semibold text-[#4A6670] mb-2">{benefit.title}</h3>
                <p className="text-sm text-[#7C9A92]">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Practitioners Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="py-16 bg-[#F8F5F1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-[#4A6670] mb-8 text-center"
          >
            Meet Our Reiki Practitioners
          </motion.h2>
          {filteredSellers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSellers.map((seller) => (
                <motion.div key={seller.useruid} variants={fadeIn} whileHover="hover" animate={cardHover}>
                  <UserCard
                    useruid={seller.useruid}
                    name={seller.name || "Unnamed Practitioner"}
                    title={seller.title || "Reiki Practitioner"}
                    image={seller.image || "https://via.placeholder.com/150"}
                    rating={seller.rating || 0}
                    reviews={seller.reviews || 0}
                    location={seller.location || "Unknown Location"}
                    experience={seller.experience || "N/A"}
                    studentCount={seller.student_count || 0}
                    nextAvailable={seller.next_available || "N/A"}
                    specialties={seller.specialties || ["Reiki"]}
                    price={seller.price || "N/A"}
                    verified={seller.verified || false}
                    email={seller.email || ""}
                    featured={seller.featured || false}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div variants={fadeIn} className="text-center">
              <p className="text-[#7C9A92] text-lg mb-4">No Reiki practitioners found.</p>
              <p className="text-[#4A6670] text-sm">Try adjusting your filters or check back later.</p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Workshops Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-[#4A6670] mb-8 text-center"
          >
            Reiki Workshops & Courses
          </motion.h2>
          <div className="relative">
            <motion.div
              className="flex overflow-hidden"
              animate={{ x: `-${carouselIndex * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {workshops.map((workshop, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover="hover"
                  animate={cardHover}
                  className="min-w-full sm:min-w-[50%] lg:min-w-[33.33%] px-2"
                >
                  <div className="bg-[#F8F5F1] rounded-2xl p-4 shadow-sm">
                    <Image
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      width={400}
                      height={200}
                    />
                    <h3 className="text-lg font-semibold text-[#4A6670] mb-2">{workshop.title}</h3>
                    <p className="text-sm text-[#7C9A92] mb-4">{workshop.description}</p>
                    <div className="text-xs text-[#4A6670] mb-4">
                      <p><span className="font-semibold">Date:</span> {workshop.date}</p>
                      <p><span className="font-semibold">Location:</span> {workshop.location}</p>
                      <p><span className="font-semibold">Price:</span> {workshop.price}</p>
                    </div>
                    <Link
                      href="/workshops"
                      className="block text-center px-4 py-2 bg-[#7C9A92] text-white rounded-lg hover:bg-[#E6B17E] transition-colors text-sm"
                    >
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <button
              onClick={handleCarouselPrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
              aria-label="Previous workshop"
            >
              <ChevronLeft className="h-6 w-6 text-[#4A6670]" />
            </button>
            <button
              onClick={handleCarouselNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
              aria-label="Next workshop"
            >
              <ChevronRight className="h-6 w-6 text-[#4A6670]" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="py-16 bg-[#F8F5F1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-[#4A6670] mb-8 text-center"
          >
            What People Say About Reiki
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                content: "Reiki brought me peace after years of stress. Truly life-changing!",
                author: "Anna S.",
                location: "Zurich",
                avatar: "https://ui-avatars.com/api/?name=Anna+S&background=7C9A92&color=fff",
              },
              {
                content: "My energy levels are incredible now. I feel so balanced!",
                author: "Luc M.",
                location: "Geneva",
                avatar: "https://ui-avatars.com/api/?name=Luc+M&background=7C9A92&color=fff",
              },
              {
                content: "A gentle yet powerful experience. Highly recommend!",
                author: "Clara B.",
                location: "Lausanne",
                avatar: "https://ui-avatars.com/api/?name=Clara+B&background=7C9A92&color=fff",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover="hover"
                animate={cardHover}
                className="bg-white rounded-2xl p-6 shadow-sm text-center"
              >
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mx-auto mb-4"
                  width={48}
                  height={48}
                />
                <p className="text-sm text-[#4A6670] italic mb-4">"{testimonial.content}"</p>
                <p className="text-[#7C9A92] font-semibold text-sm">{testimonial.author}</p>
                <p className="text-[#7C9A92] text-xs">{testimonial.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="py-16 bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold mb-4"
          >
            Start Your Reiki Journey Today
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-lg text-[#E8DED1] mb-8 max-w-2xl mx-auto"
          >
            Connect with skilled practitioners or share your healing gifts with our community.
          </motion.p>
          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/register"
              className="px-8 py-3 bg-[#E6B17E] text-white rounded-lg hover:bg-[#D9A066] transition-colors text-sm font-medium"
            >
              Become a Practitioner
            </Link>
            <Link
              href="/practitioners"
              className="px-8 py-3 bg-white text-[#4A6670] rounded-lg hover:bg-[#E8DED1] transition-colors text-sm font-medium"
            >
              Explore More
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
