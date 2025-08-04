/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Оптимизация
  poweredByHeader: false,
  compress: true,

  // ✅ Изображения
  images: {
    domains: ["localhost", "127.0.0.1"],
    formats: ["image/webp", "image/avif"],
    unoptimized: true,
  },

  // ✅ Переменные окружения
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL ||
      "https://vitaly-portfolio-backend-1s6954262-vitalivo-gmailcoms-projects.vercel.app",
  },

  // ✅ Заголовки безопасности
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // ✅ Редиректы
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // ✅ ESLint и TypeScript для разработки
  eslint: {
    ignoreDuringBuilds: true, // Игнорировать ошибки ESLint во время сборки
  },
  typescript: {
    ignoreBuildErrors: true, // Игнорировать ошибки TypeScript во время сборки
  },
};

// ✅ ES MODULE EXPORT (не CommonJS!)
export default nextConfig
