// Используем разные URL для сервера и клиента
// ✅ ЗАМЕНИТЕ НА ЭТО:
const getApiBaseUrl = () => {
  // Всегда используем Vercel URL
  return "https://vitaly-portfolio-backend-1s6954262-vitalivo-gmailcoms-projects.vercel.app/api"
}

export const API_BASE_URL = getApiBaseUrl()