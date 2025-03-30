import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 사용자 이름의 첫 글자를 가져오는 함수
  const getInitials = (name: string) => {
    return name?.charAt(0).toUpperCase() || "U";
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

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-700">
                환영합니다, {user?.name} 님
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="bg-primary text-white">
                      {getInitials(user?.name || "")}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/dashboard" className="w-full">
                      대시보드
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full">
                      프로필
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login">
                <Button variant="outline">로그인</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-primary text-white hover:bg-primary/90 transition-colors">
                  무료로 시작하기
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;