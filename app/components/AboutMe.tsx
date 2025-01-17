'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'

const aboutMeText = `Hello! I'm a passionate Robotics and VLSI Engineer with a keen interest in embedded systems and hardware design. 
My journey in the world of technology began with a fascination for how things work at their most fundamental level. 
This curiosity led me to pursue a career at the intersection of hardware and software, where I continuously strive 
to push the boundaries of what's possible.

With expertise in Arduino, Raspberry Pi, and ESP development, I love bringing ideas to life through innovative 
embedded solutions. My experience in VLSI design allows me to create efficient, high-performance circuits that 
power the devices of tomorrow.

When I'm not tinkering with circuits or coding embedded systems, you can find me exploring the latest advancements 
in robotics or contributing to open-source projects. I believe in the power of technology to solve real-world problems 
and am always excited to take on new challenges that allow me to grow and learn.

Let's connect and explore how we can create amazing tech solutions together!`

const downloadableAssets = [
  { name: 'Resume', url: '/path-to-your-resume.pdf' },
  { name: 'Personal Branding Kit', url: '/path-to-your-branding-kit.zip' },
]

export default function AboutMe() {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < aboutMeText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prevText => prevText + aboutMeText[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, 20)

      return () => clearTimeout(timer)
    }
  }, [currentIndex])

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          About Me
        </motion.h2>
        <div className="bg-[#0B1120] border border-gray-800 p-6 mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-300 whitespace-pre-wrap">{displayedText}</p>
            {currentIndex < aboutMeText.length && (
              <span className="inline-block w-1 h-6 ml-1 bg-cyan-500 animate-blink"></span>
            )}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-4">Downloadable Assets</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {downloadableAssets.map((asset, index) => (
              <a
                key={asset.name}
                href={asset.url}
                download
                className="bg-[#0B1120] border border-gray-800 p-4 text-center hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                <Download className="mr-2 h-4 w-4" /> {asset.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

