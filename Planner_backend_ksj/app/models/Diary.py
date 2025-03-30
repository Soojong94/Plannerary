from sqlalchemy.dialects.postgresql import JSON
from datetime import datetime
from app import db


# 4. Diary 테이블
class Diary(db.Model):
    __tablename__ = 'diary'

    diary_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('membership.user_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    bucket_ids = db.Column(JSON)
    plan_ids = db.Column(JSON)
    daily_total_rate = db.Column(db.Numeric(5, 2))
    daily_plan_rate = db.Column(JSON)
    comments = db.Column(db.Text)
    ai_comments = db.Column(db.Text)
    diary_views_cnt = db.Column(db.Integer, default=0)
    diary_visibility = db.Column(db.String(50))
    reg_dt = db.Column(db.DateTime)
    reg_id = db.Column(db.Integer)
    reg_ip = db.Column(db.String(45))
    update_id = db.Column(db.Integer)
    update_dt = db.Column(db.DateTime)
    update_ip = db.Column(db.String(45))
    delete_id = db.Column(db.Integer)
    delete_dt = db.Column(db.DateTime)
    delete_ip = db.Column(db.String(45))

    def __repr__(self):
        return f"<Diary {self.diary_id}>"
    
    
    def to_dict(self):
        return {
            "bucket_id": self.bucket_id,
            "user_id": self.user_id,
            "bucket_title": self.bucket_title,
            "bucket_category": self.bucket_category,
            "duration_days": self.duration_days,
            "bucket_start_dt": self.bucket_start_dt,
            "bucket_end_dt": self.bucket_end_dt,
            "budget_total": self.budget_total,
            "budget_available": self.budget_available,
            "success_criteria": self.success_criteria,
            "achievement_rate": float(self.achievement_rate or 0),
        }