const express = require('express');
const router = express.Router();

// AI 분석 요청 (FastAPI 서비스와 연결)
router.post('/analyze', async (req, res) => {
  try {
    const { conflictId, text } = req.body;
    
    // FastAPI 서비스 호출 (Stub)
    const analysis = await analyzeConflict(text);
    
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'AI 분석 중 오류가 발생했습니다.' });
  }
});

// 갈등 요약 생성
router.post('/summarize', async (req, res) => {
  try {
    const { title, description, stakeholders, timeline } = req.body;
    
    // FastAPI 서비스 호출 (Stub)
    const summary = await generateSummary({
      title,
      description,
      stakeholders,
      timeline
    });
    
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: '요약 생성 중 오류가 발생했습니다.' });
  }
});

// 감정 분석
router.post('/sentiment', async (req, res) => {
  try {
    const { text } = req.body;
    
    // FastAPI 서비스 호출 (Stub)
    const sentiment = await analyzeSentiment(text);
    
    res.json({ sentiment });
  } catch (error) {
    res.status(500).json({ error: '감정 분석 중 오류가 발생했습니다.' });
  }
});

// 추천사항 생성
router.post('/recommendations', async (req, res) => {
  try {
    const { conflictData } = req.body;
    
    // FastAPI 서비스 호출 (Stub)
    const recommendations = await generateRecommendations(conflictData);
    
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: '추천사항 생성 중 오류가 발생했습니다.' });
  }
});

// Stub 함수들 (실제로는 FastAPI 서비스 호출)
async function analyzeConflict(text) {
  // 실제 구현에서는 FastAPI 서비스 호출
  return {
    keyIssues: ['환경 보호', '경제 발전', '주민 생활'],
    riskLevel: '높음',
    recommendations: [
      '이해관계자 간 대화 강화',
      '환경 영향 평가 실시',
      '주민 의견 수렴 확대'
    ],
    summary: '이 갈등은 환경 보호와 경제 발전 간의 가치 충돌로 인해 발생한 것으로 보입니다.'
  };
}

async function generateSummary(data) {
  return `${data.title}에 대한 갈등이 ${data.stakeholders.length}개 이해관계자 그룹 간에 발생하고 있으며, 현재 ${data.timeline.length}개의 주요 사건이 기록되어 있습니다.`;
}

async function analyzeSentiment(text) {
  const sentiments = ['긍정', '부정', '중립'];
  return sentiments[Math.floor(Math.random() * sentiments.length)];
}

async function generateRecommendations(conflictData) {
  return [
    '모든 이해관계자 간의 정기적인 소통 채널 구축',
    '투명한 정보 공유 시스템 운영',
    '중재자 역할의 독립 기관 설립 검토',
    '단계적 해결 방안 수립 및 실행'
  ];
}

module.exports = router;

