"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Github,
  Linkedin,
  Mail,
  Globe,
  ArrowDown,
  ExternalLink,
  Calendar,
  Clock,
  Phone,
  MapPin,
  Menu,
  Award,
  Download,
  Code,
  Terminal,
  Loader2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

type Locale = "en" | "ru" | "he"

// ✅ ТИПЫ ДЛЯ API ДАННЫХ
interface BlogPost {
  id: number
  slug: string
  title_en: string
  title_ru: string
  title_he: string
  subtitle_en?: string
  subtitle_ru?: string
  subtitle_he?: string
  excerpt_en: string
  excerpt_ru: string
  excerpt_he: string
  content_en: string
  content_ru: string
  content_he: string
  published_at: string
  read_time: number
  views_count: number
  is_featured: boolean
  thumbnail?: string
  cover_image?: string
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
  tags: Array<{
    id: number
    name: string
    slug: string
  }>
  author: {
    id: number
    username: string
    first_name: string
    last_name: string
  }
}

const messages = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      portfolio: "Portfolio",
      certificates: "Certificates",
      blog: "Blog",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      title: "Full Stack Developer",
      subtitle: "I create modern web applications with Django and Next.js",
      cta: "View My Work",
      contact: "Get In Touch",
    },
    about: {
      title: "About Me",
      subtitle: "Passionate developer with expertise in modern web technologies",
      role: "Full Stack Developer",
      description1:
        "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable, and user-friendly applications.",
      description2:
        "With experience in Django, Next.js, React, and TypeScript, I bring ideas to life through clean code and thoughtful design.",
    },
    portfolio: {
      title: "My Portfolio",
      subtitle: "Recent projects and work",
      viewProject: "View Project",
      viewCode: "View Code",
      technologies: "Technologies Used",
    },
    blog: {
      title: "Blog",
      subtitle: "Thoughts and insights on web development",
      readMore: "Read More",
      readTime: "min read",
      loading: "Loading articles...",
      error: "Failed to load articles",
      noArticles: "No articles found",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Let's discuss your next project",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again.",
    },
    skills: {
      title: "Skills & Technologies",
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      devops: "DevOps",
    },
    certificates: {
      title: "Certificates & Achievements",
      subtitle: "Professional certifications and accomplishments",
      viewCertificate: "View Certificate",
      download: "Download",
    },
  },
  ru: {
    nav: {
      home: "Главная",
      about: "Обо мне",
      skills: "Навыки",
      portfolio: "Портфолио",
      certificates: "Сертификаты",
      blog: "Блог",
      contact: "Контакты",
    },
    hero: {
      greeting: "Привет, я",
      title: "Full Stack Разработчик",
      subtitle: "Создаю современные веб-приложения с Django и Next.js",
      cta: "Посмотреть работы",
      contact: "Связаться",
    },
    about: {
      title: "Обо мне",
      subtitle: "Увлеченный разработчик с экспертизой в современных веб-технологиях",
      role: "Full Stack Разработчик",
      description1:
        "Я увлеченный full-stack разработчик с экспертизой в современных веб-технологиях. Люблю создавать эффективные, масштабируемые и удобные приложения.",
      description2:
        "С опытом работы с Django, Next.js, React и TypeScript, я воплощаю идеи в жизнь через чистый код и продуманный дизайн.",
    },
    portfolio: {
      title: "Мое портфолио",
      subtitle: "Последние проекты и работы",
      viewProject: "Посмотреть проект",
      viewCode: "Посмотреть код",
      technologies: "Используемые технологии",
    },
    blog: {
      title: "Блог",
      subtitle: "Мысли и идеи о веб-разработке",
      readMore: "Читать далее",
      readTime: "мин чтения",
      loading: "Загрузка статей...",
      error: "Не удалось загрузить статьи",
      noArticles: "Статьи не найдены",
    },
    contact: {
      title: "Связаться со мной",
      subtitle: "Давайте обсудим ваш следующий проект",
      name: "Имя",
      email: "Email",
      subject: "Тема",
      message: "Сообщение",
      send: "Отправить",
      success: "Сообщение отправлено успешно!",
      error: "Не удалось отправить сообщение. Попробуйте еще раз.",
    },
    skills: {
      title: "Навыки и технологии",
      frontend: "Фронтенд",
      backend: "Бэкенд",
      database: "База данных",
      devops: "DevOps",
    },
    certificates: {
      title: "Сертификаты и достижения",
      subtitle: "Профессиональные сертификаты и достижения",
      viewCertificate: "Посмотреть сертификат",
      download: "Скачать",
    },
  },
  he: {
    nav: {
      home: "בית",
      about: "אודות",
      skills: "כישורים",
      portfolio: "תיק עבודות",
      certificates: "תעודות",
      blog: "בלוג",
      contact: "צור קשר",
    },
    hero: {
      greeting: "שלום, אני",
      title: "מפתח Full Stack",
      subtitle: "יוצר אפליקציות ווב מודרניות עם Django ו-Next.js",
      cta: "צפה בעבודות שלי",
      contact: "צור קשר",
    },
    about: {
      title: "אודותיי",
      subtitle: "מפתח נלהב עם מומחיות בטכנולוגיות ווב מודרניות",
      role: "מפתח Full Stack",
      description1:
        "אני מפתח full-stack נלהב עם מומחיות בטכנולוגיות ווב מודרניות. אני אוהב ליצור אפליקציות יעילות, ניתנות להרחבה וידידותיות למשתמש.",
      description2:
        "עם ניסיון ב-Django, Next.js, React ו-TypeScript, אני מביא רעיונות לחיים באמצעות קוד נקי ועיצוב מחושב.",
    },
    portfolio: {
      title: "תיק העבודות שלי",
      subtitle: "פרויקטים ועבודות אחרונות",
      viewProject: "צפה בפרויקט",
      viewCode: "צפה בקוד",
      technologies: "טכנולוגיות בשימוש",
    },
    blog: {
      title: "בלוג",
      subtitle: "מחשבות ותובנות על פיתוח ווב",
      readMore: "קרא עוד",
      readTime: "דקות קריאה",
      loading: "טוען מאמרים...",
      error: "נכשל בטעינת מאמרים",
      noArticles: "לא נמצאו מאמרים",
    },
    contact: {
      title: "צור קשר",
      subtitle: "בואו נדבר על הפרויקט הבא שלכם",
      name: "שם",
      email: "אימייל",
      subject: "נושא",
      message: "הודעה",
      send: "שלח הודעה",
      success: "ההודעה נשלחה בהצלחה!",
      error: "שליחת ההודעה נכשלה. אנא נסה שוב.",
    },
    skills: {
      title: "כישורים וטכנולוגיות",
      frontend: "פרונט-אנד",
      backend: "בק-אנד",
      database: "בסיס נתונים",
      devops: "DevOps",
    },
    certificates: {
      title: "תעודות והישגים",
      subtitle: "תעודות מקצועיות והישגים",
      viewCertificate: "צפה בתעודה",
      download: "הורד",
    },
  },
}

