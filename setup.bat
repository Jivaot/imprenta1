@REM Script de inicialización para EstampadosDigitalPro en Windows

@echo off
echo.
echo 🎨 EstampadosDigitalPro - Inicializador Rápido (Windows)
echo =========================================================
echo.

REM Verificar si Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js no está instalado. Por favor instálalo primero.
    exit /b 1
)

echo ✅ Node.js: 
node --version
echo ✅ npm: 
npm --version
echo.

echo 📦 Instalando dependencias del proyecto...
call npm run install:all

echo.
echo ✅ Setup completado!
echo.
echo 🚀 Para iniciar el desarrollo:
echo    npm run dev
echo.
echo 📍 Accesos:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo.
echo 📚 Documentación:
echo    - QUICK_START.md
echo    - INSTALLATION.md
echo    - TECHNICAL.md
echo.
pause
