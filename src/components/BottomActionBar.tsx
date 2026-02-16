"use client";

import { motion } from "framer-motion";
import { BookOpen, MapPin, Phone } from "lucide-react";
import { useState } from "react";

type NavItem = "menu" | "location" | "call";

export default function BottomActionBar() {
  const [activeTab, setActiveTab] = useState<NavItem>("menu");
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const handleNavClick = (item: NavItem, action: () => void) => {
    setActiveTab(item);
    action();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openLocation = () => {
    // Direkt Google Maps linki
    window.open("https://maps.app.goo.gl/xzVJLic1Gqxr5X6C9", "_blank");
  };

  const openPhone = () => {
    setShowPhoneModal(true);
  };

  const phones = [
    { number: "03227700044", label: "Hat 1 (Ana Hat)" },
    { number: "03227700045", label: "Hat 2 (Yedek)" },
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
    setShowPhoneModal(false);
  };

  const navItems = [
    {
      id: "menu" as NavItem,
      label: "Menü",
      icon: BookOpen,
      action: scrollToTop,
    },
    {
      id: "location" as NavItem,
      label: "Konum",
      icon: MapPin,
      action: openLocation,
    },
    {
      id: "call" as NavItem,
      label: "Ara",
      icon: Phone,
      action: openPhone,
    },
  ];

  return (
    <>
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#0F0F0F] border-t border-ember/20"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="container mx-auto px-4 md:max-w-md">
          <div className="flex items-center justify-around py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.action)}
                  className={`
                    flex flex-col items-center gap-1 px-6 py-2 rounded-lg 
                    transition-all duration-200
                    ${isActive ? "text-ember" : "text-gray-400"}
                  `}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon
                    className="w-6 h-6"
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className="text-xs font-medium">
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Phone Modal */}
      {showPhoneModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={() => setShowPhoneModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-midnight-surface border border-ember/30 rounded-2xl p-6 w-full max-w-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Phone className="w-6 h-6 text-ember" />
                Bizi Arayın
              </h3>
              <button
                onClick={() => setShowPhoneModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              Hangi hattı aramak istersiniz?
            </p>

            <div className="space-y-3">
              {phones.map((phone) => (
                <button
                  key={phone.number}
                  onClick={() => handleCall(phone.number)}
                  className="w-full flex items-center justify-between px-6 py-4 bg-midnight border border-ember/30 rounded-xl hover:border-ember hover:bg-midnight-surface transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-ember/10 rounded-full flex items-center justify-center group-hover:bg-ember/20 transition-colors">
                      <Phone className="w-5 h-5 text-ember" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold">
                        {phone.number.replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4")}
                      </p>
                      <p className="text-xs text-gray-400">{phone.label}</p>
                    </div>
                  </div>
                  <span className="text-ember group-hover:translate-x-1 transition-transform">→</span>
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              İlk hat meşgulse ikinci hattı arayabilirsiniz
            </p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
