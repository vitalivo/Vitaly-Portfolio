#!/usr/bin/env python
import requests
import json

def test_blog_api():
    """Тестируем все эндпоинты блога"""
    
    base_url = "http://127.0.0.1:8000/api/blog"
    
    print("🧪 Тестируем API блога...")
    print("="*50)
    
    # 1. Получаем список постов
    try:
        response = requests.get(f"{base_url}/posts/")
        print(f"📋 GET /posts/ - Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            posts = data.get('results', [])
            print(f"✅ Найдено постов: {len(posts)}")
            
            # 2. Тестируем каждый пост
            for post in posts:
                slug = post.get('slug')
                title = post.get('title_en')
                post_id = post.get('id')
                
                print(f"\n📝 Тестируем пост: {title}")
                print(f"   ID: {post_id}, Slug: {slug}")
                
                # Тестируем получение поста по slug
                post_response = requests.get(f"{base_url}/posts/{slug}/")
                print(f"   GET /posts/{slug}/ - Status: {post_response.status_code}")
                
                if post_response.status_code == 200:
                    print(f"   ✅ Пост доступен")
                    post_data = post_response.json()
                    print(f"   📊 Views: {post_data.get('views_count', 0)}")
                else:
                    print(f"   ❌ Пост недоступен")
                    print(f"   Response: {post_response.text[:200]}...")
        
        else:
            print(f"❌ Ошибка получения списка постов: {response.text}")
    
    except Exception as e:
        print(f"❌ Ошибка подключения: {e}")
    
    print("\n" + "="*50)
    print("🔗 URL'ы для фронтенда:")
    
    try:
        response = requests.get(f"{base_url}/posts/")
        if response.status_code == 200:
            data = response.json()
            posts = data.get('results', [])
            
            for post in posts:
                slug = post.get('slug')
                print(f"  - http://localhost:3000/en/blog/{slug}")
    except:
        pass

if __name__ == "__main__":
    test_blog_api()
