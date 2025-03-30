"use client";
import React from "react";
import TabBar from "@/components/util_component/tab_bar";
import Bucketlist from "@/components/bucketlist_component/bucket_home";

interface BucketItem {
  id: number; // 고유 ID
  title: string; // 제목
  description: string; // 설명
  progress: number; // 진행률 (0~100)
  dDay: number; // 디데이 (남은 날짜)
}

const Home: React.FC = () => {
  const tempData: BucketItem[] = [
    {
      id: 1,
      title: "버킷리스트 1",
      description: "첫 번째 항목의 설명입니다.",
      progress: 0,
      dDay: 0,
    },
    {
      id: 2,
      title: "버킷리스트 2",
      description: "두 번째 항목의 설명입니다.",
      progress: 0,
      dDay: 0,
    },
    {
      id: 3,
      title: "버킷리스트 3",
      description: "세 번째 항목의 설명입니다.",
      progress: 0,
      dDay: 0,
    },
    {
      id: 4,
      title: "버킷리스트 4",
      description: "네 번째 항목의 설명입니다.",
      progress: 0,
      dDay: 0,
    },
    {
      id: 5,
      title: "버킷리스트 5",
      description: "다섯 번째 항목의 설명입니다.",
      progress: 0,
      dDay: 0,
    },
  ];

  return (
    <div className="relative h-screen w-[764px] m-auto">
      {/* 버킷리스트 영역 - TabBar 공간 확보 */}
      <div className="overflow-y-auto pb-16">
        <Bucketlist data={tempData} />
      </div>

      {/* TabBar 하단 고정 */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[764px]">
        <TabBar />
      </div>
    </div>
  );
};

export default Home;
