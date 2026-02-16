// Menu Data Types

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

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface MenuData {
  categories: MenuCategory[];
  items: MenuItem[];
}

// Currency Formatter
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Get items by category
export const getItemsByCategory = (
  items: MenuItem[],
  categoryId: string
): MenuItem[] => {
  return items.filter((item) => item.category === categoryId && item.available);
};

// Get all available items
export const getAvailableItems = (items: MenuItem[]): MenuItem[] => {
  return items.filter((item) => item.available);
};
