import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      {/* 왼쪽 로고 */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold">My App</span>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link href="/bucketlist" className="hover:underline">
              버킷리스트
            </Link>
          </li>
          <li>
            <Link href="/mypage" className="hover:underline">
              마이페이지
            </Link>
          </li>
          <li>
            <Link href="/community" className="hover:underline">
              커뮤니티
            </Link>
          </li>
        </ul>
      </nav>

      {/* 로그아웃 버튼 */}
      <div>
        <Link href="/login" className="hover:underline">
          로그아웃
        </Link>
      </div>
    </header>
  );
};

export default Header;
