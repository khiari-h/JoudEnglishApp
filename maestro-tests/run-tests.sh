#!/bin/bash

# 🧪 Script de lancement des tests Maestro - JoudEnglishApp
# Usage: ./run-tests.sh [OPTIONS]

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TESTS_DIR="$SCRIPT_DIR"
DEFAULT_TIMEOUT=30000
DEFAULT_RETRY=3

# Fonctions utilitaires
print_header() {
    echo -e "${BLUE}🧪 Tests E2E Maestro - JoudEnglishApp${NC}"
    echo "=================================================="
}

print_usage() {
    echo "Usage: $0 [OPTIONS] [TEST_TYPE]"
    echo ""
    echo "OPTIONS:"
    echo "  -h, --help           Afficher cette aide"
    echo "  -v, --verbose        Mode verbose"
    echo "  -d, --debug          Mode debug"
    echo "  -c, --continuous     Mode continu (watch)"
    echo "  -r, --retry N        Nombre de tentatives (défaut: $DEFAULT_RETRY)"
    echo "  -t, --timeout N      Timeout en ms (défaut: $DEFAULT_TIMEOUT)"
    echo "  -f, --format FORMAT  Format de sortie (junit, html, json)"
    echo "  -o, --output FILE    Fichier de sortie"
    echo ""
    echo "TEST_TYPE:"
    echo "  main                 Test principal (01-main-user-journey.yaml)"
    echo "  exercises            Couverture des exercices (02-exercises-coverage.yaml)"
    echo "  revisions            Logique des révisions (03-revision-settings-logic.yaml)"
    echo "  all                  Tous les tests"
    echo "  navigation           Test de navigation uniquement"
    echo "  settings             Test des paramètres uniquement"
    echo ""
    echo "EXEMPLES:"
    echo "  $0 main                    # Test principal"
    echo "  $0 exercises --env EXERCISE=vocabulary  # Test vocabulaire uniquement"
    echo "  $0 revisions --env TEST=popup-trigger   # Test déclenchement popup"
    echo "  $0 all --verbose           # Tous les tests en mode verbose"
}

check_maestro() {
    if ! command -v maestro &> /dev/null; then
        echo -e "${RED}❌ Maestro n'est pas installé${NC}"
        echo "Installez-le avec: curl -Ls 'https://get.maestro.mobile.dev' | bash"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Maestro installé: $(maestro --version)${NC}"
}

check_device() {
    echo -e "${YELLOW}📱 Vérification des devices...${NC}"
    
    if command -v adb &> /dev/null; then
        DEVICES=$(adb devices | grep -v "List of devices" | grep -v "^$" | wc -l)
        if [ "$DEVICES" -eq 0 ]; then
            echo -e "${YELLOW}⚠️  Aucun device Android connecté${NC}"
            echo "Lancez un émulateur ou connectez un device"
        else
            echo -e "${GREEN}✅ $DEVICES device(s) Android connecté(s)${NC}"
        fi
    fi
    
    if command -v xcrun &> /dev/null; then
        SIMULATORS=$(xcrun simctl list devices | grep "Booted" | wc -l)
        if [ "$SIMULATORS" -eq 0 ]; then
            echo -e "${YELLOW}⚠️  Aucun simulateur iOS actif${NC}"
        else
            echo -e "${GREEN}✅ $SIMULATORS simulateur(s) iOS actif(s)${NC}"
        fi
    fi
}

run_test() {
    local test_file="$1"
    local test_name="$2"
    local extra_args="$3"
    
    echo -e "${BLUE}🚀 Lancement: $test_name${NC}"
    echo "Fichier: $test_file"
    
    if [ ! -f "$test_file" ]; then
        echo -e "${RED}❌ Fichier de test non trouvé: $test_file${NC}"
        return 1
    fi
    
    # Construction de la commande
    local cmd="maestro test"
    
    # Ajout des options
    if [ "$VERBOSE" = true ]; then
        cmd="$cmd --verbose"
    fi
    
    if [ "$DEBUG" = true ]; then
        cmd="$cmd --debug"
    fi
    
    if [ "$CONTINUOUS" = true ]; then
        cmd="$cmd --continuous"
    fi
    
    if [ -n "$RETRY_COUNT" ]; then
        cmd="$cmd --retry $RETRY_COUNT"
    fi
    
    if [ -n "$TIMEOUT" ]; then
        cmd="$cmd --timeout $TIMEOUT"
    fi
    
    if [ -n "$FORMAT" ]; then
        cmd="$cmd --format $FORMAT"
    fi
    
    if [ -n "$OUTPUT_FILE" ]; then
        cmd="$cmd --output $OUTPUT_FILE"
    fi
    
    # Ajout du fichier de test et des arguments supplémentaires
    cmd="$cmd $test_file $extra_args"
    
    echo "Commande: $cmd"
    echo ""
    
    # Exécution du test
    if eval "$cmd"; then
        echo -e "${GREEN}✅ Test réussi: $test_name${NC}"
        return 0
    else
        echo -e "${RED}❌ Test échoué: $test_name${NC}"
        return 1
    fi
}

