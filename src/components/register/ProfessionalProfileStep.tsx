"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { supabase } from "@terapias/db/supabase";

interface ProfessionalProfileStepProps {
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
    selectedTherapies: string[];
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: unknown } }
  ) => void;
  nextStep: () => void;
  prevStep: () => void;
  userId: string | null;
  isAuthenticated: boolean;
  error: string | null;
  setError: (error: string | null) => void;
}

export default function ProfessionalProfileStep({
  formData,
  handleInputChange,
  nextStep,
  prevStep,
  error,
  setError,
}: ProfessionalProfileStepProps) {
  const [therapies, setTherapies] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchTherapies = async () => {
      const { data, error } = await supabase.from("therapies").select("id, name");
      if (error) {
        console.error("Erro ao buscar terapias:", error);
        setError("Erro ao carregar terapias disponíveis.");
      } else {
        setTherapies(data || []);
      }
    };
    fetchTherapies();
  }, [setError]); // Added setError to dependency array

  const handleTherapyToggle = (therapyId: string) => {
    const isSelected = formData.selectedTherapies.includes(therapyId);
    if (isSelected) {
      handleInputChange({
        target: { name: "selectedTherapies", value: formData.selectedTherapies.filter((id) => id !== therapyId) },
      });
    } else {
      handleInputChange({
        target: { name: "selectedTherapies", value: [...formData.selectedTherapies, therapyId] },
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.location) {
      setError("Por favor, preencha o título e a localização.");
      return;
    }
    setError(null);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-[#4A6670] mb-6">Step 2: Professional Profile</h2>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Location *</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Bio</label>
        <textarea
          name="bio"
          value={formData.bio || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
          rows={4}
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Experience</label>
        <input
          type="text"
          name="experience"
          value={formData.experience || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Languages (comma-separated)</label>
        <input
          type="text"
          name="languages"
          value={formData.languages.join(", ")}
          onChange={(e) =>
            handleInputChange({
              target: { name: "languages", value: e.target.value.split(", ") },
            })
          }
          className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Therapies</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {therapies.map((therapy) => (
            <button
              key={therapy.id}
              type="button"
              onClick={() => handleTherapyToggle(therapy.id)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                formData.selectedTherapies.includes(therapy.id)
                  ? "bg-[#E6B17E] text-white hover:bg-[#D9A066]"
                  : "bg-[#E8DED1] text-[#4A6670] hover:bg-[#D9A066]/20"
              }`}
            >
              {therapy.name}
            </button>
          ))}
        </div>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="inline-flex items-center px-6 py-3 bg-[#7C9A92] text-white rounded-lg hover:bg-[#6A8B83] transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-2" /> Previous
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-6 py-3 bg-[#E6B17E] text-white rounded-lg hover:bg-[#D9A066] transition-colors"
        >
          Next <ChevronRight className="h-5 w-5 ml-2" />
        </button>
      </div>
    </form>
  );
}