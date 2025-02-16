import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    document.querySelectorAll(".fade-up").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-20 bg-gradient-to-b from-[#F2FCE2] to-white"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 fade-up opacity-0">
            AI와 함께하는 스마트한 계획
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto fade-up opacity-0">
            AI가 제안하는 맞춤형 계획과 다이어리로 더 효율적인 일상을 만들어보세요
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto fade-up opacity-0">
            일상의 순간을 기록하고 AI가 분석하여 더 나은 계획을 제안해드립니다. 감정 분석을 통한 맞춤형 조언으로 당신의 하루를 더욱 풍요롭게 만들어보세요.
          </p>
          <Link to="/login">
            <button className="bg-primary text-white px-8 py-3 rounded-full text-lg hover:bg-primary/90 transition-colors fade-up opacity-0">
              무료로 시작하기
            </button>
          </Link>
          <img
            src="https://images.unsplash.com/photo-1517842645767-c639042777db"
            alt="Planning"
            className="mt-12 rounded-lg shadow-xl max-w-4xl mx-auto fade-up opacity-0"
          />
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-[#E5DEFF]/30"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 fade-up opacity-0">
            스마트한 계획과 다이어리의 만남
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="fade-up opacity-0">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1517842645767-c639042777db"
                  alt="AI 계획"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-4">AI 맞춤형 계획</h3>
                <p className="text-gray-600">
                  AI가 당신의 일정과 선호도를 분석하여 최적화된 계획을 제안해드립니다
                </p>
              </CardContent>
            </Card>
            <Card className="fade-up opacity-0">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1517842536804-bf6629e2c291"
                  alt="스마트 다이어리"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-4">스마트 다이어리</h3>
                <p className="text-gray-600">
                  일상의 순간들을 기록하고, AI가 당신의 감정과 패턴을 분석하여 더 나은 계획을 제안합니다
                </p>
              </CardContent>
            </Card>
            <Card className="fade-up opacity-0">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b"
                  alt="목표 달성"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-4">목표 달성 지원</h3>
                <p className="text-gray-600">
                  설정한 목표를 달성할 수 있도록 맞춤형 조언과 진행 상황을 추적해드립니다
                </p>
              </CardContent>
            </Card>
            <Card className="fade-up opacity-0">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1506784365847-bbad939e9335"
                  alt="감정 분석"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-4">감정 분석 서비스</h3>
                <p className="text-gray-600">
                  일기 내용을 바탕으로 감정 상태를 분석하고, 스트레스 관리와 마음 건강을 위한 맞춤형 제안을 제공합니다
                </p>
              </CardContent>
            </Card>
            <Card className="fade-up opacity-0">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173"
                  alt="습관 형성"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-4">습관 형성 도우미</h3>
                <p className="text-gray-600">
                  AI가 분석한 데이터를 기반으로 좋은 습관을 형성하고 유지할 수 있도록 도와드립니다
                </p>
              </CardContent>
            </Card>
            <Card className="fade-up opacity-0">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                  alt="통계 분석"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-4">생활 패턴 분석</h3>
                <p className="text-gray-600">
                  월간/주간 리포트를 통해 생활 패턴을 분석하고 더 나은 루틴을 제안해드립니다
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-[#D3E4FD]/30"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 fade-up opacity-0">
            사용자 후기
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="fade-up opacity-0">
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  "Plannerary 덕분에 일상이 더욱 체계적으로 변했어요. AI가 제안하는 계획들이 정말 실용적이에요!"
                </p>
                <div className="flex items-center">
                  <div className="ml-4">
                    <p className="font-semibold">김서연</p>
                    <p className="text-gray-500">대학원생</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="fade-up opacity-0">
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  "다이어리와 플래너가 하나로 통합되어 있어 너무 편리해요. 특히 AI의 조언이 많은 도움이 됩니다."
                </p>
                <div className="flex items-center">
                  <div className="ml-4">
                    <p className="font-semibold">이준호</p>
                    <p className="text-gray-500">직장인</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 fade-up opacity-0">
            이용 요금
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="fade-up opacity-0">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">무료</h3>
                <p className="text-4xl font-bold mb-6">₩0<span className="text-lg font-normal">/월</span></p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    기본 AI 계획
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    기본 다이어리 기능
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    월 3회 계획 생성
                  </li>
                </ul>
                <Link to="/login">
                  <button className="w-full bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">
                    시작하기
                  </button>
                </Link>
              </CardContent>
            </Card>
            <Card className="fade-up opacity-0 border-primary">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">프로</h3>
                <p className="text-4xl font-bold mb-6">₩9,900<span className="text-lg font-normal">/월</span></p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    고급 AI 계획
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    고급 다이어리 기능
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    무제한 계획 생성
                  </li>
                </ul>
                <Link to="/login">
                  <button className="w-full bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">
                    프로 시작하기
                  </button>
                </Link>

              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;