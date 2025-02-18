"use client"

import React, { useState, useEffect } from 'react';
import {
  Search, ArrowRight, Shield, Star, Heart,
  Users, Calendar, MessageSquare,
   Globe, Sparkles, Leaf,
   ThumbsUp, Gift
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@terapias/db/supabase';
import UserCard from '@terapias/components/userCard';

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
  sessionTypes: {
    name: string;
    duration: string;
    price: string;
    description: string;
  }[];
}

const categories = [
  {
    name: 'Reiki',
    path: '/reiki',
    icon: Sparkles,
    description: 'Reiki, Pranic Healing, and more'
  },
  {
    name: 'Meditation',
    path: '/meditation',
    icon: Heart,
    description: 'Mindfulness and guided practices'
  },
  {
    name: 'Holistic Therapy',
    path: '/categories/holistic-therapy',
    icon: Leaf,
    description: 'Mind-body-spirit integration'
  },
  {
    name: 'Sound Healing',
    path: '/categories/sound-healing',
    icon: MessageSquare,
    description: 'Vibrational therapy and sound baths'
  },
  {
    name: 'Traditional Medicine',
    path: '/categories/traditional-medicine',
    icon: Gift,
    description: 'Ancient healing wisdom'
  },
  {
    name: 'Movement Therapy',
    path: '/categories/movement',
    icon: Users,
    description: 'Yoga, Qigong, and conscious movement'
  }
];



const testimonials = [
  {
    id: 1,
    content: "Working with Dr. Chen transformed my approach to health. Her integrative methods helped me overcome chronic issues I've struggled with for years.",
    author: "Emily Watson",
    role: "Yoga Teacher",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    id: 2,
    content: "The spiritual guidance and energy work with Michael helped me find clarity and purpose. It's been a life-changing experience.",
    author: "James Martinez",
    role: "Business Executive",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    id: 3,
    content: "Dr. Patel's Ayurvedic treatments have completely transformed my digestive health and energy levels. Her knowledge is incredible.",
    author: "Sarah Thompson",
    role: "Health Coach",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    rating: 5
  }
];

const stats = [
  { id: 1, name: 'Verified Practitioners', value: '500+', icon: Shield },
  { id: 2, name: 'Happy Clients', value: '10,000+', icon: ThumbsUp },
  { id: 3, name: 'Healing Modalities', value: '50+', icon: Sparkles },
  { id: 4, name: 'Countries Served', value: '25+', icon: Globe }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
    const [sellers, setSellers] = useState<Seller[]>([]);
  
     useEffect(() => {
        const fetchSellers = async () => {
          try {
            const { data, error } = await supabase
            .from("seller")
            .select("*")
      console.log("perfis,", data)
            if (error) {
              console.error("Error fetching sellers:", error.message, error.details);
              return;
            }
      
            setSellers(data || []);
          } catch (err) {
            console.error("Unexpected error fetching sellers:", err);
          }
        };
      
        fetchSellers();
      }, []); 
    

  const renderHowItWorks = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#4A6670] mb-4">How It Workssss</h2>
          <p className="text-[#7C9A92] max-w-2xl mx-auto">
            Your journey to holistic wellness made simple
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Search,
              title: "Find Your Healer",
              description: "Browse verified practitioners and read authentic reviews to find your perfect match"
            },
            {
              icon: Calendar,
              title: "Book Your Session",
              description: "Schedule appointments easily with our integrated booking system"
            },
            {
              icon: Heart,
              title: "Begin Your Journey",
              description: "Connect with your practitioner and start your path to wellness"
            }
          ].map((step, index) => (
            <div key={index} className="text-center p-6">
              <div className="bg-[#F8F5F1] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-8 w-8 text-[#7C9A92]" />
              </div>
              <h3 className="text-xl font-semibold text-[#4A6670] mb-2">{step.title}</h3>
              <p className="text-[#7C9A92]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderTestimonials = () => (
    <section className="py-16 bg-[#F8F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#4A6670] mb-4">What Our Community Sayssss</h2>
          <p className="text-[#7C9A92] max-w-2xl mx-auto">
            Real stories from people who have found their path to wellnesssss
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-[#E6B17E] fill-current" />
                ))}
              </div>
              <p className="text-[#4A6670] mb-6">"{testimonial.content}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.image || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80'}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderStats = () => (
    <section className="py-16 bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-[#E8DED1]">{stat.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

 

  return (
    <div className="min-h-screen bg-[#F8F5F1]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&q=80"
            alt="Background"
            className="opacity-10"
            width={1920}
            height={1080}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Path to Wellness
            </h1>
            <p className="text-xl mb-12 text-[#E8DED1]">
              Connect with verified holistic practitioners and begin your healing journey
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#7C9A92]" />
                  <input
                    type="text"
                    placeholder="Search practices or practitioners..."
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="bg-[#7C9A92] text-white px-8 py-3 rounded-lg hover:bg-[#6A8B83] transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {renderHowItWorks()}

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-[#4A6670] mb-8">Explore Healing Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              href={category.path}
              key={category.name}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-[#E8DED1]"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-[#F8F5F1] p-3 rounded-lg">
                  <category.icon className="h-6 w-6 text-[#7C9A92]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#4A6670] group-hover:text-[#7C9A92] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[#7C9A92] mt-1">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {renderStats()}

      {/* Featured Practitioners */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#4A6670]">Featured Practitioners</h2>
            <Link href="/practitioners" className="text-[#7C9A92] hover:text-[#6A8B83] flex items-center">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
         
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {sellers.map((seller) => (
      <UserCard
        key={seller.userUID}
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
    ))}
  </div>
</div>  
        </div>
      </div>

      {renderTestimonials()}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#7C9A92] to-[#4A6670] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Healing Journey?</h2>
          <p className="text-[#E8DED1] mb-8 max-w-2xl mx-auto">
            Join our community of practitioners and seekers. Whether you're looking to heal or to share your healing gifts, we're here to support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-[#4A6670] px-8 py-3 rounded-lg hover:bg-[#E8DED1] transition-colors"
            >
              List Your Practice
            </Link>
            <Link
              href="/practitioners"
              className="bg-[#7C9A92] text-white px-8 py-3 rounded-lg hover:bg-[#6A8B83] transition-colors"
            >
              Find a Practitioner
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}