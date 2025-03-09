import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-blue-500 text-white p-4 h-full flex flex-col ">
      {/* 로고 */}
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-xl font-bold">My App</span>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav>
        <ul className="flex flex-col space-y-4">
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
      <div className="mt-auto">
        <Link
          href="/login"
          className="border border-white p-2 rounded-2xl hover:bg-white hover:text-blue-500"
        >
          로그아웃
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
