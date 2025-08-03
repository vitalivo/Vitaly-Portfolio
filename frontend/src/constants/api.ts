// Используем разные URL для сервера и клиента
const getApiBaseUrl = () => {
  // На сервере используем прямое подключение
  if (typeof window === "undefined") {
    return "http://127.0.0.1:8000/api"
  }
  // На клиенте используем прокси через Next.js
  return "/api/proxy"
}

export const API_BASE_URL = getApiBaseUrl()
