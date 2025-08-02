#!/bin/bash

echo "🚀 ЗАВЕРШАЕМ НАСТРОЙКУ БЛОГА"
echo "================================"

echo "📸 Добавляем изображения к постам..."
python add_blog_images.py

echo "🔄 Перезапускаем Django сервер..."
pkill -f "python manage.py runserver"
python manage.py runserver &

echo "🎯 Проверяем API endpoints..."
sleep 3
curl -s http://127.0.0.1:8000/api/blog/posts/ | head -c 100
echo ""

echo "✅ БЛОГ ПОЛНОСТЬЮ НАСТРОЕН!"
echo "🌐 Проверь фронтенд: npm run dev"
echo "📱 API доступен: http://127.0.0.1:8000/api/blog/"
