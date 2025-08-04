'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Bell } from 'lucide-react'
import { toast } from 'sonner'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('https://vitaly-portfolio-frontend-v2.vercel.app/api/blog/subscriptions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          language: 'en'
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message || 'Successfully subscribed!')
        setEmail('')
        setName('')
      } else {
        toast.error(data.message || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Subscribe to Blog
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="subscribe-name">Name (optional)</Label>
            <Input
              id="subscribe-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div>
            <Label htmlFor="subscribe-email">Email *</Label>
            <Input
              id="subscribe-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
          >
            <Mail className="h-4 w-4 mr-2" />
            {submitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          Get notified about new blog posts. Unsubscribe anytime.
        </p>
      </CardContent>
    </Card>
  )
}