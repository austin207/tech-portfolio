import './globals.css'
import { Inter } from 'next/font/google'
import Chatbot from './components/Chatbot'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Antony Austin - Robotics & VLSI Engineer',
  description: 'Personal portfolio showcasing robotics, VLSI, and embedded systems projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Chatbot />
      </body>
    </html>
  )
}

