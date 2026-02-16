"use client";

import { motion } from "framer-motion";

export default function SimpleBottomBar() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <button
        onClick={scrollToTop}
        className="px-8 py-3 bg-ember hover:bg-ember-hover text-white font-bold rounded-full shadow-2xl shadow-ember/30 transition-all hover:scale-105 active:scale-95"
      >
        ↑ Başa Dön
      </button>
    </motion.div>
  );
}
