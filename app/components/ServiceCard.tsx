'use client';

import { useState } from 'react';
import { ImageCarouselModal } from './ImageCarousel';

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    images: string[];
    points: string[];
  };
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative bg-black/80 p-8 rounded-2xl overflow-hidden">
      <h3 className="text-3xl font-bold text-white mb-4">{service.title}</h3>
      <p className="text-white/80 mb-6">{service.description}</p>
      <button
        onClick={() => setModalOpen(true)}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        View Gallery
      </button>

      {/* Modal */}
      <ImageCarouselModal
        images={service.images}
        title={service.title}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)} // Pass close function here
      />
    </div>
  );
}
