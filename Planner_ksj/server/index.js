import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'your-secret-key'; // 개발용 시크릿 키

// 임시 사용자 데이터베이스
const users = [];

app.use(cors());
app.use(express.json());

// 회원가입 엔드포인트
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 이미 존재하는 이메일인지 확인
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: '이미 사용 중인 이메일입니다.' });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새로운 사용자 생성
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      provider: 'local'
    };

    users.push(newUser);

    // JWT 생성
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: '회원가입 성공',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 로그인 엔드포인트
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 사용자 찾기
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    // JWT 생성
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: '로그인 성공',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 구글 OAuth 로그인/회원가입 엔드포인트
app.post('/api/auth/google', async (req, res) => {
  try {
    const { email, name, googleId } = req.body;

    // 이미 존재하는 사용자인지 확인
    let user = users.find(user => user.email === email);

    // 존재하지 않으면 새로 생성
    if (!user) {
      user = {
        id: users.length + 1,
        name,
        email,
        googleId,
        provider: 'google'
      };
      users.push(user);
    }
    // 기존 사용자라면 googleId 업데이트
    else if (!user.googleId) {
      user.googleId = googleId;
      user.provider = 'google';
    }

    // JWT 생성
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: '구글 로그인 성공',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 인증이 필요한 엔드포인트를 위한 미들웨어
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '인증이 필요합니다.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
    }
    req.user = user;
    next();
  });
};

// 사용자 정보 가져오기 예시 엔드포인트
app.get('/api/user', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email
  });
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});