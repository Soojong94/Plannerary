"use client";
import React from "react";
import { useRouter } from "next/navigation"; // App Router용

interface BucketItem {
  id: number;
  title: string;
  description: string;
  progress: number;
  dDay: number;
}

interface BucketHomeProps {
  data: BucketItem[];
}

const BucketHome: React.FC<BucketHomeProps> = ({ data }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/Diary`);
  };

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">버킷리스트 목록</h2>
      </header>

      <section className="grid grid-cols-3 gap-4">
        {data.map((item) => (
          <article
            key={item.id}
            onClick={() => handleClick()}
            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100 transition"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-700">{item.description}</p>
            <p className="text-gray-500">진행률: {item.progress}%</p>
            <p className="text-gray-500">D-Day: {item.dDay}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default BucketHome;
