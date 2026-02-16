"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { MenuItem, MenuCategory } from "@/types/menu";
import { formatPrice } from "@/types/menu";

interface MenuScrollSpyProps {
  categories: MenuCategory[];
  items: MenuItem[];
}

export default function MenuScrollSpy({ categories, items }: MenuScrollSpyProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || "");
  const categoryRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const categoryButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  // Group items by category
  const itemsByCategory = categories.reduce((acc, category) => {
    acc[category.id] = items.filter((item) => item.category === category.id && item.available);
    return acc;
  }, {} as { [key: string]: MenuItem[] });

  // IntersectionObserver for Scrollspy
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -80% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const categoryId = entry.target.getAttribute("data-category");
          if (categoryId) {
            setActiveCategory(categoryId);
            // Auto-scroll category button to left
            scrollCategoryButtonIntoView(categoryId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-scroll active category button into view
  const scrollCategoryButtonIntoView = (categoryId: string) => {
    const button = categoryButtonRefs.current[categoryId];
    const container = scrollContainerRef.current;
    
    if (button && container) {
      const buttonLeft = button.offsetLeft;
      const containerScrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const buttonWidth = button.clientWidth;

      // Scroll so button is at the left with some padding
      const targetScroll = buttonLeft - 16; // 16px padding

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  // Smooth scroll to category
  const scrollToCategory = (categoryId: string) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveCategory(categoryId);
      scrollCategoryButtonIntoView(categoryId);
    }
  };

  return (
    <div className="w-full">
      {/* Sticky Category Navigation - Modern Pills */}
      <div className="sticky top-[180px] z-40 bg-midnight/95 backdrop-blur-md py-4 border-b border-ember/10">
        <div ref={scrollContainerRef} className="overflow-x-auto custom-scrollbar">
          <div className="flex gap-2 px-4 min-w-max">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  ref={(el) => {
                    categoryButtonRefs.current[category.id] = el;
                  }}
                  onClick={() => scrollToCategory(category.id)}
                  className={`
                    px-5 py-2.5 text-sm font-bold whitespace-nowrap rounded-full
                    transition-all duration-300 border-2
                    ${
                      isActive
                        ? "bg-ember text-white border-ember shadow-lg shadow-ember/30 scale-105"
                        : "bg-midnight-surface/50 text-gray-400 border-ember/20 hover:border-ember/50 hover:text-gray-200 hover:bg-midnight-surface"
                    }
                  `}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* All Categories Stacked Vertically */}
      <div className="px-4 py-6 space-y-10">
        {categories.map((category, categoryIndex) => {
          const categoryItems = itemsByCategory[category.id] || [];

          return (
            <section
              key={category.id}
              ref={(el) => {
                categoryRefs.current[category.id] = el;
              }}
              data-category={category.id}
              className="scroll-mt-[70px]"
            >
              {/* Category Title */}
              <motion.h2
                className="text-xl font-bold text-white mb-4 flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <span className="w-1 h-6 bg-ember rounded-full"></span>
                {category.name}
              </motion.h2>

              {/* Compact Product Cards */}
              <div className="space-y-3">
                {categoryItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    className="flex flex-row items-center gap-4 
                               bg-[#18181B] rounded-xl border border-[#FF6600]
                               hover:border-[#FF8033] hover:shadow-lg hover:shadow-ember/10
                               transition-all duration-200 p-3"
                  >
                    {/* Image - Left (90x90px - Biraz büyütüldü) */}
                    <div className="relative w-[90px] h-[90px] flex-shrink-0 rounded-xl overflow-hidden ring-2 ring-ember/20">
                      <Image
                        src={item.image}
                        alt={`${item.name} - ${item.description}`}
                        fill
                        className="object-cover"
                        sizes="90px"
                        loading="lazy"
                      />
                    </div>

                    {/* Content - Right */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      {/* Title & Description */}
                      <div>
                        <h3 className="text-base font-bold text-white mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Tags (Optional - Only if present) */}
                      {item.tags.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {item.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-ember/10 text-ember"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price - Right Aligned */}
                    <div className="flex-shrink-0">
                      <div className="bg-ember/10 px-4 py-2 rounded-full border-2 border-ember/30">
                        <span className="text-lg font-black text-ember whitespace-nowrap">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Boş Durum */}
                {categoryItems.length === 0 && (
                  <div className="text-center py-6 text-gray-500 text-sm">
                    Bu kategoride ürün bulunmuyor.
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
