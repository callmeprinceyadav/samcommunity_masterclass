import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import WhatsAppWidget from '@/components/WhatsAppWidget'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threat Evasion & Offensive Tooling – Live Masterclass | Samcommunity',
  description: 'Join our exclusive 90-minute live masterclass with cybersecurity expert Aashish Kumar. Learn real-world threat evasion techniques and offensive tooling strategies. Free registration.',
  keywords: 'cybersecurity, threat evasion, offensive security, malware analysis, security training, live masterclass',
  openGraph: {
    title: 'Threat Evasion & Offensive Tooling – Live Masterclass',
    description: 'Join our exclusive 90-minute live masterclass with cybersecurity expert Aashish Kumar.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        {children}
        {/* WhatsApp AI Widget - Bottom Right */}
        <WhatsAppWidget />
      </body>
    </html>
  )
}


