## 📋 File Structure Overview

```
adana-qr-menu/
├── 📄 Configuration Files
│   ├── package.json                  # Dependencies & scripts
│   ├── tsconfig.json                # TypeScript config
│   ├── next.config.ts               # Next.js 15 config
│   ├── tailwind.config.ts           # Midnight Ember theme
│   ├── postcss.config.mjs           # Tailwind 4 PostCSS
│   ├── .gitignore                   # Git ignore rules
│   └── README.md                    # Project documentation
│
├── 📱 Application (src/)
│   ├── app/
│   │   ├── layout.tsx               # Root layout with Header & BottomNav
│   │   ├── page.tsx                 # Home page (Menu/Location/Call sections)
│   │   └── globals.css              # Global styles with Midnight Ember
│   │
│   └── components/
│       ├── Header.tsx               # 🔥 Haşim Usta branding + menu
│       └── BottomNav.tsx            # Sticky bottom nav (3 buttons)
│
├── 📂 public/                        # Static assets (logos, images)
└── 📂 node_modules/                  # Dependencies (67 packages)
```

## 🎨 Color Reference Quick Guide

```css
/* Use these Tailwind classes in your components */

/* Backgrounds */
bg-midnight           /* #0F0F0F - Main background */
bg-midnight-surface   /* #1C1C1C - Cards, surfaces */

/* Text Colors */
text-smoke            /* #F5F5F5 - Primary text */
text-smoke-secondary  /* #A3A3A3 - Secondary text */
text-ember            /* #FF6600 - Accent/CTA text */

/* Background Colors */
bg-ember              /* #FF6600 - CTA buttons */
bg-ember-hover        /* #FF8033 - Hover state */

/* Border Colors */
border-midnight-surface
border-smoke-secondary
```

## 🧩 Component Props Reference

### Header Component
```typescript
// No props required - standalone component
import Header from "@/components/Header";

<Header />
```

### BottomNav Component
```typescript
// No props required - manages its own state
import BottomNav from "@/components/BottomNav";

<BottomNav />
```

## 📱 Responsive Breakpoints (Tailwind)

```
sm:   640px   (Mobile landscape)
md:   768px   (Tablet)
lg:   1024px  (Desktop)
xl:   1280px  (Large desktop)
2xl:  1536px  (Extra large)
```

## 🔧 Useful Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Production
npm run build            # Build for production
npm start                # Start production server

# Utilities
npm install <package>    # Add new dependency
npx next lint            # Run linter
```

## 📦 Current Dependencies

### Production
- next: ^15.1.0
- react: ^19.0.0
- react-dom: ^19.0.0
- lucide-react: ^0.468.0

### Development
- typescript: ^5.7.0
- tailwindcss: ^4.1.18
- @tailwindcss/postcss: ^4.1.18
- postcss: ^8.4.49

**Total packages:** 49 (lightweight and optimized)
