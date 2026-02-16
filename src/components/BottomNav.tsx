"use client";

import { BookOpen, MapPin, Phone } from "lucide-react";
import { useState } from "react";

type NavItem = "menu" | "location" | "contact";

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState<NavItem>("menu");

  const navItems = [
    {
      id: "menu" as NavItem,
      label: "Menü",
      icon: BookOpen,
      href: "#menu",
    },
    {
      id: "location" as NavItem,
      label: "Konum",
      icon: MapPin,
      href: "#location",
    },
    {
      id: "contact" as NavItem,
      label: "İletişim",
      icon: Phone,
      href: "#contact",
    },
  ];

  const handleNavClick = (item: NavItem, href: string) => {
    setActiveTab(item);
    
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Account for header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      <div className="bg-midnight-surface/95 backdrop-blur-md border-t border-smoke-secondary/10">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center justify-around py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.href)}
                  className={`
                    flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-all duration-200
                    ${isActive ? "bg-midnight" : "hover:bg-midnight/50"}
                    active:scale-95
                  `}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon
                    className={`
                      w-6 h-6 transition-colors duration-200
                      ${isActive ? "text-ember" : "text-smoke-secondary"}
                    `}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span
                    className={`
                      text-xs font-medium transition-colors duration-200
                      ${isActive ? "text-ember" : "text-smoke-secondary"}
                    `}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Bottom safe area for devices with notches */}
      <div className="bg-midnight-surface h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
