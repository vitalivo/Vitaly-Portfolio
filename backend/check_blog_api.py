#!/usr/bin/env python3
"""
Проверяем API блога и получаем правильные slug'и
"""
import requests
import json

def check_blog_api():
    """Проверяем API блога"""
    base_url = "http://127.0.0.1:8000/api/blog"
    
    print("🔍 Проверяем API блога...")
    print("=" * 50)
    
    try:
        # Проверяем список постов
        response = requests.get(f"{base_url}/posts/", timeout=10)
        print(f"📋 GET {base_url}/posts/")
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Найдено постов: {data.get('count', 0)}")
            
            if data.get('results'):
                print("\n📝 Доступные посты:")
                for post in data['results']:
                    print(f"  - ID: {post['id']}")
                    print(f"    Slug: {post['slug']}")
                    print(f"    Title: {post['title_en']}")
                    print(f"    URL: {base_url}/posts/{post['slug']}/")
                    print()
                    
                # Проверяем каждый пост отдельно
                print("🔍 Проверяем доступность каждого поста:")
                for post in data['results']:
                    slug = post['slug']
                    try:
                        post_response = requests.get(f"{base_url}/posts/{slug}/", timeout=5)
                        if post_response.status_code == 200:
                            print(f"  ✅ {slug} - OK")
                        else:
                            print(f"  ❌ {slug} - Error {post_response.status_code}")
                    except Exception as e:
                        print(f"  ❌ {slug} - Exception: {e}")
                        
                # Показываем правильные URL'ы для фронтенда
                print("\n🔗 URL'ы для фронтенда:")
                for post in data['results']:
                    print(f"  - http://localhost:3000/en/blog/{post['slug']}")
                    
            else:
                print("❌ Нет постов в результатах")
        else:
            print(f"❌ Ошибка: {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Не удается подключиться к Django серверу!")
        print("Убедитесь, что Django сервер запущен на http://127.0.0.1:8000")
        print("\nДля запуска Django сервера:")
        print("python manage.py runserver")
        return False
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        return False
    
    return True

if __name__ == "__main__":
    check_blog_api()
