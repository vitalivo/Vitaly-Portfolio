"use client"

import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Portfolio } from "@/components/sections/Portfolio"
import { Skills } from "@/components/sections/Skills"
import { BlogReal } from "@/components/sections/BlogReal"
import { Contact } from "@/components/sections/Contact"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import type { Locale } from "@/types/api"

export default function HomePage() {
  const t = useTranslations()
  const params = useParams()
  const locale = params.locale as Locale

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <BlogReal locale={locale} t={t} />
      <Contact />
      <Footer />
    </main>
  )
}
