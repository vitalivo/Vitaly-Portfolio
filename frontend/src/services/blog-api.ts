import { API_BASE_URL } from "@/constants/api"

export interface BlogPost {
  id: number
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
  featured_image?: string
  published_at: string
  created_at: string
  updated_at: string
  is_active: boolean
  status: string
  views_count: number
  reading_time: number
  author?: {
    id: number
    first_name: string
    last_name: string
    avatar?: string
  }
  categories?: Array<{
    id: number
    name_en: string
    name_ru: string
    name_he: string
  }>
  tags?: Array<{
    id: number
    name_en: string
    name_ru: string
    name_he: string
  }>
}

export interface BlogPostsResponse {
  count: number
  next: string | null
  previous: string | null
  results: BlogPost[]
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log("🔍 Fetching blog posts from:", `${API_BASE_URL}/blog/posts/`)

    const response = await fetch(`${API_BASE_URL}/blog/posts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    console.log("📡 Response status:", response.status)

    if (!response.ok) {
      console.error("❌ HTTP error! status:", response.status)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: BlogPostsResponse = await response.json()
    console.log("✅ Blog posts fetched successfully:", data.results?.length || 0)

    return data.results || []
  } catch (error) {
    console.error("❌ Error fetching blog posts:", error)
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    console.log("🔍 Fetching blog post from:", `${API_BASE_URL}/blog/posts/${slug}/`)

    const response = await fetch(`${API_BASE_URL}/blog/posts/${slug}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    console.log("📡 Response status:", response.status)

    if (!response.ok) {
      console.error("❌ HTTP error! status:", response.status)
      if (response.status === 404) {
        console.log("❌ Blog post not found:", slug)
        return null
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: BlogPost = await response.json()
    console.log("✅ Blog post fetched successfully:", data.title_en)

    return data
  } catch (error) {
    console.error("❌ Error fetching blog post:", error)
    return null
  }
}

export async function getComments(): Promise<any[]> {
  try {
    return []
  } catch (error) {
    console.error("❌ Error fetching comments:", error)
    return []
  }
}
