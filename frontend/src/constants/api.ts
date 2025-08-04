// Используем разные URL для сервера и клиента
const getApiBaseUrl = () => {
  // На сервере используем Vercel URL
  if (typeof window === "undefined") {
    return "https://vitaly-portfolio-backend-6f8ju4884-vitalivo-gmailcoms-projects.vercel.app/api"
  }
  // На клиенте тоже используем Vercel URL
  return "https://vitaly-portfolio-backend-6f8ju4884-vitalivo-gmailcoms-projects.vercel.app/api"
}

export const API_BASE_URL = getApiBaseUrl()