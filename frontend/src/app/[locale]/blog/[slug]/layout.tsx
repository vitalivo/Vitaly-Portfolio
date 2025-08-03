import Link from 'next/link'
import { ArrowLeft, Home, User, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Navigation */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left - Back Button */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/#blog" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Portfolio
                </Link>
              </Button>
            </div>

            {/* Center - Blog Title */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Vitaliy's Blog
              </h1>
            </div>

            {/* Right - Navigation */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/#portfolio" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Portfolio
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/#contact" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Contact
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 Vitaliy Voloshyn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}