#!/usr/bin/env python3
"""
Проверяем структуру модели Post
"""

import os
import django
import sys

# Настройка Django
sys.path.append('.')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.blog.models import Post
from django.contrib.auth.models import User

def check_blog_model():
    print("🔍 ПРОВЕРКА МОДЕЛИ POST")
    print("=" * 40)
    
    # Проверяем поля модели Post
    print("📋 Поля модели Post:")
    for field in Post._meta.fields:
        required = "❌ Required" if not field.null and not field.blank else "✅ Optional"
        print(f"   • {field.name}: {field.__class__.__name__} - {required}")
    
    print("\n👤 ПРОВЕРКА ПОЛЬЗОВАТЕЛЕЙ:")
    users = User.objects.all()
    print(f"Всего пользователей: {users.count()}")
    for user in users:
        print(f"   • {user.username} (ID: {user.id}) - {user.email}")
    
    if users.count() == 0:
        print("❌ Нет пользователей! Нужно создать автора для постов.")
    else:
        print("✅ Есть пользователи для создания постов.")

if __name__ == "__main__":
    check_blog_model()
