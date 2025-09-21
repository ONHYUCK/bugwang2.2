@echo off
echo ========================================
echo 인천 해양 갈등 지도 플랫폼 설치 스크립트
echo ========================================
echo.

echo 1. Node.js 설치 확인 중...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js가 설치되지 않았습니다.
    echo.
    echo Node.js를 설치하려면 다음 링크를 방문하세요:
    echo https://nodejs.org
    echo.
    echo LTS 버전을 다운로드하여 설치한 후 이 스크립트를 다시 실행하세요.
    pause
    exit /b 1
)

echo ✅ Node.js가 설치되어 있습니다.
node --version

echo.
echo 2. 프로젝트 의존성 설치 중...
echo.

echo 루트 프로젝트 의존성 설치...
call npm install
if %errorlevel% neq 0 (
    echo ❌ 루트 프로젝트 의존성 설치 실패
    pause
    exit /b 1
)

echo.
echo 백엔드 의존성 설치...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ 백엔드 의존성 설치 실패
    pause
    exit /b 1
)
cd ..

echo.
echo 프론트엔드 의존성 설치...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ 프론트엔드 의존성 설치 실패
    pause
    exit /b 1
)
cd ..

echo.
echo 3. 환경 설정 파일 생성...
if not exist "backend\.env" (
    copy "backend\env.example" "backend\.env"
    echo ✅ .env 파일이 생성되었습니다.
) else (
    echo ✅ .env 파일이 이미 존재합니다.
)

echo.
echo 4. MongoDB 확인...
echo MongoDB가 설치되어 있고 실행 중인지 확인하세요.
echo MongoDB Community Server: https://www.mongodb.com/try/download/community

echo.
echo ========================================
echo ✅ 설치가 완료되었습니다!
echo ========================================
echo.
echo 서버를 실행하려면 다음 명령어를 사용하세요:
echo npm run dev
echo.
echo 또는 개별적으로 실행:
echo - 백엔드: npm run server
echo - 프론트엔드: npm run client
echo.
pause




