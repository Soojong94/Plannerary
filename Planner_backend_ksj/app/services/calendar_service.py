# 더 많은 엔드포인트 추가 가능
```

```python
# app/services/calendar_service.py

from app import db
from sqlalchemy import text
from datetime import datetime, timedelta
import json

def get_monthly_buckets(user_id, year, month):
    """
    특정 월에 해당하는 버킷리스트 데이터를 조회하는 서비스 함수
    
    Args:
        user_id (int): 사용자 ID
        year (int): 조회할 연도
        month (int): 조회할 월
        
    Returns:
        dict: 날짜별 버킷리스트 데이터 (키: 날짜, 값: 버킷리스트 목록)
    """
    # 월의 시작일과 종료일 계산
    start_date = f"{year}-{month:02d}-01"
    
    # 다음 달 계산
    if month == 12:
        next_month = 1
        next_year = year + 1
    else:
        next_month = month + 1
        next_year = year
        
    end_date = f"{next_year}-{next_month:02d}-01"
    
    # SQL 쿼리로 해당 월의 버킷리스트 조회
    query = """
    SELECT 
        bucket_id, 
        user_id, 
        bucket_title, 
        bucket_category, 
        bucket_start_dt, 
        bucket_end_dt, 
        achievement_rate,
        daily_achievement_rate
    FROM 
        bucket_list
    WHERE 
        user_id = :user_id 
        AND delete_dt IS NULL
        AND (
            (bucket_start_dt BETWEEN :start_date AND :end_date)
            OR (bucket_end_dt BETWEEN :start_date AND :end_date)
            OR (bucket_start_dt <= :start_date AND bucket_end_dt >= :end_date)
            OR (bucket_start_dt <= :start_date AND bucket_end_dt IS NULL)
        )
    """
    
    params = {
        "user_id": user_id,
        "start_date": start_date,
        "end_date": end_date
    }
    
    result = db.session.execute(text(query), params)
    buckets = result.fetchall()
    
    # 날짜별로 버킷리스트 데이터 정리
    buckets_by_date = {}
    
    for bucket in buckets:
        # 버킷의 시작일과 종료일
        start_dt = bucket.bucket_start_dt
        end_dt = bucket.bucket_end_dt or datetime.now().date()
        
        # 딕셔너리 형태로 버킷 데이터 변환
        bucket_dict = {
            "bucket_id": bucket.bucket_id,
            "bucket_title": bucket.bucket_title,
            "bucket_category": bucket.bucket_category,
            "achievement_rate": float(bucket.achievement_rate) if bucket.achievement_rate else 0.0,
            "daily_achievement_rate": {}
        }
        
        # daily_achievement_rate JSON 처리
        if bucket.daily_achievement_rate:
            try:
                daily_rates = json.loads(bucket.daily_achievement_rate)
                bucket_dict["daily_achievement_rate"] = daily_rates
            except:
                pass
        
        # 시작일부터 종료일까지 각 날짜에 버킷 정보 추가
        current_date = start_dt
        while current_date <= end_dt:
            # 해당 월에 속하는 날짜만 처리
            if current_date.year == year and current_date.month == month:
                date_str = current_date.strftime("%Y-%m-%d")
                
                if date_str not in buckets_by_date:
                    buckets_by_date[date_str] = []
                
                # 해당 날짜의 달성률 추가
                if date_str in bucket_dict["daily_achievement_rate"]:
                    bucket_dict["today_achievement"] = bucket_dict["daily_achievement_rate"][date_str]
                else:
                    bucket_dict["today_achievement"] = bucket_dict["achievement_rate"]
                
                buckets_by_date[date_str].append(bucket_dict)
            
            current_date += timedelta(days=1)
    
    return buckets_by_date

def get_bucket_detail(user_id, bucket_id):
    """
    특정 버킷리스트의 상세 정보를 조회하는 서비스 함수
    
    Args:
        user_id (int): 사용자 ID
        bucket_id (int): 버킷리스트 ID
        
    Returns:
        dict: 버킷리스트 상세 정보와 관련 계획 목록
    """
    # 버킷리스트 기본 정보 조회
    bucket_query = """
    SELECT 
        bucket_id, 
        bucket_title, 
        bucket_category, 
        duration_days,
        bucket_start_dt, 
        bucket_end_dt, 
        budget_total,
        budget_available,
        success_criteria,
        achievement_rate,
        daily_achievement_rate
    FROM 
        bucket_list
    WHERE 
        bucket_id = :bucket_id 
        AND user_id = :user_id
        AND delete_dt IS NULL
    """
    
    bucket_params = {
        "bucket_id": bucket_id,
        "user_id": user_id
    }
    
    bucket_result = db.session.execute(text(bucket_query), bucket_params)
    bucket = bucket_result.fetchone()
    
    if not bucket:
        return None
    
    # 관련 계획 목록 조회
    plans_query = """
    SELECT 
        plan_id,
        plan_title,
        due_dt,
        plan_status,
        total_target,
        current_progress,
        achievement_rate
    FROM 
        plan
    WHERE 
        bucket_id = :bucket_id
        AND delete_dt IS NULL
    ORDER BY 
        due_dt ASC
    """
    
    plans_params = {
        "bucket_id": bucket_id
    }
    
    plans_result = db.session.execute(text(plans_query), plans_params)
    plans = plans_result.fetchall()
    
    # 결과 데이터 구성
    bucket_detail = {
        "bucket_id": bucket.bucket_id,
        "title": bucket.bucket_title,
        "category": bucket.bucket_category,
        "duration_days": bucket.duration_days,
        "start_date": bucket.bucket_start_dt.strftime("%Y-%m-%d") if bucket.bucket_start_dt else None,
        "end_date": bucket.bucket_end_dt.strftime("%Y-%m-%d") if bucket.bucket_end_dt else None,
        "budget": {
            "total": bucket.budget_total,
            "available": bucket.budget_available,
            "used": bucket.budget_total - bucket.budget_available if bucket.budget_total and bucket.budget_available else 0
        },
        "success_criteria": bucket.success_criteria,
        "achievement_rate": float(bucket.achievement_rate) if bucket.achievement_rate else 0.0,
        "daily_achievement_rate": {}
    }
    
    # daily_achievement_rate JSON 처리
    if bucket.daily_achievement_rate:
        try:
            daily_rates = json.loads(bucket.daily_achievement_rate)
            bucket_detail["daily_achievement_rate"] = daily_rates
        except:
            pass
    
    # 관련 계획 목록 구성
    plans_list = []
    for plan in plans:
        plan_dict = {
            "plan_id": plan.plan_id,
            "title": plan.plan_title,
            "due_date": plan.due_dt.strftime("%Y-%m-%d") if plan.due_dt else None,
            "status": plan.plan_status,
            "target": plan.total_target,
            "progress": plan.current_progress,
            "achievement_rate": float(plan.achievement_rate) if plan.achievement_rate else 0.0
        }
        plans_list.append(plan_dict)
    
    bucket_detail["plans"] = plans_list
    
    return bucket_detail