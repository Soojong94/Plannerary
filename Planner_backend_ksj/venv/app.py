from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # CORS 설정


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


if __name__ == "__main__":
    print("서버가 http://localhost:5000/ 에서 실행 중입니다.")
    app.run(host="0.0.0.0", port=5000, debug=True)
