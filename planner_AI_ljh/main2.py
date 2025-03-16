import openai
import os
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

# .env 파일에서 가져온 API 키 설정
openai.api_key = os.getenv("OPENAI_API_KEY")

def main():
    print("콘솔 기반 GPT 대화 시작! 'exit' 또는 'quit'을 입력하면 종료됩니다.\n")

    while True:
        # 사용자 입력 받기
        user_message = input("User: ")

        # 종료 조건
        if user_message.lower() in ["exit", "quit"]:
            print("대화를 종료합니다.")
            break

        try:
            # OpenAI API 호출
            response = openai.ChatCompletion.create(
                model="gpt-4o",  # 실제 사용하시는 모델명 (예: gpt-3.5-turbo, gpt-4 등)
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "너는 계획을 짜주거나 사용자의 계획에 대한 피드백을 해주는 관리자야. "
                            "사용자의 질문에 답하면 되는데 답은 육하원칙에 의거해서 짧게 답변하면 돼."
                        )
                    },
                    {"role": "user", "content": user_message}
                ],
                max_tokens=200,
                temperature=0.7
            )

            # 응답 파싱
            assistant_message = response['choices'][0]['message']['content'].strip()
            print(f"Assistant: {assistant_message}\n")

        except Exception as e:
            print(f"[오류 발생] {e}\n")

if __name__ == "__main__":
    main()
