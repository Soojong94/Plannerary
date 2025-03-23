"use client";

import React from "react";
import TabBar from "@/components/util_component/tab_bar";

export default function CalendarPage() {
  return (
    <div className="h-screen flex flex-col w-[764px] m-auto">
      <div className="flex-1">
        <div>커뮤니티</div>
      </div>
      <div>
        <TabBar />
      </div>
    </div>
  );
}
