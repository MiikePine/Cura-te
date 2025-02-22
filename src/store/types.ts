import { Tables } from '../types/database.types'; // Ajuste o caminho conforme necessário

export interface ProfileFormData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  yearsOfExperience: number;
  hourlyRate: number;
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

// Use o tipo Seller do Supabase
export type Seller = Tables<'seller'>;

export interface UserState {
  sellers: Seller[];
}

export interface RootState {
  user: UserState;
}