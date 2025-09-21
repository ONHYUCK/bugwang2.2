# 인천 해양 갈등 지도 플랫폼

인천 해역의 다양한 갈등 상황을 지도 기반으로 시각화하고 분석하는 웹 플랫폼입니다.

## 주요 기능

- **지도 기반 갈등 시각화**: 인천 해역 지도에 갈등 지역을 유형별 색상으로 표시
- **갈등 유형 분류**: 환경(빨강), 경제(주황), 주거(초록), 문화(남색), 교통(하늘색)
- **상세 정보 제공**: 갈등 원인, 이해관계자, 진행 상황, 관련 문서
- **대시보드**: 갈등 데이터 통계 및 시각화
- **시민 참여**: 의견 남기기 기능
- **AI 분석**: 갈등 분석 및 인사이트 제공

## 기술 스택

### Frontend
- React 18 + TypeScript
- TailwindCSS
- shadcn/ui
- Leaflet.js (지도)
- Recharts (차트)

### Backend
- Node.js + Express
- MongoDB
- FastAPI (AI 분석)

## 설치 및 실행

1. 의존성 설치:
```bash
npm run install-all
```

2. 개발 서버 실행:
```bash
npm run dev
```

3. 브라우저에서 접속:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 프로젝트 구조

```
├── frontend/          # React 프론트엔드
├── backend/           # Node.js 백엔드
├── ai-service/        # FastAPI AI 분석 서비스
└── docs/             # 문서
```

## 기본 데이터

- 강화도 갯벌 매립 논란 (검토)
- 영흥도 해상풍력 발전 갈등 (협상)
- 송도 항만 확장 계획 (협상)

