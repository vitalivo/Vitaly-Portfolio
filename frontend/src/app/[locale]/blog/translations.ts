export const blogTranslations = {
  en: {
    // Navigation
    backToPortfolio: "Back to Portfolio",
    backToAllPosts: "Back to All Posts",
    blogTitle: "Vitaliy's Blog",
    portfolio: "Portfolio",
    contact: "Contact",
    home: "Home",
    blog: "Blog",
    
    // Post Meta
    minRead: "min read",
    views: "views",
    comments: "comments",
    likes: "likes",
    tags: "Tags:",
    categories: "Categories:",
    author: "Author",
    publishedOn: "Published on",
    
    // Comments
    commentsTitle: "Comments",
    noComments: "No comments yet. Be the first to comment!",
    leaveComment: "Leave a Comment",
    replyToComment: "Reply to Comment",
    cancelReply: "Cancel Reply",
    name: "Name",
    email: "Email",
    website: "Website (optional)",
    comment: "Comment",
    submitComment: "Submit Comment",
    submitting: "Submitting...",
    reply: "Reply",
    commentSuccess: "Comment submitted! It will appear after moderation.",
    commentError: "Failed to submit comment. Please try again.",
    
    // Subscribe
    subscribeTitle: "Subscribe to Blog",
    subscribeName: "Name (optional)",
    subscribeEmail: "Email",
    subscribeButton: "Subscribe",
    subscribing: "Subscribing...",
    subscribeSuccess: "Successfully subscribed! Check your email for confirmation.",
    subscribeError: "Failed to subscribe. Please try again.",
    subscribeDescription: "Get notified about new blog posts. Unsubscribe anytime.",
    
    // About Author
    aboutAuthor: "About Author",
    authorDescription: "Passionate developer creating modern web applications with Django and Next.js.",
    
    // Actions
    share: "Share",
    loading: "Loading...",
    
    // Footer
    allRightsReserved: "All rights reserved.",
  },
  
  ru: {
    // Navigation
    backToPortfolio: "Назад к портфолио",
    backToAllPosts: "Назад ко всем постам",
    blogTitle: "Блог Виталия",
    portfolio: "Портфолио",
    contact: "Контакты",
    home: "Главная",
    blog: "Блог",
    
    // Post Meta
    minRead: "мин чтения",
    views: "просмотров",
    comments: "комментариев",
    likes: "лайков",
    tags: "Теги:",
    categories: "Категории:",
    author: "Автор",
    publishedOn: "Опубликовано",
    
    // Comments
    commentsTitle: "Комментарии",
    noComments: "Пока нет комментариев. Будьте первым!",
    leaveComment: "Оставить комментарий",
    replyToComment: "Ответить на комментарий",
    cancelReply: "Отменить ответ",
    name: "Имя",
    email: "Email",
    website: "Сайт (необязательно)",
    comment: "Комментарий",
    submitComment: "Отправить комментарий",
    submitting: "Отправляем...",
    reply: "Ответить",
    commentSuccess: "Комментарий отправлен! Он появится после модерации.",
    commentError: "Не удалось отправить комментарий. Попробуйте еще раз.",
    
    // Subscribe
    subscribeTitle: "Подписаться на блог",
    subscribeName: "Имя (необязательно)",
    subscribeEmail: "Email",
    subscribeButton: "Подписаться",
    subscribing: "Подписываемся...",
    subscribeSuccess: "Успешно подписались! Проверьте email для подтверждения.",
    subscribeError: "Не удалось подписаться. Попробуйте еще раз.",
    subscribeDescription: "Получайте уведомления о новых постах. Отписаться можно в любое время.",
    
    // About Author
    aboutAuthor: "Об авторе",
    authorDescription: "Увлеченный разработчик, создающий современные веб-приложения с Django и Next.js.",
    
    // Actions
    share: "Поделиться",
    loading: "Загрузка...",
    
    // Footer
    allRightsReserved: "Все права защищены.",
  },
  
  he: {
    // Navigation
    backToPortfolio: "חזרה לתיק עבודות",
    backToAllPosts: "חזרה לכל הפוסטים",
    blogTitle: "הבלוג של ויטלי",
    portfolio: "תיק עבודות",
    contact: "צור קשר",
    home: "בית",
    blog: "בלוג",
    
    // Post Meta
    minRead: "דקות קריאה",
    views: "צפיות",
    comments: "תגובות",
    likes: "לייקים",
    tags: "תגיות:",
    categories: "קטגוריות:",
    author: "מחבר",
    publishedOn: "פורסם ב",
    
    // Comments
    commentsTitle: "תגובות",
    noComments: "אין תגובות עדיין. היה הראשון להגיב!",
    leaveComment: "השאר תגובה",
    replyToComment: "הגב לתגובה",
    cancelReply: "בטל תגובה",
    name: "שם",
    email: "אימייל",
    website: "אתר (אופציונלי)",
    comment: "תגובה",
    submitComment: "שלח תגובה",
    submitting: "שולח...",
    reply: "הגב",
    commentSuccess: "התגובה נשלחה! היא תופיע לאחר אישור.",
    commentError: "שליחת התגובה נכשלה. נסה שוב.",
    
    // Subscribe
    subscribeTitle: "הירשם לבלוג",
    subscribeName: "שם (אופציונלי)",
    subscribeEmail: "אימייל",
    subscribeButton: "הירשם",
    subscribing: "נרשם...",
    subscribeSuccess: "נרשמת בהצלחה! בדוק את האימייל לאישור.",
    subscribeError: "ההרשמה נכשלה. נסה שוב.",
    subscribeDescription: "קבל התראות על פוסטים חדשים. ניתן לבטל בכל עת.",
    
    // About Author
    aboutAuthor: "על המחבר",
    authorDescription: "מפתח נלהב היוצר אפליקציות ווב מודרניות עם Django ו-Next.js.",
    
    // Actions
    share: "שתף",
    loading: "טוען...",
    
    // Footer
    allRightsReserved: "כל הזכויות שמורות.",
  }
} as const

export type Locale = keyof typeof blogTranslations
export type TranslationKey = keyof typeof blogTranslations.en