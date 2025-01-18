import React from 'react';
import {
  Instagram,
  Facebook,
  Linkedin as LinkedIn,
  Globe,
  Award,
  BookOpen,
  Clock,
  MapPin,
  Calendar,
  Video,
  Users,
} from 'lucide-react';
import { Seller } from '../../../store/';
import { Separator } from "../../../../@/components/ui/separator";
import { Badge } from "../../../../@/components/ui/badge";
import { Switch } from "../../../../@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../@/components/ui/select";

interface Seller {
  formData: Seller;
  isEditing: boolean;
  onFormChange: (data: Seller) => void;
}

// const certificationOptions = [
//   "Reiki Master",
//   "Certified Herbalist",
//   "Acupuncturist",
//   "Yoga Instructor",
//   "Meditation Teacher",
//   "Naturopathic Doctor",
//   "Ayurvedic Practitioner",
//   "Holistic Nutritionist",
//   "Energy Healer",
//   "Traditional Chinese Medicine",
// ];

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

export const ProfileForm: React.FC<SellerProps> = ({
  formData,
  isEditing,
  onFormChange,
}) => {
  const handleModalities = (modality: string) => {
    const updatedModalities = formData.modalities.includes(modality)
      ? formData.modalities.filter(m => m !== modality)
      : [...formData.modalities, modality];
    onFormChange({ ...formData, modalities: updatedModalities });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-10">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={formData.profileImage || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-[#7C9A92]"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-[#7C9A92] text-white p-1 rounded-full text-xs">
                Change
              </button>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#4A6670]">{formData.name || 'Your Name'}</h2>
            <p className="text-[#7C9A92]">{formData.title || 'Your Title'}</p>
          </div>
        </div>

        <Separator />

        {/* Basic Information */}
        <div>
          <h3 className="text-xl font-semibold text-[#4A6670] mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#7C9A92]" />
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#4A6670] mb-2">Full Name</label>
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
              <label className="block text-sm font-medium text-[#4A6670] mb-2">Professional Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => onFormChange({ ...formData, title: e.target.value })}
                disabled={!isEditing}
                className="w-full p-3 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92] bg-white"
                placeholder="e.g., Holistic Healer, Reiki Master"
              />
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div>
          <h3 className="text-xl font-semibold text-[#4A6670] mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#7C9A92]" />
            Professional Summary
          </h3>
          <textarea
            value={formData.bio}
            onChange={(e) => onFormChange({ ...formData, bio: e.target.value })}
            disabled={!isEditing}
            rows={4}
            className="w-full p-3 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92] bg-white"
            placeholder="Share your healing journey and approach to holistic wellness..."
          />
        </div>

        {/* Practice Details */}
        <div>
          <h3 className="text-xl font-semibold text-[#4A6670] mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#7C9A92]" />
            Practice Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#4A6670] mb-2">Years of Experience</label>
              <input
                type="number"
                value={formData.yearsOfExperience}
                onChange={(e) => onFormChange({ ...formData, yearsOfExperience: Number(e.target.value) })}
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
        </div>

        {/* Modalities & Services */}
        <div>
          <h3 className="text-xl font-semibold text-[#4A6670] mb-6">Modalities & Services</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#4A6670] mb-3">Healing Modalities</label>
              <div className="flex flex-wrap gap-2">
                {modalityOptions.map((modality) => (
                  <Badge
                    key={modality}
                    // variant={formData.modalities.includes(modality) ? "default" : "outline"}
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
                //   onValueChange={(value) => onFormChange({ ...formData, sessionDuration: value })}
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
                  value={formData.hourlyRate}
                  onChange={(e) => onFormChange({ ...formData, hourlyRate: Number(e.target.value) })}
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
                //   onCheckedChange={(checked) => onFormChange({ ...formData, offersVirtual: checked })}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-[#4A6670]">Offer Home Visits</label>
                  <p className="text-sm text-gray-500">Provide services at clientss location</p>
                </div>
                <Switch
                  checked={formData.offersHomeVisits}
                //   onCheckedChange={(checked) => onFormChange({ ...formData, offersHomeVisits: checked })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Certifications & Education */}
        <div>
          <h3 className="text-xl font-semibold text-[#4A6670] mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#7C9A92]" />
            Certifications & Education
          </h3>
          <div className="space-y-4">
            {/* {formData.certifications.map((cert, index) => ( */}
              <div className="flex items-center gap-4">
                <input
                  type="text"
              
                  disabled={!isEditing}
                  className="w-full p-3 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92] bg-white"
                  placeholder="Certification or degree"
                />
                {isEditing && (
                  <button
                    onClick={() => {
                    //   const newCerts = formData.certifications.filter((_, i) => i !== index);
                    //   onFormChange({ ...formData, certifications: newCerts });
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            {/* ))} */}
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

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-semibold text-[#4A6670] mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#7C9A92]" />
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#4A6670] mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => onFormChange({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className="w-full p-3 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92] bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A6670] mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => onFormChange({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full p-3 border border-[#E8DED1] rounded-lg focus:ring-[#7C9A92] focus:border-[#7C9A92] bg-white"
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
                <Instagram className="w-5 h-5 text-[#7C9A92] absolute ml-3" />
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
                <Facebook className="w-5 h-5 text-[#7C9A92] absolute ml-3" />
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
                <LinkedIn className="w-5 h-5 text-[#7C9A92] absolute ml-3" />
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
    </div>
  );
};