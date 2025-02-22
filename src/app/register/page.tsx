'use client'

import { useState } from 'react';
import { ProfileForm } from '../../components/ProfileForm';
import { RegistrationStepper } from '../../components/RegistrationStepper';
import { Button } from '../../../@/components/ui/button';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { useToast } from "../../../@/hooks/use-toast";
import { supabase } from '../../db/supabase';

// Definindo a interface ProfileFormData alinhada com a tabela 'seller'
interface ProfileFormData {
  name: string;
  tittle: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  yearsexperience: number;
  price: number;
  sessionDuration: string;
  offersVirtual: boolean;
  offersHomeVisits: boolean;
  modalities: string[];
  certifications: string[];
  languages: string[];
  specialties: string[];
  socialMedia: {
    instagram: string;
    facebook: string;
    linkedin: string;
  };
}

function CreateProfile() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    tittle: '',
    description: '',
    email: '',
    phone: '',
    location: '',
    yearsexperience: 0,
    price: 0,
    sessionDuration: '60',
    offersVirtual: false,
    offersHomeVisits: false,
    modalities: [],
    certifications: [],
    languages: [],
    specialties: [],
    socialMedia: {
      instagram: '',
      facebook: '',
      linkedin: '',
    },
  });

  const handleFormChange = (data: ProfileFormData) => {
    setFormData(data);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.name) {
          toast({
            title: "Required Fields Missing",
            description: "Please fill in your name.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 2:
        if (!formData.tittle || !formData.description) {
          toast({
            title: "Required Fields Missing",
            description: "Please fill in your professional title and bio.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 3:
        if (formData.modalities.length === 0) {
          toast({
            title: "Required Fields Missing",
            description: "Please select at least one healing modality.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (validateStep(4)) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "Authentication Error",
            description: "Please sign in to save your profile.",
            variant: "destructive"
          });
          return;
        }

        // Salvando os dados no Supabase
        const { error } = await supabase
          .from('seller')
          .insert({
            userUID: user.id,
            name: formData.name,
            tittle: formData.tittle,
            description: formData.description,
            email: formData.email,
            phone: formData.phone || null,
            location: formData.location || null,
            yearsexperience: formData.yearsexperience || null,
            price: formData.price.toString(),
            specialties: formData.specialties.length > 0 ? formData.specialties : null,
            session_options: [formData.sessionDuration],
            language: formData.languages.length > 0 ? formData.languages.join(', ') : null,
          });

        if (error) throw error;

        toast({
          title: "Profile Saved",
          description: "Your profile has been successfully created!",
        });
      } catch (error) {
        console.error("Error saving profile:", error);
        toast({
          title: "Error",
          description: "Failed to save profile. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#4A6670] mb-2">Create Your Healing Profile</h1>
          <p className="text-[#7C9A92]">Share your practice with the world</p>
        </div>

        <RegistrationStepper currentStep={currentStep} />

        <div className="mt-8">
          <ProfileForm
            formData={formData}
            isEditing={true}
            onFormChange={handleFormChange}
            currentStep={currentStep}
          />
        </div>

        <div className="mt-8 flex justify-between items-center">
          {currentStep > 1 && (
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Step
            </Button>
          )}
          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2 ml-auto bg-[#7C9A92] hover:bg-[#4A6670]"
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="flex items-center gap-2 ml-auto bg-[#7C9A92] hover:bg-[#4A6670]"
            >
              Save Profile
              <Save className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateProfile;