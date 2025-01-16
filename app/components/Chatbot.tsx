'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! How can I help you today?", isUser: false }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [displayedResponse, setDisplayedResponse] = useState('')
  const [currentResponseIndex, setCurrentResponseIndex] = useState(0)
  const [currentResponse, setCurrentResponse] = useState('')

  useEffect(() => {
    if (isTyping && currentResponseIndex < currentResponse.length) {
      const timer = setTimeout(() => {
        setDisplayedResponse(prevText => prevText + currentResponse[currentResponseIndex])
        setCurrentResponseIndex(prevIndex => prevIndex + 1)
      }, 20) // Adjust typing speed here

      return () => clearTimeout(timer)
    } else if (currentResponseIndex === currentResponse.length) {
      setIsTyping(false)
    }
  }, [isTyping, currentResponseIndex, currentResponse])

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }])
      setInput('')
      setIsTyping(true)
      setDisplayedResponse('')
      setCurrentResponseIndex(0)
      
      // Simulate bot response
      const botResponse = "Thanks for your message! I'm a demo chatbot, so I can't provide real answers. But on a real site, this is where you'd get a helpful response!"
      setCurrentResponse(botResponse)
      
      setTimeout(() => {
        setMessages(prev => [...prev, { text: botResponse, isUser: false }])
      }, botResponse.length * 20 + 500) // Add a small delay after typing finishes
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="mb-4"
          >
            <Card className="w-80 bg-gray-800 border-gray-700">
              <CardHeader className="flex justify-between items-center">
                <h3 className="font-semibold">Chat with us</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div key={index} className={`mb-2 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block p-2 rounded-lg ${msg.isUser ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-200'}`}>
                      {msg.text}
                    </span>
                  </div>
                ))}
                {isTyping && (
                  <div className="text-left mb-2">
                    <span className="inline-block p-2 rounded-lg bg-gray-700 text-gray-200">
                      {displayedResponse}
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                      >
                        |
                      </motion.span>
                    </span>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-grow bg-gray-700 border-gray-600"
                  />
                  <Button type="submit">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        variant={isOpen ? "secondary" : "default"}
        size="icon"
        className="rounded-full w-12 h-12"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}

