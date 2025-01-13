"use client";

import React, { useState, useEffect } from 'react';
import { Moon, MapPin, Star, Shield, MessageCircle, Calendar } from 'lucide-react';
import { fetchShamanicTherapists } from '../../db/dbFetch'; // Import the function for fetching shamanic therapists
import Image from 'next/image';
import Link from 'next/link';

interface Therapist {
  id: string;
  name: string;
  // Add specialties array to filter by
}

const Shamanic: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);

  // Function to load therapists from the database
  const loadTherapists = async () => {
    const { data, error } = await fetchShamanicTherapists(); // Fetch only shamanic therapists

    if (error) {
      console.error('Error fetching therapists:', error);
      return;
    }

    if (data) {
      // Filter therapists by the specialty "Shamanic Journeying"
      const filteredTherapists = data.filter((therapist: Therapist) => 
        therapist.specialties && therapist.specialties.includes('Shamanic Journeying') // Ensure specialties exists before checking
      );
      setTherapists(filteredTherapists); // Set only therapists with the specific specialty
    }
  };

  useEffect(() => {
    loadTherapists(); // Load therapists when the component mounts
  }, []);


  return (
    <div className="min-h-screen bg-[#F8F5F1]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#7C9A92] to-[#4A6670] text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80"
            alt="Shamanic Healing"
            className="w-full h-full object-cover opacity-10"
            width={160}
            height={160}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-center mb-8">
            <Moon className="h-12 w-12 text-[#E8DED1]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Shamanic Healing
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto mb-8 text-[#E8DED1]">
            Connect with experienced shamanic therapists for deep spiritual healing and transformation
          </p>
        </div>
      </div>

      {/* Therapists Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapists.length > 0 ? (
            therapists.map((therapist) => (
              <Link href={`/profile/${encodeURIComponent(therapist.name)}`} key={therapist.id}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="relative">
                    <Image
                      src={therapist.image}
                      alt={therapist.name}
                      className="w-full h-64 object-cover"
                      width={160}
                      height={160}
                    />
                    {therapist.verified && (
                      <div className="absolute top-4 right-4 bg-[#7C9A92]/90 text-white px-3 py-1 rounded-full text-sm flex items-center">
                        <Shield className="h-4 w-4 mr-1" />
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#4A6670]">{therapist.name}</h3>
                    <div className="flex items-center text-[#7C9A92] mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {therapist.location}
                    </div>
                    <div className="flex items-center mt-2">
                      <Star className="h-5 w-5 text-[#E6B17E]" />
                      <span className="ml-1 text-[#4A6670]">{therapist.rating}</span>
                      <span className="ml-1 text-[#7C9A92]">({therapist.reviews} reviews)</span>
                    </div>
                    <p className="text-[#7C9A92] mt-4">{therapist.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {therapist.branch.map((branch, index) => (
                        <span
                          key={index}
                          className="bg-[#F8F5F1] text-[#7C9A92] px-3 py-1 rounded-full text-sm"
                        >
                          {branch}
                        </span>
                      ))}
                    </div>
                    <div className="border-t border-[#E8DED1] mt-6 pt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[#4A6670] font-semibold">{therapist.price}</span>
                        <span className="text-[#7C9A92]">Next available: {therapist.nextAvailable}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center px-4 py-2 border border-[#7C9A92] text-[#7C9A92] rounded-lg hover:bg-[#F8F5F1] transition-colors">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 bg-[#7C9A92] text-white rounded-lg hover:bg-[#6A8B83] transition-colors">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No shamanic therapists found with the specialty Shamanic Journeying.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shamanic;
