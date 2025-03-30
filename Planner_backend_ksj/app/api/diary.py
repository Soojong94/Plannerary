from flask import Blueprint, jsonify
from app.models.BucketList import BucketList
from app.models.Diary import Diary
from app.models.Plan import Plan

diary_bp = Blueprint('diary', __name__, url_prefix='/diary')


@diary_bp.route('/writeForm')
def write_diary():
        
    user_id = 1  # 🔹 로그인 완료된 사용자라 가정하고 임시로 user_id 고정

    # 1. 사용자의 버킷리스트 조회
    buckets = BucketList.query.filter_by(user_id=user_id).all()
    print(buckets)
    

    
    result = []
    for bucket in buckets:
        # Plan 조회 (해당 bucket_id 기준)
        plans = Plan.query.filter_by(bucket_id=bucket.bucket_id).all()

        result.append({
            "bucket": bucket.to_dict(),  # 모든 컬럼 포함
            "plans": [
                {
                    "plan_id": p.plan_id,
                    "plan_title": p.plan_title,
                    "plan_status": p.plan_status,
                    "condition_type": p.condition_type,
                    "total_target": p.total_target,
                    "current_progress": p.current_progress,
                    "achievement_rate": float(p.achievement_rate or 0),
                }
                for p in plans
            ]
        })

    return jsonify(result)




    # return "다이어리 작성 화면"
