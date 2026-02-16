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
          {/* Logo - 169px (%30 büyütüldü) */}
          <motion.div 
            className="relative w-[169px] aspect-square"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/logo.png"
              alt="Haşim Usta Kebap Logo"
              fill
              className="object-contain"
              priority
              style={{ fontWeight: 500 }}
            />
          </motion.div>

          {/* Slogan - Büyütülmüş + Turuncu Neon Animasyon */}
          <motion.p 
            className="text-gray-300 text-xl font-black tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              textShadow: [
                "0 0 10px rgba(255, 102, 0, 0.3), 0 0 20px rgba(255, 102, 0, 0.2)",
                "0 0 20px rgba(255, 102, 0, 0.5), 0 0 30px rgba(255, 102, 0, 0.3)",
                "0 0 10px rgba(255, 102, 0, 0.3), 0 0 20px rgba(255, 102, 0, 0.2)",
              ]
            }}
            transition={{ 
              delay: 0.2, 
              duration: 0.5,
              textShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            style={{
              color: "#FF6600",
              textShadow: "0 0 20px rgba(255, 102, 0, 0.5), 0 0 30px rgba(255, 102, 0, 0.3)"
            }}
          >
            Et | Köz | Lezzet
          </motion.p>
        </motion.div>
      </div>
    </header>
  );
}
