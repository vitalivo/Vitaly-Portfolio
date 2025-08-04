// Используем разные URL для сервера и клиента
// ✅ ИСПРАВЛЕННАЯ ВЕРСИЯ:
const getApiBaseUrl = () => {
  // Используем правильный Vercel URL
  return "https://vitaly-portfolio-frontend-v2.vercel.app/api"
}

export const API_BASE_URL = getApiBaseUrl()