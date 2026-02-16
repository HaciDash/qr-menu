# Haşim Usta Kebap - QR Menü Uygulaması

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-0055FF?style=for-the-badge&logo=framer)

**Modern, Mobil-First, QR Kod Optimizasyonlu Dijital Menü**

[Demo](https://adana-qr-menu.vercel.app) · [Dokümantasyon](#özellikler) · [Kurulum](#kurulum)

</div>

---

## 📋 İçindekiler

- [Özellikler](#özellikler)
- [Teknolojiler](#teknolojiler)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Admin Paneli](#admin-paneli)
- [Deploy](#deploy)
- [Proje Yapısı](#proje-yapısı)
- [Lisans](#lisans)

---

## ✨ Özellikler

### 🎨 Kullanıcı Arayüzü
- ✅ **Midnight Ember** tema (Koyu tema + Turuncu vurgular)
- ✅ **Mobil-first** responsive tasarım
- ✅ **ScrollSpy** navigasyon (Otomatik kategori takibi)
- ✅ **Smooth animations** (Framer Motion ile)
- ✅ **Touch-optimized** (Mobil kullanıcı deneyimi)

### 📱 Menü Özellikleri
- ✅ **Dinamik menü sistemi** (JSON tabanlı)
- ✅ **Kategori filtreleme** (Otomatik scroll ile)
- ✅ **Ürün görselleri** (Optimized Next.js Image)
- ✅ **Fiyat gösterimi** (Türk Lirası formatı)
- ✅ **Stok durumu** (Available/Unavailable)

### 🔧 Admin Paneli
- ✅ **Güvenli giriş** (Şifre korumalı)
- ✅ **Fiyat güncelleme** (Hızlı düzenleme)
- ✅ **Ürün ekleme/silme** (CRUD işlemleri)
- ✅ **Görsel yükleme** (Bilgisayardan upload, otomatik resize)
- ✅ **Drag & drop sıralama** (@dnd-kit ile)
- ✅ **Real-time preview** (Anında görüntüleme)

### 📞 İletişim Özellikleri
- ✅ **Çift telefon hattı** (Modal ile seçim)
- ✅ **Google Maps entegrasyonu** (Direkt link)
- ✅ **QR kod oluşturucu** (Farklı boyutlarda indirme)
- ✅ **Kullanım talimatları** (Detaylı rehber)

### 🚀 Performans & SEO
- ✅ **Server-side rendering** (Next.js 15)
- ✅ **Image optimization** (Sharp ile resize)
- ✅ **Lazy loading** (Görseller için)
- ✅ **SEO optimizasyonu** (Meta tags, sitemap, robots.txt)
- ✅ **JSON-LD** structured data (Local SEO)

---

## 🛠️ Teknolojiler

### Frontend
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript 5.7](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4.1](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend & Data
- **API Routes:** Next.js API Routes
- **Data Storage:** JSON file-based
- **Image Processing:** [Sharp](https://sharp.pixelplumbing.com/)
- **QR Code:** [qrcode.react](https://github.com/zpao/qrcode.react)

### Dev Tools
- **Drag & Drop:** [@dnd-kit](https://dndkit.com/)
- **Package Manager:** npm
- **Linting:** ESLint
- **Deployment:** Vercel

---

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adımlar

```bash
# 1. Repository'yi klonlayın
git clone https://github.com/KULLANICI_ADI/adana-qr-menu.git
cd adana-qr-menu

# 2. Bağımlılıkları yükleyin
npm install

# 3. Development server'ı başlatın
npm run dev

# 4. Tarayıcıda açın
# http://localhost:3000
```

### Build & Production

```bash
# Production build
npm run build

# Production server'ı başlatın
npm start
```

---

## 🎯 Kullanım

### Ana Sayfa
```
http://localhost:3000
```
- Menü kategorilerini görüntüleyin
- Ürünlere göz atın
- Konum ve iletişim bilgilerine erişin

### QR Kod Sayfası
```
http://localhost:3000/qr
```
- QR kod oluşturun
- Farklı boyutlarda indirin (512px - 4096px)
- Masalara yerleştirmek için yazdırın

### Admin Paneli
```
http://localhost:3000/admin
```
**Şifre:** `hasim2024`

**Yapabilecekleriniz:**
- ✅ Fiyatları güncelle
- ✅ Yeni ürün ekle
- ✅ Ürün bilgilerini düzenle
- ✅ Görselleri değiştir
- ✅ Ürün sıralamasını değiştir (drag & drop)
- ✅ Stok durumunu ayarla

---

## 🔐 Güvenlik

### Öneriler

1. **Şifreyi değiştirin:**
   ```typescript
   // src/app/admin/page.tsx
   if (password === "YENI_GÜÇLÜ_ŞİFRE") { ... }
   ```

2. **Environment Variables kullanın:**
   ```bash
   # .env.local
   ADMIN_PASSWORD=your_secure_password
   ```

3. **Vercel'de Environment Variables ekleyin:**
   - Dashboard → Settings → Environment Variables
   - `ADMIN_PASSWORD` ekleyin

---

## 🚀 Deploy

### Vercel ile Deploy (Önerilen)

```bash
# 1. Vercel CLI yükleyin
npm install -g vercel

# 2. Giriş yapın
vercel login

# 3. Deploy edin
vercel

# ✅ Canlı link: https://your-project.vercel.app
```

### GitHub ile Otomatik Deploy

1. GitHub'a push edin
2. Vercel Dashboard → New Project
3. GitHub repo'nuzu seçin
4. Deploy butonuna tıklayın
5. ✅ Her push otomatik deploy olur!

---

## 📁 Proje Yapısı

```
adana-qr-menu/
├── public/                    # Statik dosyalar
│   ├── logo.png              # Restaurant logosu
│   └── menu-images/          # Ürün görselleri
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── admin/           # Admin paneli
│   │   ├── api/             # API routes
│   │   │   ├── menu/        # Menü CRUD API
│   │   │   └── upload/      # Görsel upload API
│   │   ├── qr/              # QR kod sayfası
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Ana sayfa
│   │   └── globals.css      # Global styles
│   ├── components/           # React bileşenleri
│   │   ├── Header.tsx       # Header
│   │   ├── MenuScrollSpy.tsx # Menü + ScrollSpy
│   │   ├── BottomActionBar.tsx # Alt navigasyon
│   │   └── Footer.tsx       # Footer
│   └── types/               # TypeScript tipleri
│       └── menu.ts          # Menü tipleri
├── data/
│   └── menu.json            # Menü verisi
├── tailwind.config.ts       # Tailwind config
├── next.config.ts           # Next.js config
└── package.json             # Dependencies
```

---

## 🎨 Tasarım Sistemi

### Renkler (Midnight Ember)

```css
--midnight: #0F0F0F;        /* Arka plan */
--surface: #1C1C1C;         /* Kartlar */
--ember: #FF6600;           /* Ana vurgu (Turuncu) */
--ember-hover: #FF8033;     /* Hover durumu */
--text-primary: #F5F5F5;    /* Ana metin */
--text-secondary: #A3A3A3;  /* İkincil metin */
```

### Typography

```css
Font Family: Inter, Manrope, sans-serif
Logo: 150px
Slogan: text-base, font-semibold
Headers: text-xl, font-bold
Body: text-sm, text-base
```

---

## 📊 Özellik Listesi

### Kullanıcı Tarafı
- [x] Responsive mobil tasarım
- [x] Kategori navigasyonu (ScrollSpy)
- [x] Ürün listeleme
- [x] Fiyat gösterimi (TL formatı)
- [x] Görsel optimizasyonu
- [x] Çift telefon hattı (Modal)
- [x] Google Maps entegrasyonu
- [x] QR kod oluşturma
- [x] Copyright footer
- [x] Smooth animations

### Admin Tarafı
- [x] Güvenli giriş
- [x] Fiyat güncelleme
- [x] Ürün ekleme/silme
- [x] Görsel yükleme (bilgisayardan)
- [x] Otomatik görsel resize (400x400px)
- [x] Drag & drop sıralama
- [x] Stok durumu toggle
- [x] Real-time önizleme

---

## 🔄 Güncelleme Akışı

### Menü Güncelleme

```bash
# 1. Admin paneline giriş yap
https://your-site.com/admin

# 2. Değişiklikleri yap
- Fiyat güncelle
- Yeni ürün ekle
- Görselleri değiştir

# 3. "Kaydet" butonuna tıkla
- data/menu.json güncellenir
- Değişiklikler anında yansır
```

### Code Güncelleme

```bash
# 1. Değişiklikleri yap
# 2. Commit et
git add .
git commit -m "Güncelleme mesajı"
git push

# 3. Vercel otomatik deploy eder
# 4. 1-2 dakikada canlıda!
```

---

## 📞 İletişim

- **Telefon 1:** 0322 770 00 44
- **Telefon 2:** 0322 770 00 45
- **Konum:** [Google Maps](https://maps.app.goo.gl/xzVJLic1Gqxr5X6C9)

---

## 📄 Lisans

MIT License - Dilediğiniz gibi kullanabilirsiniz!

---

## 🙏 Teşekkürler

Bu proje aşağıdaki harika açık kaynak projeler kullanılarak yapılmıştır:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Sharp](https://sharp.pixelplumbing.com/)
- [dnd-kit](https://dndkit.com/)

---

<div align="center">

**Made with 🔥 in Adana**

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

</div>
