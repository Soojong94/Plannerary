from flask import Flask, jsonify, request
from flask_cors import CORS
import config  # PostgreSQL 설정

from app import db
from app.models.Membership import Membership  # 모델은 따로 직접 가져오기
# from app.api.diary import diary_bp
# from app.models.Diary import Diary


app = Flask(__name__)
CORS(app)  # CORS 설정
app.config.from_object(config) # PostgreSQL 연결 설정
db.init_app(app)  # 🔹 models.py에서 만든 db 인스턴스를 Flask에 연결 (먼저)

# 이제 app context가 초기화된 후에 라우터 import
from app.api.diary import diary_bp # 다이어리 라우터 등록
app.register_blueprint(diary_bp)  #250330 자영 추가

@app.route("/")
def index():
    return jsonify({"message": "서버가 실행 중입니다."})


# 확정버튼 눌렀을때 -> 모든 요청을 받아서 출력하는 API
@app.route("/api/test", methods=["POST"])
def test():
    data = request.json # 자영:3000/servey에서 확정 버튼 눌렀을때 들어오는 raw 데이터
    print("프론트엔드에서 받은 데이터:", data)

    # 단순히 받은 데이터를 그대로 반환
    return jsonify(
        {
            "status": "success",
            "received_data": data,
            "message": "데이터가 성공적으로 수신되었습니다.",
        }
    )


# 설문 API
@app.route("/ai/survey", methods=["POST"])
def survey():
    data = request.json
    print("설문 데이터:", data)

    return jsonify({"received_data": data, "chat_response": "데이터 수신 완료"})




# 앱 실행
if __name__ == "__main__":
    print("서버가 http://localhost:5000/ 에서 실행 중입니다.")
    app.run(host="0.0.0.0", port=5000, debug=True)
