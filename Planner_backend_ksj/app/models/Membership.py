from sqlalchemy.dialects.postgresql import JSON
from datetime import datetime
from app import db

# 1. Membership 테이블
class Membership(db.Model):
    __tablename__ = 'membership'

    user_id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(255), nullable=False)
    user_type = db.Column(db.String(50), nullable=False)
    user_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(15))
    last_login_dt = db.Column(db.DateTime)
    reg_id = db.Column(db.Integer)
    reg_dt = db.Column(db.DateTime, default=datetime.utcnow)
    reg_ip = db.Column(db.String(45))
    update_id = db.Column(db.Integer)
    update_dt = db.Column(db.DateTime)
    update_ip = db.Column(db.String(45))
    delete_id = db.Column(db.Integer)
    delete_dt = db.Column(db.DateTime)
    delete_ip = db.Column(db.String(45))

    def __repr__(self):
        return f"<User {self.user_name}>"

