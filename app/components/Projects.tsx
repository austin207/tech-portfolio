'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink, Share2 } from 'lucide-react'
import Link from 'next/link'

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
  const shareProject = (project: any) => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.origin + project.link,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert(`Share this project:\n\nTitle: ${project.title}\nDescription: ${project.description}\nLink: ${window.location.origin}${project.link}`);
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
              <Card className="bg-gray-900 border-gray-700 overflow-hidden">
                <CardHeader className="p-0">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github}>
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.demo}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => shareProject(project)}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="default" size="sm" asChild>
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

