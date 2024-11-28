'use client'

import { motion } from "framer-motion"
import Image from "next/image"

interface ImageRevealProps {
  src: string
  alt: string
  width?: number
  height?: number
}

export function ImageReveal({ src, alt, width = 400, height = 300 }: ImageRevealProps) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative overflow-hidden"
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
      />
    </motion.div>
  )
}

