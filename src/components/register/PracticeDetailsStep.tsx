"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Image as ImageIcon } from "lucide-react";
import { supabase } from "@terapias/db/supabase";
import Image from "next/image";

interface PracticeDetailsStepProps {
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
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: unknown } }) => void;
  nextStep: () => void;
  prevStep: () => void;
  userId: string | null;
  isAuthenticated: boolean;
  error: string | null;
  setError: (error: string | null) => void;
}

export default function PracticeDetailsStep({
  formData,
  handleInputChange,
  nextStep,
  prevStep,
  userId,
  isAuthenticated,
  error,
  setError,
}: PracticeDetailsStepProps) {
  const [newAvailability, setNewAvailability] = useState("");
  const [newSession, setNewSession] = useState({ name: "", duration: "", price: "", description: "" });
  const [isUploading, setIsUploading] = useState(false);

  const addAvailability = () => {
    if (newAvailability.trim()) {
      handleInputChange({
        target: { name: "availability", value: [...formData.availability, newAvailability.trim()] },
      });
      setNewAvailability("");
      console.log("Disponibilidade adicionada:", newAvailability.trim());
    }
  };

  const addSessionType = () => {
    if (newSession.name && newSession.duration && newSession.price) {
      handleInputChange({
        target: { name: "session_types", value: [...formData.session_types, { ...newSession }] },
      });
      setNewSession({ name: "", duration: "", price: "", description: "" });
      console.log("Novo tipo de sessão adicionado:", newSession);
    } else {
      setError("Por favor, preencha o nome, duração e preço da sessão.");
      console.log("Falha ao adicionar sessão: campos obrigatórios vazios.");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log("Nenhum arquivo selecionado.");
      return;
    }

    setError(null);
    setIsUploading(true);
    console.log("Iniciando upload da imagem para userId:", userId);

    if (!userId || !isAuthenticated) {
      setError("Utilizador não autenticado. Por favor, complete o Passo 1 primeiro.");
      setIsUploading(false);
      console.log("Upload falhou: userId ou isAuthenticated inválidos.");
      return;
    }

    try {
      const filePath = `${userId}/${Date.now()}_${file.name.replace(/\s/g, "_")}`;
      console.log("Fazendo upload para o caminho:", filePath);
      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Erro no upload:", uploadError);
        throw new Error("Erro ao carregar imagem: " + (uploadError.message || "Tente novamente."));
      }

      const { data: urlData } = supabase.storage.from("profile-images").getPublicUrl(filePath);
      if (!urlData.publicUrl) {
        throw new Error("Não foi possível obter o URL público da imagem.");
      }

      handleInputChange({
        target: { name: "image", value: urlData.publicUrl },
      });
      console.log("Imagem carregada com sucesso:", urlData.publicUrl);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido ao carregar imagem";
      console.error("Erro no handleImageUpload:", err);
      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit chamado no PracticeDetailsStep...");
    console.log("formData antes da validação:", formData);

    if (!formData.image || formData.session_types.length === 0) {
      setError("Por favor, adicione uma foto de perfil e pelo menos um tipo de sessão.");
      console.log("Validação falhou: imagem ou session_types estão vazios.");
      return;
    }
    if (isUploading) {
      setError("Aguarde o upload da imagem ser concluído.");
      console.log("Upload em andamento, submissão bloqueada.");
      return;
    }
    setError(null);
    console.log("Validação passou, chamando nextStep...");
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-[#4A6670] mb-6 flex items-center">
        <ImageIcon className="h-6 w-6 mr-2" /> Step 3: Practice Details
      </h2>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Profile Image *</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none"
          required
          disabled={isUploading}
        />
        {isUploading && <p className="text-[#7C9A92] mt-2">Uploading...</p>}
        {formData.image && (
          <Image
            src={formData.image || "/fallback-image.jpg"}
            alt="Profile Preview"
            width={100}
            height={100}
            className="mt-2 rounded-lg"
            onError={(e) => {
              console.error("Erro ao carregar a imagem:", e);
              setError("Erro ao carregar a pré-visualização da imagem.");
            }}
          />
        )}
      </div>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Availability</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newAvailability}
            onChange={(e) => setNewAvailability(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
            placeholder="e.g., Mon 10:00-12:00"
          />
          <button
            type="button"
            onClick={addAvailability}
            className="px-4 py-3 bg-[#7C9A92] text-white rounded-lg hover:bg-[#6A8B83]"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.availability.map((slot, index) => (
            <span key={index} className="bg-[#E8DED1] px-3 py-1 rounded-full text-sm text-[#4A6670]">
              {slot}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Session Types *</label>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            value={newSession.name}
            onChange={(e) => setNewSession((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
            placeholder="Session Name (e.g., Private Yoga)"
          />
          <input
            type="text"
            value={newSession.duration}
            onChange={(e) => setNewSession((prev) => ({ ...prev, duration: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
            placeholder="Duration (e.g., 60 min)"
          />
          <input
            type="text"
            value={newSession.price}
            onChange={(e) => setNewSession((prev) => ({ ...prev, price: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
            placeholder="Price (e.g., CHF 80)"
          />
          <textarea
            value={newSession.description}
            onChange={(e) => setNewSession((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
            placeholder="Description (e.g., One-on-one session...)"
            rows={2}
          />
          <button
            type="button"
            onClick={addSessionType}
            className="px-4 py-3 bg-[#7C9A92] text-white rounded-lg hover:bg-[#6A8B83]"
          >
            Add Session
          </button>
        </div>
        <div className="mt-4 space-y-2">
          {formData.session_types.map((session, index) => (
            <div key={index} className="bg-[#F8F5F1] p-4 rounded-lg">
              <p className="text-[#4A6670] font-semibold">{session.name}</p>
              <p className="text-[#7C9A92] text-sm">
                {session.duration} - {session.price}
              </p>
              <p className="text-[#7C9A92] text-sm">{session.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Certifications (comma-separated)</label>
        <input
          type="text"
          name="certifications"
          value={formData.certifications.join(", ")}
          onChange={(e) =>
            handleInputChange({
              target: { name: "certifications", value: e.target.value.split(", ") },
            })
          }
          className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Latitude</label>
        <input
          type="number"
          name="lat"
          value={formData.lat || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Longitude</label>
        <input
          type="number"
          name="lng"
          value={formData.lng || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Next Available</label>
        <input
          type="text"
          name="next_available"
          value={formData.next_available || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Price</label>
        <input
          type="text"
          name="price"
          value={formData.price || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#4A6670] font-semibold mb-2">Teaching Style</label>
        <input
          type="text"
          name="teaching_style"
          value={formData.teaching_style || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
        />
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
          disabled={isUploading}
          className="inline-flex items-center px-6 py-3 bg-[#E6B17E] text-white rounded-lg hover:bg-[#D9A066] transition-colors disabled:opacity-50"
        >
          Finish <ChevronRight className="h-5 w-5 ml-2" />
        </button>
      </div>
    </form>
  );
}