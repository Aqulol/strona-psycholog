@echo off
rem Uruchamia program czytaj-wiadomosci.js (wymaga zainstalowanego Node.js)
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
    echo.
    echo Nie znaleziono Node.js. Zainstaluj je ze strony https://nodejs.org
    echo (wersja LTS), a potem uruchom ten program ponownie.
    echo.
    pause
    exit /b 1
)

node czytaj-wiadomosci.js %*

echo.
pause
