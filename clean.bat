@echo off
echo ==============================
echo Limpando projeto Vite...
echo ==============================

REM Apagar node_modules
rd /s /q node_modules

REM Apagar lockfiles (npm e yarn)
del /f /q package-lock.json
del /f /q yarn.lock
del /f /q pnpm-lock.yaml

REM Apagar pasta dist (build)
rd /s /q dist

echo ==============================
echo Reinstalando dependências...
echo ==============================

REM Instalar dependências novamente
npm install

echo ========================================
echo Iniciando servidor de desenvolvimento...
echo ========================================

REM Rodar projeto
npm run dev

pause