# Variables par défaut
VERBOSE=false
DEBUG=false
CONTINUOUS=false
RETRY_COUNT="$DEFAULT_RETRY"
TIMEOUT="$DEFAULT_TIMEOUT"
FORMAT=""
OUTPUT_FILE=""
TEST_TYPE=""

# Parsing des arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            print_usage
            exit 0
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -d|--debug)
            DEBUG=true
            shift
            ;;
        -c|--continuous)
            CONTINUOUS=true
            shift
            ;;
        -r|--retry)
            RETRY_COUNT="$2"
            shift 2
            ;;
        -t|--timeout)
            TIMEOUT="$2"
            shift 2
            ;;
        -f|--format)
            FORMAT="$2"
            shift 2
            ;;
        -o|--output)
            OUTPUT_FILE="$2"
            shift 2
            ;;
        main|exercises|revisions|all|navigation|settings)
            TEST_TYPE="$1"
            shift
            ;;
        *)
            echo -e "${RED}❌ Argument inconnu: $1${NC}"
            print_usage
            exit 1
            ;;
    esac
done

# Vérifications préliminaires
print_header
check_maestro
check_device

# Configuration des variables d'environnement
export TIMEOUT="$TIMEOUT"
export RETRY_COUNT="$RETRY_COUNT"

echo ""
echo -e "${BLUE}⚙️  Configuration:${NC}"
echo "  Timeout: ${TIMEOUT}ms"
echo "  Tentatives: ${RETRY_COUNT}"
echo "  Verbose: $VERBOSE"
echo "  Debug: $DEBUG"
echo "  Continu: $CONTINUOUS"
echo ""

# Exécution des tests selon le type
case "$TEST_TYPE" in
    main)
        run_test "$TESTS_DIR/01-main-user-journey.yaml" "Parcours utilisateur principal"
        ;;
    exercises)
        run_test "$TESTS_DIR/02-exercises-coverage.yaml" "Couverture des exercices"
        ;;
    revisions)
        run_test "$TESTS_DIR/03-revision-settings-logic.yaml" "Logique des révisions"
        ;;
    all)
        echo -e "${BLUE}🎯 Lancement de tous les tests${NC}"
        echo ""
        
        run_test "$TESTS_DIR/01-main-user-journey.yaml" "Parcours utilisateur principal"
        run_test "$TESTS_DIR/02-exercises-coverage.yaml" "Couverture des exercices"
        run_test "$TESTS_DIR/03-revision-settings-logic.yaml" "Logique des révisions"
        ;;
    navigation)
        run_test "$TESTS_DIR/01-main-user-journey.yaml" "Test de navigation" "--env TEST_TYPE=navigation"
        ;;
    settings)
        run_test "$TESTS_DIR/01-main-user-journey.yaml" "Test des paramètres" "--env TEST_TYPE=settings"
        ;;
    "")
        echo -e "${YELLOW}⚠️  Aucun type de test spécifié${NC}"
        echo "Utilisez --help pour voir les options disponibles"
        echo ""
        echo "Tests disponibles:"
        echo "  main        - Parcours utilisateur principal"
        echo "  exercises   - Couverture des exercices"
        echo "  revisions   - Logique des révisions"
        echo "  all         - Tous les tests"
        echo "  navigation  - Test de navigation uniquement"
        echo "  settings    - Test des paramètres uniquement"
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Tests terminés !${NC}"

# Affichage des résultats si format spécifié
if [ -n "$FORMAT" ] && [ -n "$OUTPUT_FILE" ]; then
    echo -e "${BLUE}📊 Rapport généré: $OUTPUT_FILE${NC}"
fi
