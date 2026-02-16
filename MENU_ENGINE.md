# 🎯 Menu Engine Documentation

## Overview

The Menu Engine is a high-performance, data-driven system for managing and displaying restaurant menu items with category filtering.

---

## 📁 File Structure

```
├── data/
│   └── menu.json                    # Menu data (categories + items)
├── src/
│   ├── types/
│   │   ├── menu.ts                  # TypeScript interfaces & utilities
│   │   └── menu-data.d.ts           # JSON module type declaration
│   ├── components/
│   │   └── MenuSection.tsx          # Main menu component
│   └── app/
│       └── page.tsx                 # Home page (imports MenuSection)
```

---

## 📊 Data Structure

### Menu JSON Schema

**File:** `data/menu.json`

```json
{
  "categories": [
    {
      "id": "unique-id",
      "name": "Display Name",
      "slug": "url-friendly-slug",
      "order": 1
    }
  ],
  "items": [
    {
      "id": "unique-item-id",
      "name": "Item Name",
      "description": "Short description (2 lines max)",
      "price": 320,
      "image": "https://image-url.com",
      "tags": ["Tag1", "Tag2"],
      "category": "category-id",
      "available": true
    }
  ]
}
```

### Categories

Current categories:
1. **Zırh Kıyma Kebaplar** (Hand-minced Kebabs)
2. **Fırından Lezzetler** (Oven Delights)
3. **Aperatifler** (Appetizers)
4. **Tatlılar** (Desserts)
5. **İçecekler** (Drinks)

### Item Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✓ | Unique identifier (kebab-case) |
| `name` | string | ✓ | Display name |
| `description` | string | ✓ | Short description (truncated to 2 lines) |
| `price` | number | ✓ | Price in TRY (without currency symbol) |
| `image` | string | ✓ | Image URL (preferably 400x400) |
| `tags` | string[] | ✓ | Tags like ['Acılı', 'Popüler'] |
| `category` | string | ✓ | Category ID reference |
| `available` | boolean | ✓ | Availability status |

---

## 🎨 Component Architecture

### MenuSection Component

**File:** `src/components/MenuSection.tsx`

#### Props Interface

```typescript
interface MenuSectionProps {
  categories: MenuCategory[];
  items: MenuItem[];
}
```

#### Features

