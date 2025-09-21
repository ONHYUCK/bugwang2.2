#!/bin/bash

echo "인천 해양 갈등 지도 플랫폼 설치를 시작합니다..."

echo ""
echo "1. 루트 의존성 설치 중..."
npm install

echo ""
echo "2. 백엔드 의존성 설치 중..."
cd backend
npm install
cd ..

echo ""
echo "3. 프론트엔드 의존성 설치 중..."
cd frontend
npm install
cd ..

echo ""
echo "4. 환경 변수 파일 생성 중..."
if [ ! -f "backend/.env" ]; then
    cp backend/env.example backend/.env
    echo "백엔드 .env 파일이 생성되었습니다."
fi

echo ""
echo "설치가 완료되었습니다!"
echo ""
echo "다음 단계:"
echo "1. MongoDB를 설치하고 실행하세요"
echo "2. backend 폴더에서 'npm run seed'를 실행하여 초기 데이터를 생성하세요"
echo "3. 루트 폴더에서 'npm run dev'를 실행하여 개발 서버를 시작하세요"
echo ""




