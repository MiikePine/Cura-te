"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Moon,
  Sun,
  Heart,
  Flower2,
  Star,
  Shield,
  Waves,
  ArrowRight,
} from 'lucide-react';
import Footer from '../components/Footer';
import Header from '@terapias/components/Header';

const categories = [
  {
    icon: Moon,
    name: 'Shamanic Healing',
    path: '/shamanic',
    description: 'Ancient wisdom and spiritual healing practices',
    practitioners: 124,
  },
  {
    icon: Flower2,
    name: 'Energy Healing',
    path: '/energy-healing',
    description: 'Reiki, chakra balancing, and crystal therapy',
    practitioners: 267,
  },
  {
    icon: Sun,
    name: 'Meditation & Mindfulness',
    path: '/meditation',
    description: 'Guided meditation, breathwork, and mindfulness practices',
    practitioners: 389,
  },
  {
    icon: Star,
    name: 'Astrology & Divination',
    path: '/astrology',
    description: 'Birth charts, tarot readings, and spiritual guidance',
    practitioners: 232,
  },
  {
    icon: Heart,
    name: 'Holistic Wellness',
    path: '/holistic-wellness',
    description: 'Ayurveda, herbalism, and natural healing',
    practitioners: 321,
  },
  {
    icon: Waves,
    name: 'Sound Healing',
    path: '/sound-healing',
    description: 'Sound baths, singing bowls, and vibrational therapy',
    practitioners: 198,
  },
];

const featuredPractitioners = [
  {
    name: 'Luna Starweaver',
    profession: 'Shamanic Healer',
    rating: 4.9,
    reviews: 127,
    location: 'Sedona, AZ',
    experience: '15+ years',
    availability: 'Available Today',
    verified: true,
    image: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=200&h=200',
    branch: ['Soul Retrieval', 'Plant Medicine', 'Energy Clearing'],
    price: '$150/session',
  },
  {
    name: 'River Phoenix',
    profession: 'Sound Healer',
    rating: 4.8,
    reviews: 89,
    location: 'Boulder, CO',
    experience: '10+ years',
    availability: 'Next Available: Tomorrow',
    verified: true,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200',
    branch: ['Crystal Bowls', 'Voice Healing', 'Gong Therapy'],
    price: '$120/session',
  },
  {
    name: 'Sage Moonflower',
    profession: 'Reiki Master',
    rating: 5.0,
    reviews: 156,
    location: 'Asheville, NC',
    experience: '12+ years',
    availability: 'Available Today',
    verified: true,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
    branch: ['Distance Healing', 'Chakra Balancing', 'Energy Work'],
    price: '$95/session',
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#F8F5F1]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&q=80"
            alt="Background"
            className="opacity-10"
            width={160}
            height={160}
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

      {/* Featured Practitioners */}
      <div className="bg-[#F8F5F1] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#4A6670]">Featured Practitioners</h2>
            <Link href="/practitioners" className="text-[#7C9A92] hover:text-[#6A8B83] flex items-center">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPractitioners.map((practitioner) => (
              <div key={practitioner.name} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                <div className="relative">
                  <Image
                    src={practitioner.image}
                    alt={practitioner.name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  {practitioner.verified && (
                    <div className="absolute top-4 right-4 bg-[#7C9A92]/90 text-white px-3 py-1 rounded-full text-sm flex items-center">
                      <Shield className="h-4 w-4 mr-1" />
                      Verified
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#4A6670]">{practitioner.name}</h3>
                  <p className="text-[#7C9A92] mb-4">{practitioner.profession}</p>
                  <div className="flex items-center mb-4">
                    <Star className="h-5 w-5 text-[#E6B17E]" />
                    <span className="ml-1 text-[#4A6670]">{practitioner.rating}</span>
                    <span className="ml-1 text-[#7C9A92]">({practitioner.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {practitioner.branch.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-[#F8F5F1] text-[#7C9A92] px-3 py-1 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-[#4A6670] font-semibold">{practitioner.price}</span>
                    <button className="bg-[#7C9A92] text-white px-4 py-2 rounded-lg hover:bg-[#6A8B83] transition-colors">
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
