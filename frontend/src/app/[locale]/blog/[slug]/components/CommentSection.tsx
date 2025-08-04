'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MessageCircle, Reply, Send } from 'lucide-react'
import { toast } from 'sonner'

interface Comment {
  id: number
  author_name: string
  author_email: string
  author_website?: string
  content: string
  created_at: string
  parent?: number
  is_approved: boolean
  replies?: Comment[]
}

interface CommentSectionProps {
  postId: number
  postSlug: string
}

export default function CommentSection({ postId, postSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [replyTo, setReplyTo] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    author_name: '',
    author_email: '',
    author_website: '',
    content: ''
  })

  // Загрузка комментариев
  useEffect(() => {
    fetchComments()
  }, [postSlug])

  const fetchComments = async () => {
    try {
      const response = await fetch(`https://vitaly-portfolio-frontend-v2.vercel.app/api/blog/posts/${postSlug}/comments/`)
      if (response.ok) {
        const data = await response.json()
        setComments(data.results || [])
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoading(false)
    }
  }

  // Отправка комментария
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      console.log('Submitting comment:', {
        ...formData,
        post: postId,
        parent: replyTo
      })

      const response = await fetch(`https://vitaly-portfolio-backend-1s6954262-vitalivo-gmailcoms-projects.vercel.app/api/blog/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          post: postId,
          parent: replyTo
        })
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      // Проверяем тип контента
      const contentType = response.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json()
        console.log('Response data:', data)
        
        if (response.ok) {
          toast.success(data.message || 'Comment submitted! It will appear after moderation.')
          setFormData({ author_name: '', author_email: '', author_website: '', content: '' })
          setReplyTo(null)
        } else {
          toast.error(data.message || 'Failed to submit comment.')
        }
      } else {
        // Получаем HTML ответ для отладки
        const htmlResponse = await response.text()
        console.error('HTML Response:', htmlResponse.substring(0, 500))
        throw new Error(`Server returned HTML instead of JSON. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Comment submission error:', error)
      toast.error('Failed to submit comment. Please check the console for details.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">Loading comments...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Comments List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Comments ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="border-l-4 border-blue-200 pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-blue-600">{comment.author_name}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyTo(comment.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Reply className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comment Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {replyTo ? 'Reply to Comment' : 'Leave a Comment'}
          </CardTitle>
          {replyTo && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setReplyTo(null)}
              className="w-fit"
            >
              Cancel Reply
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author_name">Name *</Label>
                <Input
                  id="author_name"
                  name="author_name"
                  value={formData.author_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="author_email">Email *</Label>
                <Input
                  id="author_email"
                  name="author_email"
                  type="email"
                  value={formData.author_email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="author_website">Website (optional)</Label>
              <Input
                id="author_website"
                name="author_website"
                type="url"
                value={formData.author_website}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="content">Comment *</Label>
              <Textarea
                id="content"
                name="content"
                rows={4}
                value={formData.content}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Send className="h-4 w-4 mr-2" />
              {submitting ? 'Submitting...' : 'Submit Comment'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}