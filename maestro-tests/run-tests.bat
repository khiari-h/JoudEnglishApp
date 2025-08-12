@echo off
REM 🧪 Script de lancement des tests Maestro - JoudEnglishApp (Windows)
REM Usage: run-tests.bat [OPTIONS] [TEST_TYPE]

setlocal enabledelayedexpansion

REM Configuration
set "SCRIPT_DIR=%~dp0"
set "TESTS_DIR=%SCRIPT_DIR%"
set "DEFAULT_TIMEOUT=30000"
set "DEFAULT_RETRY=3"

REM Variables par défaut
set "VERBOSE=false"
set "DEBUG=false"
set "CONTINUOUS=false"
set "RETRY_COUNT=%DEFAULT_TIMEOUT%"
set "TIMEOUT=%DEFAULT_TIMEOUT%"
set "FORMAT="
set "OUTPUT_FILE="
set "TEST_TYPE="

REM Fonctions utilitaires
:print_header
echo 🧪 Tests E2E Maestro - JoudEnglishApp
echo ==================================================
goto :eof

:print_usage
echo Usage: %0 [OPTIONS] [TEST_TYPE]
echo.
echo OPTIONS:
echo   -h, --help           Afficher cette aide
echo   -v, --verbose        Mode verbose
echo   -d, --debug          Mode debug
echo   -c, --continuous     Mode continu (watch)
echo   -r, --retry N        Nombre de tentatives (défaut: %DEFAULT_RETRY%)
echo   -t, --timeout N      Timeout en ms (défaut: %DEFAULT_TIMEOUT%)
echo   -f, --format FORMAT  Format de sortie (junit, html, json)
echo   -o, --output FILE    Fichier de sortie
echo.
echo TEST_TYPE:
echo   main                 Test principal (01-main-user-journey.yaml)
echo   exercises            Couverture des exercices (02-exercises-coverage.yaml)
echo   revisions            Logique des révisions (03-revision-settings-logic.yaml)
echo   all                  Tous les tests
echo   navigation           Test de navigation uniquement
echo   settings             Test des paramètres uniquement
echo.
echo EXEMPLES:
echo   %0 main                    # Test principal
echo   %0 exercises               # Test des exercices
echo   %0 revisions               # Test des révisions
echo   %0 all                     # Tous les tests
echo   %0 all --verbose           # Tous les tests en mode verbose
goto :eof

:check_maestro
maestro --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Maestro n'est pas installé
    echo Installez-le avec: curl -Ls "https://get.maestro.mobile.dev" ^| bash
    exit /b 1
)
echo ✅ Maestro installé
goto :eof

:check_device
echo 📱 Vérification des devices...
adb devices >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=1" %%i in ('adb devices ^| findstr /v "List of devices" ^| findstr /v "^$"') do (
        set /a DEVICES+=1
    )
    if !DEVICES! equ 0 (
        echo ⚠️  Aucun device Android connecté
        echo Lancez un émulateur ou connectez un device
    ) else (
        echo ✅ !DEVICES! device(s) Android connecté(s)
    )
)
goto :eof

:run_test
set "test_file=%~1"
set "test_name=%~2"
set "extra_args=%~3"

echo 🚀 Lancement: %test_name%
echo Fichier: %test_file%

if not exist "%test_file%" (
    echo ❌ Fichier de test non trouvé: %test_file%
    exit /b 1
)

REM Construction de la commande
set "cmd=maestro test"

REM Ajout des options
if "%VERBOSE%"=="true" set "cmd=%cmd% --verbose"
if "%DEBUG%"=="true" set "cmd=%cmd% --debug"
if "%CONTINUOUS%"=="true" set "cmd=%cmd% --continuous"
if defined RETRY_COUNT set "cmd=%cmd% --retry %RETRY_COUNT%"
if defined TIMEOUT set "cmd=%cmd% --timeout %TIMEOUT%"
if defined FORMAT set "cmd=%cmd% --format %FORMAT%"
if defined OUTPUT_FILE set "cmd=%cmd% --output %OUTPUT_FILE%"

REM Ajout du fichier de test et des arguments supplémentaires
set "cmd=%cmd% %test_file% %extra_args%"

echo Commande: %cmd%
echo.

REM Exécution du test
%cmd%
if %errorlevel% equ 0 (
    echo ✅ Test réussi: %test_name%
    exit /b 0
) else (
    echo ❌ Test échoué: %test_name%
    exit /b 1
)

