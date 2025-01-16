'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      dx: number
      dy: number
      radius: number
    }> = []

    // Create circuit-like particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 2 + 1,
      })
    }

    function animate() {
      requestAnimationFrame(animate)
      ctx.fillStyle = 'rgba(17, 24, 39, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#22d3ee'
        ctx.fill()

        // Draw connecting lines
        particles.forEach((p2) => {
          const distance = Math.sqrt(
            Math.pow(particle.x - p2.x, 2) + Math.pow(particle.y - p2.y, 2)
          )
          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(34, 211, 238, ${1 - distance / 100})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })

        // Move particles
        particle.x += particle.dx
        particle.y += particle.dy

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1
      })
    }

    animate()

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
            Robotics & VLSI Engineer
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Crafting innovative solutions with Arduino, Raspberry Pi, and ESP. 
            Specializing in embedded systems and VLSI design.
          </p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="#projects"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 px-8 py-3 rounded-full font-medium transition-colors"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

