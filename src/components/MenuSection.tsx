"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { MenuItem, MenuCategory } from "@/types/menu";
import { formatPrice, getItemsByCategory } from "@/types/menu";

interface MenuSectionProps {
  categories: MenuCategory[];
  items: MenuItem[];
}

export default function MenuSection({ categories, items }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("zirh-kiyma");
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const filtered = getItemsByCategory(items, selectedCategory);
    setFilteredItems(filtered);
  }, [selectedCategory, items]);

  return (
    <section className="w-full">
      {/* Category Filter Pills - Horizontal Scroll */}
      <div className="mb-6 -mx-4 px-4 overflow-x-auto custom-scrollbar">
        <div className="flex gap-3 pb-2 min-w-max">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap
                  transition-all duration-200 active:scale-95
                  ${
                    isSelected
                      ? "bg-ember text-white shadow-lg shadow-ember/30"
                      : "bg-transparent text-smoke-secondary border border-smoke-secondary/30 hover:border-ember/50"
                  }
                `}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-midnight-surface rounded-xl overflow-hidden border-2 border-ember 
                       hover:border-ember-hover hover:shadow-lg hover:shadow-ember/20 
                       transition-all duration-200 cursor-pointer group"
          >
            <div className="flex gap-4 p-4">
              {/* Left Side - Image */}
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={`${item.name} - ${item.description}`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 96px, 96px"
                  loading="lazy"
                />
              </div>

              {/* Right Side - Details */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                {/* Title */}
                <div>
                  <h3 className="text-base font-bold text-smoke group-hover:text-ember 
                                transition-colors duration-200 mb-1">
                    {item.name}
                  </h3>

                  {/* Description - Truncate to 2 lines */}
                  <p className="text-xs text-smoke-secondary leading-relaxed line-clamp-2 mb-2">
                    {item.description}
                  </p>

                  {/* Tags */}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 rounded-full bg-ember/10 text-ember border border-ember/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price - Bottom Right */}
                <div className="flex items-end justify-end">
                  <span className="text-lg font-bold text-ember">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-smoke-secondary text-sm">
            Bu kategoride henüz ürün bulunmuyor.
          </p>
        </div>
      )}
    </section>
  );
}
