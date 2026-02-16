# 🎨 Menu Engine - Code Examples & Visual Guide

## 📋 Quick Reference

### Menu Data Structure

```json
// data/menu.json
{
  "categories": [
    {
      "id": "zirh-kiyma",
      "name": "Zırh Kıyma Kebaplar",
      "slug": "zirh-kiyma-kebaplar",
      "order": 1
    }
  ],
  "items": [
    {
      "id": "adana-kebap",
      "name": "Adana Kebap",
      "description": "Geleneksel Adana usulü acılı kıyma kebap",
      "price": 320,
      "image": "https://example.com/image.jpg",
      "tags": ["Acılı", "Popüler"],
      "category": "zirh-kiyma",
      "available": true
    }
  ]
}
```

---

## 🧩 Component Breakdown

### 1. Category Pills (Horizontal Scroll)

**Visual:** `[Zırh Kıyma] [Fırından] [Aperatifler] [Tatlılar] [İçecekler]`

**Selected State:**
```tsx
bg-ember (#FF6600)
text-white
shadow-lg shadow-ember/30
```

**Unselected State:**
```tsx
bg-transparent
text-smoke-secondary (#A3A3A3)
border border-smoke-secondary/30
hover:border-ember/50
```

**Code:**
```tsx
<button
  className={`
    px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap
    transition-all duration-200 active:scale-95
    ${isSelected 
      ? "bg-ember text-white shadow-lg shadow-ember/30" 
      : "bg-transparent text-smoke-secondary border border-smoke-secondary/30"
    }
  `}
>
  {category.name}
</button>
```

---

### 2. Product Card Layout

**Visual Structure:**
```
┌─────────────────────────────────────┐
│  ┌────┐  Title (Bold White)         │
│  │IMG │  Description (Gray, 2 lines)│
│  │96px│  [Tag1] [Tag2]               │
│  └────┘                    ₺320      │
└─────────────────────────────────────┘
```

**Code:**
```tsx
<div className="flex gap-4 p-4">
  {/* Left: Image */}
  <div className="relative w-24 h-24 flex-shrink-0">
    <Image
      src={item.image}
      alt={item.name}
      fill
      className="object-cover rounded-lg"
    />
  </div>

  {/* Right: Details */}
  <div className="flex-1 flex flex-col justify-between">
    <div>
      <h3 className="text-base font-bold text-smoke">
        {item.name}
      </h3>
      <p className="text-xs text-smoke-secondary line-clamp-2">
        {item.description}
      </p>
      <div className="flex flex-wrap gap-1">
        {item.tags.map((tag) => (
          <span className="text-xs px-2 py-0.5 rounded-full 
                           bg-ember/10 text-ember">
            {tag}
          </span>
        ))}
      </div>
    </div>
    
    <div className="flex justify-end">
      <span className="text-lg font-bold text-ember">
        {formatPrice(item.price)}
      </span>
    </div>
  </div>
</div>
```

---

### 3. Grid Layout

**Mobile (< 768px):**
```
┌───────────────┐
│   Card 1      │
├───────────────┤
│   Card 2      │
├───────────────┤
│   Card 3      │
└───────────────┘
```

**Desktop (≥ 768px):**
```
┌──────────┬──────────┐
│  Card 1  │  Card 2  │
├──────────┼──────────┤
│  Card 3  │  Card 4  │
└──────────┴──────────┘
```

**Code:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {filteredItems.map((item) => (
    <ProductCard key={item.id} item={item} />
  ))}
</div>
```

---

## 💰 Currency Formatting Examples

### formatPrice Function

```typescript
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
```

### Output Examples

| Input | Output | Display |
|-------|--------|---------|
| `320` | `"₺320"` | ₺320 |
| `85` | `"₺85"` | ₺85 |
| `25` | `"₺25"` | ₺25 |
| `1250` | `"₺1.250"` | ₺1.250 |

**Note:** Turkish locale uses `.` as thousand separator and `,` as decimal separator.

---

## 🎯 State Management

### Category Selection

```typescript
const [selectedCategory, setSelectedCategory] = useState<string>("zirh-kiyma");
```

### Filtered Items

```typescript
const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);

