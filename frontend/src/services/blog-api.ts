import { api, API_ENDPOINTS } from "@/lib/api"
import type { ApiResponse, BlogPost, BlogCategory, BlogTag, Locale, BlogApiParams } from "@/types/api"

export interface BlogAuthor {
  id: number
  username: string
  first_name: string
  last_name: string
  full_name: string
  email: string
}

class BlogApiService {
  async getPosts(params: BlogApiParams = {}): Promise<ApiResponse<BlogPost>> {
    const response = await api.get(API_ENDPOINTS.BLOG_POSTS, { params })
    return response.data
  }

  async getPost(slug: string): Promise<BlogPost> {
    const response = await api.get(`${API_ENDPOINTS.BLOG_POSTS}${slug}/`)
    return response.data
  }

  async getFeaturedPosts(): Promise<ApiResponse<BlogPost>> {
    const response = await api.get(API_ENDPOINTS.BLOG_POSTS_FEATURED)
    return response.data
  }

  async getCategories(): Promise<ApiResponse<BlogCategory>> {
    const response = await api.get(API_ENDPOINTS.BLOG_CATEGORIES)
    return response.data
  }

  async getTags(): Promise<ApiResponse<BlogTag>> {
    const response = await api.get(API_ENDPOINTS.BLOG_TAGS)
    return response.data
  }
}

export const blogApi = new BlogApiService()

// Утилиты для получения локализованных полей
export const getBlogPostTitle = (post: BlogPost, locale: Locale): string => {
  return (post[`title_${locale}` as keyof BlogPost] as string) || post.title_en
}

export const getBlogPostSubtitle = (post: BlogPost, locale: Locale): string => {
  return (post[`subtitle_${locale}` as keyof BlogPost] as string) || post.subtitle_en || ""
}

export const getBlogPostExcerpt = (post: BlogPost, locale: Locale): string => {
  return (post[`excerpt_${locale}` as keyof BlogPost] as string) || post.excerpt_en || ""
}

export const getBlogCategoryName = (category: BlogCategory, locale: Locale): string => {
  return (category[`name_${locale}` as keyof BlogCategory] as string) || category.name_en
}

export const getBlogTagName = (tag: BlogTag, locale: Locale): string => {
  return (tag[`name_${locale}` as keyof BlogTag] as string) || tag.name_en
}

export default blogApi
