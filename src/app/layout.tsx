import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Олег Овсянников - Python & JavaScript Developer',
  description: 'Персональный сайт-портфолио разработчика',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body>
        {children}
        <footer className="bg-dark-800 text-secondary-100 py-8 border-t border-dark-700">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Олег Овсянников. Все права защищены.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