const languages = [
  { code: "en" as Locale, name: "English", flag: "🇺🇸" },
  { code: "ru" as Locale, name: "Русский", flag: "🇷🇺" },
  { code: "he" as Locale, name: "עברית", flag: "🇮🇱" },
]

// Остальной код остается тот же...
const projects = [
  {
    id: 1,
    title: "Insurance Platform",
    description: "Professional insurance platform with modern UI/UX design and comprehensive functionality",
    longDescription:
      "A complete insurance platform built with modern web technologies, featuring responsive design, user authentication, policy management, and claims processing.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Responsive Design"],
    projectUrl: "https://vitalivo.github.io/insurance-platform/",
    githubUrl: "https://github.com/vitalivo/insurance-platform",
    image: "/images/projects/insurance-platform.jpg",
    type: "Commercial",
    status: "Live",
    featured: true,
    year: "2024",
  },
  {
    id: 2,
    title: "News Portal (Django)",
    description: "Full-stack news portal with Django REST API, multilingual support, and admin panel",
    longDescription:
      "A comprehensive news portal built with Django, featuring REST API, user authentication, article management, multilingual support (translations), and admin interface.",
    technologies: ["Django", "Python", "REST API", "SQLite", "HTML", "CSS", "i18n"],
    projectUrl: "#",
    githubUrl: "https://github.com/vitalivo/NEWS_PORTALL",
    image: "/images/projects/news-portal.jpg",
    type: "Full-Stack",
    status: "Completed",
    featured: true,
    year: "2024",
  },
  {
    id: 3,
    title: "Telegram Bot",
    description: "Intelligent Telegram bot with automated responses and user interaction features",
    longDescription:
      "A feature-rich Telegram bot built with Python, providing automated responses, user management, and integration with external APIs.",
    technologies: ["Python", "Telegram Bot API", "SQLite", "Asyncio"],
    projectUrl: "#",
    githubUrl: "https://github.com/vitalivo/pythonProject_zoo.git",
    image: "/images/projects/telegram-bot.jpg",
    type: "Backend",
    status: "Active",
    featured: false,
    year: "2024",
  },
  {
    id: 4,
    title: "convenient blog",
    description: "Beautiful, fast and convenient blog",
    longDescription:
      "A modern frontend application showcasing advanced CSS, JavaScript, and responsive design principles.",
    technologies: ["HTML5", "CSS3", "JavaScript", "SASS", "Webpack"],
    projectUrl: "https://vitalivo.github.io/youtalk-blog/",
    githubUrl: "https://github.com/vitalivo/Youltalk-Blog.git",
    image: "/images/projects/frontend-app.jpg",
    type: "Frontend",
    status: "Completed",
    featured: false,
    year: "2025",
  },
  {
    id: 5,
    title: "slider for the site",
    description: "slider for the site by layout. images and information about the object change",
    longDescription: "slider for the site by layout. images and information about the object change",
    technologies: ["HTML5", "CSS3", "JavaScript", "SASS", "Webpack", "React"],
    projectUrl: " https://vitalivo.github.io/Slider/",
    githubUrl: "https://github.com/vitalivo/Slider.git",
    image: "/images/projects/backend-api.jpg",
    type: "Backend",
    status: "Completed",
    featured: false,
    year: "2025",
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "Multi-language portfolio website with Django backend and Next.js frontend",
    longDescription:
      "A comprehensive portfolio website featuring Django REST API backend, Next.js frontend, multilingual support (EN/RU/HE), and modern responsive design.",
    technologies: ["Next.js", "TypeScript", "Django", "PostgreSQL", "Tailwind CSS", "i18n"],
    projectUrl: "#",
    githubUrl: "https://github.com/vitalivo/Vitaly-Portfolio.git",
    image: "/images/projects/portfolio-website.jpg",
    type: "Full-Stack",
    status: "In Development",
    featured: true,
    year: "2025",
  },
  {
    id: 8,
    title: "React Kanban Board",
    description: "Interactive task management application with drag-and-drop functionality",
    longDescription:
      "A responsive Kanban board built with React that allows users to create, organize, and track tasks across different development stages (Backlog, Ready, In Progress, Finished). The application features local storage persistence, detailed task views, and user profile management.",
    technologies: [
      "React",
      "TypeScript",
      "React Router",
      "CSS Modules",
      "LocalStorage API",
      "React Testing Library",
      "React DnD (optional for drag-and-drop)",
    ],
    projectUrl: "https://vitalivo.github.io/Kanban-Board/",
    githubUrl: "https://github.com/vitalivo/Kanban-Board.git",
    image: "/images/projects/kanban-board.jpg",
    type: "Web Application",
    status: "Completed",
    featured: false,
    year: "2025",
  },
  {
    id: 9,
    title: "Silant Forklift Management System",
    description: "Industrial equipment maintenance tracking platform for Chuvashia Power Unit Plant",
    longDescription:
      "A comprehensive web application for monitoring and maintaining Silant-brand forklifts throughout their lifecycle. The system provides real-time tracking of technical specifications, maintenance schedules, and repair claims with role-based access control for different stakeholders in the equipment lifecycle.",
    technologies: [
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "React",
      "Redux",
      "Material-UI",
      "Django-allauth",
      "Chart.js",
      "Docker",
    ],
    projectUrl: "#",
    githubUrl: "https://github.com/vitalivo/silant-2.git",
    image: "/images/projects/silant-system.jpg",
    type: "Enterprise Web Application",
    status: "Deployed in Production",
    featured: true,
    year: "2023",
  },
  {
    id: 10,
    title: "Real-Time Chat with Geolocation",
    description: "WebSocket-based chat application with echo server and geolocation features",
    longDescription:
      "An interactive chat application implementing bidirectional WebSocket communication with wss://echo-ws-service.herokuapp.com. Features include real-time messaging, geolocation sharing via OpenStreetMap integration, and responsive UI design.",
    technologies: ["WebSocket API", "JavaScript", "HTML5 Geolocation API", "CSS3", "OpenStreetMap Integration"],
    projectUrl: "#",
    githubUrl: "https://github.com/vitalivo/module_41.git",
    image: "/images/projects/websocket-chat.jpg",
    type: "Web Application",
    status: "Completed",
    featured: true,
    year: "2025",
  },
  {
    id: 11,
    title: "MMORPG Community Bulletin Board",
    description: "Fan server notice board with email authentication and rich content posts",
    longDescription:
      "A full-stack web application for MMORPG communities featuring categorized advertisements, response system, and email notifications. Users can create rich media posts, receive responses, and manage interactions through a private dashboard.",
    technologies: ["Django", "Python", "PostgreSQL", "Celery", "Redis", "Bootstrap", "jQuery", "CKEditor"],
    projectUrl: "#",
    githubUrl: "https://github.com/vitalivo/Bulletin_Board_MMORPG-.git",
    image: "/images/projects/mmorpg-bulletin.jpg",
    type: "Full-Stack Web Application",
    status: "Completed",
    featured: true,
    year: "2025",
  },
]

