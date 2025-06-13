/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com", "images.pexels.com","iahnomwrnwnbuyswfzas.supabase.co", // Adiciona o domínio do Supabase
    ],
  },
  experimental: {
    turbo: true, // Desativa Turbopack explicitamente
  },
//   i18n: {
//     locales: ["de", "fr", "it", "en"], // Idiomas suportados
//     defaultLocale: "fr"
// }
};

module.exports = nextConfig;