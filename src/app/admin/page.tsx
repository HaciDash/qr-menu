"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Save, Plus, Trash2, Eye, EyeOff, ArrowLeft, Image as ImageIcon, X, Upload, GripVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { MenuItem, MenuCategory } from "@/types/menu";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface MenuData {
  categories: MenuCategory[];
  items: MenuItem[];
}

interface NewItemForm {
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: string;
}

interface NewCategoryForm {
  id: string;
  name: string;
  slug: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newItemForm, setNewItemForm] = useState<NewItemForm>({
    categoryId: "",
    name: "",
    description: "",
    price: 0,
    image: "",
    tags: "",
  });
  const [newCategoryForm, setNewCategoryForm] = useState<NewCategoryForm>({
    id: "",
    name: "",
    slug: "",
  });

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      loadMenuData();
    }
  }, []);

  const loadMenuData = async () => {
    try {
      const response = await fetch("/api/menu");
      const data = await response.json();
      setMenuData(data);
    } catch (error) {
      console.error("Load error:", error);
      setMessage("Menü yüklenemedi!");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "hasim2024") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
      loadMenuData();
    } else {
      setMessage("Yanlış şifre!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
    setPassword("");
  };

  const handleSave = async () => {
    if (!menuData) return;
    
    setLoading(true);
    try {
      const response = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: "hasim2024",
          menuData,
        }),
      });

      if (response.ok) {
        setMessage("✅ Menü başarıyla güncellendi!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("❌ Güncelleme başarısız!");
      }
    } catch (error) {
      console.error("Save error:", error);
      setMessage("❌ Bir hata oluştu!");
    }
    setLoading(false);
  };

  const updateItemPrice = (itemId: string, newPrice: number) => {
    if (!menuData) return;
    setMenuData({
      ...menuData,
      items: menuData.items.map((item) =>
        item.id === itemId ? { ...item, price: newPrice } : item
      ),
    });
  };

  const updateItemName = (itemId: string, newName: string) => {
    if (!menuData) return;
    setMenuData({
      ...menuData,
      items: menuData.items.map((item) =>
        item.id === itemId ? { ...item, name: newName } : item
      ),
    });
  };

  const updateItemDescription = (itemId: string, newDescription: string) => {
    if (!menuData) return;
    setMenuData({
      ...menuData,
      items: menuData.items.map((item) =>
        item.id === itemId ? { ...item, description: newDescription } : item
      ),
    });
  };

  const updateItemImage = (itemId: string, newImage: string) => {
    if (!menuData) return;
    setMenuData({
      ...menuData,
      items: menuData.items.map((item) =>
        item.id === itemId ? { ...item, image: newImage } : item
      ),
    });
  };

  const toggleItemAvailability = (itemId: string) => {
    if (!menuData) return;
    setMenuData({
      ...menuData,
      items: menuData.items.map((item) =>
        item.id === itemId ? { ...item, available: !item.available } : item
      ),
    });
  };

  const deleteItem = (itemId: string) => {
    if (!menuData) return;
    if (confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
      setMenuData({
        ...menuData,
        items: menuData.items.filter((item) => item.id !== itemId),
      });
    }
  };

  const openAddForm = (categoryId: string) => {
    setNewItemForm({
      categoryId,
      name: "",
      description: "",
      price: 0,
      image: "/menu-images/placeholder.jpg",
      tags: "",
    });
    setShowAddForm(true);
  };

  const addNewItem = () => {
    if (!menuData) return;
    if (!newItemForm.name || !newItemForm.description) {
      alert("Lütfen ürün adı ve açıklama girin!");
      return;
    }

    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      name: newItemForm.name,
      description: newItemForm.description,
      price: newItemForm.price,
      image: newItemForm.image,
      tags: newItemForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      category: newItemForm.categoryId,
      available: true,
    };

    setMenuData({
      ...menuData,
      items: [...menuData.items, newItem],
    });

    setShowAddForm(false);
    setMessage("✅ Yeni ürün eklendi! Kaydetmeyi unutmayın.");
    setTimeout(() => setMessage(""), 3000);
  };

  const addNewCategory = () => {
    if (!menuData) return;
    if (!newCategoryForm.name || !newCategoryForm.id) {
      alert("Lütfen kategori adı ve ID girin!");
      return;
    }

    const newCategory: MenuCategory = {
      id: newCategoryForm.id,
      name: newCategoryForm.name,
      slug: newCategoryForm.slug || newCategoryForm.id,
    };

    setMenuData({
      ...menuData,
      categories: [...menuData.categories, newCategory],
    });

    setShowAddCategoryForm(false);
    setNewCategoryForm({ id: "", name: "", slug: "" });
    setMessage("✅ Yeni kategori eklendi! Kaydetmeyi unutmayın.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleImageUpload = async (file: File, itemId?: string) => {
    if (!file) return;

    // Dosya boyutu kontrolü (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Dosya boyutu 5MB'dan küçük olmalıdır!");
      return;
    }

    setUploadingImage(true);
    if (itemId) setEditingImageId(itemId);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.url) {
        if (itemId) {
          // Mevcut ürünün görselini güncelle
          updateItemImage(itemId, data.url);
          setMessage("✅ Görsel yüklendi! Kaydetmeyi unutmayın.");
        } else {
          // Yeni ürün formu için
          setNewItemForm({ ...newItemForm, image: data.url });
          setMessage("✅ Görsel yüklendi!");
        }
        setTimeout(() => setMessage(""), 3000);
      } else {
        alert(data.error || "Görsel yüklenemedi!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Görsel yüklenirken hata oluştu!");
    } finally {
      setUploadingImage(false);
      setEditingImageId(null);
    }
  };

  const triggerFileInput = (itemId?: string) => {
    if (itemId) {
      setEditingImageId(itemId);
    }
    fileInputRef.current?.click();
  };

  const handleDragEnd = (event: DragEndEvent, categoryId: string) => {
    const { active, over } = event;

    if (!over || active.id === over.id || !menuData) {
      return;
    }

    const categoryItems = menuData.items.filter(
      (item) => item.category === categoryId
    );
    const otherItems = menuData.items.filter(
      (item) => item.category !== categoryId
    );

    const oldIndex = categoryItems.findIndex((item) => item.id === active.id);
    const newIndex = categoryItems.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const reorderedItems = arrayMove(categoryItems, oldIndex, newIndex);
      
      setMenuData({
        ...menuData,
        items: [...otherItems, ...reorderedItems],
      });

      setMessage("✅ Sıralama değişti! Kaydetmeyi unutmayın.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-midnight-surface border border-ember/20 rounded-2xl p-8 w-full max-w-md"
        >
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-ember/10 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-ember" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Girişi</h1>
            <p className="text-gray-400 text-sm text-center">
              Menü yönetimi için şifrenizi girin
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifre"
                className="w-full px-4 py-3 bg-midnight border border-ember/30 rounded-lg text-white focus:outline-none focus:border-ember"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-ember hover:bg-ember-hover text-white font-bold py-3 rounded-lg transition-colors"
            >
              Giriş Yap
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-red-400">{message}</p>
          )}

          <button
            onClick={() => router.push("/")}
            className="mt-6 w-full flex items-center justify-center gap-2 text-gray-400 hover:text-gray-200 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfaya Dön
          </button>
        </motion.div>
      </div>
    );
  }

  // Admin Panel
  return (
    <div className="min-h-screen bg-midnight py-8 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Menü Yönetimi
            </h1>
            <p className="text-gray-400">
              Fiyatları ve ürünleri düzenleyin
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            Çıkış
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-ember hover:bg-ember-hover text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
          </motion.button>

          <button
            onClick={() => setShowAddCategoryForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Yeni Kategori
          </button>

          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-6 py-3 bg-midnight-surface border border-ember/30 text-gray-300 rounded-lg hover:border-ember/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Ana Sayfa
          </button>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-ember/10 border border-ember/30 rounded-lg text-white text-center"
          >
            {message}
          </motion.div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleImageUpload(file, editingImageId || undefined);
            }
            e.target.value = ""; // Reset input
          }}
        />

        {/* Add Item Modal */}
        <AnimatePresence>
          {showAddCategoryForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowAddCategoryForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-midnight-surface border border-green-500/30 rounded-2xl p-6 w-full max-w-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Yeni Kategori Ekle</h3>
                  <button
                    onClick={() => setShowAddCategoryForm(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Kategori Adı */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Kategori Adı *</label>
                    <input
                      type="text"
                      value={newCategoryForm.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        const id = name.toLowerCase()
                          .replace(/ı/g, 'i')
                          .replace(/ğ/g, 'g')
                          .replace(/ü/g, 'u')
                          .replace(/ş/g, 's')
                          .replace(/ö/g, 'o')
                          .replace(/ç/g, 'c')
                          .replace(/\s+/g, '-');
                        setNewCategoryForm({ 
                          ...newCategoryForm, 
                          name,
                          id,
                          slug: id
                        });
                      }}
                      placeholder="Çorbalar"
                      className="w-full px-4 py-2 bg-midnight border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500"
                    />
                  </div>

                  {/* ID (Otomatik) */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">ID (Otomatik)</label>
                    <input
                      type="text"
                      value={newCategoryForm.id}
                      readOnly
                      className="w-full px-4 py-2 bg-midnight/50 border border-ember/20 rounded-lg text-gray-500 text-sm"
                      placeholder="corbalar"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={addNewCategory}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    Kategori Ekle
                  </button>
                  <button
                    onClick={() => setShowAddCategoryForm(false)}
                    className="px-6 bg-midnight-surface border border-ember/30 text-gray-300 rounded-lg hover:border-ember/50 transition-colors"
                  >
                    İptal
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Item Modal */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowAddForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-midnight-surface border border-ember/30 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Yeni Ürün Ekle</h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Ürün Adı */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Ürün Adı *</label>
                    <input
                      type="text"
                      value={newItemForm.name}
                      onChange={(e) => setNewItemForm({ ...newItemForm, name: e.target.value })}
                      placeholder="Adana Kebap"
                      className="w-full px-4 py-2 bg-midnight border border-ember/30 rounded-lg text-white focus:outline-none focus:border-ember"
                    />
                  </div>

                  {/* Açıklama */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Açıklama *</label>
                    <textarea
                      value={newItemForm.description}
                      onChange={(e) => setNewItemForm({ ...newItemForm, description: e.target.value })}
                      placeholder="Geleneksel el yapımı..."
                      rows={3}
                      className="w-full px-4 py-2 bg-midnight border border-ember/30 rounded-lg text-white focus:outline-none focus:border-ember resize-none"
                    />
                  </div>

                  {/* Fiyat */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Fiyat (₺) *</label>
                    <input
                      type="number"
                      value={newItemForm.price || ""}
                      onChange={(e) => setNewItemForm({ ...newItemForm, price: parseInt(e.target.value) || 0 })}
                      onFocus={(e) => {
                        if (e.target.value === "0") {
                          setNewItemForm({ ...newItemForm, price: 0 });
                          e.target.value = "";
                        }
                      }}
                      placeholder="320"
                      className="w-full px-4 py-2 bg-midnight border border-ember/30 rounded-lg text-white focus:outline-none focus:border-ember"
                    />
                  </div>

                  {/* Görsel */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Ürün Görseli</label>
                    <div className="flex gap-4 items-start">
                      {newItemForm.image && (
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-ember/30">
                          <Image
                            src={newItemForm.image}
                            alt="Önizleme"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => triggerFileInput()}
                        disabled={uploadingImage}
                        className="flex items-center gap-2 px-4 py-2 bg-ember/10 border border-ember/30 text-ember rounded-lg hover:bg-ember/20 transition-colors disabled:opacity-50"
                      >
                        <Upload className="w-4 h-4" />
                        {uploadingImage ? "Yükleniyor..." : "Görsel Yükle"}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      JPG, PNG veya WebP • Max 5MB • Otomatik 400x400px
                    </p>
                  </div>

                  {/* Etiketler */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Etiketler (virgülle ayırın)</label>
                    <input
                      type="text"
                      value={newItemForm.tags}
                      onChange={(e) => setNewItemForm({ ...newItemForm, tags: e.target.value })}
                      placeholder="Acılı, Popüler, Özel"
                      className="w-full px-4 py-2 bg-midnight border border-ember/30 rounded-lg text-white focus:outline-none focus:border-ember"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={addNewItem}
                    className="flex-1 bg-ember hover:bg-ember-hover text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    Ürünü Ekle
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-6 bg-midnight-surface border border-ember/30 text-gray-300 rounded-lg hover:border-ember/50 transition-colors"
                  >
                    İptal
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu Items */}
        {menuData?.categories.map((category) => {
          const categoryItems = menuData.items.filter(
            (item) => item.category === category.id
          );

          return (
            <div key={category.id} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-ember flex items-center gap-2">
                  <span className="w-1 h-6 bg-ember rounded-full"></span>
                  {category.name}
                </h2>
                <button
                  onClick={() => openAddForm(category.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-ember/10 border border-ember/30 text-ember rounded-lg hover:bg-ember/20 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Yeni Ürün
                </button>
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(event) => handleDragEnd(event, category.id)}
              >
                <SortableContext
                  items={categoryItems.map((item) => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {categoryItems.map((item) => (
                      <SortableItem
                        key={item.id}
                        item={item}
                        updateItemName={updateItemName}
                        updateItemPrice={updateItemPrice}
                        updateItemDescription={updateItemDescription}
                        updateItemImage={updateItemImage}
                        toggleItemAvailability={toggleItemAvailability}
                        deleteItem={deleteItem}
                        triggerFileInput={triggerFileInput}
                        uploadingImage={uploadingImage}
                        editingImageId={editingImageId}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          );
        })}

        {/* Save Button (Bottom) */}
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto z-50">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={loading}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-ember hover:bg-ember-hover text-white font-bold rounded-xl shadow-2xl shadow-ember/30 transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Sortable Item Component
interface SortableItemProps {
  item: MenuItem;
  updateItemName: (id: string, name: string) => void;
  updateItemPrice: (id: string, price: number) => void;
  updateItemDescription: (id: string, desc: string) => void;
  updateItemImage: (id: string, image: string) => void;
  toggleItemAvailability: (id: string) => void;
  deleteItem: (id: string) => void;
  triggerFileInput: (id: string) => void;
  uploadingImage: boolean;
  editingImageId: string | null;
}

function SortableItem({
  item,
  updateItemName,
  updateItemPrice,
  updateItemDescription,
  updateItemImage,
  toggleItemAvailability,
  deleteItem,
  triggerFileInput,
  uploadingImage,
  editingImageId,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-midnight-surface border border-ember/20 rounded-xl p-4"
    >
      <div className="flex gap-4">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="flex-shrink-0 cursor-grab active:cursor-grabbing flex items-start pt-2"
        >
          <GripVertical className="w-5 h-5 text-gray-500 hover:text-ember transition-colors" />
        </div>

        {/* Product Image */}
        <div className="flex-shrink-0">
          <div
            className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-ember/30 group cursor-pointer"
            onClick={() => triggerFileInput(item.id)}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="96px"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
              <Upload className="w-5 h-5 text-white" />
              <span className="text-xs text-white font-medium">
                {uploadingImage && editingImageId === item.id
                  ? "Yükleniyor..."
                  : "Değiştir"}
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-1">Tıklayın</p>
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Row 1: Name & Price */}
          <div className="flex gap-3">
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItemName(item.id, e.target.value)}
              className="flex-1 px-3 py-2 bg-midnight border border-ember/30 rounded-lg text-white focus:outline-none focus:border-ember"
              placeholder="Ürün Adı"
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={item.price}
                onChange={(e) =>
                  updateItemPrice(item.id, parseInt(e.target.value) || 0)
                }
                onFocus={(e) => {
                  if (e.target.value === "0") {
                    e.target.select();
                  }
                }}
                className="w-24 px-3 py-2 bg-midnight border border-ember/30 rounded-lg text-white font-bold text-center focus:outline-none focus:border-ember"
              />
              <span className="text-ember font-bold">₺</span>
            </div>
          </div>

          {/* Row 2: Description */}
          <textarea
            value={item.description}
            onChange={(e) => updateItemDescription(item.id, e.target.value)}
            className="w-full px-3 py-2 bg-midnight border border-ember/30 rounded-lg text-gray-300 text-sm focus:outline-none focus:border-ember resize-none"
            rows={2}
            placeholder="Açıklama"
          />

          {/* Row 3: Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => toggleItemAvailability(item.id)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                item.available
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}
            >
              {item.available ? "✓ Stokta" : "✗ Stok Yok"}
            </button>

            <button
              onClick={() => deleteItem(item.id)}
              className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 rounded hover:bg-red-500/20 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
