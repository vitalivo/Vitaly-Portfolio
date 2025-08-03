"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe, Menu, Code, Terminal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type Locale = "en" | "ru" | "he"

const languages = [
  { code: "en" as Locale, name: "English", flag: "🇺🇸" },
  { code: "ru" as Locale, name: "Русский", flag: "🇷🇺" },
  { code: "he" as Locale, name: "עברית", flag: "🇮🇱" },
]

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
  },
}

export function Header() {
  const [locale, setLocale] = useState<Locale>("en")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = messages[locale]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
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

  // Фирменный логотип компонент
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
  )
}
