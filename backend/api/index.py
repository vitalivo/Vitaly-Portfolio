# api/index.py
import os
import sys
from pathlib import Path

# Добавляем корневую директорию в Python path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR))

# Устанавливаем настройки Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')

import django
from django.core.wsgi import get_wsgi_application

# Инициализируем Django
django.setup()

# ✅ ПРИМЕНЯЕМ МИГРАЦИИ
try:
    from django.core.management import call_command
    call_command('migrate', verbosity=1, interactive=False)
    print("✅ Migrations applied")
except Exception as e:
    print(f"❌ Migration error: {e}")

# ✅ СОЗДАЕМ СУПЕРПОЛЬЗОВАТЕЛЯ
try:
    from django.contrib.auth import get_user_model
    User = get_user_model()
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        print("✅ Superuser created")
except Exception as e:
    print(f"❌ Superuser error: {e}")

# ✅ СОЗДАЕМ ТЕСТОВЫЕ ДАННЫЕ
try:
    from apps.blog.models import Post
    if Post.objects.count() == 0:
        Post.objects.create(
            title_en="Welcome to My Blog",
            title_ru="Добро пожаловать в мой блог",
            content_en="This is my first blog post about web development!",
            content_ru="Это мой первый пост о веб-разработке!",
            is_published=True,
            read_time=5
        )
        Post.objects.create(
            title_en="My Development Journey", 
            title_ru="Мой путь разработчика",
            content_en="Learning Django and Next.js has been amazing!",
            content_ru="Изучение Django и Next.js было потрясающим!",
            is_published=True,
            read_time=8
        )
        print("✅ Test posts created")
except Exception as e:
    print(f"❌ Test data error: {e}")

# Получаем WSGI приложение
application = get_wsgi_application()

def handler(request):
    return application(request)

app = application
