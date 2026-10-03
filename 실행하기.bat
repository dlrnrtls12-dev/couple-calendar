@echo off
chcp 65001 > nul
title 우리사이 - 부부 일정 & 기념일 공유 프로그램
echo ========================================================
echo   우리사이 (Dear Us) - 부부 일정 & 기념일 공유 프로그램
echo ========================================================
echo.
echo 프로그램을 실행하는 중입니다...
echo 잠시 후 기본 웹 브라우저에서 자동으로 열립니다.
echo.

cd /d "%~dp0"

:: Start browser after 2 seconds
start "" cmd /c "timeout /t 2 /nobreak > nul && start http://localhost:5173"

:: Run server & web app
npm run dev
