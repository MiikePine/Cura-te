import React from "react";
import { ChevronRight } from "lucide-react";
import { User } from "lucide-react";

interface PersonalInfoStepProps {
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    title: string;
    location: string;
    bio: string | null;
    experience: string | null;
    languages: string[];
    certifications: string[];
    availability: string[];
    image: string | null;
    session_types: { name: string; duration: string; price: string; description: string }[];
    lat: number | null;
    lng: number | null;
    next_available: string | null;
    price: string | null;
    rating: number | null;
    reviews: number | null;
    student_count: number | null;
    teaching_style: string | null;
    verified: boolean;
    featured: boolean;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export default function PersonalInfoStep({
  formData,
  handleInputChange,
  handleSubmit,
  error,
}: PersonalInfoStepProps) {
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-[#4A6670] mb-6 flex items-center">
        <User className="h-6 w-6 mr-2" /> Step 1: Personal Information
      </h2>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Full Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Password *</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Confirm Password *</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
          required
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        className="inline-flex items-center px-6 py-3 bg-[#E6B17E] text-white rounded-lg hover:bg-[#D9A066] transition-colors"
      >
        Next <ChevronRight className="h-5 w-5 ml-2" />
      </button>
    </form>
  );
}