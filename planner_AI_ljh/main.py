from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv
import logging

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# .env 파일 로드
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SurveyData(BaseModel):
    data: dict

class ChatRequest(BaseModel):
    message: str

@app.post("/ai/survey")
async def receive_survey(request: Request):
    try:
        body = await request.json()
        print("받은 데이터:", body)

        if 'answer' in body:
            # ChatRequest 객체 생성
            chat_request = ChatRequest(message=body['answer'])
            # chat_gpt 엔드포인트 직접 호출
            chat_response = await chat_gpt(chat_request)
            
            return {
                "status": "success",
                "received_data": body,
                "chat_response": chat_response
            }
        
        return {"status": "success", "received_data": body}
    except Exception as e:
        print("에러 발생:", str(e))
        return {"status": "error", "message": str(e)}

@app.post("/chat")
async def chat_gpt(request_data: ChatRequest):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "너는 계획을 짜주거나 사용자의 저축 계획에 대한 피드백을 해주는 assistant야 ,사용자의 질문에 답하면 되는데 답은 날짜,예산, 실현 가능성과 방법에대해 한줄씩 답변하면 돼 그리고 유저의 질문에는 5개의 선택지를 제공해줘"
                },
                {"role": "user", "content": request_data.message}
            ],
            max_tokens=600,
            temperature=0.7
        )
        
        assistant_message = response['choices'][0]['message']['content'].strip()
        print("assistant:", assistant_message)
        
        return {"assistant_message": assistant_message}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)