useEffect(() => {
  const filtered = getItemsByCategory(items, selectedCategory);
  setFilteredItems(filtered);
}, [selectedCategory, items]);
```

**Flow:**
1. User clicks category pill
2. `setSelectedCategory` updates state
3. `useEffect` triggers
4. Items filtered by category
5. UI re-renders with new items

---

## 🎨 Color Palette Reference

### Category Pills

```css
/* Selected */
background: #FF6600 (ember)
color: #FFFFFF (white)
box-shadow: 0 0 20px rgba(255, 102, 0, 0.3)

/* Unselected */
background: transparent
color: #A3A3A3 (smoke-secondary)
border: 1px solid rgba(163, 163, 163, 0.3)

/* Hover (Unselected) */
border-color: rgba(255, 102, 0, 0.5)
```

### Product Card

```css
/* Container */
background: #1C1C1C (midnight-surface)
border: 1px solid rgba(163, 163, 163, 0.1)

/* Hover */
border-color: rgba(255, 102, 0, 0.5)

/* Title */
color: #F5F5F5 (smoke)
hover: #FF6600 (ember)

/* Description */
color: #A3A3A3 (smoke-secondary)

/* Price */
color: #FF6600 (ember)
font-weight: bold
```

---

## 📱 Responsive Breakpoints

### Tailwind Breakpoints

```typescript
sm:  640px   // Small devices
md:  768px   // Medium devices (tablets)
lg:  1024px  // Large devices (desktops)
xl:  1280px  // Extra large
2xl: 1536px  // 2K screens
```

### Menu Engine Usage

```tsx
// Grid columns
"grid-cols-1"        // Mobile: 1 column
"md:grid-cols-2"     // Desktop: 2 columns

// Max width
"max-w-4xl"          // 896px max width

// Image size (fixed)
"w-24 h-24"          // 96x96px on all devices
```

---

## 🔥 Hover & Transition Effects

### Category Pills

```tsx
transition-all duration-200
active:scale-95
hover:border-ember/50
```

**Effect:**
- Smooth color/border transitions (200ms)
- Slight scale down when clicked (95%)
- Border glows orange on hover

### Product Cards

```tsx
transition-all duration-200
hover:border-ember/50
group-hover:text-ember
```

**Effect:**
- Border glows orange on hover
- Title color changes to orange
- Smooth transitions (200ms)

---

## 📊 Data Flow Diagram

```
┌────────────────┐
│  menu.json     │
│  (Static Data) │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  page.tsx      │
│  (Import Data) │
└───────┬────────┘
        │
        ▼
┌────────────────────┐
│  MenuSection.tsx   │
│  ┌──────────────┐  │
│  │ State:       │  │
│  │ - selected   │  │
│  │ - filtered   │  │
│  └──────────────┘  │
└───────┬────────────┘
        │
        ▼
┌─────────────────────────┐
│  UI Components          │
│  ┌────────────────────┐ │
│  │ Category Pills     │ │
│  └────────────────────┘ │
│  ┌────────────────────┐ │
│  │ Product Grid       │ │
│  │  ├─ Card 1         │ │
│  │  ├─ Card 2         │ │
│  │  └─ Card 3         │ │
│  └────────────────────┘ │
└─────────────────────────┘
```

---

## 🧪 Testing Scenarios

### 1. Category Switching

```typescript
// Initial state
selectedCategory = "zirh-kiyma"
filteredItems = [3 kebab items]

// User clicks "Tatlılar"
setSelectedCategory("tatlilar")
// Auto-filters
filteredItems = [3 dessert items]
```

### 2. Empty Category

```typescript
// Category with no items
selectedCategory = "new-empty-category"
filteredItems = []

