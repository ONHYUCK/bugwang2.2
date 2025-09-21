const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
require('dotenv').config();

const conflictRoutes = require('./routes/conflicts');
const dashboardRoutes = require('./routes/dashboard');
const aiRoutes = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/incheon-conflicts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 연결 오류:'));
db.once('open', () => {
  console.log('MongoDB에 성공적으로 연결되었습니다.');
});

// 미들웨어
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || ['http://localhost:5173', 'https://your-netlify-app.netlify.app'],
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100 // IP당 최대 요청 수
});
app.use(limiter);

// 라우트
app.use('/api/conflicts', conflictRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai', aiRoutes);

// 헬스 체크
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 핸들러
app.use('*', (req, res) => {
  res.status(404).json({ error: '요청한 리소스를 찾을 수 없습니다.' });
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

