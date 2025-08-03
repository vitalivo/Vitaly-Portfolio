export type Locale = "en" | "ru" | "he"

export interface BaseModel {
  id: number
  created_at: string
  updated_at: string
}

export interface UserProfile extends BaseModel {
  user: number
  bio_en: string
  bio_ru: string
  bio_he: string
  location: string
  website: string
  github: string
  linkedin: string
  avatar: string
  phone: string
  email: string
  is_available_for_hire: boolean
}

export interface Skill extends BaseModel {
  name: string
  category: string
  proficiency_level: number
  years_of_experience: number
  is_featured: boolean
  icon: string
  description_en: string
  description_ru: string
  description_he: string
}

export interface Technology extends BaseModel {
  name: string
  category: string
  icon: string
  color: string
  is_featured: boolean
}

export interface ProjectCategory extends BaseModel {
  name_en: string
  name_ru: string
  name_he: string
  slug: string
  description_en: string
  description_ru: string
  description_he: string
  is_active: boolean
}

export interface Project extends BaseModel {
  title_en: string
  title_ru: string
  title_he: string
  description_en: string
  description_ru: string
  description_he: string
  short_description_en: string
  short_description_ru: string
  short_description_he: string
  slug: string
  featured_image: string
  gallery_images: string[]
  demo_url: string
  github_url: string
  is_featured: boolean
  is_active: boolean
  order: number
  category: ProjectCategory
  technologies: Technology[]
  completion_date: string
  client: string
  project_type: string
  status: string
}

export interface Certificate extends BaseModel {
  title_en: string
  title_ru: string
  title_he: string
  issuer: string
  issue_date: string
  expiry_date: string
  credential_id: string
  credential_url: string
  image: string
  is_featured: boolean
  is_active: boolean
  order: number
  skills: Skill[]
}

export interface BlogCategory extends BaseModel {
  name_en: string
  name_ru: string
  name_he: string
  slug: string
  description_en: string
  description_ru: string
  description_he: string
  is_active: boolean
}

export interface BlogTag extends BaseModel {
  name_en: string
  name_ru: string
  name_he: string
  slug: string
  is_active: boolean
}

export interface BlogPost extends BaseModel {
  title_en: string
  title_ru: string
  title_he: string
  content_en: string
  content_ru: string
  content_he: string
  excerpt_en: string
  excerpt_ru: string
  excerpt_he: string
  slug: string
  featured_image: string
  published_at: string
  is_active: boolean
  is_featured: boolean
  status: string
  views_count: number
  reading_time: number
  author: UserProfile
  categories: BlogCategory[]
  tags: BlogTag[]
}

export interface BlogComment extends BaseModel {
  post: number
  author_name: string
  author_email: string
  author_website: string
  content: string
  is_approved: boolean
  parent: number | null
}

export interface ContactMessage extends BaseModel {
  name: string
  email: string
  subject: string
  message: string
  phone: string
  company: string
  is_read: boolean
  status: string
  response: string
  responded_at: string
}

export interface Newsletter extends BaseModel {
  email: string
  is_active: boolean
  subscribed_at: string
  unsubscribed_at: string
}

export interface PageView extends BaseModel {
  page_url: string
  page_title: string
  referrer: string
  user_agent: string
  ip_address: string
  session_id: string
  user_id: number | null
  timestamp: string
}

export interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ApiError {
  detail: string
  code: string
  field?: string
}
