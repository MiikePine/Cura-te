
"use client"

import React, { useState } from 'react';
import {
  MapPin,
  Star,
  Shield,
  Calendar,
  MessageCircle,
  Clock,
  Award,
  Feather,
  Users,
  CheckCircle,
  Globe,
  Languages,
  Video,
  PhoneCall
} from 'lucide-react';

const practitioner = {
  name: 'Wolf Thunder Heart',
  title: 'Master Shamanic Practitioner',
  location: 'Santa Fe, NM',
  rating: 4.8,
  reviews: 95,
  verified: true,
  experience: '20+ years',
  image: 'https://images.unsplash.com/photo-1492681290082-e932832941e6?auto=format&fit=crop&q=80&w=300&h=300',
  coverImage: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80',
  price: '$175/session',
  nextAvailable: 'Tomorrow',
  languages: ['English', 'Spanish', 'Native American Diné'],
  specialties: [
    'Power Animal Retrieval',
    'Ancestral Healing',
    'Shamanic Journeying',
    'Soul Recovery',
    'Energy Medicine',
    'Traditional Ceremonies'
  ],
  certifications: [
    'Foundation for Shamanic Studies - Advanced Practitioner',
    'Sacred Plant Medicine - Master Level',
    'Indigenous Wisdom Keeper Lineage',
    'Energy Medicine Practitioner'
  ],
  about: "With over two decades of dedicated practice in shamanic healing, I bridge ancient wisdom with contemporary healing needs. My journey began under the guidance of indigenous elders in both North and South America, where I learned to navigate the spiritual realms and facilitate deep healing work. I specialize in helping individuals reconnect with their soul's purpose, heal ancestral trauma, and find harmony in their life's journey.",
  approach: "My approach combines traditional shamanic practices with a deep understanding of modern healing needs. Each session is uniquely tailored to the individual's journey, incorporating various techniques such as power animal retrieval, soul recovery, and energy medicine. I create a safe and sacred space for transformation, guiding you through the healing process with compassion and wisdom.",
  sessionTypes: [
    {
      name: 'Initial Consultation',
      duration: '30 minutes',
      price: 'Free',
      description: 'A preliminary discussion to understand your needs and explain the healing process'
    },
    {
      name: 'Traditional Healing Session',
      duration: '90 minutes',
      price: '$175',
      description: 'Complete shamanic healing session including journeying and energy work'
    },
    {
      name: 'Power Animal Retrieval',
      duration: '60 minutes',
      price: '$125',
      description: 'Connect with your power animal for guidance and protection'
    },
    {
      name: 'Ancestral Healing',
      duration: '120 minutes',
      price: '$225',
      description: 'Deep work to heal generational patterns and trauma'
    }
  ],
  availability: {
    timezone: 'Mountain Time (MT)',
    hours: [
      { day: 'Monday', time: '9:00 AM - 5:00 PM' },
      { day: 'Tuesday', time: '9:00 AM - 5:00 PM' },
      { day: 'Wednesday', time: '9:00 AM - 5:00 PM' },
      { day: 'Thursday', time: '9:00 AM - 5:00 PM' },
      { day: 'Friday', time: '9:00 AM - 3:00 PM' }
    ]
  },
  testimonials: [
    {
      name: 'Sarah M.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
      rating: 5,
      date: '2 months ago',
      text: 'Working with Wolf Thunder Heart was truly transformative. His power animal retrieval session helped me connect with my inner strength in ways I never thought possible.'
    },
    {
      name: 'Michael R.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100',
      rating: 5,
      date: '1 month ago',
      text: 'The ancestral healing session was profound. Wolf Thunder Heart created a safe and sacred space for deep healing work. I felt supported throughout the entire process.'
    },
    {
      name: 'Elena K.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100',
      rating: 5,
      date: '3 weeks ago',
      text: 'His understanding of both traditional practices and modern healing needs is exceptional. The integration of both has helped me navigate my spiritual journey with clarity.'
    }
  ]
};

