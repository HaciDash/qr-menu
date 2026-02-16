import Header from "@/components/Header";
import MenuScrollSpy from "@/components/MenuScrollSpy";
import Footer from "@/components/Footer";
import menuData from "@/../../data/menu.json";

export default function Home() {
  return (
    <div className="container mx-auto md:max-w-md">
      {/* Header - Scrolls Away */}
      <Header />
      
      {/* Menu with ScrollSpy - All items visible */}
      <MenuScrollSpy 
        categories={menuData.categories} 
        items={menuData.items} 
      />

      {/* Footer - Copyright */}
      <Footer />
    </div>
  );
}
