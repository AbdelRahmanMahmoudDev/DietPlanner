import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import { ContextProvider } from '@/contexts/context'
import './globals.css'

const roboto = Roboto_Mono({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Diet Planner',
  description: 'Easily calculate your BMR, know how much calories you need, and customize your diet!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  )
}
