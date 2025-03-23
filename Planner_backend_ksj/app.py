from flask import Flask, jsonify, request
from flask_cors import CORS

from flask_sqlalchemy import SQLAlchemy # DB 설정 관련
from sqlalchemy import text  # 👉 SQL 직접 쓸 때 사용

import config  # PostgreSQL 설정
from models import db, Users  # 🔹 models.py에서 모델 불러오기 (ORM 방식 사용)


app = Flask(__name__)
CORS(app)  # CORS 설정

# PostgreSQL 연결 설정
app.config.from_object(config)
db.init_app(app)  # 🔹 models.py에서 만든 db 인스턴스를 Flask에 연결


@app.route("/")
def index():
    return jsonify({"message": "서버가 실행 중입니다."})


# 모든 요청을 받아서 출력하는 API
@app.route("/api/test", methods=["POST"])
def test():
    data = request.json
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


# db 연결 테스트용(250323 자영)
# ✔ ORM 방식으로 회원 목록 전체 조회
@app.route("/users", methods=["GET"])
def get_users():
    users = Users.query.all()  # ORM 사용
    user_list = [
        {
            "user_id": user.user_id,
            "user_name": user.user_name,
            "email": user.email,
            "phone": user.phone
        }
        for user in users
    ]
    return jsonify(user_list)




# 앱 실행
if __name__ == "__main__":
    print("서버가 http://localhost:5000/ 에서 실행 중입니다.")
    app.run(host="0.0.0.0", port=5000, debug=True)
