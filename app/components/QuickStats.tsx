'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Code, Briefcase } from 'lucide-react'

const stats = [
  {
    icon: Briefcase,
    value: '5+',
    label: 'Years of Experience'
  },
  {
    icon: Code,
    value: '20+',
    label: 'Projects Completed'
  },
  {
    icon: Award,
    value: '10+',
    label: 'Awards Won'
  }
]

export default function QuickStats() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="flex items-center p-6">
                  <stat.icon className="w-12 h-12 text-cyan-500 mr-4" />
                  <div>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
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

