"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Navigation } from "lucide-react";

interface LocationSectionProps {
  latitude?: number;
  longitude?: number;
  address?: string;
  city?: string;
}

export default function LocationSection({
  latitude = 37.000,
  longitude = 35.321,
  address = "Seyhan",
  city = "Adana",
}: LocationSectionProps) {
  const handleGetDirections = () => {
    // Universal geo URI - works on both Android and iOS
    const geoUri = `geo:${latitude},${longitude}`;
    
    // Try to detect iOS for better fallback
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
      // iOS: Try Apple Maps first
      const appleMapsUrl = `maps://?q=${latitude},${longitude}`;
      window.location.href = appleMapsUrl;
      
      // Fallback to Google Maps web if Apple Maps not installed
      setTimeout(() => {
        window.location.href = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      }, 500);
    } else {
      // Android: Use geo URI (opens default map app)
      window.location.href = geoUri;
    }
  };

  return (
    <motion.section
      id="location"
      className="w-full mb-12 scroll-mt-[200px]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Location Card with Blurred Map Background */}
      <div className="relative h-80 rounded-2xl overflow-hidden border-2 border-ember shadow-2xl shadow-ember/20">
        {/* Blurred Map Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=600&fit=crop&q=80"
            alt="Adana city map showing restaurant location in Seyhan district"
            fill
            className="object-cover"
            style={{ filter: "blur(8px) brightness(0.3)" }}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-midnight/85 to-midnight/95" />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-6 p-8 text-center">
          {/* Title */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Konumumuz
          </motion.h2>

          {/* Address */}
          <motion.div
            className="text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm mb-1">📍 Adres</p>
            <p className="text-xl font-semibold">
              {address}, {city}
            </p>
          </motion.div>

          {/* Big Orange Button */}
          <motion.button
            onClick={handleGetDirections}
            className="bg-ember hover:bg-ember-hover text-white font-bold px-10 py-5 
                       rounded-xl text-lg transition-all duration-300 
                       shadow-2xl shadow-ember/50 hover:shadow-ember/70 
                       hover:scale-105 active:scale-95
                       flex items-center gap-3 border-2 border-ember-hover"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Navigation className="w-6 h-6" />
            Yol Tarifi Al
          </motion.button>

          {/* Coordinates */}
          <motion.p
            className="text-xs text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {latitude}, {longitude}
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
}
