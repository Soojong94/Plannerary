import React from "react";

const Bucketlist: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold">나의 버킷리스트</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600">
            버킷리스트 작성
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
            최신순
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600">
            오래된순
          </button>
        </div>
      </div>
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <li className="flex-1">
            <section className="border p-4 rounded-lg">
              <h2 className="text-xl font-bold">버킷리스트 제목 1</h2>
              <p>진행률: 50%</p>
            </section>
          </li>
          <li className="flex-1">
            <section className="border p-4 rounded-lg">
              <h2 className="text-xl font-bold">버킷리스트 제목 2</h2>
              <p>진행률: 30%</p>
            </section>
          </li>
          <li className="flex-1">
            <section className="border p-4 rounded-lg">
              <h2 className="text-xl font-bold">버킷리스트 제목 3</h2>
              <p>진행률: 70%</p>
            </section>
          </li>
          <li className="flex-1">
            <section className="border p-4 rounded-lg">
              <h2 className="text-xl font-bold">버킷리스트 제목 4</h2>
              <p>진행률: 20%</p>
            </section>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Bucketlist;
