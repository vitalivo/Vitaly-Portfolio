# 👨‍💻 Руководство разработчика

## 🏗️ **Архитектура проекта**

\`\`\`
vitaly-portfolio/
├── backend/                 # Django REST API
│   ├── apps/               # Django приложения
│   │   ├── blog/          # Система блогов
│   │   ├── contacts/      # Контактные формы
│   │   ├── core/          # Основные модели
│   │   └── portfolio/     # Проекты и навыки
│   ├── config/            # Настройки Django
│   │   ├── settings/      # Настройки по окружениям
│   │   └── urls.py        # URL маршруты
│   └── requirements/      # Python зависимости
└── frontend/              # Next.js приложение
    ├── src/
    │   ├── app/          # App Router страницы
    │   ├── components/   # React компоненты
    │   └── lib/         # Утилиты и API клиент
    └── public/          # Статические файлы
\`\`\`

## 🛠️ **Технологический стек**

### **Backend:**
- **Django 4.2+** - Web framework
- **Django REST Framework** - API
- **PostgreSQL** - База данных
- **Redis** - Кэширование
- **Celery** - Фоновые задачи
- **Gunicorn** - WSGI сервер
- **WhiteNoise** - Статические файлы

### **Frontend:**
- **Next.js 15** - React framework
- **TypeScript** - Типизация
- **Tailwind CSS** - Стили
- **shadcn/ui** - UI компоненты
- **Lucide React** - Иконки

### **Деплой:**
- **Railway** - Backend хостинг
- **Vercel** - Frontend хостинг
- **PostgreSQL** - Railway database
- **Redis** - Railway cache

## 🚀 **Локальная разработка**

### **Требования:**
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Redis 7+

### **Установка Backend:**
\`\`\`bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

pip install -r requirements/development.txt
python manage.py migrate
python manage.py runserver
\`\`\`

### **Установка Frontend:**
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

### **Docker (альтернатива):**
\`\`\`bash
docker-compose up -d
\`\`\`

## 🔧 **Конфигурация**

### **Backend Environment Variables:**
\`\`\`env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@host:port/db
REDIS_URL=redis://localhost:6379/0
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
\`\`\`

### **Frontend Environment Variables:**
\`\`\`env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

## 📡 **API Endpoints**

### **Blog:**
- `GET /api/blog/posts/` - Список постов
- `GET /api/blog/posts/{slug}/` - Детали поста
- `GET /api/blog/categories/` - Категории

### **Contacts:**
- `POST /api/contacts/messages/` - Отправка сообщения

### **Portfolio:**
- `GET /api/portfolio/projects/` - Проекты
- `GET /api/portfolio/skills/` - Навыки

### **Health Check:**
- `GET /api/health/` - Проверка состояния

## 🐛 **Отладка**

### **Backend логи:**
\`\`\`bash
# Development
python manage.py runserver --settings=config.settings.development

# Production logs (Railway)
railway logs --service backend
\`\`\`

### **Frontend логи:**
\`\`\`bash
# Development
npm run dev

# Production logs (Vercel)
vercel logs
\`\`\`

### **Частые проблемы:**

1. **CORS ошибки:**
   - Проверить `CORS_ALLOWED_ORIGINS`
   - Добавить домен в `CSRF_TRUSTED_ORIGINS`

2. **Database connection:**
   - Проверить `DATABASE_URL`
   - Применить миграции: `python manage.py migrate`

3. **Static files:**
   - Собрать статику: `python manage.py collectstatic`
   - Проверить `STATIC_ROOT` и `STATIC_URL`

## 🚀 **Деплой**

### **Backend (Railway):**
1. Создать проект на Railway
2. Подключить GitHub репозиторий
3. Добавить PostgreSQL service
4. Настроить environment variables
5. Деплой автоматический при push

### **Frontend (Vercel):**
1. Создать проект на Vercel
2. Подключить GitHub репозиторий
3. Настроить environment variables
4. Деплой автоматический при push

## 🧪 **Тестирование**

### **Backend тесты:**
\`\`\`bash
cd backend
python manage.py test
\`\`\`

### **Frontend тесты:**
\`\`\`bash
cd frontend
npm run test
\`\`\`

## 📦 **Структура данных**

### **Blog Post Model:**
```python
class BlogPost(models.Model):
    title_en = models.CharField(max_length=200)
    title_ru = models.CharField(max_length=200)
    title_he = models.CharField(max_length=200)
    content_en = models.TextField()
    content_ru = models.TextField()
    content_he = models.TextField()
    published_at = models.DateTimeField()
    is_featured = models.BooleanField(default=False)
