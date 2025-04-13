"use client";

import React from "react";
import Link from "next/link";

export default function TabBar() {
  return (
    <div className="tab-bar flex justify-around w-full h-[46px]">
      <Link
        href="/Home"
        className="tab-bar__tab flex justify-center items-center flex-1"
      >
        홈
      </Link>
      <Link
        href="/calendar"
        className="tab-bar__tab flex justify-center items-center flex-1"
      >
        캘린더
      </Link>
      <Link
        href="/community"
        className="tab-bar__tab flex justify-center items-center flex-1"
      >
        커뮤니티
      </Link>
      <Link
        href="/settings"
        className="tab-bar__tab flex justify-center items-center flex-1"
      >
        설정
      </Link>
    </div>
  );
}
