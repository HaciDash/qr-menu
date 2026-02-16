import Header from "@/components/Header";
import MenuScrollSpy from "@/components/MenuScrollSpy";
import Footer from "@/components/Footer";
import SimpleBottomBar from "@/components/BottomActionBar";
import menuData from "@/../../data/menu.json";

export default function Home() {
  return (
    <div className="container mx-auto md:max-w-md">
      {/* Header - Sticky */}
      <Header />
      
      {/* Menu with ScrollSpy */}
      <MenuScrollSpy 
        categories={menuData.categories} 
        items={menuData.items} 
      />

      {/* Footer */}
      <Footer />

      {/* Simple Bottom Button */}
      <SimpleBottomBar />
    </div>
  );
}
