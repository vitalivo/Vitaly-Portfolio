# config/settings/production.py
from .base import *
import os
from decouple import config

DEBUG = False
SECRET_KEY = config('SECRET_KEY', default='django-insecure-temporary-key')

# ✅ ALLOWED_HOSTS
ALLOWED_HOSTS = [
    '.vercel.app',
    'localhost',
    '127.0.0.1',
]

# config/settings/production.py
CORS_ALLOWED_ORIGINS = [
    "https://vitaly-portfolio-frontend-v2.vercel.app",
    "http://localhost:3000",  # для локальной разработки
]

# CORS - максимальные разрешения для тестирования
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True


CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
# ✅ БАЗА ДАННЫХ (Neon PostgreSQL)
DATABASES = {
    'default': dj_database_url.config(
        default='postgresql://neondb_owner:npg_zdswc0SZrek6@ep-hidden-shadow-ab4n19rj-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require',
        conn_max_age=600,
    )
}

# ✅ СТАТИЧЕСКИЕ ФАЙЛЫ - ОТКЛЮЧАЕМ ДЛЯ VERCEL
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# ✅ МЕДИА ФАЙЛЫ - ОТКЛЮЧАЕМ ДЛЯ VERCEL
MEDIA_URL = '/media/'
MEDIA_ROOT = None

# Дополнительные настройки для Vercel
WHITENOISE_USE_FINDERS = True
WHITENOISE_AUTOREFRESH = True

# ✅ БЕЗОПАСНОСТЬ ДЛЯ VERCEL
SECURE_SSL_REDIRECT = False  # ← ВАЖНО: False для Vercel
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# ✅ ЛОГИРОВАНИЕ
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}

# Создание суперпользователя при старте
import os
if os.environ.get('VERCEL'):
    def create_superuser():
        try:
            from django.contrib.auth import get_user_model
            User = get_user_model()
            if not User.objects.filter(username='admin').exists():
                User.objects.create_superuser(
                    username='admin',
                    email='admin@vitalyportfolio.com', 
                    password='admin123'
                )
                print("✅ Superuser created!")
        except Exception as e:
            print(f"❌ Error creating superuser: {e}")
    
    # Выполняем при импорте
    try:
        create_superuser()
    except:
        pass