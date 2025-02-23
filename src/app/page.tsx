"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search, ArrowRight, Shield, Star, Heart, Users, Calendar, MessageSquare,
  Globe, Sparkles, Leaf, ThumbsUp, Gift, ChevronDown, MapPin
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@terapias/db/supabase";
import UserCard from "@terapias/components/userCard";
import mapboxgl from "mapbox-gl"; // Corrigido para importação padrão
import "mapbox-gl/dist/mapbox-gl.css";

// Configuração do token do Mapbox (substitua pelo teu token real)
mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN"; // Adicione teu token aqui

interface Seller {
  userUID: number;
  name: string;
  email: string;
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
  sessionTypes: { name: string; duration: string; price: string; description: string }[];
}

// Lista expandida de terapias (50 opções)
const therapies = [
  { name: "Yoga", path: "/yoga", icon: Users, description: "Movement and breath" },
  { name: "Reiki", path: "/reiki", icon: Sparkles, description: "Energy healing" },
  { name: "Meditation", path: "/meditation", icon: Heart, description: "Inner peace" },
  { name: "Ayurvedic Massage", path: "/ayurvedic-massage", icon: Leaf, description: "Holistic touch" },
  { name: "Shamanism", path: "/shamanism", icon: Gift, description: "Spiritual connection" },
  { name: "Sound Healing", path: "/sound-healing", icon: MessageSquare, description: "Vibrational therapy" },
  { name: "Holistic Therapy", path: "/holistic-therapy", icon: Leaf, description: "Mind-body harmony" },
  { name: "Hypnosis", path: "/hypnosis", icon: Sparkles, description: "Subconscious exploration" },
  { name: "Astrology", path: "/astrology", icon: Globe, description: "Celestial guidance" },
  { name: "Wim Hof Method", path: "/wim-hof", icon: ThumbsUp, description: "Cold therapy" },
  { name: "Qigong", path: "/qigong", icon: Users, description: "Energy flow" },
  { name: "Aromatherapy", path: "/aromatherapy", icon: Leaf, description: "Healing scents" },
  { name: "Acupuncture", path: "/acupuncture", icon: Sparkles, description: "Energy balance" },
  { name: "Crystal Healing", path: "/crystal-healing", icon: Gift, description: "Crystal energy" },
  { name: "Tai Chi", path: "/tai-chi", icon: Users, description: "Flowing movement" },
  { name: "Breathwork", path: "/breathwork", icon: Heart, description: "Conscious breathing" },
  { name: "Chakra Balancing", path: "/chakra-balancing", icon: Sparkles, description: "Energy alignment" },
  { name: "Reflexology", path: "/reflexology", icon: Leaf, description: "Foot therapy" },
  { name: "Naturopathy", path: "/naturopathy", icon: Leaf, description: "Natural healing" },
  { name: "Tarot Reading", path: "/tarot", icon: Globe, description: "Intuitive guidance" },
  { name: "Mindfulness", path: "/mindfulness", icon: Heart, description: "Present awareness" },
  { name: "Kundalini Yoga", path: "/kundalini-yoga", icon: Users, description: "Spiritual awakening" },
  { name: "Craniosacral Therapy", path: "/craniosacral", icon: Leaf, description: "Gentle touch" },
  { name: "Energy Clearing", path: "/energy-clearing", icon: Sparkles, description: "Aura cleansing" },
  { name: "Herbal Medicine", path: "/herbal-medicine", icon: Leaf, description: "Plant remedies" },
  { name: "Pranic Healing", path: "/pranic-healing", icon: Sparkles, description: "Life energy" },
  { name: "Shiatsu", path: "/shiatsu", icon: Leaf, description: "Pressure points" },
  { name: "Dance Therapy", path: "/dance-therapy", icon: Users, description: "Healing movement" },
  { name: "Art Therapy", path: "/art-therapy", icon: Gift, description: "Creative expression" },
  { name: "Numerology", path: "/numerology", icon: Globe, description: "Number insights" },
  { name: "Biofeedback", path: "/biofeedback", icon: ThumbsUp, description: "Body awareness" },
  { name: "Color Therapy", path: "/color-therapy", icon: Sparkles, description: "Healing colors" },
  { name: "Flower Essences", path: "/flower-essences", icon: Leaf, description: "Emotional balance" },
  { name: "Guided Visualization", path: "/guided-visualization", icon: Heart, description: "Mental imagery" },
  { name: "Polarity Therapy", path: "/polarity-therapy", icon: Sparkles, description: "Energy flow" },
  { name: "Somatic Experiencing", path: "/somatic-experiencing", icon: Leaf, description: "Trauma release" },
  { name: "Feng Shui", path: "/feng-shui", icon: Globe, description: "Space harmony" },
  { name: "Jin Shin Jyutsu", path: "/jin-shin-jyutsu", icon: Leaf, description: "Energy touch" },
  { name: "Kinesiology", path: "/kinesiology", icon: ThumbsUp, description: "Muscle testing" },
  { name: "Lymphatic Drainage", path: "/lymphatic-drainage", icon: Leaf, description: "Detox massage" },
  { name: "Magnet Therapy", path: "/magnet-therapy", icon: Sparkles, description: "Magnetic healing" },
  { name: "Osteopathy", path: "/osteopathy", icon: Leaf, description: "Structural balance" },
  { name: "Psychic Healing", path: "/psychic-healing", icon: Gift, description: "Intuitive energy" },
  { name: "Rolfing", path: "/rolfing", icon: Leaf, description: "Body alignment" },
  { name: "Tantra", path: "/tantra", icon: Heart, description: "Sacred connection" },
  { name: "Traditional Chinese Medicine", path: "/tcm", icon: Leaf, description: "Ancient wisdom" },
  { name: "Trager Approach", path: "/trager", icon: Users, description: "Gentle movement" },
  { name: "Vision Quest", path: "/vision-quest", icon: Globe, description: "Spiritual journey" },
  { name: "Zero Balancing", path: "/zero-balancing", icon: Leaf, description: "Body-mind tune" },
  { name: "Vedic Astrology", path: "/vedic-astrology", icon: Globe, description: "Karmic insights" },
];

