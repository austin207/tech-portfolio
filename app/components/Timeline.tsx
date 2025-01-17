'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Award } from 'lucide-react'

const timelineEvents = [
  {
    year: '2023',
    title: 'Senior Robotics Engineer',
    description: 'Led the development of an autonomous warehouse robot system',
    icon: Briefcase,
  },
  {
    year: '2021',
    title: 'Master\'s Degree in Robotics',
    description: 'Completed advanced studies in AI and Computer Vision',
    icon: GraduationCap,
  },
  {
    year: '2020',
    title: 'VLSI Design Specialist',
    description: 'Contributed to the design of a next-gen AI chip',
    icon: Award,
  },
  {
    year: '2018',
    title: 'Junior Hardware Engineer',
    description: 'Started career working on embedded systems for IoT devices',
    icon: Briefcase,
  },
  {
    year: '2017',
    title: 'Bachelor\'s Degree in Electrical Engineering',
    description: 'Graduated with honors, specializing in VLSI design',
    icon: GraduationCap,
  },
]

export default function Timeline() {
  return (
    <section id="timeline" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Career Timeline
        </motion.h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-cyan-500" />
          
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              className={`mb-8 flex justify-between items-center w-full ${
                index % 2 === 0 ? 'flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="order-1 w-5/12" />
              <div className="z-20 flex items-center order-1 bg-cyan-500 shadow-xl w-8 h-8">
                <h3 className="mx-auto font-semibold text-lg text-white">{event.year}</h3>
              </div>
              <div className="order-1 w-5/12 bg-[#0B1120] border border-gray-800">
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <event.icon className="w-5 h-5 mr-2 text-cyan-500" />
                    <h3 className="font-bold text-lg">{event.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400">{event.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

