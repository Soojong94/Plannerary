import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">Plannerary</div>
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollTo("home")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              소개
            </button>
            <button
              onClick={() => scrollTo("features")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              기능
            </button>
            <button
              onClick={() => scrollTo("testimonials")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              후기
            </button>
            <button
              onClick={() => scrollTo("pricing")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              요금제
            </button>
          </div>
          <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">
            무료로 시작하기
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;