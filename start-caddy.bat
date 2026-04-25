@echo off
chcp 65001 >nul
echo ==========================================
echo   Profit Premium — Caddy Server
echo ==========================================
echo.

REM Проверяем, запущен ли Next.js
echo [1/3] Проверка Next.js на порту 3000...
netstat -ano | findstr :3000 | findstr LISTENING >nul
if %errorlevel% neq 0 (
    echo [!] Next.js НЕ запущен на порту 3000!
    echo [!] Сначала запусти: npm run start
    echo.
    pause
    exit /b 1
)
echo [OK] Next.js найден на порту 3000

REM Проверяем Caddy
echo [2/3] Проверка Caddy...
where caddy >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Caddy не найден в PATH!
    echo [!] Скачай с https://caddyserver.com/download
    echo    и положи caddy.exe в C:\Windows\System32 или рядом с этим файлом
    echo.
    pause
    exit /b 1
)
echo [OK] Caddy найден

REM Запускаем Caddy
echo [3/3] Запуск Caddy...
echo.
echo ------------------------------------------
echo  Caddy слушает порты 80 и 443 (внутренние)
echo  Проксирует на Next.js localhost:3000
echo ------------------------------------------
echo.
echo Доступ к сайту:
echo   LAN: http://192.168.0.13
echo   (порты 80 и 443 проброшены на роутере)
echo.
echo Нажми Ctrl+C для остановки
echo.

caddy run --config Caddyfile
