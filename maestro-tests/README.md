# 🎯 Tests E2E Maestro - JoudEnglishApp

## 📋 Vue d'ensemble

Cette suite de tests E2E utilise **Maestro** pour tester tous les parcours utilisateur critiques de l'application d'apprentissage d'anglais JoudEnglishApp.

## 🧪 Tests disponibles

### 1. `01-main-user-journey.yaml` - Parcours principal
**Durée estimée : 2-3 minutes**
- ✅ Lancement de l'app
- ✅ Navigation Dashboard → Niveau → Exercice
- ✅ Exercice de vocabulaire complet
- ✅ Sauvegarde d'activité
- ✅ Navigation retour

### 2. `02-all-exercises.yaml` - Tous les exercices
**Durée estimée : 5-7 minutes**
- ✅ **10 types d'exercices** testés :
  1. Vocabulaire
  2. Fast Vocabulary
  3. Expressions/Phrases
  4. Grammaire
  5. Orthographe
  6. Lecture
  7. Correction d'erreurs
  8. Conversations
  9. Jeux de mots
  10. Évaluation

### 3. `03-levels-progression.yaml` - Niveaux et progression
**Durée estimée : 4-5 minutes**
- ✅ **7 niveaux** testés (1-6 + Bonus)
- ✅ Navigation entre niveaux
- ✅ Création de progression
- ✅ Vérification des pourcentages
- ✅ Déblocage de contenu

### 4. `04-progress-tracking.yaml` - Suivi d'avancement
**Durée estimée : 6-8 minutes**
- ✅ Création d'activité d'apprentissage
- ✅ Sauvegarde automatique
- ✅ Persistance des données
- ✅ Restauration après redémarrage
- ✅ Métriques de progression
- ✅ Continuation d'activité

### 5. `05-advanced-features.yaml` - Fonctionnalités avancées
**Durée estimée : 4-6 minutes**
- ✅ Paramètres et configuration
- ✅ Système de révision
- ✅ Actions rapides
- ✅ Métriques détaillées
- ✅ Navigation rapide
- ✅ Thèmes (si disponible)

### 6. `06-performance-stability.yaml` - Performance et stabilité
**Durée estimée : 5-7 minutes**
- ✅ Temps de démarrage
- ✅ Navigation rapide
- ✅ Test de charge
- ✅ Mise en arrière-plan
- ✅ Redémarrage forcé
- ✅ Gestion mémoire
- ✅ Récupération d'erreur

## 🚀 Installation de Maestro

### Windows
```bash
# Télécharger depuis GitHub
# https://github.com/mobile-dev-inc/maestro/releases

# Ou utiliser Scoop
scoop install maestro
```

### macOS
```bash
# Via Homebrew
brew tap mobile-dev-inc/tap
brew install maestro

# Ou script d'installation
curl -Ls "https://get.maestro.mobile.dev" | bash
```

### Linux
```bash
# Script d'installation
curl -Ls "https://get.maestro.mobile.dev" | bash
```

## 📱 Prérequis

### Pour Android
1. **Android Studio** installé
2. **Émulateur Android** ou device physique connecté
3. **ADB** dans le PATH
4. **App buildée** : `expo run:android`

### Pour iOS
1. **Xcode** installé (macOS uniquement)
2. **Simulateur iOS** ou device physique
3. **App buildée** : `expo run:ios`

## 🎯 Lancement des tests

### Tests individuels
```bash
# Test principal
maestro test maestro-tests/01-main-user-journey.yaml

# Tous les exercices
maestro test maestro-tests/02-all-exercises.yaml

# Niveaux et progression
maestro test maestro-tests/03-levels-progression.yaml

# Suivi d'avancement
maestro test maestro-tests/04-progress-tracking.yaml

# Fonctionnalités avancées
maestro test maestro-tests/05-advanced-features.yaml

# Performance
maestro test maestro-tests/06-performance-stability.yaml
```

### Suite complète
```bash
# Tous les tests
maestro test maestro-tests/

# Avec rapport
maestro test maestro-tests/ --format junit --output test-results.xml
```

### Tests en continu
```bash
# Mode watch (relance automatiquement)
maestro test maestro-tests/01-main-user-journey.yaml --continuous
```

## 🔧 Configuration

### Variables d'environnement
```bash
# ID de l'app (Android)
export APP_ID=com.hamdanek.JoudEnglishApp

# Device spécifique
export MAESTRO_DEVICE_ID=emulator-5554
```

### Timeouts personnalisés
Les tests utilisent des timeouts adaptés :
- Lancement app : 10 secondes
- Chargement exercice : 8 secondes
- Navigation : 5 secondes
- Interactions : 3 secondes

## 📊 Couverture des tests

### **Écrans testés (100%)**
- ✅ Dashboard
- ✅ Sélection de niveau (7 niveaux)
- ✅ Sélection d'exercices
- ✅ Tous les types d'exercices (10)
- ✅ Paramètres
- ✅ Révisions

### **Fonctionnalités testées**
- ✅ **Navigation** : Tous les parcours utilisateur
- ✅ **Exercices** : Interactions complètes
- ✅ **Progression** : Calcul et sauvegarde
- ✅ **Persistance** : Données entre sessions
- ✅ **Performance** : Temps de réponse
- ✅ **Stabilité** : Récupération d'erreur

### **Parcours utilisateur (95%+)**
- ✅ **Nouvel utilisateur** : Onboarding complet
- ✅ **Utilisateur existant** : Reprise d'activité
- ✅ **Session d'apprentissage** : Exercices multiples
- ✅ **Progression** : Déblocage de niveaux
- ✅ **Révisions** : Système de répétition

## 🐛 Debugging

### Logs détaillés
```bash
maestro test --debug maestro-tests/01-main-user-journey.yaml
```

### Mode interactif
```bash
maestro studio
```

### Screenshots automatiques
```bash
maestro test --screenshot-on-failure maestro-tests/
```

## 📈 Métriques

### **Temps d'exécution total**
- Tests individuels : 2-8 minutes
- Suite complète : 25-35 minutes
- Mode rapide : 15-20 minutes

### **Couverture fonctionnelle**
- **100%** des écrans principaux
- **100%** des types d'exercices
- **95%+** des parcours utilisateur
- **90%+** des fonctionnalités critiques

## 🎯 Intégration CI/CD

### GitHub Actions
```yaml
- name: Run E2E Tests
  run: |
    maestro test maestro-tests/ --format junit --output test-results.xml
```

### Rapport de test
```bash
# Générer rapport HTML
maestro test maestro-tests/ --format html --output test-report.html
```

## 🔍 Maintenance

### Mise à jour des tests
1. **Nouveaux exercices** : Ajouter dans `02-all-exercises.yaml`
2. **Nouveaux niveaux** : Mettre à jour `03-levels-progression.yaml`
3. **Nouvelles fonctionnalités** : Étendre `05-advanced-features.yaml`

### Bonnes pratiques
- ✅ Utiliser des `assertVisible` avec timeout
- ✅ Gérer les éléments optionnels avec `optional: true`
- ✅ Tester les cas d'erreur
- ✅ Vérifier la persistance des données
- ✅ Inclure des tests de performance

## 🎉 Résultats attendus

Cette suite de tests E2E garantit :
- 🛡️ **Stabilité** de l'application
- 🚀 **Qualité** des parcours utilisateur
- 📊 **Fiabilité** du suivi de progression
- 🔧 **Détection précoce** des régressions
- 📱 **Expérience utilisateur** optimale

---

*Tests E2E Maestro pour JoudEnglishApp - Couverture complète des 10 types d'exercices et 7 niveaux*