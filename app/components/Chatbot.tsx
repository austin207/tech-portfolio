'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Message {
  text: string
  isUser: boolean
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", isUser: false }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [displayedResponse, setDisplayedResponse] = useState('')
  const [currentResponseIndex, setCurrentResponseIndex] = useState(0)
  const [currentResponse, setCurrentResponse] = useState('')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isTyping && currentResponseIndex < currentResponse.length) {
      const timer = setTimeout(() => {
        setDisplayedResponse(prevText => prevText + currentResponse[currentResponseIndex])
        setCurrentResponseIndex(prevIndex => prevIndex + 1)
      }, 20) // Adjust typing speed here

      return () => clearTimeout(timer)
    } else if (currentResponseIndex === currentResponse.length) {
      setIsTyping(false)
      setMessages(prev => [...prev, { text: currentResponse, isUser: false }])
    }
  }, [isTyping, currentResponseIndex, currentResponse])

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, isUser: true }
      setMessages(prev => [...prev, userMessage])
      setInput('')
      setIsTyping(true)

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              ...messages.map(msg => ({
                role: msg.isUser ? 'user' : 'assistant',
                content: msg.text
              })),
              { role: 'user', content: userMessage.text }
            ]
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch response')
        }

        const data = await response.json()
        setCurrentResponse(data.reply.content)
        setDisplayedResponse('')
        setCurrentResponseIndex(0)
        setIsTyping(true)
      } catch (error) {
        console.error('Error in chat:', error)
        setMessages(prev => [...prev, { text: "I'm sorry, I encountered an error. Please try again later.", isUser: false }])
      } finally {
        setIsTyping(false)
      }
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
                      <span>{displayedResponse}</span>
                      <span className="inline-block w-1 h-4 ml-1 bg-cyan-500 animate-blink"></span>
                    </span>
                  </div>
                )}
                <div ref={messagesEndRef} />
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

