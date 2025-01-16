'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Cpu, MicroscopeIcon as Microchip, BotIcon as Robot, Server, Terminal, Wifi } from 'lucide-react'

const skills = [
  {
    name: 'Embedded Systems',
    description: 'Arduino, ESP32, and Raspberry Pi development',
    icon: Microchip,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'VLSI Design',
    description: 'Circuit design and implementation',
    icon: Cpu,
    color: 'from-yellow-500 to-red-500',
  },
  {
    name: 'Robotics',
    description: 'Robot design, control, and automation',
    icon: Robot,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'IoT Development',
    description: 'Connected device ecosystems',
    icon: Wifi,
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Hardware Programming',
    description: 'Low-level system programming',
    icon: Terminal,
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'System Architecture',
    description: 'Designing scalable hardware solutions',
    icon: Server,
    color: 'from-blue-500 to-indigo-500',
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Technical Expertise
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800/50 border-gray-700 hover:border-cyan-500 transition-colors">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${skill.color} p-2.5 mb-4`}>
                    <skill.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
                  <p className="text-gray-400">{skill.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

