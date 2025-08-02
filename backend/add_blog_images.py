#!/usr/bin/env python
import os
import sys
import django
from pathlib import Path

# Настройка Django
sys.path.append(str(Path(__file__).parent))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.blog.models import Post
from django.core.files.base import ContentFile
import requests
from io import BytesIO

def add_images_to_posts():
    """Добавляем изображения к постам блога"""
    
    print("🖼️  ДОБАВЛЯЕМ ИЗОБРАЖЕНИЯ К ПОСТАМ БЛОГА")
    print("=" * 50)
    
    # Изображения для постов (можно заменить на реальные URL)
    post_images = {
        'building-insurance-platform': 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop',
        'building-news-portal': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop',
        'react-kanban-board': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
        'enterprise-equipment-management': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'
    }
    
    posts = Post.objects.all()
    
    for post in posts:
        if post.slug in post_images and not post.cover_image:
            try:
                print(f"   📸 Добавляем изображение для: {post.title_en}")
                
                # Скачиваем изображение
                response = requests.get(post_images[post.slug])
                if response.status_code == 200:
                    # Создаем файл
                    image_file = ContentFile(response.content)
                    filename = f"{post.slug}-cover.jpg"
                    
                    # Сохраняем изображение
                    post.cover_image.save(filename, image_file, save=True)
                    print(f"   ✅ Изображение добавлено: {filename}")
                else:
                    print(f"   ❌ Ошибка загрузки изображения для {post.slug}")
                    
            except Exception as e:
                print(f"   ❌ Ошибка: {e}")
    
    print("\n🎉 ИЗОБРАЖЕНИЯ ДОБАВЛЕНЫ!")
    print(f"📊 Обработано постов: {posts.count()}")

if __name__ == '__main__':
    add_images_to_posts()
