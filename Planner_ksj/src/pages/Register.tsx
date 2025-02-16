import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Register = () => {
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

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" type="text" placeholder="홍길동" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" type="password" placeholder="8자 이상 입력해주세요" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <Input id="confirmPassword" type="password" placeholder="비밀번호를 다시 입력해주세요" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <Link to="/terms" className="text-primary hover:underline">서비스 이용약관</Link>에 동의합니다
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="privacy" />
                <label
                  htmlFor="privacy"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <Link to="/privacy" className="text-primary hover:underline">개인정보 처리방침</Link>에 동의합니다
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full">
              회원가입
            </Button>
          </form>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
              또는
            </span>
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 h-12"
            onClick={() => {/* Google OAuth 구현 예정 */ }}
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            Google로 계속하기
          </Button>

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