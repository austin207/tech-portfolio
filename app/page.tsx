import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import Chatbot from './components/Chatbot'
import AboutMe from './components/AboutMe'
import Timeline from './components/Timeline'
import Testimonials from './components/Testimonials'
import QuickStats from './components/QuickStats'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <Hero />
      <QuickStats />
      <AboutMe />
      <Skills />
      <Timeline />
      <Projects />
      <Testimonials />
      <Contact />
      <Chatbot />
    </main>
  )
}

