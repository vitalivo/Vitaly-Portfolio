"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, Filter } from "lucide-react"
import { blogApiService } from "@/services/blog-api"
import type { BlogPost, BlogCategory, BlogTag } from "@/types/api"
import { getLocalizedField } from "@/utils/localization"
import type { Locale } from "@/types/api"

interface BlogRealProps {
  locale: Locale
  t: (key: string) => string
}

export function BlogReal({ locale, t }: BlogRealProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [tags, setTags] = useState<BlogTag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Загружаем данные с Django API
  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Загружаем все данные параллельно
        const [postsResponse, categoriesResponse, tagsResponse] = await Promise.all([
          blogApiService.getPosts({
            category: selectedCategory || undefined,
            tag: selectedTag || undefined,
            search: searchQuery || undefined,
          }),
          blogApiService.getCategories(),
          blogApiService.getTags(),
        ])

        setPosts(postsResponse.results)
        setCategories(categoriesResponse.results)
        setTags(tagsResponse.results)
      } catch (err) {
        console.error("Error loading blog data:", err)
        setError(t("blog.errorLoading"))
      } finally {
        setLoading(false)
      }
    }

    loadBlogData()
  }, [selectedCategory, selectedTag, searchQuery, t])

  // Обработка поиска
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Поиск уже выполняется через useEffect
  }

  // Сброс фильтров
  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedTag(null)
    setSearchQuery("")
  }

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">{t("blog.loadingArticles")}</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="blog" className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>{t("blog.tryAgain")}</Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {t("blog.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("blog.subtitle")}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {posts.length} {t("blog.articlesFromApi")}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
            <Input
              type="text"
              placeholder={t("blog.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              {t("blog.allCategories")}
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.slug ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.slug)}
                className="gap-1"
              >
                <span>{category.icon}</span>
                {getLocalizedField(category, "name", locale)}
              </Button>
            ))}
          </div>

          {/* Tags Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.slice(0, 8).map((tag) => (
              <Badge
                key={tag.id}
                variant={selectedTag === tag.slug ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => setSelectedTag(selectedTag === tag.slug ? null : tag.slug)}
              >
                {getLocalizedField(tag, "name", locale)}
              </Badge>
            ))}
          </div>

          {/* Clear Filters */}
          {(selectedCategory || selectedTag || searchQuery) && (
            <div className="text-center">
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <Filter className="h-4 w-4 mr-2" />
                {t("blog.clearFilters")}
              </Button>
            </div>
          )}
        </div>

        {/* Blog Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t("blog.noArticles")}</p>
            <Button variant="outline" onClick={clearFilters} className="mt-4 bg-transparent">
              {t("blog.showAllArticles")}
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => {
              const gradients = [
                "from-yellow-400 to-orange-500",
                "from-pink-400 to-red-500",
                "from-purple-400 to-indigo-500",
              ]

              return (
                <Card
                  key={post.id}
                  className="h-full hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-xl bg-white/90 backdrop-blur-sm"
                >
                  <CardHeader>
                    <div
                      className={`aspect-video bg-gradient-to-br ${gradients[index % gradients.length]} rounded-lg mb-4 flex items-center justify-center shadow-lg overflow-hidden relative`}
                    >
                      {post.cover_image ? (
                        <img
                          src={post.cover_image || "/placeholder.svg"}
                          alt={getLocalizedField(post, "title", locale)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-6xl text-white">📝</span>
                      )}
                      {/* Featured badge */}
                      {post.is_featured && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                          ⭐ {t("blog.featured")}
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-xl text-orange-700 line-clamp-2">
                      {getLocalizedField(post, "title", locale)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {getLocalizedField(post, "excerpt", locale)}
                    </p>

                    {/* Meta information */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-full">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="text-blue-700">{new Date(post.published_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span className="text-green-700">
                          {post.read_time} {t("blog.readTime")}
                        </span>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.map((category) => (
                        <Badge
                          key={category.id}
                          style={{ backgroundColor: category.color }}
                          className="text-white border-0"
                        >
                          {category.icon} {getLocalizedField(category, "name", locale)}
                        </Badge>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag.id}
                          variant="secondary"
                          className="text-xs"
                          style={{ backgroundColor: tag.color + "20", color: tag.color }}
                        >
                          {getLocalizedField(tag, "name", locale)}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-lg">
                      {t("blog.readMore")}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
