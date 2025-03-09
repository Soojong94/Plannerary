import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* 로고 */}
      <div className="mb-4">
        <img src="/logo.png" alt="로고" className="h-16 w-16" />
      </div>

      {/* 서비스 이름 */}
      <h1 className="text-2xl font-bold mb-8">서비스 이름</h1>

      {/* 로그인 폼 */}
      <form className="w-full max-w-sm bg-white p-6 rounded shadow-md">
        {/* 이메일 */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            이메일
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="이메일을 입력하세요"
          />
        </div>

        {/* 비밀번호 */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        {/* 로그인 상태 유지 및 링크 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-gray-700 text-sm">
              로그인 상태 유지
            </label>
          </div>
          <div>
            <a
              href="/forgot-password"
              className="text-blue-500 text-sm hover:underline"
            >
              아이디/비밀번호 찾기
            </a>
          </div>
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          로그인
        </button>
      </form>

      {/* 소셜 로그인 */}
      <div className="w-full max-w-sm mt-6">
        <div className="text-center text-gray-500 mb-4">또는</div>
        <div className="flex justify-between">
          <button className="w-1/3 bg-red-500 text-white py-2 rounded hover:bg-red-600">
            구글
          </button>
          <button className="w-1/3 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
            카카오
          </button>
          <button className="w-1/3 bg-green-500 text-white py-2 rounded hover:bg-green-600">
            네이버
          </button>
        </div>
      </div>

      {/* 회원가입 */}
      <div className="mt-8 text-center">
        <p className="text-gray-700">
          아직 회원이 아니신가요?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
