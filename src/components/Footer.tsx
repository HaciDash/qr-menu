"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="w-full bg-midnight-surface/20 backdrop-blur-sm border-t border-ember/10 py-4 mt-12 mb-20"
    >
      <div className="container mx-auto px-4 md:max-w-md">
        <div className="text-center">
          <p className="text-gray-500 text-xs">
            Powered by <span className="text-ember font-semibold">IQR</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
