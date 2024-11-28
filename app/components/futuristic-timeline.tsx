"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { cn } from "../lib/utils"

const timelineItems = [
  {
    title: "Inspiring Beginnings",
    description:
      "Our journey started with a vision shared by a passionate group of creatives. We focused on crafting intimate, memorable experiences through our unique approach to event organization.",
    alignment: "left",
  },
  {
    title: "Dynamic Growth",
    description:
      "As word spread about our innovative events, we saw a surge in interest. This momentum allowed us to grow our team and establish valuable partnerships with trusted vendors, enhancing our service offerings.",
    alignment: "right",
  },
  {
    title: "Establishing Excellence",
    description:
      "With a commitment to quality, we quickly gained recognition in the industry. Our ability to execute larger-scale events, including corporate gatherings and community festivals, solidified our reputation for delivering exceptional experiences.",
    alignment: "left",
  },
]

export default function FuturisticTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <section
      id="journey"
      className="py-32 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(
            "text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
          )}
        >
          Our Journey
        </motion.h2>
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 origin-top"
          />

          {/* Timeline Items */}
          <div className="space-y-24">
            {timelineItems.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ item, index }: { item: typeof timelineItems[0]; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [item.alignment === "left" ? -50 : 50, 0]
  )

  return (
    <motion.div
      ref={itemRef}
      style={{ opacity, x }}
      className={`relative flex items-center ${
        item.alignment === "left" ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={cn(
          "w-full sm:w-1/2 p-6 rounded-lg shadow-lg backdrop-blur-md bg-gradient-to-br",
          item.alignment === "left"
            ? "from-cyan-900/30 to-purple-900/30 text-right"
            : "from-purple-900/30 to-pink-900/30 text-left"
        )}
      >
        <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
        <p className="text-gray-300">{item.description}</p>
      </div>
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2, type: "spring" }}
        className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(from ${
            index * 120
          }deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4)`,
        }}
      >
        <div className="w-8 h-8 bg-gray-900 rounded-full" />
      </motion.div>
    </motion.div>
  )
}

