import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, Eye, User, ArrowLeft, Heart, MessageCircle, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import CommentSection from './components/CommentSection'
import LikeButton from './components/LikeButton'
import SubscribeForm from './components/SubscribeForm'

interface BlogPost {
  id: number
  slug: string
  title_en: string
  title_ru: string
  title_he: string
  content_en: string
  content_ru: string
  content_he: string
  published_at: string
  read_time: number
  allow_comments: boolean
  tags: Array<{
    id: number
    name_en: string
    name_ru: string
    name_he: string
    color: string
  }>
  categories: Array<{
    id: number
    name_en: string
    name_ru: string
    name_he: string
    color: string
  }>
  author: {
    username: string
    first_name: string
    last_name: string
  }
  views_count: number
  likes_count?: number
  comments_count?: number
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/blog/posts/${slug}/`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return null
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  const post = await getBlogPost(slug)
  
  if (!post) {
    notFound()
  }

  // Функция для получения локализованного контента
  const getLocalizedText = (item: any, field: string): string => {
    const localeField = `${field}_${locale}`
    return item[localeField] || item[`${field}_en`] || ''
  }

  const title = getLocalizedText(post, 'title')
  const content = getLocalizedText(post, 'content')

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/#blog" className="hover:text-blue-600">Blog</Link>
            <span>/</span>
            <span className="text-gray-900">{title}</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="max-w-4xl">
              {/* Article Header */}
              <header className="mb-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
                    <h1 className="text-4xl font-bold mb-4">{title}</h1>
                    
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-blue-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.published_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{post.read_time} min read</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <span>{post.views_count} views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{post.author.username}</span>
                      </div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="p-6 border-b bg-gray-50">
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map(category => (
                        <span 
                          key={category.id}
                          className="px-3 py-1 rounded-full text-sm font-medium text-white"
                          style={{ backgroundColor: category.color }}
                        >
                          {getLocalizedText(category, 'name')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="text-gray-700 leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }}
                  />
                </div>
              </div>

              {/* Interaction Bar */}
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <LikeButton postId={post.id} initialLikes={post.likes_count || 0} />
                    <div className="flex items-center gap-2 text-gray-600">
                      <MessageCircle className="h-5 w-5" />
                      <span>{post.comments_count || 0} comments</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span 
                      key={tag.id}
                      className="px-3 py-1 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: tag.color }}
                    >
                      {getLocalizedText(tag, 'name')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              {post.allow_comments && (
                <CommentSection postId={post.id} postSlug={post.slug} />
              )}

              {/* Back to Blog */}
              <div className="text-center mt-8">
                <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Link href="/#blog" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to All Posts
                  </Link>
                </Button>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Subscribe Form */}
              <SubscribeForm />
              
              {/* Author Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About Author</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{post.author.username[0].toUpperCase()}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{post.author.username}</h4>
                      <p className="text-sm text-gray-600">Full Stack Developer</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Passionate developer creating modern web applications with Django and Next.js.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}