export default function PractitionerProfile() {
//   const [selectedTab, setSelectedTab] = useState('about');

  return (
    <div className="min-h-screen bg-[#F8F5F1]">
      {/* Cover Image */}
      <div className="relative h-64 md:h-96">
        <img
          src={practitioner.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 -mt-32 mb-8">
          <div className="relative">
            <img
              src={practitioner.image}
              alt={practitioner.name}
              className="w-48 h-48 rounded-xl object-cover border-4 border-white shadow-lg"
            />
            {practitioner.verified && (
              <div className="absolute top-4 right-4 bg-[#7C9A92]/90 text-white px-3 py-1 rounded-full text-sm flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                Verified
              </div>
            )}
          </div>
          <div className="flex-1 pt-4 md:pt-16">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-[#4A6670]">{practitioner.name}</h1>
                  <p className="text-[#7C9A92] text-lg">{practitioner.title}</p>
                  <div className="flex items-center mt-2">
                    <MapPin className="h-5 w-5 text-[#7C9A92]" />
                    <span className="ml-2 text-[#7C9A92]">{practitioner.location}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Star className="h-5 w-5 text-[#E6B17E]" />
                    <span className="ml-1 text-[#4A6670] font-medium">{practitioner.rating}</span>
                    <span className="ml-1 text-[#7C9A92]">({practitioner.reviews} reviews)</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col md:items-end gap-4">
                  <div className="flex gap-4">
                    <button className="flex items-center justify-center px-6 py-3 border border-[#7C9A92] text-[#7C9A92] rounded-lg hover:bg-[#F8F5F1] transition-colors">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Message
                    </button>
                    <button className="flex items-center justify-center px-6 py-3 bg-[#7C9A92] text-white rounded-lg hover:bg-[#6A8B83] transition-colors">
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Session
                    </button>
                  </div>
                  <span className="text-[#7C9A92]">Next available: {practitioner.nextAvailable}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#4A6670] mb-6">About</h2>
              <p className="text-[#7C9A92] mb-8 leading-relaxed">{practitioner.about}</p>
              <h3 className="text-xl font-semibold text-[#4A6670] mb-4">My Approach</h3>
              <p className="text-[#7C9A92] leading-relaxed">{practitioner.approach}</p>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#4A6670] mb-6">Specialties</h2>
              <div className="flex flex-wrap gap-3">
                {practitioner.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-[#F8F5F1] text-[#7C9A92] px-4 py-2 rounded-full text-sm flex items-center"
                  >
                    <Feather className="h-4 w-4 mr-2" />
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Session Types */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#4A6670] mb-6">Session Types</h2>
              <div className="space-y-6">
                {practitioner.sessionTypes.map((session, index) => (
                  <div key={index} className="border-b border-[#E8DED1] last:border-0 pb-6 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-[#4A6670]">{session.name}</h3>
                        <p className="text-[#7C9A92]">{session.duration}</p>
                      </div>
                      <span className="text-lg font-semibold text-[#7C9A92]">{session.price}</span>
                    </div>
                    <p className="text-[#7C9A92]">{session.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#4A6670] mb-6">Client Testimonials</h2>
              <div className="space-y-6">
                {practitioner.testimonials.map((testimonial, index) => (
                  <div key={index} className="border-b border-[#E8DED1] last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-[#4A6670]">{testimonial.name}</h3>
                          <span className="text-sm text-[#7C9A92]">{testimonial.date}</span>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-[#E6B17E]" />
                          ))}
                        </div>
                        <p className="text-[#7C9A92]">{testimonial.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4A6670] mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-[#7C9A92] mr-3" />
                  <span className="text-[#7C9A92]">{practitioner.experience} experience</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-[#7C9A92] mr-3" />
                  <span className="text-[#7C9A92]">{practitioner.location}</span>
                </div>
                <div className="flex items-center">
                  <Languages className="h-5 w-5 text-[#7C9A92] mr-3" />
                  <span className="text-[#7C9A92]">{practitioner.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Session Options */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4A6670] mb-4">Session Options</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#F8F5F1] rounded-lg">
                  <div className="flex items-center">
                    <Video className="h-5 w-5 text-[#7C9A92] mr-3" />
                    <span className="text-[#7C9A92]">Online Session</span>
                  </div>
                  <CheckCircle className="h-5 w-5 text-[#7C9A92]" />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F8F5F1] rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-[#7C9A92] mr-3" />
                    <span className="text-[#7C9A92]">In-Person Session</span>
                  </div>
                  <CheckCircle className="h-5 w-5 text-[#7C9A92]" />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F8F5F1] rounded-lg">
                  <div className="flex items-center">
                    <PhoneCall className="h-5 w-5 text-[#7C9A92] mr-3" />
                    <span className="text-[#7C9A92]">Phone Consultation</span>
                  </div>
                  <CheckCircle className="h-5 w-5 text-[#7C9A92]" />
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4A6670] mb-4">Certifications</h3>
              <div className="space-y-3">
                {practitioner.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center">
                    <Award className="h-5 w-5 text-[#7C9A92] mr-3" />
                    <span className="text-[#7C9A92]">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4A6670] mb-4">Availability</h3>
              <p className="text-[#7C9A92] mb-4">{practitioner.availability.timezone}</p>
              <div className="space-y-3">
                {practitioner.availability.hours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-[#7C9A92]">{schedule.day}</span>
                    <span className="text-[#7C9A92]">{schedule.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}