"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@terapias/db/supabase";
import { Search, Filter, Sparkles, Heart, Zap, BookOpen } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setSellers } from "../../../store/userSlice";
import UserCard from "@terapias/components/userCard";
import { RootState, AppDispatch } from "../../../store/store";

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

const Tantra = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const sellers = useSelector((state: RootState) => state.user.sellers) as Seller[];

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        // Passo 1: Buscar o therapy_id de "tantra"
        const { data: therapyData, error: therapyError } = await supabase
          .from("therapies")
          .select("id")
          .eq("name", "tantra")
          .single();

        if (therapyError || !therapyData) {
          console.error("Error fetching tantra therapy ID:", therapyError);
          console.log("Therapy data:", therapyData);
          return;
        }

        const tantraTherapyId = therapyData.id;
        console.log("tantra therapy ID:", tantraTherapyId);

        // Passo 2: Buscar terapeutas associados a "tantra" via seller_therapies
        const { data: sellerTherapiesData, error: sellerTherapiesError } = await supabase
          .from("seller_therapies")
          .select("seller_id")
          .eq("therapy_id", tantraTherapyId);

        if (sellerTherapiesError || !sellerTherapiesData) {
          console.error("Error fetching seller_therapies:", sellerTherapiesError);
          console.log("Seller therapies data:", sellerTherapiesData);
          return;
        }

        const sellerIds = sellerTherapiesData.map((st) => st.seller_id);
        console.log("Seller IDs with tantra:", sellerIds);

        // Passo 3: Buscar detalhes dos terapeutas em seller
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

        // Passo 4: Adicionar especialidades (opcional, mas útil para consistência)
        const sellersWithSpecialties = sellersData.map((seller) => ({
          ...seller,
          specialties: ["tantra"], // Como já filtramos por tantra, adicionamos diretamente
        }));

        console.log("Sellers fetched:", sellersWithSpecialties);
        dispatch(setSellers(sellersWithSpecialties));
      } catch (err: unknown) {
        // Type as unknown and handle safely
        if (err instanceof Error) {
          console.error("Error in fetchSellers:", {
            message: err.message,
       
          });
        } else {
          console.error("Unknown error in fetchSellers:", err);
        }
      }
    };

    fetchSellers();
  }, [dispatch]);

  const filteredSellers = sellers.filter(
    (seller) =>
      (seller.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seller.title?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (locationFilter === "" || seller.location?.toLowerCase().includes(locationFilter.toLowerCase()))
  );

  const locations = Array.from(new Set(sellers.map((seller) => seller.location || ""))).filter(Boolean);

  const workshops = [
    {
      title: "tantra Level I Certification",
      description: "Learn the basics of tantra energy healing in this immersive workshop.",
      date: "March 15, 2025",
      location: "Zurich",
      price: "250 CHF",
    },
    {
      title: "Advanced tantra Techniques",
      description: "Deepen your practice with advanced energy channeling methods.",
      date: "April 10, 2025",
      location: "Geneva",
      price: "350 CHF",
    },
    {
      title: "tantra Meditation Retreat",
      description: "A weekend retreat combining tantra and mindfulness practices.",
      date: "May 20-22, 2025",
      location: "Lausanne",
      price: "500 CHF",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F1]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white py-32 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517495307481-d59b8bf8b80e?auto=format&fit=crop&q=80"
          alt="tantra Healing"
          className="absolute inset-0 opacity-20 object-cover"
          width={1920}
          height={1080}
          priority
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">tantra Healing</h1>
          <p className="text-xl md:text-2xl text-[#E8DED1] max-w-3xl mx-auto mb-10">
            Experience the gentle power of tantra – a practice that restores balance and promotes inner peace.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#7C9A92]" />
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative flex-1">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#7C9A92]" />
              <select
                className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-[#4A6670] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* About tantra Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-[#4A6670] mb-4">What is tantra?</h2>
            <p className="text-[#7C9A92] text-lg leading-relaxed">
              tantra is a holistic practice that combines physical postures, breath control, and meditation to promote physical and emotional well-being. Whether you seek calm, clarity, or strength, tantra offers a gentle path to balance and self-discovery.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
              alt="tantra Practice"
              className="rounded-xl shadow-md"
              width={500}
              height={300}
            />
          </div>
        </div>
      </section>

      {/* Benefits of tantra Section */}
      <section className="py-16 bg-[#F8F5F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#4A6670] mb-10 text-center">Benefits of tantra</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: "Reduces Stress", desc: "Calms the mind and eases tension." },
              { icon: Heart, title: "Promotes Balance", desc: "Restores emotional and physical harmony." },
              { icon: Zap, title: "Boosts Energy", desc: "Revitalizes your spirit and body." },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-[#7C9A92]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-[#7C9A92]" />
                </div>
                <h3 className="text-xl font-semibold text-[#4A6670] mb-2">{benefit.title}</h3>
                <p className="text-[#7C9A92]">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practitioners Grid */}
      <section className="py-16 bg-[#F8F5F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#4A6670] mb-8 text-center">Meet Our tantra Practitioners</h2>
          {filteredSellers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSellers.map((seller) => (
                <UserCard
                  key={seller.useruid}
                  useruid={seller.useruid}
                  name={seller.name || "Unnamed Practitioner"}
                  title={seller.title || "tantra Practitioner"}
                  image={seller.image || "https://via.placeholder.com/150"}
                  rating={seller.rating || 0}
                  reviews={seller.reviews || 0}
                  location={seller.location || "Unknown Location"}
                  experience={seller.experience || "N/A"}
                  studentCount={seller.student_count || 0}
                  nextAvailable={seller.next_available || "N/A"}
                  specialties={seller.specialties || ["tantra"]}
                  price={seller.price || "N/A"}
                  verified={seller.verified || false}
                  email={seller.email || ""}
                  featured={seller.featured || false} // Added featured prop with fallback

                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-[#7C9A92] text-lg mb-4">No tantra practitioners found matching your search.</p>
              <p className="text-[#4A6670] text-sm">Try adjusting your filters or check back later for new listings.</p>
            </div>
          )}
        </div>
      </section>

      {/* Workshops Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#4A6670] mb-10 text-center">tantra Workshops & Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workshops.map((workshop, index) => (
              <div key={index} className="bg-[#F8F5F1] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-[#7C9A92]" />
                </div>
                <h3 className="text-xl font-semibold text-[#4A6670] mb-2 text-center">{workshop.title}</h3>
                <p className="text-[#7C9A92] mb-4 text-center">{workshop.description}</p>
                <div className="text-sm text-[#4A6670] mb-4">
                  <p><span className="font-semibold">Date:</span> {workshop.date}</p>
                  <p><span className="font-semibold">Location:</span> {workshop.location}</p>
                  <p><span className="font-semibold">Price:</span> {workshop.price}</p>
                </div>
                <div className="text-center">
                  <a
                    href="/workshops"
                    className="inline-block px-6 py-2 bg-[#7C9A92] text-white rounded-lg hover:bg-[#E6B17E] transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#4A6670] mb-10 text-center">What People Say About tantra</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { content: "tantra helped me find peace after years of stress. Truly transformative!", author: "Anna S., Zurich" },
              { content: "My energy levels have never been better. I feel so balanced.", author: "Luc M., Geneva" },
              { content: "A gentle yet powerful experience. I recommend it to everyone!", author: "Clara B., Lausanne" },
            ].map((testimonial, index) => (
              <div key={index} className="bg-[#F8F5F1] rounded-xl p-6 shadow-sm text-center">
                <p className="text-[#4A6670] mb-4 italic">&quot;{testimonial.content}&quot;</p>
                <p className="text-[#7C9A92] font-semibold">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your tantra Journey?</h2>
          <p className="text-lg text-[#E8DED1] mb-8 max-w-2xl mx-auto">
            Connect with our community of skilled practitioners or share your own healing gifts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="px-8 py-3 bg-[#E6B17E] text-white rounded-lg hover:bg-[#D9A066] transition-colors">
              Become a Practitioner
            </a>
            <a href="/practitioners" className="px-8 py-3 bg-white text-[#4A6670] rounded-lg hover:bg-[#E8DED1] transition-colors">
              Explore More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tantra;