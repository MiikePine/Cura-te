
"use client"

import React, { useState } from 'react';
import {
  Calendar, MapPin, Clock, Users, Filter,
  Tag, ChevronRight, Search, Heart, Share2
} from 'lucide-react';

interface Event {
  id: number;
  title: string;
  type: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  image: string;
  price: string;
  spots: number;
  spotsTotal: number;
  description: string;
  teacher: {
    name: string;
    image: string;
    title: string;
  };
  tags: string[];
}

const events: Event[] = [
  {
    id: 1,
    title: "10-Day Vipassana Meditation Retreat",
    type: "Meditation Retreat",
    date: "Apr 15, 2024",
    endDate: "Apr 25, 2024",
    time: "Starts at 4:00 PM",
    location: "Serra da Mantiqueira, Brazil",
    image: "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?auto=format&fit=crop&q=80",
    price: "By Donation",
    spots: 8,
    spotsTotal: 20,
    description: "Experience the profound practice of Vipassana meditation in a serene mountain setting. This 10-day silent retreat offers a deep dive into self-discovery and inner peace.",
    teacher: {
      name: "Mestre Karma Lhamo",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80",
      title: "Vipassana Master"
    },
    tags: ["Silent Retreat", "Meditation", "Spiritual Growth"]
  },
  {
    id: 2,
    title: "Wellness Festival 2024",
    type: "Festival",
    date: "May 3, 2024",
    endDate: "May 5, 2024",
    time: "10:00 AM - 8:00 PM",
    location: "Praia do Rosa, SC",
    image: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80",
    price: "From R$280",
    spots: 150,
    spotsTotal: 500,
    description: "Join us for a transformative weekend of yoga, meditation, music, workshops, and healing practices. Connect with like-minded individuals and experience various wellness modalities.",
    teacher: {
      name: "Various Teachers",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80",
      title: "International Faculty"
    },
    tags: ["Yoga", "Meditation", "Music", "Workshops"]
  },
  {
    id: 3,
    title: "Shamanic Healing Journey",
    type: "Workshop",
    date: "Apr 8, 2024",
    time: "2:00 PM - 7:00 PM",
    location: "Alto Paraíso, GO",
    image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80",
    price: "R$450",
    spots: 12,
    spotsTotal: 15,
    description: "Embark on a powerful shamanic journey with traditional ceremonies and healing practices. Experience sacred plant medicine and ancient wisdom teachings.",
    teacher: {
      name: "Pajé Tupã",
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&q=80",
      title: "Indigenous Healer"
    },
    tags: ["Shamanic", "Ceremony", "Healing"]
  },
  {
    id: 4,
    title: "Mindfulness Meditation Course",
    type: "Course",
    date: "Weekly from Apr 1, 2024",
    time: "7:00 PM - 8:30 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80",
    price: "R$197/month",
    spots: 25,
    spotsTotal: 30,
    description: "Learn the fundamentals of mindfulness meditation in this 8-week online course. Perfect for beginners and those looking to deepen their practice.",
    teacher: {
      name: "Dr. Ana Silva",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80",
      title: "Mindfulness Instructor"
    },
    tags: ["Online", "Beginner Friendly", "Mindfulness"]
  }
];

const categories = [
  "All Events",
  "Meditation",
  "Retreats",
  "Workshops",
  "Festivals",
  "Courses",
  "Online Events"
];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("All Events");
  const [searchQuery, setSearchQuery] = useState("");

  const renderEventCard = (event: Event) => (
    <div key={event.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 rounded-full text-sm text-[#7C9A92] flex items-center">
            <Tag className="w-4 h-4 mr-1" />
            {event.type}
          </span>
        </div>
        <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full text-[#7C9A92] hover:text-[#4A6670] transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#4A6670] mb-2">{event.title}</h3>
          <p className="text-[#7C9A92] text-sm line-clamp-2 mb-4">{event.description}</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-[#4A6670]">
              <Calendar className="w-4 h-4 mr-2 text-[#7C9A92]" />
              {event.endDate ? `${event.date} - ${event.endDate}` : event.date}
            </div>
            <div className="flex items-center text-[#4A6670]">
              <Clock className="w-4 h-4 mr-2 text-[#7C9A92]" />
              {event.time}
            </div>
            <div className="flex items-center text-[#4A6670]">
              <MapPin className="w-4 h-4 mr-2 text-[#7C9A92]" />
              {event.location}
            </div>
            <div className="flex items-center text-[#4A6670]">
              <Users className="w-4 h-4 mr-2 text-[#7C9A92]" />
              {event.spots} spots left of {event.spotsTotal}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#F8F5F1] text-[#7C9A92] rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="border-t border-[#E8DED1] pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={event.teacher.image}
                alt={event.teacher.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-[#4A6670]">{event.teacher.name}</p>
                <p className="text-sm text-[#7C9A92]">{event.teacher.title}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#7C9A92]">from</p>
              <p className="font-bold text-[#4A6670]">{event.price}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <button className="flex items-center text-[#7C9A92] hover:text-[#4A6670] transition-colors">
              <Share2 className="w-5 h-5 mr-1" />
              Share
            </button>
            <button className="bg-[#7C9A92] text-white px-6 py-2 rounded-lg hover:bg-[#6A8B83] transition-colors">
              Register Now
            </button>
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
          <img
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=80"
            alt="Events Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Upcoming Events & Retreats
            </h1>
            <p className="text-xl mb-12 text-[#E8DED1] max-w-3xl mx-auto">
              Discover transformative experiences and connect with leading practitioners in wellness and spiritual growth
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#7C9A92]" />
                <input
                  type="text"
                  placeholder="Search events, workshops, or retreats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="flex items-center space-x-4 mb-8 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-[#7C9A92] text-white'
                  : 'bg-white text-[#4A6670] hover:bg-[#E8DED1]'
              } transition-colors`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#4A6670]">
            {selectedCategory === "All Events" ? "All Upcoming Events" : selectedCategory}
          </h2>
          <button className="flex items-center px-4 py-2 bg-white rounded-lg text-[#4A6670] hover:bg-[#E8DED1] transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(renderEventCard)}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-white text-[#7C9A92] px-8 py-3 rounded-lg hover:bg-[#E8DED1] transition-colors">
            Load More Events
          </button>
        </div>
      </div>
    </div>
  );
}