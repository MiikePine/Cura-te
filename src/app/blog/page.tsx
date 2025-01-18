"use client"

import React, { useState } from 'react';
import { Search, Tag, Clock, ChevronRight, BookOpen } from 'lucide-react';
import Image from 'next/image';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  date: string;
}

const featuredPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Ancient Wisdom of Sound Healing: A Journey Through Vibration",
    excerpt: "Discover how sound frequencies can promote healing and restore harmony in body and mind...",
    category: "Sound Healing",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&q=80",
    author: {
      name: "Emma Thompson",
      title: "Sound Healing Practitioner",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    date: "Mar 15, 2024"
  },
  {
    id: 2,
    title: "Mindful Movement: Integrating Yoga and Meditation",
    excerpt: "Learn how combining yoga and meditation can enhance your spiritual practice and daily well-being...",
    category: "Yoga & Meditation",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80",
    author: {
      name: "David Chen",
      title: "Yoga Instructor",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
    },
    date: "Mar 12, 2024"
  }
];

const recentPosts: BlogPost[] = [
  {
    id: 3,
    title: "Chakra Balancing for Beginners",
    excerpt: "A comprehensive guide to understanding and aligning your energy centers...",
    category: "Energy Work",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80",
    author: {
      name: "Sarah Williams",
      title: "Energy Healer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
    },
    date: "Mar 10, 2024"
  },
  {
    id: 4,
    title: "The Power of Crystal Healing",
    excerpt: "Exploring the therapeutic properties of crystals and how to use them...",
    category: "Crystal Healing",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80",
    author: {
      name: "Michael Ross",
      title: "Crystal Therapist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
    },
    date: "Mar 8, 2024"
  },
  {
    id: 5,
    title: "Herbal Remedies for Modern Life",
    excerpt: "Traditional plant medicine for contemporary wellness challenges...",
    category: "Herbalism",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80",
    author: {
      name: "Lisa Chen",
      title: "Herbalist",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80"
    },
    date: "Mar 5, 2024"
  }
];

const categories = [
  "All",
  "Meditation",
  "Yoga",
  "Sound Healing",
  "Energy Work",
  "Crystal Healing",
  "Herbalism",
  "Shamanic Practices"
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#F8F5F1]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white py-16">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&q=80"
            alt="Blog Hero"
            className="w-full h-full object-cover opacity-10"
            width={150}
            height={150}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Healing Wisdom Blog</h1>
            <p className="text-xl text-[#E8DED1] mb-8">
              Explore insights and knowledge from our community of healers
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#7C9A92]" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-[#4A6670] placeholder-[#7C9A92] bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-[#E8DED1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 py-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-[#7C9A92] text-white'
                    : 'bg-[#F8F5F1] text-[#4A6670] hover:bg-[#E8DED1]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#4A6670] mb-6">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    width={150}
                    height={150}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 rounded-full text-sm text-[#7C9A92] flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#4A6670] mb-2">
                    {post.title}
                  </h3>
                  <p className="text-[#7C9A92] mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                        width={150}
                        height={150}
                      />
                      <div>
                        <p className="font-medium text-[#4A6670]">{post.author.name}</p>
                        <p className="text-sm text-[#7C9A92]">{post.author.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-[#7C9A92]">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section>
          <h2 className="text-2xl font-bold text-[#4A6670] mb-6">Recent Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    width={150}
                    height={150}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 rounded-full text-sm text-[#7C9A92] flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#4A6670] mb-2">
                    {post.title}
                  </h3>
                  <p className="text-[#7C9A92] text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                        width={150}
                        height={150}
                      />
                      <div>
                        <p className="text-sm font-medium text-[#4A6670]">{post.author.name}</p>
                        <p className="text-xs text-[#7C9A92]">{post.date}</p>
                      </div>
                    </div>
                    <button className="text-[#7C9A92] hover:text-[#4A6670] transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16">
          <div className="bg-gradient-to-br from-[#7C9A92] to-[#4A6670] rounded-lg p-8 text-white">
            <div className="max-w-2xl mx-auto text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Stay Connected with Our Newsletter</h2>
              <p className="text-[#E8DED1] mb-6">
                Receive the latest articles, tips, and healing wisdom directly in your inbox
              </p>
              <div className="flex space-x-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-[#4A6670] placeholder-[#7C9A92] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
                />
                <button className="px-6 py-3 bg-white text-[#4A6670] rounded-lg hover:bg-[#E8DED1] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}