@echo off
echo Iniciando servidor JSON para Alura Geek...
echo.
echo Asegurate de tener Node.js instalado en tu sistema
echo.

REM Verificar si existe node_modules
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
    echo.
)

echo Iniciando servidor en http://localhost:3000
echo Presiona Ctrl+C para detener el servidor
echo.

npm start