1. **Category Filter Pills**
   - Horizontal scrollable list
   - Selected: Orange background (#FF6600), White text
   - Unselected: Transparent, Gray border
   - Smooth transitions

2. **Product Grid**
   - 1 column on mobile
   - 2 columns on desktop (md breakpoint)
   - 16px gap between cards

3. **Product Card Layout**
   - Left: Square image (96x96px, rounded corners)
   - Right: Details (title, description, tags, price)
   - Hover effect: Border changes to orange

4. **Typography**
   - Title: Bold white, hover → orange
   - Description: Gray, truncated to 2 lines
   - Price: Large bold orange, bottom-right aligned

5. **Empty State**
   - Displays message when no items in category

---

## 💰 Currency Formatting

### formatPrice Function

**File:** `src/types/menu.ts`

```typescript
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
```

#### Examples

```typescript
formatPrice(320)  // "₺320"
formatPrice(85)   // "₺85"
formatPrice(25)   // "₺25"
```

**Note:** Turkish lira symbol (₺) is placed before the number in tr-TR locale.

---

## 🧩 TypeScript Interfaces

### MenuItem Interface

```typescript
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: string[];
  category: string;
  available: boolean;
}
```

### MenuCategory Interface

```typescript
export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  order: number;
}
```

### MenuData Interface

```typescript
export interface MenuData {
  categories: MenuCategory[];
  items: MenuItem[];
}
```

---

## 🎯 Utility Functions

### getItemsByCategory

Filters items by category ID and availability.

```typescript
export const getItemsByCategory = (
  items: MenuItem[],
  categoryId: string
): MenuItem[] => {
  return items.filter(
    (item) => item.category === categoryId && item.available
  );
};
```

### getAvailableItems

Returns all available items.

```typescript
export const getAvailableItems = (items: MenuItem[]): MenuItem[] => {
  return items.filter((item) => item.available);
};
```

---

## 🎨 Styling Details

### Category Pills

```tsx
// Selected State
className="bg-ember text-white shadow-lg shadow-ember/30"

// Unselected State
className="bg-transparent text-smoke-secondary border border-smoke-secondary/30 
           hover:border-ember/50"
```

### Product Card

```tsx
// Container
className="bg-midnight-surface rounded-xl overflow-hidden 
           border border-smoke-secondary/10 
           hover:border-ember/50 transition-all duration-200"

// Image Container
className="relative w-24 h-24 flex-shrink-0"

// Title
className="text-base font-bold text-smoke group-hover:text-ember"

// Description (2-line truncate)
className="text-xs text-smoke-secondary leading-relaxed line-clamp-2"

// Price
className="text-lg font-bold text-ember"
```

### Tag Badges

```tsx
className="text-xs px-2 py-0.5 rounded-full bg-ember/10 text-ember"
```

---

## 📱 Responsive Behavior

### Grid Breakpoints

```tsx
// Mobile: 1 column
// Desktop (md: 768px+): 2 columns
className="grid grid-cols-1 md:grid-cols-2 gap-4"
```

### Category Pills Scroll

```tsx
// Horizontal scroll on mobile
className="overflow-x-auto custom-scrollbar"

// Flex with min-width to enable scroll
className="flex gap-3 pb-2 min-w-max"
```

### Image Sizing

```tsx
// Next.js Image component
<Image
  src={item.image}
  alt={item.name}
  fill
  className="object-cover rounded-lg"
  sizes="(max-width: 768px) 96px, 96px"
/>
```

---

## 🔥 Performance Optimizations

1. **Next.js Image Optimization**
   - Automatic lazy loading
   - WebP format conversion
   - Responsive sizing

2. **Client-Side Filtering**
   - Fast category switching (no API calls)
   - useState for instant updates

3. **Memoization Opportunities**
   - Can wrap MenuSection in React.memo
   - useMemo for filtered items (future)

4. **Data Structure**
   - Flat array for easy filtering
   - No nested structures (better performance)

---

## 🚀 Usage Example

### In page.tsx

```typescript
import MenuSection from "@/components/MenuSection";
import menuData from "@/../../data/menu.json";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <MenuSection 
        categories={menuData.categories} 
        items={menuData.items} 
      />
    </div>
  );
}
```

---

## 📝 Adding New Items

### Step 1: Add to menu.json

```json
{
  "id": "new-item",
  "name": "New Item Name",
  "description": "Short description here",
  "price": 150,
  "image": "https://example.com/image.jpg",
  "tags": ["New", "Popular"],
  "category": "zirh-kiyma",
  "available": true
}
```

### Step 2: Save & Hot Reload

Changes appear automatically in development mode.

---

## 📝 Adding New Categories

### Step 1: Add to categories array

```json
{
  "id": "new-category",
  "name": "New Category",
  "slug": "new-category",
  "order": 6
}
```

### Step 2: Add items with category reference

```json
{
  "id": "item-1",
  "category": "new-category",
  ...
}
```

---

## 🎨 Customization Guide

### Change Grid Columns

```tsx
// 3 columns on desktop
className="grid grid-cols-1 md:grid-cols-3 gap-4"
```

### Change Image Size

```tsx
// Larger image (128x128)
className="relative w-32 h-32 flex-shrink-0"
```

### Change Price Position

```tsx
// Move price to left
<div className="flex items-end justify-start">
```

### Add More Tag Badges

```tsx
// Show all tags instead of first 2
{item.tags.map((tag, idx) => ( ... ))}
```

---

## 🐛 Common Issues & Solutions

### Issue: Images not loading

**Solution:** Ensure URLs are valid and accessible. Add domain to next.config.ts:

```typescript
images: {
  domains: ['images.unsplash.com', 'your-domain.com'],
}
```

### Issue: Category filter not working

**Solution:** Check that item.category matches category.id exactly.

### Issue: TypeScript errors on JSON import

**Solution:** Ensure `menu-data.d.ts` exists and `resolveJsonModule: true` in tsconfig.json.

---

## 📊 Data Statistics

Current menu data:
- **Categories:** 5
- **Total Items:** 15
- **Items per category:**
  - Zırh Kıyma Kebaplar: 3 items
  - Fırından Lezzetler: 3 items
  - Aperatifler: 3 items
  - Tatlılar: 3 items
  - İçecekler: 3 items

---

## 🎯 Future Enhancements

1. **Search Functionality**
   - Add search bar to filter by name/description
   - Highlight search terms

2. **Sorting Options**
   - Sort by price (low to high, high to low)
   - Sort alphabetically

3. **Item Details Modal**
   - Click item to see full details
   - Large image, full description, nutrition info

4. **Favorites System**
   - Save favorite items
   - LocalStorage persistence

5. **Cart Integration**
   - Add to cart button
   - Order summary

6. **Image Gallery**
   - Multiple images per item
   - Swipeable carousel

7. **Availability Indicator**
   - Show "Out of Stock" badge
   - Disable unavailable items

---

## 🔧 Technical Details

### Dependencies

- **next/image**: Optimized image loading
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling

### Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## ✅ Checklist

Menu Engine Implementation:
- [x] Create menu.json with 5 categories
- [x] Add 15 items (3 per category)
- [x] TypeScript interfaces for type safety
- [x] MenuSection component with filtering
- [x] Category pills (horizontal scroll)
- [x] Product grid (1/2 columns)
- [x] Product card layout (image + details)
- [x] Currency formatting (Intl.NumberFormat)
- [x] Hover effects & transitions
- [x] Empty state handling
- [x] Line clamp for descriptions
- [x] Tag badges
- [x] Responsive design

---

**Menu Engine Version:** 1.0.0  
**Last Updated:** February 15, 2026  
**Status:** Production Ready ✅
