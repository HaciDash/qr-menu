"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";

interface ContactSectionProps {
  phone?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
}

export default function ContactSection({
  phone = "+905551234567",
  whatsappNumber = "905551234567",
  whatsappMessage = "Merhaba Haşim Usta, sipariş vermek istiyorum",
}: ContactSectionProps) {
  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <motion.section
      id="contact"
      className="w-full mb-12 scroll-mt-[200px]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <motion.h2
        className="text-3xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        İletişim
      </motion.h2>

      {/* Contact Actions - Stacked on mobile, side-by-side on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WhatsApp Button */}
        <motion.button
          onClick={handleWhatsApp}
          className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold 
                     px-8 py-6 rounded-xl text-lg transition-all duration-300 
                     shadow-2xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50
                     hover:scale-105 active:scale-95
                     flex items-center justify-center gap-3 border-2 border-[#20BA5A]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <MessageCircle className="w-6 h-6" />
          WhatsApp Sipariş
        </motion.button>

        {/* Phone Call Button */}
        <motion.button
          onClick={handleCall}
          className="w-full bg-ember hover:bg-ember-hover text-white font-bold 
                     px-8 py-6 rounded-xl text-lg transition-all duration-300 
                     shadow-2xl shadow-ember/30 hover:shadow-ember/50
                     hover:scale-105 active:scale-95
                     flex items-center justify-center gap-3 border-2 border-ember-hover"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Phone className="w-6 h-6" />
          Hemen Ara
        </motion.button>
      </div>

      {/* Phone Number Display */}
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-gray-400 mb-1">Telefon</p>
        <a
          href={`tel:${phone}`}
          className="text-2xl font-bold text-ember hover:text-ember-hover transition-colors"
        >
          {phone.replace("+90", "0")}
        </a>
      </motion.div>
    </motion.section>
  );
}
