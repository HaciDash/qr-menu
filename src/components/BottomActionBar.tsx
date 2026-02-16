"use client";

import { motion } from "framer-motion";

export default function SimpleBottomBar() {
  const scrollToTop = () => {
    const start = window.pageYOffset;
    const duration = 1000; // 1 saniye - daha yavaş
    let startTime: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      
      window.scrollTo(0, start * (1 - ease));
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
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
