'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageCarouselModal({ images, title, isOpen, onClose }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
         
          <div
            className="absolute inset-0 bg-transparent z-40"
            onClick={onClose} // Close the modal on background click
          />

          <motion.div
            className="relative w-full max-w-3xl h-[600px] bg-white rounded-xl overflow-hidden z-50"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
          

            {/* Image carousel */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.4 },
                }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentIndex]}
                  alt={`${title} - Image ${currentIndex + 1}`}
                  fill
                  className="object-intrinsic"
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="absolute inset-0 flex items-center justify-between p-4 z-50">
              <button
                onClick={() => paginate(-1)}
                className="bg-white/20 p-2 rounded-full hover:bg-white/30"
              >
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="bg-white/20 p-2 rounded-full hover:bg-white/30"
              >
                <ChevronRight className="w-6 h-6 text-black" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
