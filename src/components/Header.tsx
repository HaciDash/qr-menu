"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="w-full bg-midnight py-6">
      <div className="container mx-auto px-4 md:max-w-md">
        {/* Center Aligned Header - Scrolls Away */}
        <motion.div 
          className="flex flex-col items-center justify-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo - 130px */}
          <motion.div 
            className="relative w-[130px] aspect-square"
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

          {/* Slogan - Modern & Clean */}
          <motion.p 
            className="text-gray-300 text-base font-bold tracking-widest uppercase"
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
