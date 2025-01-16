'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, Instagram } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Interested in collaborating on a project or just want to chat about robotics and VLSI? 
            Feel free to reach out!
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center space-x-6">
                  <a href="mailto:your.email@example.com" className="text-gray-300 hover:text-cyan-500">
                    <Mail className="w-8 h-8" />
                  </a>
                  <a href="https://github.com/yourusername" className="text-gray-300 hover:text-cyan-500">
                    <Github className="w-8 h-8" />
                  </a>
                  <a href="https://linkedin.com/in/antony-austin-b7287226a" className="text-gray-300 hover:text-cyan-500">
                    <Linkedin className="w-8 h-8" />
                  </a>
                  <a href="https://instagram.com/yourusername" className="text-gray-300 hover:text-cyan-500">
                    <Instagram className="w-8 h-8" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      className="bg-gray-700/50 border-gray-600"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="bg-gray-700/50 border-gray-600"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      className="bg-gray-700/50 border-gray-600"
                      rows={4}
                    />
                  </div>
                  <Button className="w-full bg-cyan-500 hover:bg-cyan-600">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

