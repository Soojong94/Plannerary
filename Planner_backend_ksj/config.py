DATABASE = {
    'dbname': 'bucketPlannerary',  # PostgreSQL에 생성한 데이터베이스 이름
    'user': 'postgres',            # PostgreSQL 기본 사용자
    'password': '1234',    # PostgreSQL 비밀번호
    'host': 'localhost',           # 로컬 실행
    'port': '5432',                # PostgreSQL 기본 포트
}

# SQLAlchemy URI 설정
SQLALCHEMY_DATABASE_URI = f"postgresql://{DATABASE['user']}:{DATABASE['password']}@{DATABASE['host']}:{DATABASE['port']}/{DATABASE['dbname']}"
# SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:1234@localhost:5432/bucketPlannerary'

SQLALCHEMY_TRACK_MODIFICATIONS = False