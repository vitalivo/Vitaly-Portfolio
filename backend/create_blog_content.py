#!/usr/bin/env python3
"""
Исправленный скрипт для создания контента блога с автором
"""

import os
import django
import sys
from datetime import datetime, timedelta
from django.utils import timezone

# Настройка Django
sys.path.append('.')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.blog.models import Category, Tag, Post
from django.contrib.auth.models import User

def create_blog_content_fixed():
    print("🚀 СОЗДАНИЕ КОНТЕНТА БЛОГА (ИСПРАВЛЕННАЯ ВЕРСИЯ)")
    print("=" * 50)
    
    # Проверяем/создаем автора
    print("👤 Проверяем автора...")
    try:
        author = User.objects.get(username='admin')
        print(f"   ✅ Найден автор: {author.username}")
    except User.DoesNotExist:
        print("   ❌ Автор 'admin' не найден. Создаем нового пользователя...")
        author = User.objects.create_user(
            username='vitaly_author',
            email='vitalivo@gmail.com',
            password='author123',
            first_name='Vitaly',
            last_name='Voloshyn'
        )
        print(f"   ✅ Создан автор: {author.username}")
    
    # Создаем категории
    categories_data = [
        {
            'slug': 'backend',
            'name_en': 'Backend Development',
            'name_ru': 'Backend Разработка', 
            'name_he': 'פיתוח Backend',
            'description_en': 'Server-side development with Django and Python',
            'description_ru': 'Серверная разработка с Django и Python',
            'description_he': 'פיתוח צד שרת עם Django ו-Python',
            'icon': '⚙️',
            'color': '#3B82F6',
            'order': 1
        },
        {
            'slug': 'frontend',
            'name_en': 'Frontend Development',
            'name_ru': 'Frontend Разработка',
            'name_he': 'פיתוח Frontend', 
            'description_en': 'Client-side development with React and Next.js',
            'description_ru': 'Клиентская разработка с React и Next.js',
            'description_he': 'פיתוח צד לקוח עם React ו-Next.js',
            'icon': '🎨',
            'color': '#10B981',
            'order': 2
        },
        {
            'slug': 'fullstack',
            'name_en': 'Full Stack',
            'name_ru': 'Full Stack',
            'name_he': 'Full Stack',
            'description_en': 'Complete web application development',
            'description_ru': 'Полная разработка веб-приложений',
            'description_he': 'פיתוח אפליקציות ווב מלא',
            'icon': '🚀',
            'color': '#8B5CF6',
            'order': 3
        },
        {
            'slug': 'career',
            'name_en': 'Career',
            'name_ru': 'Карьера',
            'name_he': 'קריירה',
            'description_en': 'Career development and learning journey',
            'description_ru': 'Развитие карьеры и обучение',
            'description_he': 'פיתוח קריירה ומסע למידה',
            'icon': '📈',
            'color': '#F59E0B',
            'order': 4
        }
    ]
    
    print("📁 Создаем категории...")
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults=cat_data
        )
        if created:
            print(f"   ✅ {category.name_en}")
        else:
            print(f"   ⚠️  {category.name_en} (уже существует)")
    
    # Создаем теги
    tags_data = [
        {'slug': 'django', 'name_en': 'Django', 'name_ru': 'Django', 'name_he': 'Django', 'color': '#092E20'},
        {'slug': 'python', 'name_en': 'Python', 'name_ru': 'Python', 'name_he': 'Python', 'color': '#3776AB'},
        {'slug': 'react', 'name_en': 'React', 'name_ru': 'React', 'name_he': 'React', 'color': '#61DAFB'},
        {'slug': 'nextjs', 'name_en': 'Next.js', 'name_ru': 'Next.js', 'name_he': 'Next.js', 'color': '#000000'},
        {'slug': 'typescript', 'name_en': 'TypeScript', 'name_ru': 'TypeScript', 'name_he': 'TypeScript', 'color': '#3178C6'},
        {'slug': 'javascript', 'name_en': 'JavaScript', 'name_ru': 'JavaScript', 'name_he': 'JavaScript', 'color': '#F7DF1E'},
        {'slug': 'api', 'name_en': 'API', 'name_ru': 'API', 'name_he': 'API', 'color': '#FF6B6B'},
        {'slug': 'database', 'name_en': 'Database', 'name_ru': 'База данных', 'name_he': 'בסיס נתונים', 'color': '#336791'},
        {'slug': 'tutorial', 'name_en': 'Tutorial', 'name_ru': 'Туториал', 'name_he': 'מדריך', 'color': '#4ECDC4'},
        {'slug': 'tips', 'name_en': 'Tips', 'name_ru': 'Советы', 'name_he': 'טיפים', 'color': '#45B7D1'},
        {'slug': 'html', 'name_en': 'HTML', 'name_ru': 'HTML', 'name_he': 'HTML', 'color': '#E34F26'},
        {'slug': 'css', 'name_en': 'CSS', 'name_ru': 'CSS', 'name_he': 'CSS', 'color': '#1572B6'},
        {'slug': 'bootstrap', 'name_en': 'Bootstrap', 'name_ru': 'Bootstrap', 'name_he': 'Bootstrap', 'color': '#7952B3'},
    ]
    
    print("🏷️  Создаем теги...")
    for tag_data in tags_data:
        tag, created = Tag.objects.get_or_create(
            slug=tag_data['slug'],
            defaults=tag_data
        )
        if created:
            print(f"   ✅ {tag.name_en}")
        else:
            print(f"   ⚠️  {tag.name_en} (уже существует)")
    
    # Создаем посты на основе реальных проектов Виталия
    posts_data = [
        {
            'slug': 'building-insurance-platform',
            'title_en': 'Building a Professional Insurance Platform',
            'title_ru': 'Создание профессиональной страховой платформы',
            'title_he': 'בניית פלטפורמת ביטוח מקצועית',
            'subtitle_en': 'From concept to deployment: creating a modern insurance website',
            'subtitle_ru': 'От концепции до деплоя: создание современного страхового сайта',
            'subtitle_he': 'מרעיון ועד פריסה: יצירת אתר ביטוח מודרני',
            'excerpt_en': 'Learn how I built a comprehensive insurance platform with modern UI/UX design, responsive layout, and professional functionality.',
            'excerpt_ru': 'Узнайте, как я создал комплексную страховую платформу с современным UI/UX дизайном, адаптивной версткой и профессиональным функционалом.',
            'excerpt_he': 'למדו איך בניתי פלטפורמת ביטוח מקיפה עם עיצוב UI/UX מודרני, פריסה רספונסיבית ופונקציונליות מקצועית.',
            'content_en': '''# Building a Professional Insurance Platform

## Project Overview
The insurance platform project was one of my most challenging and rewarding frontend development experiences. The goal was to create a modern, user-friendly website that would serve both insurance agents and potential clients.

## Key Features Implemented
- **Responsive Design**: Mobile-first approach ensuring perfect display on all devices
- **Modern UI/UX**: Clean, professional design with intuitive navigation
- **Performance Optimization**: Fast loading times and smooth interactions
- **Cross-browser Compatibility**: Tested across all major browsers

## Technologies Used
- **HTML5**: Semantic markup for better SEO and accessibility
- **CSS3**: Advanced styling with Flexbox and Grid layouts
- **JavaScript**: Interactive elements and form validation
- **Bootstrap**: Responsive framework for rapid development

## Challenges and Solutions
One of the biggest challenges was creating a design that felt both professional and approachable. Insurance can be a complex topic, so the interface needed to simplify information without losing important details.

## Results
The final platform successfully balances functionality with aesthetics, providing users with an intuitive experience while maintaining the professional standards expected in the insurance industry.

**Live Demo**: [https://vitalivo.github.io/insurance-platform/](https://vitalivo.github.io/insurance-platform/)
**GitHub**: [https://github.com/vitalivo/insurance-platform](https://github.com/vitalivo/insurance-platform)
''',
            'content_ru': '''# Создание профессиональной страховой платформы

## Обзор проекта
Проект страховой платформы стал одним из самых сложных и полезных опытов в frontend разработке. Цель состояла в создании современного, удобного сайта для страховых агентов и потенциальных клиентов.

## Ключевые функции
- **Адаптивный дизайн**: Mobile-first подход для идеального отображения на всех устройствах
- **Современный UI/UX**: Чистый, профессиональный дизайн с интуитивной навигацией
- **Оптимизация производительности**: Быстрая загрузка и плавные взаимодействия
- **Кроссбраузерность**: Тестирование во всех основных браузерах

## Использованные технологии
- **HTML5**: Семантическая разметка для лучшего SEO и доступности
- **CSS3**: Продвинутая стилизация с Flexbox и Grid
- **JavaScript**: Интерактивные элементы и валидация форм
- **Bootstrap**: Адаптивный фреймворк для быстрой разработки

## Вызовы и решения
Одним из главных вызовов было создание дизайна, который был бы одновременно профессиональным и доступным. Страхование - сложная тема, поэтому интерфейс должен был упрощать информацию, не теряя важных деталей.

## Результаты
Финальная платформа успешно балансирует функциональность с эстетикой, предоставляя пользователям интуитивный опыт при сохранении профессиональных стандартов страховой индустрии.

**Демо**: [https://vitalivo.github.io/insurance-platform/](https://vitalivo.github.io/insurance-platform/)
**GitHub**: [https://github.com/vitalivo/insurance-platform](https://github.com/vitalivo/insurance-platform)
''',
            'content_he': '''# בניית פלטפורמת ביטוח מקצועית

## סקירת הפרויקט
פרויקט פלטפורמת הביטוח היה אחד החוויות המאתגרות והמתגמלות ביותר בפיתוח frontend. המטרה הייתה ליצור אתר מודרני וידידותי למשתמש שישרת גם סוכני ביטוח וגם לקוחות פוטנציאליים.

## תכונות מרכזיות
- **עיצוב רספונסיבי**: גישת Mobile-first להצגה מושלמת בכל המכשירים
- **UI/UX מודרני**: עיצוב נקי ומקצועי עם ניווט אינטואיטיבי
- **אופטימיזציית ביצועים**: זמני טעינה מהירים ואינטראקציות חלקות
- **תאימות דפדפנים**: נבדק בכל הדפדפנים הראשיים

## טכנולוגיות בשימוש
- **HTML5**: סימון סמנטי לשיפור SEO ונגישות
- **CSS3**: עיצוב מתקדם עם Flexbox ו-Grid
- **JavaScript**: אלמנטים אינטראקטיביים ואימות טפסים
- **Bootstrap**: מסגרת רספונסיבית לפיתוח מהיר

## אתגרים ופתרונות
אחד האתגרים הגדולים היה יצירת עיצוב שיהיה גם מקצועי וגם נגיש. ביטוח יכול להיות נושא מורכב, אז הממשק היה צריך לפשט מידע מבלי לאבד פרטים חשובים.

## תוצאות
הפלטפורמה הסופית מאזנת בהצלחה בין פונקציונליות לאסתטיקה, ומספקת למשתמשים חוויה אינטואיטיבית תוך שמירה על הסטנדרטים המקצועיים הנדרשים בתעשיית הביטוח.

**דמו**: [https://vitalivo.github.io/insurance-platform/](https://vitalivo.github.io/insurance-platform/)
**GitHub**: [https://github.com/vitalivo/insurance-platform](https://github.com/vitalivo/insurance-platform)
''',
            'categories': ['frontend'],
            'tags': ['html', 'css', 'javascript', 'bootstrap'],
            'is_featured': True,
            'read_time': 8,
            'status': 'published'
        },
        {
            'slug': 'django-news-portal-development',
            'title_en': 'Building a News Portal with Django REST API',
            'title_ru': 'Создание новостного портала с Django REST API',
            'title_he': 'בניית פורטל חדשות עם Django REST API',
            'subtitle_en': 'Full-stack development with Django, REST API, and multilingual support',
            'subtitle_ru': 'Full-stack разработка с Django, REST API и многоязычной поддержкой',
            'subtitle_he': 'פיתוח Full-stack עם Django, REST API ותמיכה רב-לשונית',
            'excerpt_en': 'Complete walkthrough of building a comprehensive news portal with Django backend, REST API, multilingual support, and admin interface.',
            'excerpt_ru': 'Полное руководство по созданию комплексного новостного портала с Django backend, REST API, многоязычной поддержкой и админ-интерфейсом.',
            'excerpt_he': 'מדריך מלא לבניית פורטל חדשות מקיף עם Django backend, REST API, תמיכה רב-לשונית וממשק ניהול.',
            'content_en': '''# Building a News Portal with Django REST API

## Project Architecture
This news portal project demonstrates advanced Django development techniques, including REST API design, internationalization, and content management systems.

## Key Features
- **Django REST Framework**: Powerful API for frontend integration
- **Multilingual Support**: Content available in multiple languages
- **Admin Interface**: Custom Django admin for content management
- **User Authentication**: Secure user registration and login
- **Content Categories**: Organized news categorization system

## Technical Implementation
The project uses Django's built-in internationalization framework to support multiple languages, making it accessible to a global audience.

## Database Design
Carefully designed models ensure efficient data storage and retrieval, with proper relationships between articles, categories, and user interactions.

## API Endpoints
RESTful API design following best practices for scalability and maintainability.

**GitHub**: [https://github.com/vitalivo/NEWS_PORTALL](https://github.com/vitalivo/NEWS_PORTALL)
''',
            'content_ru': '''# Создание новостного портала с Django REST API

## Архитектура проекта
Этот проект новостного портала демонстрирует продвинутые техники разработки на Django, включая дизайн REST API, интернационализацию и системы управления контентом.

## Ключевые функции
- **Django REST Framework**: Мощный API для интеграции с frontend
- **Многоязычная поддержка**: Контент доступен на нескольких языках
- **Админ-интерфейс**: Кастомная Django админка для управления контентом
- **Аутентификация пользователей**: Безопасная регистрация и вход
- **Категории контента**: Организованная система категоризации новостей

## Техническая реализация
Проект использует встроенный фреймворк интернационализации Django для поддержки нескольких языков, делая его доступным для глобальной аудитории.

## Дизайн базы данных
Тщательно спроектированные модели обеспечивают эффективное хранение и извлечение данных с правильными связями между статьями, категориями и пользовательскими взаимодействиями.

## API Endpoints
RESTful API дизайн следует лучшим практикам для масштабируемости и поддерживаемости.

**GitHub**: [https://github.com/vitalivo/NEWS_PORTALL](https://github.com/vitalivo/NEWS_PORTALL)
''',
            'content_he': '''# בניית פורטל חדשות עם Django REST API

## ארכיטקטורת הפרויקט
פרויקט פורטל החדשות הזה מדגים טכניקות פיתוח מתקדמות ב-Django, כולל עיצוב REST API, בינאום ומערכות ניהול תוכן.

## תכונות מרכזיות
- **Django REST Framework**: API חזק לאינטגרציה עם frontend
- **תמיכה רב-לשונית**: תוכן זמין במספר שפות
- **ממשק ניהול**: Django admin מותאם אישית לניהול תוכן
- **אימות משתמשים**: רישום והתחברות מאובטחים
- **קטגוריות תוכן**: מערכת קטגוריזציה מאורגנת של חדשות

## יישום טכני
הפרויקט משתמש במסגרת הבינאום המובנית של Django לתמיכה במספר שפות, מה שהופך אותו לנגיש לקהל גלובלי.

## עיצוב בסיס הנתונים
מודלים מתוכננים בקפידה מבטיחים אחסון ואחזור יעיל של נתונים, עם קשרים נכונים בין מאמרים, קטגוריות ואינטראקציות משתמשים.

## נקודות קצה API
עיצוב RESTful API העוקב אחר שיטות עבודה מומלצות לסקלביליות ותחזוקה.

**GitHub**: [https://github.com/vitalivo/NEWS_PORTALL](https://github.com/vitalivo/NEWS_PORTALL)
''',
            'categories': ['backend', 'fullstack'],
            'tags': ['django', 'python', 'api', 'database'],
            'is_featured': True,
            'read_time': 12,
            'status': 'published'
        },
        {
            'slug': 'react-kanban-board-tutorial',
            'title_en': 'React Kanban Board: From Concept to Production',
            'title_ru': 'React Kanban Board: От концепции до продакшена',
            'title_he': 'React Kanban Board: מרעיון ועד פרודקשן',
            'subtitle_en': 'Building an interactive task management application with React and TypeScript',
            'subtitle_ru': 'Создание интерактивного приложения для управления задачами с React и TypeScript',
            'subtitle_he': 'בניית אפליקציית ניהול משימות אינטראקטיבית עם React ו-TypeScript',
            'excerpt_en': 'Complete walkthrough of building an interactive task management application with drag-and-drop functionality using React and TypeScript.',
            'excerpt_ru': 'Полное руководство по созданию интерактивного приложения для управления задачами с функциональностью drag-and-drop на React и TypeScript.',
            'excerpt_he': 'מדריך מלא לבניית אפליקציית ניהול משימות אינטראקטיבית עם פונקציונליות drag-and-drop באמצעות React ו-TypeScript.',
            'content_en': '''# React Kanban Board: From Concept to Production

## Project Overview
The Kanban Board project showcases modern React development practices, including TypeScript integration, local storage persistence, and responsive design principles.

## Key Features Implemented
- **Drag and Drop**: Intuitive task movement between columns
- **Local Storage**: Persistent data without backend dependency
- **TypeScript**: Type-safe development for better code quality
- **Responsive Design**: Works perfectly on all device sizes
- **Task Management**: Create, edit, and organize tasks efficiently

## Technical Architecture
The application follows React best practices with functional components, custom hooks, and proper state management.

## Challenges Overcome
- Implementing smooth drag-and-drop interactions
- Managing complex state updates
- Ensuring data persistence across sessions
- Creating an intuitive user interface

## Technologies Used
- React 18 with functional components
- TypeScript for type safety
- CSS Modules for styling
- Local Storage API for persistence
- React Testing Library for testing

**Live Demo**: [https://vitalivo.github.io/Kanban-Board/](https://vitalivo.github.io/Kanban-Board/)
**GitHub**: [https://github.com/vitalivo/Kanban-Board.git](https://github.com/vitalivo/Kanban-Board.git)
''',
            'content_ru': '''# React Kanban Board: От концепции до продакшена

## Обзор проекта
Проект Kanban Board демонстрирует современные практики разработки на React, включая интеграцию TypeScript, сохранение в локальном хранилище и принципы адаптивного дизайна.

## Реализованные функции
- **Drag and Drop**: Интуитивное перемещение задач между колонками
- **Local Storage**: Постоянное хранение данных без зависимости от backend
- **TypeScript**: Типобезопасная разработка для лучшего качества кода
- **Адаптивный дизайн**: Идеально работает на всех размерах устройств
- **Управление задачами**: Эффективное создание, редактирование и организация задач

## Техническая архитектура
Приложение следует лучшим практикам React с функциональными компонентами, кастомными хуками и правильным управлением состоянием.

## Преодоленные вызовы
- Реализация плавных drag-and-drop взаимодействий
- Управление сложными обновлениями состояния
- Обеспечение сохранности данных между сессиями
- Создание интуитивного пользовательского интерфейса

## Использованные технологии
- React 18 с функциональными компонентами
- TypeScript для типобезопасности
- CSS Modules для стилизации
- Local Storage API для сохранения
- React Testing Library для тестирования

**Демо**: [https://vitalivo.github.io/Kanban-Board/](https://vitalivo.github.io/Kanban-Board/)
**GitHub**: [https://github.com/vitalivo/Kanban-Board.git](https://github.com/vitalivo/Kanban-Board.git)
''',
            'content_he': '''# React Kanban Board: מרעיון ועד פרודקשן

## סקירת הפרויקט
פרויקט ה-Kanban Board מדגים שיטות פיתוח מודרניות ב-React, כולל אינטגרציה של TypeScript, שמירה ב-local storage ועקרונות עיצוב רספונסיבי.

## תכונות שיושמו
- **Drag and Drop**: העברת משימות אינטואיטיבית בין עמודות
- **Local Storage**: שמירת נתונים קבועה ללא תלות ב-backend
- **TypeScript**: פיתוח בטוח מבחינת טיפוסים לאיכות קוד טובה יותר
- **עיצוב רספונסיבי**: עובד בצורה מושלמת בכל גדלי המכשירים
- **ניהול משימות**: יצירה, עריכה וארגון יעיל של משימות

## ארכיטקטורה טכנית
האפליקציה עוקבת אחר שיטות עבודה מומלצות של React עם רכיבים פונקציונליים, hooks מותאמים אישית וניהול state נכון.

## אתגרים שהתגברנו עליהם
- יישום אינטראקציות drag-and-drop חלקות
- ניהול עדכוני state מורכבים
- הבטחת שמירת נתונים בין סשנים
- יצירת ממשק משתמש אינטואיטיבי

## טכנולוגיות בשימוש
- React 18 עם רכיבים פונקציונליים
- TypeScript לבטיחות טיפוסים
- CSS Modules לעיצוב
- Local Storage API לשמירה
- React Testing Library לבדיקות

**דמו**: [https://vitalivo.github.io/Kanban-Board/](https://vitalivo.github.io/Kanban-Board/)
**GitHub**: [https://github.com/vitalivo/Kanban-Board.git](https://github.com/vitalivo/Kanban-Board.git)
''',
            'categories': ['frontend'],
            'tags': ['react', 'typescript', 'javascript'],
            'is_featured': True,
            'read_time': 15,
            'status': 'published'
        },
        {
            'slug': 'silant-forklift-management-system',
            'title_en': 'Enterprise Equipment Management with Django',
            'title_ru': 'Корпоративное управление оборудованием с Django',
            'title_he': 'ניהול ציוד ארגוני עם Django',
            'subtitle_en': 'Industrial forklift tracking and maintenance platform',
            'subtitle_ru': 'Платформа отслеживания и обслуживания промышленных погрузчиков',
            'subtitle_he': 'פלטפורמת מעקב ותחזוקה של מלגזות תעשייתיות',
            'excerpt_en': 'How I built the Silant forklift management system for industrial equipment tracking and maintenance with Django and React.',
            'excerpt_ru': 'Как я создал систему управления погрузчиками Silant для отслеживания и обслуживания промышленного оборудования с Django и React.',
            'excerpt_he': 'איך בניתי את מערכת ניהול המלגזות Silant למעקב ותחזוקה של ציוד תעשייתי עם Django ו-React.',
            'content_en': '''# Enterprise Equipment Management with Django

## Project Overview
The Silant forklift management system is a comprehensive web application for monitoring and maintaining industrial equipment throughout their lifecycle. Built for Chuvashia Power Unit Plant, it provides real-time tracking of technical specifications, maintenance schedules, and repair claims.

## Key Features
- **Equipment Lifecycle Management**: Complete tracking from manufacturing to maintenance
- **Role-based Access Control**: Different permissions for manufacturers, service companies, and clients
- **Maintenance Scheduling**: Automated reminders and tracking of service intervals
- **Repair Claims Management**: Comprehensive warranty and repair tracking system
- **Technical Specifications**: Detailed equipment catalogs and documentation

## Technical Architecture
- **Backend**: Django with Django REST Framework
- **Frontend**: React with Redux for state management
- **Database**: PostgreSQL for reliable data storage
- **Authentication**: Django-allauth for user management
- **UI Components**: Material-UI for professional interface

## Challenges Solved
- Complex role-based permissions system
- Real-time equipment status tracking
- Integration with existing enterprise systems
- Scalable architecture for industrial use

## Impact
The system successfully streamlined equipment management processes, reduced maintenance costs, and improved operational efficiency for the industrial facility.

**GitHub**: [https://github.com/vitalivo/silant-2.git](https://github.com/vitalivo/silant-2.git)
''',
            'categories': ['fullstack', 'backend'],
            'tags': ['django', 'react', 'python', 'database'],
            'is_featured': True,
            'read_time': 18,
            'status': 'published'
        }
    ]
    
    print("📝 Создаем посты...")
    for i, post_data in enumerate(posts_data):
        # Получаем категории и теги
        categories = Category.objects.filter(slug__in=post_data.pop('categories'))
        tags = Tag.objects.filter(slug__in=post_data.pop('tags'))
        
        # Создаем пост с автором
        post, created = Post.objects.get_or_create(
            slug=post_data['slug'],
            defaults={
                **post_data,
                'author': author,  # 🔧 ДОБАВЛЯЕМ АВТОРА!
                'published_at': timezone.now() - timedelta(days=len(posts_data) - i)
            }
        )
        
        if created:
            post.categories.set(categories)
            post.tags.set(tags)
            print(f"   ✅ {post.title_en}")
        else:
            print(f"   ⚠️  {post.title_en} (уже существует)")
    
    print("\n🎉 КОНТЕНТ БЛОГА СОЗДАН!")
    print(f"👤 Автор: {author.username}")
    print(f"📁 Категории: {Category.objects.count()}")
    print(f"🏷️  Теги: {Tag.objects.count()}")
    print(f"📝 Посты: {Post.objects.count()}")
    
    print("\n🔗 ПРОВЕРЬ API:")
    print("• http://127.0.0.1:8000/api/blog/posts/")
    print("• http://127.0.0.1:8000/api/blog/categories/")
    print("• http://127.0.0.1:8000/api/blog/tags/")
    print("• http://127.0.0.1:8000/admin/blog/post/")

if __name__ == "__main__":
    create_blog_content_fixed()
