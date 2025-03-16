"use client";

import { useState } from "react";

export default function SurveyForm() {
  const [inputValue, setInputValue] = useState(""); // 입력 값 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [answer, setAnswer] = useState(""); // 응답 데이터 상태
  const [chatResponse, setChatResponse] = useState(""); // 채팅 응답 상태

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      alert("값을 입력해주세요!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("localhost:8000/ai/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer: inputValue, // 사용자가 입력한 값 전송
        }),
      });

      if (!response.ok) {
        throw new Error("서버 응답 실패");
      }

      const data = await response.json();
      console.log("응답 데이터:", data);
      setAnswer(data.received_data.answer);
      setChatResponse(data.chat_response);
      alert("설문이 성공적으로 제출되었습니다!");
      setInputValue(""); // 제출 후 입력 값 초기화
    } catch (error) {
      console.error("제출 실패:", error);
      alert("제출 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const backSubmit = async () => {
    try {
      const response = await fetch("localhost:8080/back/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer: inputValue, // 사용자가 입력한 값 전송
        }),
      });

      if (!response.ok) {
        throw new Error("서버 응답 실패");
      }

      const data = await response.json();
      console.log("응답 데이터:", data);
      alert("설문이 성공적으로 제출되었습니다!");
      setInputValue(""); // 제출 후 입력 값 초기화
    } catch (error) {
      console.error("제출 실패:", error);
      alert("제출 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const backEndPointTest = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_info: "admin",
          bucketlist_info: "bucketlist_info",
          bucketlist_detail: "bucketlist_detail",
        }),
      });

      if (!response.ok) {
        throw new Error("서버 응답 실패");
      }

      const data = await response.json();
      console.log("응답 데이터:", data);

      setInputValue(""); // 제출 후 입력 값 초기화
    } catch (error) {
      console.error("제출 실패:", error);
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">설문 조사</h2>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="답변을 입력하세요"
        className="border p-2 w-full mb-4 color-black"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 w-full"
      >
        {loading ? "제출 중..." : "제출하기"}
      </button>

      <button
        onClick={backSubmit}
        disabled={loading}
        className="bg-blue-500 mt-5 text-white px-4 py-2 rounded disabled:bg-gray-400 w-full"
      >
        {loading ? "제출 중..." : "back 제출하기"}
      </button>

      <div className="flex gap-4 mt-4">
        <div className="flex-1 text-left border border-indigo-400 p-2">
          <h3 className="font-bold">Chat Response</h3>
          <p>{chatResponse}</p>
        </div>
        <div className="flex-1 text-right border border-indigo-400 p-2">
          <h3 className="font-bold">Answer</h3>
          <p>{answer}</p>
        </div>
      </div>

      <button
        onClick={backEndPointTest}
        className="bg-blue-500 mt-5 text-white px-4 py-2 rounded disabled:bg-gray-400 w-full"
      >
        확정
      </button>
    </div>
  );
}
