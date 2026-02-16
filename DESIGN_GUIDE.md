# 🎨 Midnight Ember Design System - Usage Guide

## Overview

This guide provides practical examples of using the Midnight Ember design system in your components.

---

## 🎨 Color Tokens

### Background Colors

```tsx
// Primary background (OLED-friendly deep black)
<div className="bg-midnight">...</div>

// Surface/Card backgrounds (subtle contrast)
<div className="bg-midnight-surface">...</div>

// Accent/CTA backgrounds
<button className="bg-ember hover:bg-ember-hover">Click me</button>
```

### Text Colors

```tsx
// Primary text (off-white)
<h1 className="text-smoke">Haşim Usta</h1>

// Secondary text (gray)
<p className="text-smoke-secondary">Description text</p>

// Accent text (orange)
<span className="text-ember">$180</span>
```

---

## 🧩 Common UI Patterns

### Menu Card

```tsx
<div className="bg-midnight-surface rounded-xl p-5 border border-smoke-secondary/10 
                hover:border-ember/50 transition-all duration-200 cursor-pointer group">
  <div className="flex justify-between items-start mb-2">
    <h3 className="text-lg font-semibold text-smoke group-hover:text-ember transition-colors">
      Adana Kebap
    </h3>
    <span className="text-ember font-bold text-lg">180₺</span>
  </div>
  <p className="text-smoke-secondary text-sm">Acılı kıyma kebap</p>
</div>
```

### Button Styles

```tsx
// Primary CTA Button
<button className="bg-ember text-midnight font-semibold px-6 py-3 rounded-lg 
                   transition-all duration-200 hover:bg-ember-hover active:scale-95">
  Sipariş Ver
</button>

// Ghost Button
<button className="text-smoke-secondary hover:text-ember transition-colors duration-200">
  İptal
</button>

// Icon Button
<button className="p-2 hover:bg-midnight-surface rounded-lg transition-colors 
                   duration-200 active:scale-95">
  <Menu className="w-6 h-6 text-smoke-secondary hover:text-ember" />
</button>
```

### Hero Section

```tsx
<section className="mb-8">
  <div className="bg-midnight-surface rounded-2xl p-6 border border-smoke-secondary/10">
    <h1 className="text-3xl font-bold text-smoke mb-2">
      Hoş Geldiniz 🔥
    </h1>
    <p className="text-smoke-secondary text-sm leading-relaxed">
      Haşim Usta Kebap'a hoş geldiniz. Adana'nın en lezzetli kebaplarını keşfedin.
    </p>
  </div>
</section>
```

---

## 📐 Layout Patterns

### Centered Container (Max-width wrapper)

```tsx
<div className="container mx-auto px-4 py-6 max-w-2xl">
  {/* Your content */}
</div>
```

### Sticky Header

```tsx
<header className="sticky top-0 z-40 bg-midnight/95 backdrop-blur-md 
                   border-b border-smoke-secondary/10">
  {/* Header content */}
</header>
```

### Fixed Bottom Navigation

```tsx
<nav className="fixed bottom-0 left-0 right-0 z-50">
  <div className="bg-midnight-surface/95 backdrop-blur-md border-t border-smoke-secondary/10">
    {/* Nav items */}
  </div>
</nav>
```

---

## 🔥 Animation Patterns

### Hover Scale

```tsx
<button className="transition-all duration-200 hover:scale-105 active:scale-95">
  Button
</button>
```

### Color Transition

```tsx
<div className="text-smoke-secondary hover:text-ember transition-colors duration-200">
  Hover me
</div>
```

### Border Glow

```tsx
<div className="border border-smoke-secondary/10 hover:border-ember/50 
                transition-all duration-200">
  Card with glow effect
</div>
```

---

## 🎯 Icon Usage (Lucide React)

### Icon with Active State

```tsx
import { BookOpen } from "lucide-react";

const isActive = true;

<BookOpen
  className={`w-6 h-6 transition-colors duration-200 
              ${isActive ? "text-ember" : "text-smoke-secondary"}`}
  strokeWidth={isActive ? 2.5 : 2}
/>
```

### Icon Button with Hover