REM Parsing des arguments
:parse_args
if "%~1"=="" goto :end_parse
if "%~1"=="-h" goto :help
if "%~1"=="--help" goto :help
if "%~1"=="-v" goto :set_verbose
if "%~1"=="--verbose" goto :set_verbose
if "%~1"=="-d" goto :set_debug
if "%~1"=="--debug" goto :set_debug
if "%~1"=="-c" goto :set_continuous
if "%~1"=="--continuous" goto :set_continuous
if "%~1"=="-r" goto :set_retry
if "%~1"=="--retry" goto :set_retry
if "%~1"=="-t" goto :set_timeout
if "%~1"=="--timeout" goto :set_timeout
if "%~1"=="-f" goto :set_format
if "%~1"=="--format" goto :set_format
if "%~1"=="-o" goto :set_output
if "%~1"=="--output" goto :set_output
if "%~1"=="main" goto :set_main
if "%~1"=="exercises" goto :set_exercises
if "%~1"=="revisions" goto :set_revisions
if "%~1"=="all" goto :set_all
if "%~1"=="navigation" goto :set_navigation
if "%~1"=="settings" goto :set_settings
echo ❌ Argument inconnu: %~1
goto :help

:help
call :print_usage
exit /b 0

:set_verbose
set "VERBOSE=true"
shift
goto :parse_args

:set_debug
set "DEBUG=true"
shift
goto :parse_args

:set_continuous
set "CONTINUOUS=true"
shift
goto :parse_args

:set_retry
set "RETRY_COUNT=%~2"
shift
shift
goto :parse_args

:set_timeout
set "TIMEOUT=%~2"
shift
shift
goto :parse_args

:set_format
set "FORMAT=%~2"
shift
shift
goto :parse_args

:set_output
set "OUTPUT_FILE=%~2"
shift
shift
goto :parse_args

:set_main
set "TEST_TYPE=main"
shift
goto :parse_args

:set_exercises
set "TEST_TYPE=exercises"
shift
goto :parse_args

:set_revisions
set "TEST_TYPE=revisions"
shift
goto :parse_args

:set_all
set "TEST_TYPE=all"
shift
goto :parse_args

:set_navigation
set "TEST_TYPE=navigation"
shift
goto :parse_args

:set_settings
set "TEST_TYPE=settings"
shift
goto :parse_args

:end_parse

REM Vérifications préliminaires
call :print_header
call :check_maestro
call :check_device

echo.
echo ⚙️  Configuration:
echo   Timeout: %TIMEOUT%ms
echo   Tentatives: %RETRY_COUNT%
echo   Verbose: %VERBOSE%
echo   Debug: %DEBUG%
echo   Continu: %CONTINUOUS%
echo.

REM Configuration des variables d'environnement
set "TIMEOUT=%TIMEOUT%"
set "RETRY_COUNT=%RETRY_COUNT%"

REM Exécution des tests selon le type
if "%TEST_TYPE%"=="main" (
    call :run_test "%TESTS_DIR%01-main-user-journey.yaml" "Parcours utilisateur principal"
) else if "%TEST_TYPE%"=="exercises" (
    call :run_test "%TESTS_DIR%02-exercises-coverage.yaml" "Couverture des exercices"
) else if "%TEST_TYPE%"=="revisions" (
    call :run_test "%TESTS_DIR%03-revision-settings-logic.yaml" "Logique des révisions"
) else if "%TEST_TYPE%"=="all" (
    echo 🎯 Lancement de tous les tests
    echo.
    call :run_test "%TESTS_DIR%01-main-user-journey.yaml" "Parcours utilisateur principal"
    call :run_test "%TESTS_DIR%02-exercises-coverage.yaml" "Couverture des exercices"
    call :run_test "%TESTS_DIR%03-revision-settings-logic.yaml" "Logique des révisions"
) else if "%TEST_TYPE%"=="navigation" (
    call :run_test "%TESTS_DIR%01-main-user-journey.yaml" "Test de navigation" "--env TEST_TYPE=navigation"
) else if "%TEST_TYPE%"=="settings" (
    call :run_test "%TESTS_DIR%01-main-user-journey.yaml" "Test des paramètres" "--env TEST_TYPE=settings"
) else (
    echo ⚠️  Aucun type de test spécifié
    echo Utilisez --help pour voir les options disponibles
    echo.
    echo Tests disponibles:
    echo   main        - Parcours utilisateur principal
    echo   exercises   - Couverture des exercices
    echo   revisions   - Logique des révisions
    echo   all         - Tous les tests
    echo   navigation  - Test de navigation uniquement
    echo   settings    - Test des paramètres uniquement
)

echo.
echo 🎉 Tests terminés !

REM Affichage des résultats si format spécifié
if defined FORMAT (
    if defined OUTPUT_FILE (
        echo 📊 Rapport généré: %OUTPUT_FILE%
    )
)

endlocal
