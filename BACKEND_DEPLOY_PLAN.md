# 🚀 План деплоя Backend с нуля - Портфолио Виталия

> **Для нового чата: Деплой Django на Railway с полной проверкой**

## 📊 **ТЕКУЩИЙ СТАТУС**

### ✅ **ЧТО УЖЕ ГОТОВО:**
- **Frontend (Next.js)** - 100% готов и задеплоен на Vercel ✅
  - URL: https://vitalyportfolio.vercel.app
  - Работает полностью, но подключен к localhost API
- **Backend (Django)** - 100% готов локально ✅
  - Все модели, API endpoints, многоязычность
  - Работает на http://127.0.0.1:8000
  - Все тесты проходят

### 🎯 **ЦЕЛЬ:**
**Задеплоить Django backend на Railway с нуля, проверив каждый шаг**

---

## 🏗️ **АРХИТЕКТУРА ПРОЕКТА**

### **Backend структура:**
\`\`\`
backend/
├── apps/
│   ├── blog/           # Блог система (многоязычная)
│   ├── contacts/       # Контактные формы + Email/Telegram
│   ├── core/           # Основные модели
│   └── portfolio/      # Проекты и навыки
├── config/
│   ├── settings/
│   │   ├── base.py     # Базовые настройки
│   │   ├── development.py  # Локальная разработка
│   │   └── production.py   # Продакшн (НУЖНО ПРОВЕРИТЬ!)
│   ├── urls.py         # URL маршруты
│   └── wsgi.py         # WSGI конфигурация
├── requirements/
│   ├── base.txt        # Базовые зависимости
│   ├── development.txt # Для разработки
│   └── production.txt  # Для продакшна (НУЖНО ПРОВЕРИТЬ!)
├── Procfile           # Railway команды запуска (НУЖНО ПРОВЕРИТЬ!)
├── railway.toml       # Railway конфигурация (НУЖНО ПРОВЕРИТЬ!)
└── manage.py
\`\`\`

---

## 🔍 **ЧТО НУЖНО ПРОВЕРИТЬ ПЕРЕД ДЕПЛОЕМ**

### **1. Python зависимости (requirements/production.txt):**
\`\`\`txt
# ПРОВЕРИТЬ: Только необходимые для продакшна
Django>=4.2,<5.0
djangorestframework>=3.14.0
django-cors-headers>=4.3.0
psycopg2-binary>=2.9.7
dj-database-url>=2.1.0
python-decouple>=3.8
gunicorn>=21.2.0
whitenoise>=6.6.0
requests>=2.31.0

# БЕЗ debug_toolbar и других dev зависимостей!
\`\`\`

### **2. Production настройки (config/settings/production.py):**
```python
# ПРОВЕРИТЬ КАЖДУЮ СТРОКУ:
DEBUG = False  # Обязательно False!
ALLOWED_HOSTS = [
    '.railway.app',
    'localhost',
    '127.0.0.1'
]

# CORS для Vercel
CORS_ALLOWED_ORIGINS = [
    "https://vitalyportfolio.vercel.app",
]

# База данных Railway
DATABASES = {
    'default': dj_database_url.config(
        default=config('DATABASE_URL'),
        conn_max_age=600,
    )
}

# Статические файлы
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
