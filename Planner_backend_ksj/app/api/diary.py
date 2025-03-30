from flask import Blueprint
from app.models.BucketList import BucketList
from app.models.Diary import Diary

diary_bp = Blueprint('diary', __name__, url_prefix='/diary')


@diary_bp.route('/writeForm')
def write_diary():
        
    user_id = 1  # 🔹 로그인 완료된 사용자라 가정하고 임시로 user_id 고정

    # 1. 사용자의 버킷리스트 조회
    buckets = BucketList.query.filter_by(user_id=user_id).all()
    print(buckets)
    






    return "다이어리 작성 화면"
