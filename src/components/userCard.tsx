import React from "react";
import Image from "next/image";
import { Star, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

interface UserCardProps {
  userUID: string | number; // Aceita string ou número, dependendo do Supabase
  name: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  specialty: string;
  price: string;
  nextAvailable: string;
  verified: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  userUID, // Substitua 'userUID' por 'id'
  name,
  image,
  rating,
  reviews,
  location,
  specialty,
  price,
  nextAvailable,
  verified,
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#E8DED1]">
      {/* Imagem */}
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        {verified && (
          <div className="absolute top-3 right-3 bg-white/80 p-1 rounded-full">
            <div className="relative w-5 h-5">
              <div className="absolute inset-0 bg-[#7C9A92] rounded-full opacity-20 animate-pulse"></div>
              <svg
                className="relative w-5 h-5 text-[#7C9A92]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        {/* Nome e Especialidade */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-[#4A6670]">{name}</h3>
          <p className="text-sm font-medium text-[#7C9A92] bg-[#F8F5F1] inline-block px-2 py-1 rounded-full mt-1">
            {specialty}
          </p>
        </div>

        {/* Avaliação e Localização */}
        <div className="flex items-center justify-between mb-3 text-sm">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-[#E6B17E] fill-current" />
            <span className="ml-1 text-[#4A6670]">{rating}</span>
            <span className="ml-1 text-[#7C9A92] opacity-70">({reviews})</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-[#7C9A92] mr-1" />
            <span className="text-[#4A6670]">{location}</span>
          </div>
        </div>

        {/* Disponibilidade e Preço */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-[#7C9A92] mr-1" />
            <span className="text-[#4A6670]">{nextAvailable}</span>
          </div>
          <span className="text-[#4A6670] font-semibold">{price}</span>
        </div>

        {/* Botões */}
        <div className="flex gap-2">
          <Link
href={`/profile/${userUID}`} // Mantém 'userUID' como string ou número// Use 'id' em vez de 'userUID'            className="flex-1 text-center py-2 bg-[#F8F5F1] text-[#7C9A92] rounded-lg hover:bg-[#E6B17E] hover:text-white transition-colors duration-200"
          >
            Profile
          </Link>
          <button className="flex-1 py-2 bg-[#7C9A92] text-white rounded-lg hover:bg-[#E6B17E] transition-colors duration-200">
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;