import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://konoha-agents.vercel.app'),
  title: {
    default: '🍃 KonohaAgents — 500 Agen AI Indonesia',
    template: '%s | KonohaAgents',
  },
  description: '500 definisi agen AI ultra-detail untuk Claude, ChatGPT, Cursor, dan GitHub Copilot — dibangun khusus untuk konteks hukum, bisnis, dan budaya Indonesia.',
  keywords: [
    'agen AI Indonesia',
    'AI agents Indonesia',
    'Claude Indonesia',
    'ChatGPT Indonesia',
    'Cursor rules Indonesia',
    'prompt engineering Indonesia',
    'BPJS AI',
    'pajak AI',
    'konoha agents',
    'KonohaAgents',
  ],
  authors: [{ name: 'KonohaAgents Contributors' }],
  creator: 'KonohaAgents',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://konoha-agents.vercel.app',
    siteName: 'KonohaAgents',
    title: '🍃 KonohaAgents — 500 Agen AI Indonesia',
    description: '500 definisi agen AI ultra-detail untuk Claude, ChatGPT, Cursor, dan GitHub Copilot — dibangun khusus untuk konteks Indonesia.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'KonohaAgents — 500 Agen AI Indonesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🍃 KonohaAgents — 500 Agen AI Indonesia',
    description: '500 definisi agen AI ultra-detail untuk Claude, ChatGPT, Cursor, dan GitHub Copilot.',
    images: ['/og-image.png'],
    creator: '@KonohaAgents',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}