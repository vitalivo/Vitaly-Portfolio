#!/usr/bin/env python
import os
import sys
import django

# Настройка Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.blog.models import Post
from apps.blog.views import PostViewSet

def debug_blog_viewset():
    """Отладка PostViewSet"""
    
    print("🔍 Отладка PostViewSet...")
    print("="*50)
    
    # Проверяем настройки ViewSet
    viewset = PostViewSet()
    
    print(f"📋 Настройки PostViewSet:")
    print(f"   lookup_field: {getattr(viewset, 'lookup_field', 'pk')}")
    print(f"   queryset count: {viewset.get_queryset().count()}")
    
    # Проверяем посты
    posts = Post.objects.filter(status='published', is_active=True)
    print(f"\n📝 Доступные посты:")
    
    for post in posts:
        print(f"  - ID: {post.id}")
        print(f"    Slug: {post.slug}")
        print(f"    Title: {post.title_en}")
        print(f"    Status: {post.status}")
        print(f"    Active: {post.is_active}")
        print(f"    URL: /api/blog/posts/{post.slug}/")
        print()
    
    print("="*50)
    print("🎯 Проверьте, что lookup_field = 'slug' установлен в PostViewSet")

if __name__ == "__main__":
    debug_blog_viewset()
