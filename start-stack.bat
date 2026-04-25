@echo off
chcp 65001 >nul
echo ==========================================
echo   Profit Premium — Full Stack Startup
echo ==========================================
echo.

REM Проверяем Caddy
echo [CHECK] Проверка Caddy...
where caddy >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Caddy не найден!
    echo     Скачай: https://caddyserver.com/download
    echo     И положи caddy.exe в PATH или в эту папку
    pause
    exit /b 1
)
echo [OK] Caddy найден

REM Проверяем Node.js
echo [CHECK] Проверка Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Node.js не найден!
    pause
    exit /b 1
)
echo [OK] Node.js найден

REM Собираем проект если нужно
echo.
echo [BUILD] Проверка сборки...
if not exist ".next" (
    echo [!] .next не найден — запускаю сборку...
    call npm run build
    if %errorlevel% neq 0 (
        echo [!] Сборка провалена!
        pause
        exit /b 1
    )
) else (
    echo [OK] Сборка найдена
)

echo.
echo ==========================================
echo   Запуск сервисов...
echo ==========================================
echo.

REM Запускаем Next.js в фоне через PowerShell
echo [1/2] Запуск Next.js (localhost:3000)...
start "Next.js" powershell -WindowStyle Minimized -Command "cd '%cd%'; $env:NEXTAUTH_URL='http://localhost:3000'; npm run start; Read-Host 'Нажми Enter для закрытия'"

REM Ждём пока Next.js стартует
echo        Ожидание Next.js...
timeout /t 5 /nobreak >nul

REM Запускаем Caddy
echo [2/2] Запуск Caddy (порты 80, 443)...
echo.
echo ==========================================
echo   СЕРВИСЫ ЗАПУЩЕНЫ
echo ==========================================
echo.
echo  Next.js: http://localhost:3000
echo  Caddy:   http://192.168.0.13
echo           https://192.168.0.13
echo.
echo  (порты 80 и 443 проброшены на роутере)
echo.
echo  Для остановки закрой это окно
echo ==========================================
echo.

caddy run --config Caddyfile
