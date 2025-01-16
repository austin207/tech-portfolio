'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import LanguagePieChart from './LanguagePieChart'
import { Button } from '@/components/ui/button'

interface CodeBlock {
  name: string
  language: string
  code: string
}

interface ProjectDetailProps {
  title: string
  description: string
  longDescription: string
  tags: string[]
  image: string
  circuitDiagram: string
  videoUrl: string
  languageData: { name: string; value: number; color: string }[]
  codeBlocks: CodeBlock[]
}

export default function ProjectDetail({
  title,
  description,
  longDescription,
  tags = [],
  image,
  circuitDiagram,
  videoUrl,
  languageData = [],
  codeBlocks = []
}: ProjectDetailProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (currentIndex < longDescription.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prevText => prevText + longDescription[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, 10) // Faster typing speed

      return () => clearTimeout(timer)
    }
  }, [currentIndex, longDescription])

  const copyToClipboard = (code: string, blockName: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedStates({ ...copiedStates, [blockName]: true })
      setTimeout(() => {
        setCopiedStates({ ...copiedStates, [blockName]: false })
      }, 2000)
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/#projects" className="inline-flex items-center text-cyan-500 hover:text-cyan-400 mb-6">
          <ArrowLeft className="mr-2" />
          Back to Projects
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg sm:text-xl text-gray-300 mb-6"
            >
              {description}
            </motion.p>
            <div className="flex flex-wrap gap-2 mb-6">
              {tags && tags.length > 0 && tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <motion.img
              src={image}
              alt={title}
              className="w-full h-64 object-cover rounded-lg mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <Card className="bg-gray-800/50 border-gray-700 mb-8">
              <CardContent className="p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-gray-300 whitespace-pre-wrap">{displayedText}</p>
                  {currentIndex < longDescription.length && (
                    <span className="inline-block w-1 h-6 ml-1 bg-cyan-500 animate-blink"></span>
                  )}
                </motion.div>
              </CardContent>
            </Card>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-4"
            >
              Circuit Diagram
            </motion.h2>
            <motion.img
              src={circuitDiagram}
              alt="Circuit Diagram"
              className="w-full h-auto rounded-lg mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-4"
            >
              Project Demo
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-w-16 aspect-h-9 mb-8"
            >
              <iframe
                src={videoUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </motion.div>
          </div>
          <div>
            {languageData && languageData.length > 0 ? (
              <LanguagePieChart data={languageData} />
            ) : (
              <p>No language data available</p>
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-bold mb-4">Code Snippets</h2>
              {codeBlocks && codeBlocks.length > 0 && codeBlocks.map((block, index) => (
                <motion.div
                  key={block.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  className="mb-6"
                >
                  <Card className="bg-[#0d1117] border-[#30363d]">
                    <CardContent className="p-0">
                      <div className="flex justify-between items-center px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
                        <span className="font-mono text-sm text-gray-200">{block.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(block.code, block.name)}
                          className="text-gray-400 hover:text-white"
                        >
                          {copiedStates[block.name] ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-gray-200 font-mono text-sm">
                          {block.code}
                        </code>
                      </pre>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

