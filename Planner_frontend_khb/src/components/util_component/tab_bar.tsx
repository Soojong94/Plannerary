"use client";

import React from "react";

export default function TabBar() {
  return (
    <div className="tab-bar flex justify-around w-full">
      <div className="tab-bar__tab">버킷리스트</div>
      <div className="tab-bar__tab">달력</div>
      <div className="tab-bar__tab">마이페이지</div>
      <div className="tab-bar__tab"></div>
    </div>
  );
}
