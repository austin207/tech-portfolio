'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink, Share2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const projects = [
  {
    title: 'Smart Home Automation',
    description: 'IoT-based home automation system using ESP32 and MQTT protocol',
    image: '/placeholder.svg?height=300&width=600',
    tags: ['ESP32', 'MQTT', 'IoT', 'C++'],
    github: '#',
    demo: '#',
    link: '/projects/smart-home'
  },
  {
    title: 'Autonomous Robot',
    description: 'Self-navigating robot built with Raspberry Pi and Computer Vision',
    image: '/placeholder.svg?height=300&width=600',
    tags: ['Raspberry Pi', 'Python', 'OpenCV', 'Robotics'],
    github: '#',
    demo: '#',
    link: '/projects/autonomous-robot'
  },
  {
    title: 'VLSI Circuit Designer',
    description: 'Custom VLSI circuit design and simulation tool',
    image: '/placeholder.svg?height=300&width=600',
    tags: ['VLSI', 'Verilog', 'SystemVerilog'],
    github: '#',
    demo: '#',
    link: '/projects/vlsi-circuit-designer'
  },
]

export default function Projects() {
  const shareProject = async (project: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.origin + project.link,
        })
      } catch (error) {
        console.log('Error sharing', error)
      }
    } else {
      alert(`Share this project:\n\nTitle: ${project.title}\nDescription: ${project.description}\nLink: ${window.location.origin}${project.link}`)
    }
  }

  return (
    <section id="projects" className="py-20 px-4 bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden rounded-xl border-gray-800 bg-gray-900/90 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75">
                <CardHeader className="p-0">
                  <div className="aspect-video relative overflow-hidden rounded-t-xl">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight mb-2">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="bg-gray-800 text-gray-200 hover:bg-gray-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="pt-4 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700 hover:text-white"
                      asChild
                    >
                      <a href={project.github}>
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700 hover:text-white"
                      asChild
                    >
                      <a href={project.demo}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700 hover:text-white"
                      onClick={() => shareProject(project)}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button
                      size="sm"
                      className="bg-cyan-500 text-white hover:bg-cyan-600 ml-auto"
                      asChild
                    >
                      <Link href={project.link}>
                        Learn More
                      </Link>
                    </Button>
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

