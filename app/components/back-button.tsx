'use client'

import { motion } from "framer-motion"
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  onClick: () => void
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed top-6 left-6 z-50 bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full text-white shadow-lg"
    >
      <ArrowLeft className="w-6 h-6" />
    </motion.button>
  )
}

