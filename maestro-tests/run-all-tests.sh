#!/bin/bash

# Script de lancement des tests E2E Maestro
# JoudEnglishApp - Tests complets

echo "🚀 Lancement des tests E2E Maestro pour JoudEnglishApp"
echo "=================================================="

# Vérifier que Maestro est installé
if ! command -v maestro &> /dev/null; then
    echo "❌ Maestro n'est pas installé"
    echo "📥 Installation : https://maestro.mobile.dev/getting-started/installing-maestro"
    exit 1
fi

# Vérifier qu'un device est connecté
echo "📱 Vérification des devices..."
adb devices

# Variables
APP_ID="com.hamdanek.JoudEnglishApp"
TEST_DIR="maestro-tests"
RESULTS_DIR="test-results"

# Créer le dossier de résultats
mkdir -p $RESULTS_DIR

echo ""
echo "🧪 Lancement de la suite de tests E2E"
echo "======================================"

# Test 1 : Parcours principal
echo "1️⃣ Test du parcours utilisateur principal..."
maestro test $TEST_DIR/01-main-user-journey.yaml --format junit --output $RESULTS_DIR/01-main-journey.xml
if [ $? -eq 0 ]; then
    echo "✅ Parcours principal : PASSÉ"
else
    echo "❌ Parcours principal : ÉCHOUÉ"
fi

# Test 2 : Tous les exercices
echo ""
echo "2️⃣ Test de tous les exercices..."
maestro test $TEST_DIR/02-all-exercises.yaml --format junit --output $RESULTS_DIR/02-all-exercises.xml
if [ $? -eq 0 ]; then
    echo "✅ Tous les exercices : PASSÉ"
else
    echo "❌ Tous les exercices : ÉCHOUÉ"
fi

# Test 3 : Niveaux et progression
echo ""
echo "3️⃣ Test des niveaux et progression..."
maestro test $TEST_DIR/03-levels-progression.yaml --format junit --output $RESULTS_DIR/03-levels.xml
if [ $? -eq 0 ]; then
    echo "✅ Niveaux et progression : PASSÉ"
else
    echo "❌ Niveaux et progression : ÉCHOUÉ"
fi

# Test 4 : Suivi d'avancement
echo ""
echo "4️⃣ Test du suivi d'avancement..."
maestro test $TEST_DIR/04-progress-tracking.yaml --format junit --output $RESULTS_DIR/04-progress.xml
if [ $? -eq 0 ]; then
    echo "✅ Suivi d'avancement : PASSÉ"
else
    echo "❌ Suivi d'avancement : ÉCHOUÉ"
fi

# Test 5 : Fonctionnalités avancées
echo ""
echo "5️⃣ Test des fonctionnalités avancées..."
maestro test $TEST_DIR/05-advanced-features.yaml --format junit --output $RESULTS_DIR/05-advanced.xml
if [ $? -eq 0 ]; then
    echo "✅ Fonctionnalités avancées : PASSÉ"
else
    echo "❌ Fonctionnalités avancées : ÉCHOUÉ"
fi

# Test 6 : Performance et stabilité
echo ""
echo "6️⃣ Test de performance et stabilité..."
maestro test $TEST_DIR/06-performance-stability.yaml --format junit --output $RESULTS_DIR/06-performance.xml
if [ $? -eq 0 ]; then
    echo "✅ Performance et stabilité : PASSÉ"
else
    echo "❌ Performance et stabilité : ÉCHOUÉ"
fi

echo ""
echo "🎉 Tests E2E terminés !"
echo "======================"
echo "📊 Résultats disponibles dans : $RESULTS_DIR/"
echo "📱 Application testée : $APP_ID"
echo ""
echo "📈 Couverture des tests :"
echo "  ✅ 7 niveaux (1-6 + Bonus)"
echo "  ✅ 10 types d'exercices"
echo "  ✅ Parcours utilisateur complets"
echo "  ✅ Suivi de progression"
echo "  ✅ Persistance des données"
echo "  ✅ Performance et stabilité"