const skillCategories = [
  {
    category: "frontend",
    skills: [
      { name: "React/Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  {
    category: "backend",
    skills: [
      { name: "Django", level: 90 },
      { name: "Python", level: 85 },
      { name: "Node.js", level: 75 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    category: "database",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "SQLite", level: 90 },
      { name: "MongoDB", level: 70 },
    ],
  },
  {
    category: "devops",
    skills: [
      { name: "Docker", level: 80 },
      { name: "Git", level: 90 },
      { name: "Linux", level: 75 },
    ],
  },
]

const certificates = [
  {
    title: "Python Full Stack Web Development",
    issuer: "Skillfactory",
    date: "22.07.2025",
    credentialId: "202507-CLXXXIV-170",
    image: "/images/certificates/Voloshin Vitaliy.jpg",
    verifyUrl: "#",
    skills: [
      "Python",
      "Django",
      "Web Development",
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Gunicorn",
      "Docker",
      "Git",
      "Linux",
      "PostgreSQL",
      "SQLite",
      "MongoDB",
      "REST API",
    ],
    score: "100%",
    distinction: true,
  },
  {
    title: "Django 5 for beginners",
    issuer: "Stepik",
    date: "Sep 2024",
    credentialId: "2559185",
    image: "/images/certificates/django-stepik.jpg",
    verifyUrl: "https://stepik.org/cert/2559185",
    skills: ["Django", "Python", "Web Development"],
    score: "100%",
    distinction: true,
  },
  {
    title: "SQL Basics",
    issuer: "stepik",
    date: "August 2024",
    credentialId: "2537534",
    image: "/images/certificates/sql-stepik.jpg",
    verifyUrl: "https://stepik.org/cert/2537534?lang=en",
    skills: ["Python", "SQL", "Web Development"],
  },
  {
    title: "Python Generation",
    issuer: "stepik",
    date: "february 2024",
    credentialId: "2362720",
    image: "/images/certificates/python-generanion.jpg",
    verifyUrl: "https://stepik.org/cert/2362720?lang=en",
    skills: ["Python", "Web Development"],
  },
  {
    title: "Indie Python",
    issuer: "stepik",
    date: "march 2024",
    credentialId: "2362720",
    image: "/images/certificates/indie-python.jpg",
    verifyUrl: "https://stepik.org/cert/2404819?lang=en",
    skills: ["Python", "Web Development"],
  },
  {
    title: "Python advenced",
    issuer: "stepik",
    date: "may 2024",
    credentialId: "2362720",
    image: "/images/certificates/python-advenced.jpg",
    verifyUrl: "https://stepik.org/cert/2466174?lang=en",
    skills: ["Python", "Web Development"],
  },
  {
    title: "Python good",
    issuer: "stepik",
    date: "may 2024",
    credentialId: "2469505",
    image: "/images/certificates/python-good.jpg",
    verifyUrl: "https://stepik.org/cert/2469505?lang=en",
    skills: ["Python", "Web Development"],
  },
  {
    title: "Fundamental JavaScript",
    issuer: "stepik",
    date: "march 2025",
    credentialId: "2795524",
    image: "/images/certificates/fundamental-javascript.jpg",
    verifyUrl: "https://stepik.org/cert/2795524?lang=en",
    skills: ["JavaScript", "Web Development", "Frontend Development"],
  },
  {
    title: "Django ",
    issuer: "stepik",
    date: "october 2024",
    credentialId: "2610331",
    image: "/images/certificates/django-egorov.jpg",
    verifyUrl: "https://stepik.org/cert/2610331?lang=en",
    skills: ["Django", "Python", "Web Development"],
  },
  {
    title: "OOP ",
    issuer: "stepik",
    date: "june 2024",
    credentialId: "2492907",
    image: "/images/certificates/oop-egorov.jpg",
    verifyUrl: "hhttps://stepik.org/cert/2492907?lang=en",
    skills: ["Python", "Web Development"],
  },
  {
    title: "OOP ",
    issuer: "stepik",
    date: "october 2024",
    credentialId: "2492907",
    image: "/images/certificates/oop-balakirev.jpg",
    verifyUrl: "https://stepik.org/cert/2613008?lang=en",
    skills: ["Python", "Web Development"],
  },
  {
    title: "Html & CSS",
    issuer: "stepik",
    date: "september 2024",
    credentialId: "2590540",
    image: "/images/certificates/html-css.jpg",
    verifyUrl: "https://stepik.org/cert/2590540?lang=en",
    skills: ["HTML", "CSS", "Web Development"],
  },
  {
    title: "Html & CSS & JS",
    issuer: "stepik",
    date: "august 2024",
    credentialId: "2544095",
    image: "/images/certificates/html-css-js.jpg",
    verifyUrl: "https://stepik.org/cert/2544095?lang=en",
    skills: ["HTML", "CSS", "Web Development", "JavaScript"],
  },
  {
    title: "Django",
    issuer: "stepik",
    date: "september 2024",
    credentialId: "2559185",
    image: "/images/certificates/django-5.jpg",
    verifyUrl: "https://stepik.org/cert/2559185?lang=en",
    skills: ["Django", "Python", "Web Development"],
  },
  {
    title: "Java",
    issuer: "stepik",
    date: "march 2025",
    credentialId: "2559185",
    image: "/images/certificates/java-pro.jpg",
    verifyUrl: "https://stepik.org/cert/2789194?lang=en",
    skills: ["Javascript", "Web Development", "Frontend Development"],
  },
  {
    title: "HTML & CSS & JS",
    issuer: "stepik",
    date: "april 2025",
    credentialId: "2822344",
    image: "/images/certificates/html-css-js1.jpg",
    verifyUrl: "https://stepik.org/cert/2822344?lang=en",
    skills: ["Javascript", "Web Development", "Frontend Development"],
  },
]

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>("en")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // ✅ СОСТОЯНИЕ ДЛЯ БЛОГ ПОСТОВ ИЗ API
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [blogLoading, setBlogLoading] = useState(true)
  const [blogError, setBlogError] = useState<string | null>(null)

  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = messages[locale]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  // ✅ ФУНКЦИЯ ДЛЯ ЗАГРУЗКИ ПОСТОВ ИЗ DJANGO API
  const fetchBlogPosts = async () => {
    try {
      setBlogLoading(true)
      setBlogError(null)

      console.log("🔄 Fetching blog posts from Django API...")

      const response = await fetch("http://127.0.0.1:8000/api/blog/posts/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("✅ Blog posts loaded:", data)

      // ✅ ИСПРАВЛЕНИЕ: Django REST возвращает {results: [...]}
      const posts = data.results || data // Поддерживаем оба формата
      const publishedPosts = posts.filter((post: BlogPost) => post.published_at)
      setBlogPosts(publishedPosts)
    } catch (error) {
      console.error("❌ Error fetching blog posts:", error)
      setBlogError(error instanceof Error ? error.message : "Unknown error")
    } finally {
      setBlogLoading(false)
    }
  }

  // ✅ ЗАГРУЖАЕМ ПОСТЫ ПРИ МОНТИРОВАНИИ КОМПОНЕНТА
  useEffect(() => {
    fetchBlogPosts()
  }, [])

  // ✅ ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ПЕРЕВЕДЕННОГО ПОСТА
  const getLocalizedPost = (post: BlogPost) => {
    const titleKey = `title_${locale}` as keyof BlogPost
    const excerptKey = `excerpt_${locale}` as keyof BlogPost
    const subtitleKey = `subtitle_${locale}` as keyof BlogPost

    return {
      id: post.id,
      slug: post.slug,
      title: (post[titleKey] as string) || post.title_en,
      excerpt: (post[excerptKey] as string) || post.excerpt_en,
      subtitle: (post[subtitleKey] as string) || post.subtitle_en,
      date: new Date(post.published_at).toLocaleDateString(
        locale === "en" ? "en-US" : locale === "ru" ? "ru-RU" : "he-IL",
      ),
      readTime: post.read_time,
      views: post.views_count,
      featured: post.is_featured,
      thumbnail: post.thumbnail,
      cover: post.cover_image,
      categories: post.categories,
      tags: post.tags,
      author: post.author,
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const response = await fetch("http://127.0.0.1:8000/api/contacts/messages/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      })
      if (response.ok) {
        toast.success(t("contact.success"))
        ;(e.target as HTMLFormElement).reset()
      } else {
        throw new Error("Server error")
      }
    } catch (error) {
      console.error("API Error:", error)
      toast.error(t("contact.error"))
    }
    setIsSubmitting(false)
  }

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ ДЛЯ ПЕРЕХОДА К БЛОГ ПОСТУ
  const handleBlogPostClick = (post: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("🚀 Navigating to blog post:", post.slug, "with locale:", locale)

    // ИСПОЛЬЗУЕМ NEXT.JS ROUTER ВМЕСТО window.location.href
    const blogUrl = `/${locale}/blog/${post.slug}`
    console.log("🔗 Blog URL:", blogUrl)
    router.push(blogUrl)
  }

  const navigation = [
    { name: "nav.home", href: "#hero" },
    { name: "nav.about", href: "#about" },
    { name: "nav.skills", href: "#skills" },
    { name: "nav.portfolio", href: "#portfolio" },
    { name: "nav.certificates", href: "#certificates" },
    { name: "nav.blog", href: "#blog" },
    { name: "nav.contact", href: "#contact" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === locale)

  const VitalyLogo = () => (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
          <Code className="h-6 w-6 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
          <Terminal className="h-2 w-2 text-gray-900" />
        </div>
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Vitaliy
      </span>
    </div>
  )

  return (
    <div className={locale === "he" ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <VitalyLogo />
            <nav className="hidden md:flex space-x-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
                >
                  {t(item.name)}
                </a>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">{currentLanguage?.flag}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((language) => (
                    <DropdownMenuItem key={language.code} onClick={() => setLocale(language.code)} className="gap-2">
                      <span>{language.flag}</span>
                      <span>{language.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t(item.name)}
                      </a>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero - ЯРКАЯ ВЕРСИЯ */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden"
      >
        {/* Декоративные элементы */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-bounce"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <p className="text-lg text-white/80 mb-4">{t("hero.greeting")}</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg">Vitaliy</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-yellow-300 mb-6 drop-shadow-lg">
              {t("hero.title")}
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">{t("hero.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 font-semibold shadow-xl" asChild>
                <a href="#portfolio">{t("hero.cta")}</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold bg-transparent"
                asChild
              >
                <a href="#contact">{t("hero.contact")}</a>
              </Button>
            </div>
            <div className="flex justify-center space-x-6 mb-12">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 hover:text-yellow-300"
                asChild
              >
                <a href="https://github.com/vitalivo" target="_blank" rel="noopener noreferrer">
                  <Github className="h-6 w-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 hover:text-yellow-300"
                asChild
              >
                <a href="https://linkedin.com/in/vitaly-voloshin-07356983" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-6 w-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 hover:text-yellow-300"
                asChild
              >
                <a href="mailto:vitalivo@gmail.com">
                  <Mail className="h-6 w-6" />
                </a>
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" asChild>
              <a href="#about">
                <ArrowDown className="h-6 w-6 animate-bounce" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About - С РЕАЛЬНОЙ ФОТОГРАФИЕЙ */}
      <section
        id="about"
        className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("about.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("about.subtitle")}</p>
          </div>
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">{t("about.role")}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{t("about.description1")}</p>
                  <p className="text-muted-foreground leading-relaxed">{t("about.description2")}</p>
                  {/* Обновленные статистики на основе реальных проектов */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
                      <div className="text-2xl font-bold">2+</div>
                      <div className="text-sm opacity-90">Years</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white">
                      <div className="text-2xl font-bold">{projects.length}</div>
                      <div className="text-sm opacity-90">Projects</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white">
                      <div className="text-2xl font-bold">{certificates.length}</div>
                      <div className="text-sm opacity-90">Certificates</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    {/* РЕАЛЬНАЯ ФОТОГРАФИЯ ВИТАЛИЯ */}
                    <div className="w-64 h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
                      {/* ЗАМЕНИ НА ПУТЬ К ТВОЕЙ ФОТОГРАФИИ */}
                      <img
                        src="/images/vitaly-photo.jpg" // УКАЖИ ПРАВИЛЬНЫЙ ПУТЬ К ФОТОГРАФИИ
                        alt="Vitaliy Voloshyn - Full Stack Developer"
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          // Fallback если фото не загрузилось
                          e.currentTarget.style.display = "none"
                          e.currentTarget.nextElementSibling!.style.display = "flex"
                        }}
                      />
                      {/* Fallback эмодзи если фото не загрузилось */}
                      <span className="text-6xl hidden">👨‍💻</span>
                    </div>
                    {/* Декоративные элементы */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="absolute top-1/2 -left-8 w-4 h-4 bg-pink-400 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills - ЯРКАЯ ВЕРСИЯ */}
      <section
        id="skills"
        className="py-20 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-green-950 dark:via-teal-950 dark:to-blue-950"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {t("skills.title")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, index) => {
              const colors = [
                "from-blue-500 to-blue-600",
                "from-purple-500 to-purple-600",
                "from-green-500 to-green-600",
                "from-orange-500 to-orange-600",
              ]
              return (
                <Card
                  key={category.category}
                  className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <CardHeader className={`bg-gradient-to-br ${colors[index]} text-white rounded-t-lg`}>
                    <CardTitle className="text-lg text-center">{t(`skills.${category.category}`)}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-white dark:bg-gray-900">
                    <div className="space-y-4">
                      {category.skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-blue-600 font-bold">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-3" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Portfolio - ВСЕ 11 ПРОЕКТОВ */}
      <section
        id="portfolio"
        className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-purple-950 dark:via-pink-950 dark:to-red-950"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t("portfolio.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("portfolio.subtitle")}</p>
            <p className="text-sm text-muted-foreground mt-2">Showing all {projects.length} projects</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const gradients = [
                "from-blue-500 to-purple-600",
                "from-green-500 to-teal-600",
                "from-orange-500 to-red-600",
                "from-pink-500 to-rose-600",
                "from-indigo-500 to-blue-600",
                "from-purple-500 to-pink-600",
              ]
              return (
                <Card
                  key={project.id}
                  className="h-full hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
                >
                  <CardHeader>
                    <div
                      className={`aspect-video bg-gradient-to-br ${gradients[index % gradients.length]} rounded-lg mb-4 flex items-center justify-center shadow-lg overflow-hidden relative`}
                    >
                      {/* РЕАЛЬНЫЕ ИЗОБРАЖЕНИЯ ПРОЕКТОВ */}
                      <img
                        src={
                          project.image ||
                          "/placeholder.svg?height=200&width=300&text=" + encodeURIComponent(project.title) ||
                          "/placeholder.svg" ||
                          "/placeholder.svg"
                        }
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback если изображение не загрузилось
                          e.currentTarget.style.display = "none"
                          e.currentTarget.nextElementSibling!.style.display = "flex"
                        }}
                      />
                      {/* Fallback эмодзи */}
                      <span className="text-6xl text-white hidden">🚀</span>
                      {/* Показываем тип проекта */}
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {project.type}
                      </div>
                      {/* Показываем статус */}
                      <div
                        className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold ${
                          project.status === "Live"
                            ? "bg-green-500 text-white"
                            : project.status === "In Development"
                              ? "bg-yellow-500 text-black"
                              : "bg-blue-500 text-white"
                        }`}
                      >
                        {project.status}
                      </div>
                      {/* Показываем featured проекты */}
                      {project.featured && (
                        <div className="absolute bottom-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                          ⭐ Featured
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-xl text-purple-700 dark:text-purple-300">{project.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{project.year}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => {
                        const badgeColors = [
                          "bg-blue-100 text-blue-800",
                          "bg-green-100 text-green-800",
                          "bg-purple-100 text-purple-800",
                          "bg-orange-100 text-orange-800",
                          "bg-pink-100 text-pink-800",
                          "bg-indigo-100 text-indigo-800",
                        ]
                        return (
                          <Badge
                            key={tech}
                            className={`${badgeColors[techIndex % badgeColors.length]} border-0 text-xs`}
                          >
                            {tech}
                          </Badge>
                        )
                      })}
                    </div>
                    <div className="flex gap-2">
                      {project.projectUrl !== "#" && (
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                          asChild
                        >
                          <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            {t("portfolio.viewProject")}
                          </a>
                        </Button>
                      )}
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white border-0"
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          {t("portfolio.viewCode")}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certificates - ВСЕ 16 СЕРТИФИКАТОВ */}
      <section
        id="certificates"
        className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-indigo-950 dark:via-blue-950 dark:to-cyan-950"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              {t("certificates.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("certificates.subtitle")}</p>
            <p className="text-sm text-muted-foreground mt-2">Showing all {certificates.length} certificates</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => {
              const gradients = [
                "from-indigo-500 to-blue-600",
                "from-blue-500 to-cyan-600",
                "from-cyan-500 to-teal-600",
              ]
              return (
                <Card
                  key={index}
                  className="h-full hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
                >
                  <CardHeader>
                    <div
                      className={`aspect-video bg-gradient-to-br ${gradients[index % gradients.length]} rounded-lg mb-4 flex items-center justify-center shadow-lg overflow-hidden relative`}
                    >
                      {/* РЕАЛЬНОЕ ИЗОБРАЖЕНИЕ СЕРТИФИКАТА */}
                      <img
                        src={cert.image || "/placeholder.svg?height=200&width=300&text=Certificate"}
                        alt={cert.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback если изображение не загрузилось
                          e.currentTarget.style.display = "none"
                          e.currentTarget.nextElementSibling!.style.display = "flex"
                        }}
                      />
                      {/* Fallback иконка */}
                      <Award className="h-16 w-16 text-white hidden" />
                      {/* Показываем оценку если есть */}
                      {cert.score && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          {cert.score}
                        </div>
                      )}
                      {/* Показываем "с отличием" если есть */}
                      {cert.distinction && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          ⭐ Distinction
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-xl text-indigo-700 dark:text-indigo-300">{cert.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Issuer:</strong> {cert.issuer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Date:</strong> {cert.date}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>ID:</strong> {cert.credentialId}
                      </p>
                    </div>
                    {/* Навыки из сертификата */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white border-0"
                        asChild
                      >
                        <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t("certificates.viewCertificate")}
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white border-0"
                        asChild
                      >
                        <a href={cert.image} download>
                          <Download className="h-4 w-4 mr-2" />
                          {t("certificates.download")}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ✅ БЛОГ С ДАННЫМИ ИЗ DJANGO API */}
      <section
        id="blog"
        className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-950 dark:via-orange-950 dark:to-red-950"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {t("blog.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("blog.subtitle")}</p>
            {blogLoading && (
              <p className="text-sm text-muted-foreground mt-2 flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("blog.loading")}
              </p>
            )}
            {!blogLoading && !blogError && (
              <p className="text-sm text-muted-foreground mt-2">Showing {blogPosts.length} articles from Django API</p>
            )}
            {blogError && (
              <p className="text-sm text-red-500 mt-2">
                {t("blog.error")}: {blogError}
              </p>
            )}
          </div>

          {/* ✅ СОСТОЯНИЯ ЗАГРУЗКИ */}
          {blogLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
          )}

          {blogError && <div className="text-center py-20"></div>}

          {blogError && (
            <div className="text-center py-20">
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-600 dark:text-red-400 mb-4">{t("blog.error")}</p>
                <Button onClick={fetchBlogPosts} className="bg-red-500 hover:bg-red-600 text-white">
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {!blogLoading && !blogError && blogPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">{t("blog.noArticles")}</p>
            </div>
          )}

          {!blogLoading && !blogError && blogPosts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => {
                const localizedPost = getLocalizedPost(post)
                const gradients = [
                  "from-yellow-400 to-orange-500",
                  "from-pink-400 to-red-500",
                  "from-purple-400 to-indigo-500",
                ]
                return (
                  <Card
                    key={post.id}
                    className="h-full hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm cursor-pointer group"
                    onClick={(e) => handleBlogPostClick(localizedPost, e)}
                  >
                    <CardHeader>
                      <div
                        className={`aspect-video bg-gradient-to-br ${gradients[index % gradients.length]} rounded-lg mb-4 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 overflow-hidden relative`}
                      >
                        {localizedPost.thumbnail || localizedPost.cover ? (
                          <img
                            src={localizedPost.thumbnail || localizedPost.cover}
                            alt={localizedPost.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none"
                              e.currentTarget.nextElementSibling!.style.display = "flex"
                            }}
                          />
                        ) : null}
                        <span
                          className={`text-6xl text-white ${localizedPost.thumbnail || localizedPost.cover ? "hidden" : ""}`}
                        >
                          📝
                        </span>

                        {/* Featured badge */}
                        {localizedPost.featured && (
                          <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                            ⭐ Featured
                          </div>
                        )}

                        {/* Views count */}
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                          {localizedPost.views} views
                        </div>
                      </div>
                      <CardTitle className="text-xl text-orange-700 dark:text-orange-300 line-clamp-2 group-hover:text-orange-800 transition-colors">
                        {localizedPost.title}
                      </CardTitle>
                      {localizedPost.subtitle && (
                        <p className="text-sm text-muted-foreground line-clamp-1">{localizedPost.subtitle}</p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{localizedPost.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="text-blue-700 dark:text-blue-300">{localizedPost.date}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span className="text-green-700 dark:text-green-300">
                            {localizedPost.readTime} {t("blog.readTime")}
                          </span>
                        </div>
                      </div>

                      {/* Categories */}
                      {localizedPost.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {localizedPost.categories.map((category) => (
                            <Badge key={category.id} className="bg-purple-100 text-purple-800 border-0 text-xs">
                              {category.name}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Tags */}
                      {localizedPost.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {localizedPost.tags.slice(0, 3).map((tag, tagIndex) => {
                            const tagColors = [
                              "bg-red-100 text-red-800",
                              "bg-yellow-100 text-yellow-800",
                              "bg-indigo-100 text-indigo-800",
                            ]
                            return (
                              <Badge
                                key={tag.id}
                                className={`${tagColors[tagIndex % tagColors.length]} border-0 text-xs`}
                              >
                                {tag.name}
                              </Badge>
                            )
                          })}
                          {localizedPost.tags.length > 3 && (
                            <Badge className="bg-gray-100 text-gray-800 border-0 text-xs">
                              +{localizedPost.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-lg group-hover:shadow-xl transition-shadow">
                        {t("blog.readMore")}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Contact - ЯРКАЯ ВЕРСИЯ */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-teal-950 dark:via-cyan-950 dark:to-blue-950"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              {t("contact.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("contact.subtitle")}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4 p-6 bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-blue-700 dark:text-blue-300">Email</h3>
                  <p className="text-muted-foreground">vitalivo@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-green-700 dark:text-green-300">Phone</h3>
                  <p className="text-muted-foreground">+972 50 645 7335</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-300">Location</h3>
                  <p className="text-muted-foreground">Israel</p>
                </div>
              </div>
            </div>
            <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-t-lg">
                <CardTitle className="text-xl text-center">Send a Message</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-teal-700 dark:text-teal-300 font-medium">
                      {t("contact.name")}
                    </Label>
                    <Input
                      name="name"
                      id="name"
                      required
                      className="border-2 border-teal-200 focus:border-teal-500 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-teal-700 dark:text-teal-300 font-medium">
                      {t("contact.email")}
                    </Label>
                    <Input
                      name="email"
                      id="email"
                      type="email"
                      required
                      className="border-2 border-teal-200 focus:border-teal-500 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-teal-700 dark:text-teal-300 font-medium">
                      {t("contact.subject")}
                    </Label>
                    <Input
                      name="subject"
                      id="subject"
                      required
                      className="border-2 border-teal-200 focus:border-teal-500 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-teal-700 dark:text-teal-300 font-medium">
                      {t("contact.message")}
                    </Label>
                    <Textarea
                      name="message"
                      id="message"
                      rows={5}
                      required
                      className="border-2 border-teal-200 focus:border-teal-500 rounded-lg"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white border-0 shadow-lg text-lg py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : t("contact.send")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer - ЯРКАЯ ВЕРСИЯ */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 py-12 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              Vitaliy
            </h3>
            <p className="text-gray-300 mb-6 text-lg">Full Stack Developer</p>
            <div className="flex justify-center space-x-6 mb-8">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 hover:text-yellow-400 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"
                asChild
              >
                <a href="https://github.com/vitalivo" target="_blank" rel="noopener noreferrer">
                  <Github className="h-6 w-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 hover:text-blue-400 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"
                asChild
              >
                <a href="https://linkedin.com/in/vitaly-voloshin-07356983" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-6 w-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 hover:text-pink-400 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"
                asChild
              >
                <a href="mailto:vitalivo@gmail.com">
                  <Mail className="h-6 w-6" />
                </a>
              </Button>
            </div>
            <div className="border-t border-white/20 pt-8">
              <p className="text-sm text-gray-400">© 2025 Vitaliy Voloshyn. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  )
}
