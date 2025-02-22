'use client'

import React from 'react';
import {
  Globe,
  Award,
  MapPin,
} from 'lucide-react';
import { Badge } from "../../@/components/ui/badge";
import { Switch } from "../../@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

// Usando a mesma interface ProfileFormData de CreateProfile
interface ProfileFormData {
  name: string; // seller.name (string | null)
  tittle: string; // seller.tittle (string | null)
  description: string; // seller.description (string | null)
  email: string; // seller.email (string | null)
  phone: string; // seller.phone (number | null, mas ajustado para string no form)
  location: string; // seller.location (string | null)
  yearsexperience: number; // seller.yearsexperience (number | null)
  price: number; // seller.price (string | null, mas ajustado para number no form)
  sessionDuration: string; // Mapear para seller.session_options (string[] | null)
  offersVirtual: boolean; // Campo customizado
  offersHomeVisits: boolean; // Campo customizado
  modalities: string[]; // Mapear para seller.specialties (string[] | null)
  certifications: string[]; // Campo customizado
  languages: string[]; // seller.language (string | null, mas ajustado para array no form)
  specialties: string[]; // seller.specialties (string[] | null)
  socialMedia: {
    instagram: string;
    facebook: string;
    linkedin: string;
  }; // Campo customizado, pode ser salvo como JSON
}

interface ProfileFormProps {
  formData: ProfileFormData;
  isEditing: boolean;
  onFormChange: (data: ProfileFormData) => void;
  currentStep: number;
}

const modalityOptions = [
  "Acupuncture",
  "Aromatherapy",
  "Ayurveda",
  "Crystal Healing",
  "Energy Healing",
  "Herbalism",
  "Holistic Nutrition",
  "Homeopathy",
  "Meditation",
  "Naturopathy",
  "Reiki",
  "Sound Therapy",
  "Traditional Chinese Medicine",
  "Yoga Therapy",
];

