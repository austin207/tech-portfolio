import './globals.css'
import { Inter } from 'next/font/google'
import CustomCursor from './components/CustomCursor'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Your Name - Robotics & VLSI Engineer',
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
       
      </body>
    </html>
  )
}

