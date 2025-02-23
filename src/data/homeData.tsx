import { Heart, Users, Sparkles, Leaf, Gift, MessageSquare, Globe, ThumbsUp } from "lucide-react";

export const therapies = [
  { name: "Yoga", path: "/yoga", icon: Users, description: "Movement and breath" },
  { name: "Reiki", path: "/reiki", icon: Sparkles, description: "Energy healing" },
  { name: "Meditation", path: "/meditation", icon: Heart, description: "Inner peace" },
  { name: "Massagem Ayurvédica", path: "/ayurvedic-massage", icon: Leaf, description: "Holistic touch" },
  { name: "Xamanismo", path: "/shamanism", icon: Gift, description: "Spiritual connection" },
  { name: "Sound Healing", path: "/sound-healing", icon: MessageSquare, description: "Vibrational therapy" },
  { name: "Terapia Holística", path: "/holistic-therapy", icon: Leaf, description: "Mind-body harmony" },
  { name: "Hipnose", path: "/hypnosis", icon: Sparkles, description: "Subconscious exploration" },
  { name: "Astrologia", path: "/astrology", icon: Globe, description: "Celestial guidance" },
  { name: "Banhos Gelados (Wim Hof)", path: "/wim-hof", icon: ThumbsUp, description: "Cold therapy" },
  { name: "Qigong", path: "/qigong", icon: Users, description: "Energy flow" },
  { name: "Aromaterapia", path: "/aromatherapy", icon: Leaf, description: "Healing scents" },
];

export const testimonials = [
  {
    id: 1,
    content: "As sessões de yoga e meditação mudaram a minha vida. Encontrei uma paz que não sabia que existia.",
    author: "Lina Meier",
    role: "Artista",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: 2,
    content: "O sound healing trouxe-me clareza e energia renovada. Uma experiência transformadora!",
    author: "Thomas Kuhn",
    role: "Empreendedor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: 3,
    content: "A massagem ayurvédica e o reiki aliviaram as minhas tensões e trouxeram-me equilíbrio.",
    author: "Sophie Dubois",
    role: "Escritora",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    rating: 5,
  },
];

export const stats = [
  { id: 1, name: "Certified Practitioners", value: "300+", icon: Users },
  { id: 2, name: "Wellness Seekers", value: "8,000+", icon: ThumbsUp },
  { id: 3, name: "Unique Practices", value: "40+", icon: Sparkles },
  { id: 4, name: "Swiss Cities", value: "15+", icon: Globe },
];