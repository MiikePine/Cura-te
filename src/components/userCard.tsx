import React from 'react';
import Image from 'next/image';
import { Star, MapPin, Users, CheckCircle, Heart, Calendar } from 'lucide-react';
import Link from 'next/link';

interface UserCardProps {
  userUID: number;
  name: string;
  email: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  experience: string;
  studentCount: number;
  nextAvailable: string;
  specialties: string[];
  price: string;
  verified: boolean;
  featured: boolean;
}



const UserCard: React.FC<UserCardProps> = ({
  userUID,
  name,  
  title,
  image,
  rating,
  reviews,
  location,
  experience,
  studentCount,
  nextAvailable,
  specialties,
  price,
  verified,
  featured,
}) => {




  return (
    <div
      key={userUID}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={400}
          height={300}
          className="w-full h-64 object-cover"
        />
        {featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-[#4A6670] text-white rounded-full text-sm">
            Featured
          </div>
        )}
        {verified && (
          <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
            <CheckCircle className="h-5 w-5 text-[#7C9A92]" />
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-[#4A6670]">{name}</h3>
            <p className="text-[#7C9A92] text-sm">{title}</p>
          </div>
          <button className="text-[#7C9A92] hover:text-[#4A6670] transition-colors">
            <Heart className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center mb-4">
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          <span className="ml-1 font-semibold text-[#4A6670]">{rating}</span>
          <span className="mx-1 text-[#7C9A92]">•</span>
          <span className="text-[#7C9A92]">{reviews} reviews</span>
        </div>

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center text-[#4A6670]">
            <MapPin className="h-4 w-4 mr-2 text-[#7C9A92]" />
            {location}
          </div>
          <div className="flex items-center text-[#4A6670]">
            <Users className="h-4 w-4 mr-2 text-[#7C9A92]" />
            {studentCount}+ students taught
          </div>
          <div className="flex items-center text-[#4A6670]">
            <Calendar className="h-4 w-4 mr-2 text-[#7C9A92]" />
            Next available: {nextAvailable}
          </div>
          <div className="flex items-center text-[#4A6670]">
            <span className="h-4 w-4 mr-2 text-[#7C9A92]">⏳</span>
            {experience} experience
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#F8F5F1] text-[#7C9A92] rounded-full text-sm"
            >
              {specialty}
            </span>
          ))}
        </div>

        <div className="border-t border-[#E8DED1] pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-[#7C9A92]">Starting from</p>
              <p className="text-lg font-bold text-[#4A6670]">{price}</p>
            </div>
            <div className="flex space-x-2 h-16">
            <Link
href={`/profile/${(userUID)}`}
  className="px-4 py-2 border border-[#7C9A92] text-[#7C9A92] rounded-lg hover:bg-[#F8F5F1] transition-colors"
>
  View Profile
</Link>
              <button className="px-4 py-2 bg-[#7C9A92] text-white rounded-lg hover:bg-[#6A8B83] transition-colors">
                Book Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
