@echo off
rem ================================================
rem  czytaj-wiadomosci.cmd
rem  Pokazuje wiadomosci z formularza (Firestore).
rem ================================================
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 goto :braknode

node czytaj-wiadomosci.js %*

echo.
echo ------------------------------------------------
echo Nacisnij dowolny klawisz, aby zamknac okno...
pause >nul
exit /b 0

:braknode
echo.
echo Nie znaleziono Node.js w systemie.
echo Zainstaluj je ze strony https://nodejs.org (wersja LTS)
echo i uruchom ten program ponownie.
echo.
echo Nacisnij dowolny klawisz, aby zamknac okno...
pause >nul
exit /b 1