// Shows empty state
<p>Bu kategoride henüz ürün bulunmuyor.</p>
```

### 3. Unavailable Items

```json
{
  "id": "sold-out-item",
  "available": false  // Will be filtered out
}
```

---

## 🎯 TypeScript Type Checking

### MenuItem Type Guard

```typescript
function isValidMenuItem(item: any): item is MenuItem {
  return (
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.price === 'number' &&
    typeof item.category === 'string' &&
    Array.isArray(item.tags) &&
    typeof item.available === 'boolean'
  );
}
```

### Usage

```typescript
const items: MenuItem[] = menuData.items.filter(isValidMenuItem);
```

---

## 📝 Adding Custom Filters

### Example: Price Range Filter

```typescript
const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

const filteredByPrice = filteredItems.filter(
  (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
);
```

### Example: Tag Filter

```typescript
const [selectedTags, setSelectedTags] = useState<string[]>([]);

const filteredByTags = filteredItems.filter((item) =>
  selectedTags.every((tag) => item.tags.includes(tag))
);
```

---

## 🎨 Visual States

### Category Pill States

```
┌──────────────────┐
│ SELECTED         │  bg-ember, text-white, shadow
├──────────────────┤
│ UNSELECTED       │  transparent, gray border
├──────────────────┤
│ HOVER            │  ember border glow
├──────────────────┤
│ ACTIVE (CLICK)   │  scale-95 (shrink slightly)
└──────────────────┘
```

### Product Card States

```
┌──────────────────┐
│ DEFAULT          │  gray border, white title
├──────────────────┤
│ HOVER            │  ember border, ember title
├──────────────────┤
│ EMPTY            │  gray text message
└──────────────────┘
```

---

## 🚀 Performance Tips

### 1. Image Optimization

```tsx
// Use Next.js Image with proper sizes
<Image
  src={item.image}
  alt={item.name}
  fill
  sizes="(max-width: 768px) 96px, 96px"
  // Tells Next.js to optimize for 96px
/>
```

### 2. Memoization (Optional)

```tsx
const filteredItems = useMemo(
  () => getItemsByCategory(items, selectedCategory),
  [items, selectedCategory]
);
```

### 3. Lazy Loading

```tsx
// Items already lazy load with Next.js Image
// Can add: loading="lazy" priority={false}
```

---

## 📚 Real-World Examples

### Example 1: Add "Seasonal" Badge

```tsx
{item.tags.includes("Mevsimlik") && (
  <span className="absolute top-2 right-2 bg-ember text-white 
                   text-xs px-2 py-1 rounded">
    Mevsimlik
  </span>
)}
```

### Example 2: Discount Display

```json
{
  "id": "special-item",
  "price": 280,
  "originalPrice": 350,
  "discount": 20
}
```

```tsx
<div className="flex items-center gap-2">
  <span className="text-lg font-bold text-ember">
    {formatPrice(item.price)}
  </span>
  {item.originalPrice && (
    <span className="text-sm line-through text-smoke-secondary">
      {formatPrice(item.originalPrice)}
    </span>
  )}
</div>
```

---

## 🎉 Summary

### What We Built

✅ **Data Structure**: JSON-based menu with categories & items  
✅ **Type Safety**: Full TypeScript interfaces  
✅ **Category Filter**: Horizontal scrollable pills  
✅ **Product Grid**: Responsive 1/2 column layout  
✅ **Product Cards**: Image + details layout  
✅ **Currency Format**: Turkish Lira with Intl API  
✅ **Hover Effects**: Smooth transitions  
✅ **Empty States**: User-friendly messages  

### Key Features

- 🔥 High-performance filtering
- 🎨 Midnight Ember design
- 📱 Mobile-first responsive
- 💰 Proper currency formatting
- 🏷️ Tag system
- 🖼️ Optimized images
- ⚡ Fast category switching

---

**Menu Engine Status:** ✅ Production Ready  
**Total Items:** 15 across 5 categories  
**Code Quality:** TypeScript strict mode, no errors
