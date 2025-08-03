'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

interface LikeButtonProps {
  postId: number
  initialLikes: number
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)

  const handleLike = () => {
    // Пока что просто локальное состояние
    // TODO: Добавить API endpoint для лайков в Django
    if (liked) {
      setLikes(prev => prev - 1)
      setLiked(false)
    } else {
      setLikes(prev => prev + 1)
      setLiked(true)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      className={`flex items-center gap-2 ${liked ? 'text-red-500' : 'text-gray-600'}`}
    >
      <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
      <span>{likes} likes</span>
    </Button>
  )
}