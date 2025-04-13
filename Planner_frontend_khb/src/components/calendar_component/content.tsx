"use client";

import React from "react";
import { Dayjs } from "dayjs";

interface ContentProps {
  selectedDate: Dayjs;
}

const Content: React.FC<ContentProps> = ({ selectedDate }) => {
  return (
    <div className="mt-6 px-6">
      {/* 날짜 제목 */}
      <h2 className="text-xl font-bold text-left mb-4">
        {selectedDate.format("YYYY년 MM월 DD일")}
      </h2>

      {/* 일정 리스트 */}
      <div className="text-left">
        <p className="text-gray-500">등록된 일정이 없습니다.</p>
        {/* 
        여기에 추후 일정 리스트 맵핑하기
        예시:
        scheduleList.map(schedule => (
          <div key={schedule.id} className="...">내용</div>
        ))
        */}
      </div>
    </div>
  );
};

export default Content;
