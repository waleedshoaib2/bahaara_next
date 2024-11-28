'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { ScrollProgress } from './components/scroll-progress'
import { ParallaxSection } from './components/parallax-section'
import { ImageReveal } from './components/image-reveal'
import { BackButton } from './components/back-button'
import { fontHeading } from './app/fonts'
import { cn } from './lib/utils'
import ParticleBackground from './components/particle-background'
import ServiceSlider from './components/service-slider'

const services = [
  {
    title: "Perfumes",
    description: "Exquisite fragrances for every occasion.",
    images: Array.from({ length: 11 }, (_, i) => `/perfumes/${i + 1}.jpg`)
  },
  {
    title: "Meals",
    description: "Delicious culinary experiences for all tastes.",
    images: Array.from({ length: 15 }, (_, i) => `/meals/${i + 1}.jpg`)
  }
  // ,
  // {
  //   title: "Hotels",
  //   description: "Luxurious accommodations for your perfect stay.",
  //   images: Array.from({ length: 10 }, (_, i) => `/hotels/${i + 1}.jpg`)
  // }
];

const team = [
  {
    name: "Fares Al-Qahtani",
    position: "Owner / Director",
    image: "/team/1.jfif"
  },
  {
    name: "Mohammed Essam",
    position: "Producer",
    image: "/team/2.jfif"
  },
  {
    name: "Sinthia Mohammed",
    position: "Administrative Coordinator",
    image: "/team/3.jfif"
  }
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="bg-[#010210] min-h-7xl text-white overflow-x-hidden">
      <ScrollProgress />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn("text-2xl font-bold", fontHeading.className)}
          >
            بحارة
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-gradient-to-br from-blue-900 to-[#010210] z-40 flex items-center justify-center"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-8 text-center"
            >
              {['About', 'Services', 'Team', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  variants={sectionVariants}
                  onClick={() => {
                    const element = document.getElementById(item.toLowerCase())
                    element?.scrollIntoView({ behavior: 'smooth' })
                    setIsMenuOpen(false)
                  }}
                  className={cn(
                    "text-4xl font-bold hover:text-purple-400 transition-colors",
                    fontHeading.className
                  )}
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <ParticleBackground />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center"
        >
          <motion.h1
            className={cn(
              "text-7xl sm:text-8xl md:text-[12rem] font-bold mb-4 relative",
              fontHeading.className
            )}
            style={{
              textShadow: `
                0 0 42px rgb(147 51 234 / 0.8),
                0 0 82px rgb(147 51 234 / 0.8),
                0 0 92px rgb(147 51 234 / 0.4),
                0 0 102px rgb(147 51 234 / 0.4),
                0 0 151px rgb(147 51 234 / 0.4)
              `,
            }}
          >
            <span className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              بحارة
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-xl md:text-2xl text-white/80">
              BA-HAA-RA
            </p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm md:text-base text-purple-400/80"
            >
              Presented by بحارة
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32">
        <ParallaxSection className="max-w-7xl mx-auto px-6">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={cn("text-4xl font-bold mb-12 text-center", fontHeading.className)}
          >
            Our Services
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-24"
          >
            {services.map((service, index) => (
              <ServiceSlider key={service.title} service={service} index={index} />
            ))}
          </motion.div>
        </ParallaxSection>
      </section>
      <div className='mt-100'></div>

      {/* Team Section */}
      <section id="team" className="py-32">
        <ParallaxSection className="max-w-7xl mx-auto px-6">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={cn("text-4xl font-bold mb-12 text-center", fontHeading.className)}
          >
            Our Team
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={sectionVariants}
                whileHover={{ y: -10 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-48 h-48 mx-auto relative mb-6 rounded-full overflow-hidden border-2 border-purple-500/30"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <h3 className={cn("text-xl font-bold", fontHeading.className)}>
                  {member.name}
                </h3>
                <p className="text-white/80">{member.position}</p>
              </motion.div>
            ))}
          </motion.div>
        </ParallaxSection>
      </section>

      {/* Contact Section */}
     {/* Contact Section */}
<section id="contact" className="py-32 bg-gradient-to-t from-black to-blue-900/20">
  <ParallaxSection className="max-w-7xl mx-auto px-6">
    <motion.h2
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn("text-4xl font-bold mb-12 text-center", fontHeading.className)}
    >
      Contact Us
    </motion.h2>
    <motion.div  // Correct placement of opening tag
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <motion.div
        variants={sectionVariants}
        whileHover={{ scale: 1.02 }}
        className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-900/20 rounded-lg border border-purple-500/30 backdrop-blur-sm"
      >
        <h3 className={cn("text-xl font-bold mb-4", fontHeading.className)}>Email</h3>
        <p className="text-white/80">bahaara.sa1@gmail.com</p>
      </motion.div>
      <motion.div
        variants={sectionVariants}
        whileHover={{ scale: 1.02 }} // Add the whileHover effect back to the phone div
        className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-900/20 rounded-lg border border-purple-500/30 backdrop-blur-sm"
      >
        <h3 className={cn("text-xl font-bold mb-4", fontHeading.className)}>Phone</h3>
        <p className="text-white/80">+966 54 959 9977</p>
        <p className="text-white/80">+966 56 229 5254</p>
      </motion.div>
    </motion.div>  {/* Correct placement of closing tag */}
  </ParallaxSection>
</section>



      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center"
          >
            <BackButton onClick={() => setLightboxImage(null)} />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-[90vw] h-[80vh]"
            >
              <Image
                src={lightboxImage}
                alt="Lightbox image"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ height: ["0%", "30%", "0%"] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
        <span className="text-sm">Scroll</span>
      </motion.div>
    </div>
  )
}

