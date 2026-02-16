"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="w-full bg-midnight-surface/30 backdrop-blur-sm border-t border-ember/10 py-8 mt-16 mb-20"
    >
      <div className="container mx-auto px-4 md:max-w-md">
        <div className="text-center space-y-3">
          <p className="text-gray-400 text-sm">
            © {currentYear} <span className="text-ember font-bold">Haşim Usta Kebap</span>
          </p>
          <p className="text-gray-500 text-xs">
            Tüm hakları saklıdır.
          </p>
          <p className="text-gray-500 text-xs flex items-center justify-center gap-1">
            Made with <span className="text-ember text-base">🔥</span> in Adana
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
