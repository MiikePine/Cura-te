/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com", "images.pexels.com","iahnomwrnwnbuyswfzas.supabase.co", // Adiciona o domínio do Supabase
    ],
  },
  experimental: {
    turbo: true, // Desativa Turbopack explicitamente
  },
};

module.exports = nextConfig;