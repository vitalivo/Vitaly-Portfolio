#!/usr/bin/env python
import os
import sys
import django

# Настройка Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.blog.models import Post

def fix_blog_slugs():
    """Исправляем slug'и для постов блога"""
    
    print("🔧 Исправляем slug'и постов...")
    print("="*50)
    
    posts = Post.objects.all()
    
    for post in posts:
        old_slug = post.slug
        
        # Создаем правильный slug из заголовка
        title = post.title_en or "untitled"
        new_slug = title.lower().replace(" ", "-").replace(":", "").replace(",", "")
        
        # Убираем лишние символы
        import re
        new_slug = re.sub(r'[^a-z0-9\-]', '', new_slug)
        new_slug = re.sub(r'-+', '-', new_slug)
        new_slug = new_slug.strip('-')
        
        if old_slug != new_slug:
            print(f"📝 Пост ID {post.id}:")
            print(f"   Старый slug: {old_slug}")
            print(f"   Новый slug: {new_slug}")
            
            post.slug = new_slug
            post.save()
            print(f"   ✅ Обновлен")
        else:
            print(f"✅ Пост ID {post.id} - slug корректный: {old_slug}")
    
    print("\n" + "="*50)
    print("🎉 Все slug'и исправлены!")
    
    # Проверяем результат
    print("\n📋 Текущие посты:")
    for post in Post.objects.all():
        print(f"  - ID: {post.id}, Slug: {post.slug}, Title: {post.title_en}")

if __name__ == "__main__":
    fix_blog_slugs()
