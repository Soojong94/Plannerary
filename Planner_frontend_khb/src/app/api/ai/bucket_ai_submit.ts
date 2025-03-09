import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // 클라이언트에서 받은 데이터
    console.log("Next.js API에서 받은 데이터:", body);

    const AIServerUrl = "http://172.30.1.53:8000/ai/survey";
    const response = await fetch(AIServerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("AI 서버 응답 실패");
    }

    const AIData = await response.json();
    console.log("AI 서버 응답:", AIData);

    return NextResponse.json({
      success: true,
      message: "AI 서버로 데이터 전송 완료",
      data: AIData,
    });
  } catch (error) {
    console.error("Next.js API 오류:", error);
    return NextResponse.json(
      { success: false, error: "데이터 전송 실패" },
      { status: 500 }
    );
  }
}
