"use client";

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { supabase } from "@terapias/db/supabase";

// Define JSON type for Supabase
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Define Database type based on your Supabase schema
export type Database = {
  public: {
    Tables: {
      seller: {
        Row: {
          availability: string[] | null;
          bio: string | null;
          certifications: string[] | null;
          created_at: string | null;
          email: string | null;
          experience: string | null;
          featured: boolean | null;
          image: string | null;
          languages: string[] | null;
          lat: number | null;
          lng: number | null;
          location: string | null;
          name: string | null;
          next_available: string | null;
          price: string | null;
          rating: number | null;
          reviews: number | null;
          session_types: Json | null;
          student_count: number | null;
          teaching_style: string | null;
          title: string | null;
          useruid: string;
          verified: boolean | null;
        };
        Insert: {
          availability?: string[] | null;
          bio?: string | null;
          certifications?: string[] | null;
          created_at?: string | null;
          email?: string | null;
          experience?: string | null;
          featured?: boolean | null;
          image?: string | null;
          languages?: string[] | null;
          lat?: number | null;
          lng?: number | null;
          location?: string | null;
          name?: string | null;
          next_available?: string | null;
          price?: string | null;
          rating?: number | null;
          reviews?: number | null;
          session_types?: Json | null;
          student_count?: number | null;
          teaching_style?: string | null;
          title?: string | null;
          useruid?: string;
          verified?: boolean | null;
        };
        Update: {
          availability?: string[] | null;
          bio?: string | null;
          certifications?: string[] | null;
          created_at?: string | null;
          email?: string | null;
          experience?: string | null;
          featured?: boolean | null;
          image?: string | null;
          languages?: string[] | null;
          lat?: number | null;
          lng?: number | null;
          location?: string | null;
          name?: string | null;
          next_available?: string | null;
          price?: string | null;
          rating?: number | null;
          reviews?: number | null;
          session_types?: Json | null;
          student_count?: number | null;
          teaching_style?: string | null;
          title?: string | null;
          useruid?: string;
          verified?: boolean | null;
        };
        Relationships: [];
      };
      seller_therapies: {
        Row: {
          seller_id: string;
          therapy_id: string;
        };
        Insert: {
          seller_id: string;
          therapy_id: string;
        };
        Update: {
          seller_id?: string;
          therapy_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "seller_therapies_seller_id_fkey";
            columns: ["seller_id"];
            isOneToOne: false;
            referencedRelation: "seller";
            referencedColumns: ["useruid"];
          },
          {
            foreignKeyName: "seller_therapies_therapy_id_fkey";
            columns: ["therapy_id"];
            isOneToOne: false;
            referencedRelation: "therapies";
            referencedColumns: ["id"];
          },
        ];
      };
      therapies: {
        Row: {
          description: string | null;
          id: string;
          name: string;
          path: string;
        };
        Insert: {
          description?: string | null;
          id?: string;
          name: string;
          path: string;
        };
        Update: {
          description?: string | null;
          id?: string;
          name?: string;
          path?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// Use the generated Tables type for seller
type SellerRow = Database["public"]["Tables"]["seller"]["Row"];

// Define the SellerTherapy type for the seller_therapies relationship
interface SellerTherapy {
  therapy: {
    name: string;
  };
}

// Define the raw Seller type as returned by Supabase (before transformation)
interface RawSeller extends SellerRow {
  seller_therapies: SellerTherapy[];
}

// Define the transformed Seller type for the component
interface Seller {
  useruid: string;
  name: string;
  email: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  languages: string[];
  experience: string;
  specialties: string[]; // Transformed from seller_therapies
  certifications: string[];
  availability: string[];
  price: string;
  bio: string;
  teachingStyle: string;
  nextAvailable: string;
  verified: boolean;
  featured: boolean;
  studentCount: number;
  sessionTypes: { name: string; duration: string; price: string; description: string }[];
  lat?: number;
  lng?: number;
}

// Configuração do token do Mapbox
mapboxgl.accessToken = "pk.eyJ1IjoibWlrZXBpbmUiLCJhIjoiY203aHcweGxqMGxsdTJrc2hoMmRobGUzZSJ9.W_-dI7UL07Wi28TmyJyxTg";

export default function MapLandingPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Fetch dos Sellers
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const { data, error } = await supabase
          .from("seller")
          .select(`
            useruid,
            name,
            email,
            title,
            image,
            rating,
            reviews,
            location,
            languages,
            experience,
            certifications,
            availability,
            price,
            bio,
            teaching_style,
            next_available,
            verified,
            featured,
            student_count,
            session_types,
            lat,
            lng,
            seller_therapies (
              therapy:therapies (name)
            )
          `)
          .limit(6);

        if (error) throw error;

        // Safely cast data to RawSeller[] and transform to Seller[]
        const sellersWithSpecialties: Seller[] = (data as unknown as RawSeller[]).map((seller: RawSeller) => ({
          useruid: seller.useruid,
          name: seller.name ?? "",
          email: seller.email ?? "",
          title: seller.title ?? "",
          image: seller.image ?? "",
          rating: seller.rating ?? 0,
          reviews: seller.reviews ?? 0,
          location: seller.location ?? "",
          languages: seller.languages ?? [],
          experience: seller.experience ?? "",
          specialties: seller.seller_therapies.map((st: SellerTherapy) => st.therapy.name),
          certifications: seller.certifications ?? [],
          availability: seller.availability ?? [],
          price: seller.price ?? "",
          bio: seller.bio ?? "",
          teachingStyle: seller.teaching_style ?? "",
          nextAvailable: seller.next_available ?? "",
          verified: seller.verified ?? false,
          featured: seller.featured ?? false,
          studentCount: seller.student_count ?? 0,
          sessionTypes: (seller.session_types as Seller["sessionTypes"] | null) ?? [],
          lat: seller.lat ?? undefined,
          lng: seller.lng ?? undefined,
        }));

        console.log("Sellers fetched:", sellersWithSpecialties);
        setSellers(sellersWithSpecialties);
      } catch (err) {
        console.error("Error fetching sellers:", err);
      }
    };
    fetchSellers();
  }, []);

  // Inicialização do Mapa
  useEffect(() => {
    if (!mapContainer.current || map.current || sellers.length === 0) return;

    console.log("Initializing map with sellers:", sellers);

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [6.6323, 46.5197], // Centro da Suíça (ajustado para o mercado suíço)
      zoom: 6,
    });

    map.current.on("load", () => {
      setIsMapLoaded(true);
      console.log("Map loaded successfully");

      sellers.forEach((seller) => {
        if (seller.lat && seller.lng) {
          console.log(`Adding pin for ${seller.name} at [${seller.lng}, ${seller.lat}]`);
          const popupContent = `
            <div class="bg-white rounded-lg shadow-md p-3 w-64 border border-[#E8DED1]">
              <div class="flex items-center space-x-3">
                <img 
                  src="${seller.image || 'https://via.placeholder.com/150'}" 
                  alt="${seller.name}" 
                  class="h-12 w-12 rounded-full object-cover border-2 border-[#7C9A92]"
                />
                <div>
                  <h3 class="text-sm font-semibold text-[#4A6670]">${seller.name}</h3>
                  <p class="text-xs text-[#7C9A92]">${seller.specialties?.[0] || "Wellness Guide"}</p>
                  <p class="text-xs text-[#7C9A92]">${seller.location || "Unknown Location"}</p>
                </div>
              </div>
              <div class="mt-2">
                <a href="/profile/${seller.useruid}" class="inline-block w-full text-center bg-[#E6B17E] text-white px-2 py-1 rounded-md hover:bg-[#D9A066] transition-colors text-xs">
                  View Profile
                </a>
              </div>
            </div>
          `;

          new mapboxgl.Marker()
            .setLngLat([seller.lng, seller.lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent))
            .addTo(map.current!);
        } else {
          console.warn(`Seller ${seller.name} missing lat/lng`);
        }
      });
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [sellers]);

  return (
    <section className="py-16 bg-[#F8F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#4A6670] mb-10 text-center">Find Nearby Guides</h2>
        <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
          <div ref={mapContainer} className="w-full h-full" />
          {!isMapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <p className="text-[#4A6670] text-lg">Loading map...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}