```tsx
import { Menu } from "lucide-react";

<button className="p-2 hover:bg-midnight-surface rounded-lg transition-colors">
  <Menu className="w-6 h-6 text-smoke-secondary hover:text-ember" />
</button>
```

---

## 📱 Mobile-First Responsive

### Responsive Text

```tsx
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-smoke">
  Title
</h1>
```

### Responsive Padding

```tsx
<div className="px-4 md:px-6 lg:px-8 py-4 md:py-6">
  Content
</div>
```

### Responsive Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Grid items */}
</div>
```

---

## 🌓 Backdrop Blur Effects

```tsx
// Subtle blur for headers/footers
<header className="bg-midnight/95 backdrop-blur-md">...</header>

// Strong blur for modals
<div className="bg-midnight-surface/90 backdrop-blur-xl">...</div>
```

---

## 📦 Spacing Scale

```tsx
// Tailwind spacing scale (px-N = padding-x, py-N = padding-y)
p-1   // 0.25rem (4px)
p-2   // 0.5rem  (8px)
p-4   // 1rem    (16px)
p-6   // 1.5rem  (24px)
p-8   // 2rem    (32px)

// Gaps
gap-2  // 0.5rem
gap-4  // 1rem
gap-6  // 1.5rem
```

---

## 🎨 Custom Scrollbar

Add to any scrollable container:

```tsx
<div className="overflow-y-auto custom-scrollbar">
  {/* Scrollable content */}
</div>
```

Styles defined in `globals.css`:
- Width: 6px
- Track: midnight-surface
- Thumb: smoke-secondary with transparency

---

## 🔧 Utility Classes

### Safe Area (for notched devices)

```tsx
<div className="pb-[env(safe-area-inset-bottom)]">
  Content respects device notch
</div>
```

### Smooth Scrolling

```tsx
// Already enabled globally in globals.css
html {
  scroll-behavior: smooth;
}
```

---

## 🎯 Real-World Examples

### Product Card with Price

```tsx
<div className="bg-midnight-surface rounded-xl p-5 border border-smoke-secondary/10 
                hover:border-ember/50 transition-all group">
  <div className="flex justify-between items-start">
    <div>
      <h3 className="text-lg font-semibold text-smoke group-hover:text-ember">
        Adana Kebap
      </h3>
      <p className="text-smoke-secondary text-sm mt-1">
        Acılı kıyma kebap
      </p>
    </div>
    <span className="text-ember font-bold text-xl">180₺</span>
  </div>
</div>
```

### Navigation Button with Icon

```tsx
import { MapPin } from "lucide-react";

const [active, setActive] = useState(false);

<button
  onClick={() => setActive(!active)}
  className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg 
              transition-all duration-200 ${active ? "bg-midnight" : ""} 
              active:scale-95`}
>
  <MapPin
    className={`w-6 h-6 ${active ? "text-ember" : "text-smoke-secondary"}`}
    strokeWidth={active ? 2.5 : 2}
  />
  <span className={`text-xs font-medium ${active ? "text-ember" : "text-smoke-secondary"}`}>
    Konum
  </span>
</button>
```

### Loading Skeleton

```tsx
<div className="bg-midnight-surface rounded-xl p-5 animate-pulse">
  <div className="h-6 bg-smoke-secondary/20 rounded mb-2 w-3/4"></div>
  <div className="h-4 bg-smoke-secondary/10 rounded w-1/2"></div>
</div>
```

---

## 🚀 Performance Tips

1. **Use backdrop-blur sparingly** - Can impact performance on low-end devices
2. **Prefer CSS transitions** over JavaScript animations
3. **Use `transition-colors`** for simple color changes
4. **Add `will-change`** for complex animations:
   ```tsx
   <div className="will-change-transform hover:scale-105">...</div>
   ```

---

## 📚 Reference Links

- [Tailwind CSS Docs](https://tailwindcss.com)
- [Lucide React Icons](https://lucide.dev)
- [Next.js 15 Docs](https://nextjs.org/docs)

---

**Design System Version:** 1.0.0  
**Last Updated:** 2026-02-15  
**Theme:** Midnight Ember 🔥
