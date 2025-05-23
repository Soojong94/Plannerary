import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";

declare global {
  interface Window {
    google: any;
  }
}

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Google 클라이언트 라이브러리 로드
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      initGoogleButton();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initGoogleButton = () => {
    if (window.google && document.getElementById("googleSignInDiv")) {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com", // Google Cloud Console에서 발급받은 클라이언트 ID
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "signup_with",
          shape: "rectangular",
          logo_alignment: "left",
          width: 320,
        }
      );
    }
  };

  const handleGoogleResponse = async (response: any) => {
    const { credential } = response;

    // JWT 디코딩
    const decodedToken = JSON.parse(atob(credential.split(".")[1]));

    try {
      await googleLogin(
        decodedToken.email,
        decodedToken.name,
        decodedToken.sub // Google에서 제공하는 고유 ID
      );
      navigate("/");
    } catch (error) {
      console.error("구글 로그인 오류:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await register(name, email, password);
      navigate("/"); // 회원가입 성공 시 홈페이지로 이동
    } catch (error) {
      console.error("회원가입 오류:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center mb-8">
            <Link to="/" className="text-2xl font-bold text-gray-900 mb-2 inline-block">
              Plannerary
            </Link>
            <p className="text-gray-600">AI와 함께하는 스마트한 계획</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "가입 중..." : "회원가입"}
            </Button>
          </form>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
              또는
            </span>
          </div>

          <div id="googleSignInDiv" className="w-full flex justify-center my-4"></div>

          <p className="mt-6 text-center text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="text-primary hover:underline">
              로그인
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;