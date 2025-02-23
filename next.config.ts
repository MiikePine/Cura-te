/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com", "images.pexels.com"],
  },
  experimental: {
    turbo: true, // Desativa Turbopack explicitamente
  },
};

module.exports = nextConfig;