"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="w-full bg-midnight py-3">
      <div className="container mx-auto px-4 md:max-w-md">
        {/* Center Aligned Header - Optimized */}
        <motion.div 
          className="flex flex-col items-center justify-center gap-1"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo - 150px */}
          <motion.div 
            className="relative w-[150px] aspect-square"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/logo.png"
              alt="Haşim Usta Kebap Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Slogan - Büyütüldü */}
          <motion.p 
            className="text-gray-400 text-base font-semibold tracking-wider uppercase -mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Et | Köz | Lezzet
          </motion.p>
        </motion.div>
      </div>
    </header>
  );
}
