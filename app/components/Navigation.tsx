'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = ['About', 'Skills', 'Timeline', 'Projects', 'Testimonials', 'Contact']

  return (
    <motion.nav 
      className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center text-2xl font-bold text-cyan-500">
            <Image src="/logo.svg" alt="Logo" width={40} height={40} className="mr-2" />
            YourName
          </Link>
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-cyan-500 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-300 hover:text-cyan-500">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-cyan-500 hover:bg-gray-700 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                  setIsOpen(false);
                }}
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

