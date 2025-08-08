# Script PowerShell pour lancer les tests E2E Maestro
# JoudEnglishApp - Tests complets Windows

Write-Host "🚀 Lancement des tests E2E Maestro pour JoudEnglishApp" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# Vérifier que Maestro est installé
try {
    maestro --version | Out-Null
    Write-Host "✅ Maestro détecté" -ForegroundColor Green
} catch {
    Write-Host "❌ Maestro n'est pas installé" -ForegroundColor Red
    Write-Host "📥 Installation : https://maestro.mobile.dev/getting-started/installing-maestro" -ForegroundColor Yellow
    exit 1
}

# Variables
$APP_ID = "com.hamdanek.JoudEnglishApp"
$TEST_DIR = "maestro-tests"
$RESULTS_DIR = "test-results"

# Créer le dossier de résultats
New-Item -ItemType Directory -Force -Path $RESULTS_DIR | Out-Null

Write-Host ""
Write-Host "🧪 Lancement de la suite de tests E2E" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Fonction pour exécuter un test
function Run-Test {
    param($TestFile, $TestName, $OutputFile)
    
    Write-Host "$TestName..." -ForegroundColor Yellow
    
    try {
        maestro test "$TEST_DIR/$TestFile" --format junit --output "$RESULTS_DIR/$OutputFile"
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ $TestName : PASSÉ" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ $TestName : ÉCHOUÉ" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "❌ $TestName : ERREUR - $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Exécuter tous les tests
$results = @()

$results += Run-Test "01-main-user-journey.yaml" "1️⃣ Parcours utilisateur principal" "01-main-journey.xml"
$results += Run-Test "02-all-exercises.yaml" "2️⃣ Tous les exercices" "02-all-exercises.xml"
$results += Run-Test "03-levels-progression.yaml" "3️⃣ Niveaux et progression" "03-levels.xml"
$results += Run-Test "04-progress-tracking.yaml" "4️⃣ Suivi d'avancement" "04-progress.xml"
$results += Run-Test "05-advanced-features.yaml" "5️⃣ Fonctionnalités avancées" "05-advanced.xml"
$results += Run-Test "06-performance-stability.yaml" "6️⃣ Performance et stabilité" "06-performance.xml"

# Résumé
Write-Host ""
Write-Host "🎉 Tests E2E terminés !" -ForegroundColor Green
Write-Host "======================" -ForegroundColor Green

$passed = ($results | Where-Object { $_ -eq $true }).Count
$total = $results.Count

Write-Host "📊 Résultats : $passed/$total tests passés" -ForegroundColor Cyan
Write-Host "📁 Résultats disponibles dans : $RESULTS_DIR/" -ForegroundColor Cyan
Write-Host "📱 Application testée : $APP_ID" -ForegroundColor Cyan

Write-Host ""
Write-Host "📈 Couverture des tests :" -ForegroundColor Yellow
Write-Host "  ✅ 7 niveaux (1-6 + Bonus)" -ForegroundColor White
Write-Host "  ✅ 10 types d'exercices" -ForegroundColor White
Write-Host "  ✅ Parcours utilisateur complets" -ForegroundColor White
Write-Host "  ✅ Suivi de progression" -ForegroundColor White
Write-Host "  ✅ Persistance des données" -ForegroundColor White
Write-Host "  ✅ Performance et stabilité" -ForegroundColor White

if ($passed -eq $total) {
    Write-Host ""
    Write-Host "🎯 Tous les tests sont passés ! Application pr��te pour production." -ForegroundColor Green
    exit 0
} else {
    Write-Host ""
    Write-Host "⚠️ Certains tests ont échoué. Vérifiez les résultats." -ForegroundColor Yellow
    exit 1
}