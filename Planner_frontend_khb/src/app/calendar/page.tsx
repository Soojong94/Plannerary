"use client";

import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import TabBar from "@/components/util_component/tab_bar";
import Calendar from "@/components/calendar_component/calendar";
import Content from "@/components/calendar_component/content";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs()); // 오늘 날짜를 기본 선택

  return (
    <div className="relative h-screen w-[764px] m-auto">
      <div className="overflow-y-auto">
        <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
        <Content selectedDate={selectedDate} />
      </div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[764px]">
        <TabBar />
      </div>
    </div>
  );
}
