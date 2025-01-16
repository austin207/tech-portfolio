'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "An exceptional engineer with a keen eye for detail. Their work on our VLSI project was instrumental to its success.",
    author: "Dr. Emily Chen",
    title: "CTO, TechInnovate Inc."
  },
  {
    quote: "Their expertise in robotics and AI helped us develop cutting-edge solutions for our autonomous systems.",
    author: "Michael Rodriguez",
    title: "Lead Engineer, FutureBots Ltd."
  },
  {
    quote: "A brilliant mind in the field of embedded systems. Their contributions to our IoT platform were invaluable.",
    author: "Sarah Johnson",
    title: "Product Manager, SmartConnect Solutions"
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          What People Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-gray-900 border-gray-700">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote className="w-10 h-10 text-cyan-500 mb-4" />
                  <p className="text-gray-300 mb-4 flex-grow">{testimonial.quote}</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

