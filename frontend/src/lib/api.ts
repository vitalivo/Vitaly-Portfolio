import axios from "axios"
import { API_BASE_URL } from "@/constants/api"

// API Endpoints - точно соответствуют Django URLs
export const API_ENDPOINTS = {
  // Core endpoints
  SITE_SETTINGS: "/core/site-settings/",
  SEO_SETTINGS: "/core/seo-settings/",
  HEALTH_CHECK: "/core/health/",

  // Portfolio endpoints
  CATEGORIES: "/portfolio/categories/",
  TECHNOLOGIES: "/portfolio/technologies/",
  PROJECTS: "/portfolio/projects/",
  PROJECTS_FEATURED: "/portfolio/projects/featured/",
  SKILLS: "/portfolio/skills/",

  // Blog endpoints
  BLOG_CATEGORIES: "/blog/categories/",
  BLOG_TAGS: "/blog/tags/",
  BLOG_POSTS: "/blog/posts/",
  BLOG_POSTS_FEATURED: "/blog/posts/featured/",
  BLOG_COMMENTS: "/blog/comments/",
  BLOG_SUBSCRIPTIONS: "/blog/subscriptions/",

  // Contact endpoints
  CONTACT_MESSAGES: "/contacts/messages/",
  CONTACT_RESPONSES: "/contacts/responses/",
  NEWSLETTERS: "/contacts/newsletters/",

  // Analytics endpoints
  PAGE_VIEWS: "/analytics/page-views/",
  EVENTS: "/analytics/events/",
} as const

// Создаем axios instance с базовой конфигурацией
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 секунд таймаут
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptors для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error)
    return Promise.reject(error)
  },
)

export default api
