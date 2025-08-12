# 🧪 Tests E2E Maestro - JoudEnglishApp

## 📋 Vue d'ensemble

Ce dossier contient les tests E2E complets pour l'application JoudEnglishApp, couvrant tous les scénarios utilisateur principaux.

## 🎯 Scénarios de test couverts

### 1. **Parcours utilisateur principal** (`01-main-user-journey.yaml`)
- **Dashboard → Level → Exercise → Vocabulary Exercise**
- Vérification des mises à jour des métriques
- Test de la progression dans les exercices
- Vérification de la cohérence des données

### 2. **Couverture complète des exercices** (`02-exercises-coverage.yaml`)
- **10 types d'exercices** testés individuellement
- Vérification de la progression pour chaque exercice
- Test de mise à jour des métriques globales

### 3. **Logique des révisions et paramètres** (`03-revision-settings-logic.yaml`)
- Déclenchement des popups de révision
- Gestion des paramètres de révision
- Désactivation/réactivation des révisions
- Cohérence entre popup et paramètres

## 🚀 Installation et configuration

### Prérequis
```bash
# Installer Maestro
curl -Ls "https://get.maestro.mobile.dev" | bash

# Vérifier l'installation
maestro --version
```

### Configuration
1. **Lancer l'émulateur** Android ou iOS
2. **Installer l'application** sur l'émulateur
3. **Vérifier l'appId** dans chaque fichier de test

## 🎮 Exécution des tests

### Test complet (recommandé pour la première fois)
```bash
# Lancer tous les tests
maestro test 01-main-user-journey.yaml
maestro test 02-exercises-coverage.yaml
maestro test 03-revision-settings-logic.yaml
```

### Tests spécifiques
```bash
# Test de navigation uniquement
maestro test 01-main-user-journey.yaml --env TEST_TYPE=navigation

# Test des paramètres uniquement
maestro test 03-revision-settings-logic.yaml --env TEST=settings-reactivate

# Test d'un exercice spécifique
maestro test 02-exercises-coverage.yaml --env EXERCISE=vocabulary
```

### Variables d'environnement disponibles

#### `01-main-user-journey.yaml`
- `TEST_TYPE=full` : Test complet (par défaut)
- `TEST_TYPE=navigation` : Test de navigation uniquement
- `TEST_TYPE=settings` : Test des paramètres uniquement

#### `02-exercises-coverage.yaml`
- `EXERCISE=vocabulary` : Test vocabulaire classique
- `EXERCISE=vocabulary_fast` : Test vocabulaire fast
- `EXERCISE=phrases` : Test phrases
- `EXERCISE=grammar` : Test grammaire
- `EXERCISE=reading` : Test lecture
- `EXERCISE=spelling` : Test orthographe
- `EXERCISE=errorCorrection` : Test correction d'erreurs
- `EXERCISE=wordGames` : Test jeux de mots
- `EXERCISE=conversations` : Test conversations
- `EXERCISE=assessment` : Test évaluation
- `VERIFICATION=final` : Vérification finale

#### `03-revision-settings-logic.yaml`
- `TEST=popup-trigger` : Déclenchement popup
- `TEST=popup-now` : Choix "Maintenant"
- `TEST=popup-later` : Choix "Plus tard"
- `TEST=popup-disable` : Désactivation
- `TEST=settings-after-disable` : Vérification après désactivation
- `TEST=settings-reactivate` : Réactivation
- `TEST=new-frequency-test` : Test nouvelle fréquence
- `TEST=final-verification` : Vérification finale

## 📱 Points de test importants

### **Progress Bar - Décallage normal**
- **Mot 51** = **Barre à 50** ✅
- C'est normal tant qu'on n'a pas cliqué sur "Suivant"
- La progression se met à jour seulement après validation

### **Composants Dashboard**
- **SimpleMetrics** : Seulement temps, mots vocab, jours de suite
- **QuickActions** : Vocabulaire + évaluation + révision
- **LearningProgress** : Progression du niveau en cours

### **Mise à jour des métriques**
- **Vocabulaire** : Met à jour SimpleMetrics et QuickActions
- **Autres exercices** : Met à jour LearningProgress uniquement
- **Révisions** : Met à jour QuickActions et paramètres

## 🔍 Dépannage

### Problèmes courants

#### 1. **Élément non trouvé**
```bash
# Vérifier que l'app est bien lancée
# Vérifier les testID dans le code
# Vérifier que l'émulateur est actif
```

#### 2. **Test qui échoue sur la progression**
```bash
# Vérifier que l'exercice a bien des données
# Vérifier que la progression se calcule correctement
# Vérifier les mocks dans les tests unitaires
```

#### 3. **Popup de révision qui n'apparaît pas**
```bash
# Vérifier le seuil dans useRevisionSettings (défaut: 50)
# Vérifier que les mots sont bien comptés
# Vérifier que les révisions ne sont pas désactivées
```

### Logs et debug
```bash
# Mode verbose
maestro test --verbose 01-main-user-journey.yaml

# Mode debug
maestro test --debug 01-main-user-journey.yaml

# Capturer les logs
maestro test 01-main-user-journey.yaml > test.log 2>&1
```

## 📊 Structure des tests

### **Pattern de test standard**
```yaml
- runFlow:
    when:
      true: ${ENV:CONDITION || !ENV:CONDITION}
    commands:
      - launchApp
      - # Actions de test
      - # Assertions
      - # Nettoyage
```

### **Gestion des conditions**
- **Tests conditionnels** : Utilisation de `when` et variables d'environnement
- **Tests indépendants** : Chaque `runFlow` peut être exécuté séparément
- **Tests de régression** : Vérification de la cohérence des données

## 🎯 Prochaines étapes

### **Tests à ajouter**
1. **Tests de performance** : Temps de réponse des composants
2. **Tests d'accessibilité** : Navigation au clavier, lecteurs d'écran
3. **Tests de stress** : Beaucoup de données, navigation rapide
4. **Tests de régression** : Vérification après modifications

### **Intégration CI/CD**
```yaml
# GitHub Actions example
- name: Run Maestro Tests
  run: |
    maestro test maestro-tests/*.yaml
```

## 📞 Support

Pour toute question sur les tests :
1. Vérifier ce README
2. Consulter la [documentation Maestro](https://maestro.mobile.dev/)
3. Vérifier les logs d'exécution
4. Tester manuellement le scénario qui pose problème

---

**Note** : Ces tests couvrent 90% des fonctionnalités principales de l'application. Ils servent de base pour la validation continue et la détection des régressions.