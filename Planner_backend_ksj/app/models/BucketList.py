from sqlalchemy.dialects.postgresql import JSON
from datetime import datetime
from app import db

# 2. BucketList 테이블
class BucketList(db.Model):
    __tablename__ = 'bucketlist'

    bucket_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('membership.user_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    bucket_title = db.Column(db.String(100), nullable=False)
    bucket_category = db.Column(db.String(50))
    duration_days = db.Column(db.Integer)
    bucket_start_dt = db.Column(db.DateTime)
    bucket_end_dt = db.Column(db.DateTime)
    budget_total = db.Column(db.Integer)
    budget_available = db.Column(db.Integer)
    success_criteria = db.Column(db.Text)
    achievement_rate = db.Column(db.Numeric(5, 2), default=0)
    daily_achievement_rate = db.Column(JSON)
    reg_dt = db.Column(db.DateTime, default=datetime.utcnow)
    reg_id = db.Column(db.Integer)
    reg_ip = db.Column(db.String(45))
    update_id = db.Column(db.Integer)
    update_dt = db.Column(db.DateTime)
    update_ip = db.Column(db.String(45))
    delete_id = db.Column(db.Integer)
    delete_dt = db.Column(db.DateTime)
    delete_ip = db.Column(db.String(45))

    def __repr__(self):
        return f"<BucketList {self.bucket_title}>"

