from sqlalchemy.dialects.postgresql import JSON
from datetime import datetime
from app import db

# 3. Plan 테이블
class Plan(db.Model):
    __tablename__ = 'tb_plan'

    plan_id = db.Column(db.Integer, primary_key=True)
    bucket_id = db.Column(db.Integer, db.ForeignKey('bucketlist.bucket_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    plan_title = db.Column(db.String(100), nullable=False)
    plan_status = db.Column(db.String(20), default='ongoing')
    condition_type = db.Column(db.Integer)
    total_target = db.Column(db.Integer)
    current_progress = db.Column(db.Integer)
    achievement_rate = db.Column(db.Numeric(5, 2), default=0)
    plan_progress = db.Column(JSON)
    daily_achievement_rate = db.Column(JSON)
    plan_implementation = db.Column(JSON)
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
        return f"<Plan {self.plan_title}>"
