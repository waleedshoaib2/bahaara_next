'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fontHeading } from "../app/fonts";

interface ServiceSliderProps {
  service: {
    title: string;
    description: string;
    images: string[];
    points: string[];
  };
}

const ServiceSlider: React.FC<ServiceSliderProps> = ({ service }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === service.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? service.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-900 to-purple-900 p-8 rounded-lg shadow-lg">
      {/* Title */}
      <h3
        className={`text-3xl font-bold mb-4 text-white ${fontHeading.className}`}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-white/80 mb-6">{service.description}</p>

      {/* Slider */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full"
          >
            <Image
              src={service.images[currentIndex]}
              alt={`${service.title} image ${currentIndex + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </motion.div>
        </AnimatePresence>
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white/80 hover:bg-black/70 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white/80 hover:bg-black/70 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bullet Points */}
      <ul className="list-disc list-inside space-y-2 text-white/70">
        {service.points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceSlider;
