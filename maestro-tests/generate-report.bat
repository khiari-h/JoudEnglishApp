@echo off
REM 🧪 Script de génération de rapport Maestro - JoudEnglishApp
REM Usage: generate-report.bat [TEST_FILE] [FORMAT]

setlocal

REM Configuration
set "SCRIPT_DIR=%~dp0"
set "REPORTS_DIR=%SCRIPT_DIR%test-reports"
set "DEFAULT_FORMAT=html"
set "DEFAULT_OUTPUT=maestro-test-report"

REM Vérifier les arguments
set "TEST_FILE=%~1"
set "FORMAT=%~2"

if "%TEST_FILE%"=="" (
    echo ❌ Aucun fichier de test spécifié
    echo Usage: %0 [TEST_FILE] [FORMAT]
    echo.
    echo Exemples:
    echo   %0 01-main-user-journey.yaml
    echo   %0 01-main-user-journey.yaml html
    echo   %0 01-main-user-journey.yaml json
    echo.
    echo Formats disponibles: html, json, junit, csv
    exit /b 1
)

if "%FORMAT%"=="" set "FORMAT=%DEFAULT_FORMAT%"

REM Vérifier que Maestro est installé
maestro --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Maestro n'est pas installé
    echo Installez-le avec: curl -Ls "https://get.maestro.mobile.dev" ^| bash
    exit /b 1
)

REM Vérifier que le fichier de test existe
if not exist "%SCRIPT_DIR%%TEST_FILE%" (
    echo ❌ Fichier de test non trouvé: %TEST_FILE%
    echo Fichiers disponibles:
    dir /b "%SCRIPT_DIR%*.yaml"
    exit /b 1
)

REM Construire le nom du fichier de sortie
set "OUTPUT_FILE=%REPORTS_DIR%\%DEFAULT_OUTPUT%.%FORMAT%"

echo 🧪 Génération de rapport Maestro
echo =================================
echo Fichier de test: %TEST_FILE%
echo Format: %FORMAT%
echo Fichier de sortie: %OUTPUT_FILE%
echo.

REM Lancer le test avec génération de rapport
echo 🚀 Lancement du test...
maestro test "%SCRIPT_DIR%%TEST_FILE%" --format %FORMAT% --output "%OUTPUT_FILE%"

if %errorlevel% equ 0 (
    echo.
    echo ✅ Test terminé avec succès !
    echo 📊 Rapport généré: %OUTPUT_FILE%
    echo.
    
    REM Ouvrir le rapport si c'est du HTML
    if "%FORMAT%"=="html" (
        echo 🌐 Ouverture du rapport dans le navigateur...
        start "" "%OUTPUT_FILE%"
    )
) else (
    echo.
    echo ❌ Test échoué
    echo 📊 Rapport partiel généré: %OUTPUT_FILE%
)

echo.
echo 📁 Dossier des rapports: %REPORTS_DIR%
dir /b "%REPORTS_DIR%"

endlocal