export const ProfileForm: React.FC<ProfileFormProps> = ({
  formData,
  isEditing,
  onFormChange,
  currentStep,
}) => {
  const handleModalities = (modality: string) => {
    const updatedModalities = formData.modalities.includes(modality)
      ? formData.modalities.filter(m => m !== modality)
      : [...formData.modalities, modality];
    onFormChange({ ...formData, modalities: updatedModalities });
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      {/* Basic Information */}
      <div>
        <h3 className="text-xl font-semibold text-[#4A6670] mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#7C9A92]" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#4A6670] mb-2">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onFormChange({ ...formData, name: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92] bg-white"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4A6670] mb-2">Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onFormChange({ ...formData, email: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92] bg-white"
              placeholder="your@email.com"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      {/* Professional Details */}
      <div>
        <h3 className="text-xl font-semibold text-[#4A6670] mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#7C9A92]" />
          Professional Details
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#4A6670] mb-2">Professional Title *</label>
            <input
              type="text"
              value={formData.tittle}
              onChange={(e) => onFormChange({ ...formData, tittle: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92] bg-white"
              placeholder="e.g., Holistic Healer, Reiki Master"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A6670] mb-2">Professional Bio *</label>
            <textarea
              value={formData.description}
              onChange={(e) => onFormChange({ ...formData, description: e.target.value })}
              disabled={!isEditing}
              rows={4}
              className="w-full p-3 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92] bg-white"
              placeholder="Share your healing journey and approach to holistic wellness..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#4A6670] mb-2">Years of Experience</label>
              <input
                type="number"
                value={formData.yearsexperience}
                onChange={(e) => onFormChange({ ...formData, yearsexperience: Number(e.target.value) })}
                disabled={!isEditing}
                className="w-full p-3 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92] bg-white"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A6670] mb-2">Practice Location</label>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-[#7C9A92] absolute ml-3" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => onFormChange({ ...formData, location: e.target.value })}
                  disabled={!isEditing}
                  className="w-full p-3 pl-10 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92] bg-white"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-sm font-medium text-[#4A6670] mb-3">Certifications</label>
            <div className="space-y-4">
              {formData.certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-4">
                  <input
                    type="text"
                    value={cert}
                    onChange={(e) => {
                      const newCerts = [...formData.certifications];
                      newCerts[index] = e.target.value;
                      onFormChange({ ...formData, certifications: newCerts });
                    }}
                    disabled={!isEditing}
                    className="w-full p-3 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92] bg-white"
                    placeholder="Certification or degree"
                  />
                  {isEditing && (
                    <button
                      onClick={() => {
                        const newCerts = formData.certifications.filter((_, i) => i !== index);
                        onFormChange({ ...formData, certifications: newCerts });
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={() => onFormChange({
                    ...formData,
                    certifications: [...formData.certifications, '']
                  })}
                  className="text-[#7C9A92] hover:text-[#4A6670] font-medium"
                >
                  + Add Certification
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      {/* Services & Pricing */}
      <div>
        <h3 className="text-xl font-semibold text-[#4A6670] mb-6">Services & Pricing</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#4A6670] mb-3">Healing Modalities *</label>
            <div className="flex flex-wrap gap-2">
              {modalityOptions.map((modality) => (
                <Badge
                  key={modality}
                  variant={formData.modalities.includes(modality) ? "default" : "outline"}
                  className={`cursor-pointer ${!isEditing && 'cursor-default'}`}
                  onClick={() => isEditing && handleModalities(modality)}
                >
                  {modality}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#4A6670] mb-2">Session Duration</label>
              <Select
                disabled={!isEditing}
                value={formData.sessionDuration}
                onValueChange={(value) => onFormChange({ ...formData, sessionDuration: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                  <SelectItem value="120">120 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#4A6670] mb-2">Hourly Rate ($)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => onFormChange({ ...formData, price: Number(e.target.value) })}
                disabled={!isEditing}
                className="w-full p-3 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92] bg-white"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-[#4A6670]">Offer Virtual Sessions</label>
                <p className="text-sm text-gray-500">Enable online consultations and sessions</p>
              </div>
              <Switch
                checked={formData.offersVirtual}
                onCheckedChange={(checked) => onFormChange({ ...formData, offersVirtual: checked })}
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-[#4A6670]">Offer Home Visits</label>
                <p className="text-sm text-gray-500">Provide services at clients location</p>
              </div>
              <Switch
                checked={formData.offersHomeVisits}
                onCheckedChange={(checked) => onFormChange({ ...formData, offersHomeVisits: checked })}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      {/* Contact Information */}
      <div>
        <h3 className="text-xl font-semibold text-[#4A6670] mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#7C9A92]" />
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#4A6670] mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onFormChange({ ...formData, phone: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92] bg-white"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div>
        <h3 className="text-xl font-semibold text-[#4A6670] mb-6">Social Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#4A6670] mb-2">Instagram</label>
            <div className="flex items-center">
              <FaInstagram className="w-5 h-5 text-[#7C9A92] absolute ml-3" />
              <input
                type="text"
                value={formData.socialMedia.instagram}
                onChange={(e) => onFormChange({
                  ...formData,
                  socialMedia: { ...formData.socialMedia, instagram: e.target.value }
                })}
                disabled={!isEditing}
                className="w-full p-3 pl-10 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92] bg-white"
                placeholder="@username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A6670] mb-2">Facebook</label>
            <div className="flex items-center">
              <FaFacebook size={20} className="text-[#7C9A92] absolute ml-3" />
              <input
                type="text"
                value={formData.socialMedia.facebook}
                onChange={(e) => onFormChange({
                  ...formData,
                  socialMedia: { ...formData.socialMedia, facebook: e.target.value }
                })}
                disabled={!isEditing}
                className="w-full p-3 pl-10 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92] bg-white"
                placeholder="Profile URL"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A6670] mb-2">LinkedIn</label>
            <div className="flex items-center">
              <FaLinkedin size={20} className="text-[#7C9A92] absolute ml-3" />
              <input
                type="text"
                value={formData.socialMedia.linkedin}
                onChange={(e) => onFormChange({
                  ...formData,
                  socialMedia: { ...formData.socialMedia, linkedin: e.target.value }
                })}
                disabled={!isEditing}
                className="w-full p-3 pl-10 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92] bg-white"
                placeholder="Profile URL"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step rendering logic based on currentStep
  switch (currentStep) {
    case 1:
      return renderStep1();
    case 2:
      return renderStep2();
    case 3:
      return renderStep3();
    case 4:
      return renderStep4();
    default:
      return null;
  }
};