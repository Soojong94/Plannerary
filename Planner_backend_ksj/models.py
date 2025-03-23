from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()  # SQLAlchemy 인스턴스 생성

# ✅ DBeaver에서 만든 테이블을 사용하도록 설정
# PostgreSQL에 이미 존재하는 테이블과 매핑 (주의: 컬럼 이름, 타입 꼭 맞춰야 함!)

class Users(db.Model):
    __tablename__ = 'users'  # 🔹 기존 DB 테이블 이름과 일치해야 함

    user_id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(15))
    points = db.Column(db.Integer, default=0)
    character_level = db.Column(db.Integer, default=1)
    last_login_dt = db.Column(db.DateTime)
    reg_id = db.Column(db.Integer)
    reg_dt = db.Column(db.DateTime)
    reg_ip = db.Column(db.String(45))
    update_id = db.Column(db.Integer)
    update_dt = db.Column(db.DateTime)
    update_ip = db.Column(db.String(45))
    delete_id = db.Column(db.Integer)
    delete_dt = db.Column(db.DateTime)
    delete_ip = db.Column(db.String(45))

    def __repr__(self):
        return f'<User {self.user_name}>'