// Distritos de Portugal para o dropdown
const districtsPortugal = [
  "Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra", "Évora",
  "Faro", "Guarda", "Leiria", "Lisboa", "Portalegre", "Porto", "Santarém",
  "Setúbal", "Viana do Castelo", "Vila Real", "Viseu", "Açores", "Madeira"
];

// Dados fictícios para stats e testimonials
const stats = [
  { id: 1, name: "Wellness Guides", value: "8,000+", icon: Users },
  { id: 2, name: "Sessions Booked", value: "15,000+", icon: Calendar },
  { id: 3, name: "Happy Clients", value: "12,000+", icon: Heart },
  { id: 4, name: "Therapies Offered", value: "50+", icon: Sparkles },
];

const testimonials = [
  { id: 1, content: "Transformative experience!", author: "Anna S.", role: "Client", rating: 5, image: "https://via.placeholder.com/150" },
  { id: 2, content: "I feel so balanced now.", author: "Luc M.", role: "Client", rating: 5, image: "https://via.placeholder.com/150" },
  { id: 3, content: "Highly recommend!", author: "Clara B.", role: "Client", rating: 5, image: "https://via.placeholder.com/150" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [visibleTherapies, setVisibleTherapies] = useState(12);
  const mapContainer = useRef(null); // Ref para o container do mapa
  const map = useRef<mapboxgl.Map | null>(null); // Ref para a instância do mapa

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const { data, error } = await supabase.from("seller").select("*").limit(6);
        if (error) throw error;
        setSellers(data || []);
      } catch (err) {
        console.error("Error fetching sellers:", err);
      }
    };
    fetchSellers();
  }, []);

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // Só inicializa o mapa uma vez

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-9.137, 38.722], // Centro de Portugal (Lisboa)
      zoom: 6,
    });

    // Pins fictícios (substitua por dados reais do Supabase)
    const pins = [
      { lng: -9.137, lat: 38.722, name: "Therapist in Lisbon" },
      { lng: -8.611, lat: 41.149, name: "Therapist in Porto" },
      { lng: -8.404, lat: 40.203, name: "Therapist in Coimbra" },
    ];

    pins.forEach((pin) => {
      new mapboxgl.Marker()
        .setLngLat([pin.lng, pin.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3 class="text-[#4A6670] text-sm font-semibold">${pin.name}</h3>`))
        .addTo(map.current!);
    });

    // Limpeza ao desmontar o componente
    return () => map.current?.remove();
  }, []);

  const loadMoreTherapies = () => {
    setVisibleTherapies((prev) => Math.min(prev + 12, therapies.length));
  };

  const renderHero = () => (
    <div className="relative bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white py-36 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1596567756492-166d421e5360?auto=format&fit=crop&q=80"
        alt="Mystical Crystal in Nature"
        className="absolute inset-0 opacity-20 object-cover"
        width={1920}
        height={1080}
        priority
        sizes="100vw"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Your Journey to Inner Balance Begins Here
        </h1>
        <p className="text-lg md:text-xl mb-10 text-[#E8DED1] max-w-2xl mx-auto">
          Explore holistic practices and connect with Portugal’s finest wellness guides.
        </p>
        <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92]" />
              <input
                type="text"
                placeholder="Search for yoga, reiki, meditation or more..."
                className="w-full pl-12 pr-12 py-4 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#E6B17E] text-lg shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
              {searchQuery && (
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92] cursor-pointer" />
              )}
              {isSearchFocused && searchQuery && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-xl max-h-80 overflow-y-auto z-20 border border-[#E8DED1]">
                  {therapies
                    .filter((therapy) => therapy.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((therapy) => (
                      <Link
                        key={therapy.name}
                        href={therapy.path}
                        className="flex items-center px-4 py-3 text-[#4A6670] hover:bg-[#E6B17E]/10 transition-colors"
                      >
                        <therapy.icon className="h-5 w-5 mr-3 text-[#7C9A92]" />
                        <span className="text-base">{therapy.name}</span>
                      </Link>
                    ))}
                </div>
              )}
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#7C9A92]" />
              <select
                className="w-full pl-12 pr-4 py-4 bg-white rounded-lg text-[#4A6670] focus:outline-none focus:ring-2 focus:ring-[#E6B17E] text-lg shadow-sm"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">All Districts</option>
                {districtsPortugal.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <button className="bg-[#E6B17E] text-white px-8 py-4 rounded-lg hover:bg-[#D9A066] transition-colors text-lg font-medium">
              Discover Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTherapies = () => (
    <section className="py-16 bg-[#F8F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#4A6670] mb-10 text-center">
          Explore Our Practices
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {therapies.slice(0, visibleTherapies).map((therapy) => (
            <Link
              href={therapy.path}
              key={therapy.name}
              className="group bg-white rounded-lg p-4 shadow-sm hover:shadow-lg hover:bg-[#E6B17E]/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="bg-[#7C9A92]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <therapy.icon className="h-6 w-6 text-[#7C9A92] group-hover:text-[#E6B17E] transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-[#4A6670] group-hover:text-[#E6B17E] transition-colors">
                  {therapy.name}
                </h3>
                <p className="text-xs text-[#7C9A92] mt-1">{therapy.description}</p>
              </div>
            </Link>
          ))}
        </div>
        {visibleTherapies < therapies.length && (
          <div className="text-center mt-10">
            <button
              onClick={loadMoreTherapies}
              className="inline-flex items-center px-6 py-3 bg-[#7C9A92] text-white rounded-lg hover:bg-[#E6B17E] transition-colors text-base font-medium"
            >
              See More Therapies <ChevronDown className="h-5 w-5 ml-2" />
            </button>
          </div>
        )}
      </div>
    </section>
  );

  const renderMap = () => (
    <section className="py-16 bg-[#F8F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#4A6670] mb-10 text-center">
          Find Nearby Guides
        </h2>
        <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
          <div ref={mapContainer} className="w-full h-full" />
        </div>
      </div>
    </section>
  );

  const renderHowItWorks = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#4A6670] text-center mb-12">
          Your Path to Wellness
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: Search, title: "Explore Practices", desc: "Find trusted guides in your area" },
            { icon: Calendar, title: "Book a Session", desc: "Schedule with ease and flexibility" },
            { icon: Heart, title: "Feel the Change", desc: "Embrace your holistic transformation" },
          ].map((step, index) => (
            <div
              key={index}
              className="group text-center p-6 bg-[#F8F5F1] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-[#E6B17E]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#E6B17E]/20 transition-colors">
                <step.icon className="h-8 w-8 text-[#E6B17E] group-hover:text-[#D9A066] transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-[#4A6670] mb-2">{step.title}</h3>
              <p className="text-base text-[#7C9A92]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderStats = () => (
    <section className="py-12 bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="bg-white/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-[#E8DED1] text-sm">{stat.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderPractitioners = () => (
    <section className="py-16 bg-[#F8F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-[#4A6670] mb-4 sm:mb-0">Featured Wellness Guides</h2>
          <Link href="/practitioners" className="text-[#E6B17E] hover:text-[#D9A066] flex items-center text-base font-medium">
            See All <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sellers.map((seller) => (
            <div key={seller.userUID} className="transform transition-all duration-300 hover:-translate-y-1">
              <UserCard
                email={seller.email}
                userUID={seller.userUID}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderTestimonials = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#4A6670] text-center mb-12">
          Voices of Transformation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#F8F5F1] rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-[#E6B17E] fill-current" />
                ))}
              </div>
              <p className="text-[#4A6670] mb-6 italic text-base">"{testimonial.content}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  width={48}
                  height={48}
                  sizes="48px"
                />
                <div>
                  <p className="font-semibold text-[#4A6670]">{testimonial.author}</p>
                  <p className="text-sm text-[#7C9A92]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderCTA = () => (
    <section className="py-16 bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Embrace Your Wellness?</h2>
        <p className="text-[#E8DED1] mb-8 max-w-2xl mx-auto text-lg">
          Join a vibrant community of holistic practitioners and seekers in Portugal. Start today — your first step is free!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="bg-[#E6B17E] text-white px-8 py-3 rounded-lg hover:bg-[#D9A066] transition-colors text-base font-medium"
          >
            Share Your Practice
          </Link>
          <Link
            href="/practitioners"
            className="bg-white text-[#4A6670] px-8 py-3 rounded-lg hover:bg-[#E8DED1] transition-colors text-base font-medium"
          >
            Find Your Guide
          </Link>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#F8F5F1] overflow-x-hidden">
      {renderHero()}
      {renderTherapies()}
      {renderMap()}
      {renderHowItWorks()}
      {renderStats()}
      {renderPractitioners()}
      {renderTestimonials()}
      {renderCTA()}
    </div>
  );
}