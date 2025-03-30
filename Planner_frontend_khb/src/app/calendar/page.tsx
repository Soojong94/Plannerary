"use client";

import React from "react";
import TabBar from "@/components/util_component/tab_bar";
import Calendar from "@/components/calendar_component/calendar";

export default function CalendarPage() {
  return (
    <div className="relative h-screen w-[764px] m-auto">
      <div className="overflow-y-auto pb-16">
        <Calendar />
      </div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[764px]">
        <TabBar />
      </div>
    </div>
  );
}
