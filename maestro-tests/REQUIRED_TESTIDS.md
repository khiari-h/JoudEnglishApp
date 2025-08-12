# 🔍 TestID requis pour les tests Maestro - JoudEnglishApp

## 📋 Vue d'ensemble

Ce fichier liste tous les **testID** qui doivent être ajoutés dans le code de l'application pour que les tests E2E Maestro fonctionnent correctement.

## 🎯 TestID critiques (obligatoires)

### **Navigation Footer**
```jsx
// Dans app/tabs/_layout.tsx ou composants de navigation
<Tab.Screen name="dashboard" testID="dashboard-tab" />
<Tab.Screen name="levelSelection" testID="levels-tab" />
<Tab.Screen name="exerciseSelection" testID="exercises-tab" />
<Tab.Screen name="settings" testID="settings-tab" />
```

### **Boutons de niveau**
```jsx
// Dans src/screens/LevelSelection/index.js
<TouchableOpacity testID={`level-${level.id}-button`}>
  {/* Contenu du bouton */}
</TouchableOpacity>
```

### **Boutons d'exercice**
```jsx
// Dans src/screens/ExerciseSelection/index.js
<TouchableOpacity testID={`${exercise.id}-button`}>
  {/* Contenu du bouton */}
</TouchableOpacity>
```

### **Popup de révision**
```jsx
// Dans src/screens/Dashboard/components/RevisionPopup/index.js
<View testID="revision-popup">
  <Text testID="popup-words">{wordsCount} mots disponibles</Text>
  <Text testID="popup-questions">{questionsCount} questions</Text>
  
  <TouchableOpacity testID="popup-now" onPress={handleNow}>
    <Text>Maintenant</Text>
  </TouchableOpacity>
  
  <TouchableOpacity testID="popup-later50" onPress={handleLater}>
    <Text>Plus tard</Text>
  </TouchableOpacity>
  
  <TouchableOpacity testID="popup-disable" onPress={handleDisable}>
    <Text>Désactiver</Text>
  </TouchableOpacity>
  
  <TouchableOpacity testID="popup-dismiss" onPress={handleDismiss}>
    <Text>Fermer</Text>
  </TouchableOpacity>
</View>
```

### **Boutons d'exercice**
```jsx
// Dans src/screens/exercises/vocabulary/index.js
<TouchableOpacity testID="translate-button" onPress={toggleTranslation}>
  <Text>{showTranslation ? "Masquer" : "Traduire"}</Text>
</TouchableOpacity>

<TouchableOpacity testID="next-button" onPress={handleNext}>
  <Text>Suivant</Text>
</TouchableOpacity>

<TouchableOpacity testID="previous-button" onPress={handlePrevious}>
  <Text>Précédent</Text>
</TouchableOpacity>
```

## 🔧 TestID recommandés (optionnels mais utiles)

### **Composants Dashboard**
```jsx
// Dans src/screens/Dashboard/components/SimpleMetrics/index.js
<View testID="simple-metrics-container">
  <Text testID="metrics-streak">{currentStreak}</Text>
  <Text testID="metrics-words">{wordsToday}</Text>
  <Text testID="metrics-time">{formattedTime}</Text>
</View>

// Dans src/screens/Dashboard/components/QuickActions/index.js
<View testID="quick-actions-container">
  <TouchableOpacity testID="action-vocabulary" onPress={navigateToVocabulary}>
    <Text>Vocabulaire</Text>
  </TouchableOpacity>
  
  <TouchableOpacity testID="action-revision" onPress={navigateToRevision}>
    <Text>Révision</Text>
  </TouchableOpacity>
  
  <TouchableOpacity testID="action-assessment" onPress={navigateToTest}>
    <Text>Évaluation</Text>
  </TouchableOpacity>
</View>

// Dans src/screens/Dashboard/components/LearningProgress/index.js
<View testID="learning-progress-container">
  <Text testID="progress-percentage">{progress}%</Text>
  <TouchableOpacity testID="explore-level-button" onPress={handleExplorePress}>
    <Text>Explorer le niveau {level}</Text>
  </TouchableOpacity>
</View>
```

### **Composants d'exercice**
```jsx
// Dans src/screens/exercises/vocabulary/VocabularyProgress/index.js
<View testID="vocabulary-progress">
  <Text testID="progress-text">{completedWords}/{totalWords}</Text>
</View>

// Dans src/screens/exercises/vocabulary/VocabularyHeader/index.js
<TouchableOpacity testID="back-button" onPress={onBackPress}>
  <Text>←</Text>
</TouchableOpacity>
```

### **Composants de paramètres**
```jsx
// Dans src/components/setting/RevisionSettings/index.js
<View testID="revision-settings-container">
  <Switch testID="revisions-toggle" value={!preferences.isDisabled} />
  
  <TouchableOpacity testID="frequency-25" onPress={() => updateFrequency(25)}>
    <Text>Tous les 25 mots (léger)</Text>
  </TouchableOpacity>
  
  <TouchableOpacity testID="frequency-50" onPress={() => updateFrequency(50)}>
    <Text>Tous les 50 mots (standard)</Text>
  </TouchableOpacity>
  
  <TouchableOpacity testID="frequency-100" onPress={() => updateFrequency(100)}>
    <Text>Tous les 100 mots (espacé)</Text>
  </TouchableOpacity>
</View>
```

## 📱 TestID pour la navigation

### **Boutons retour**
```jsx
// Dans tous les composants avec navigation
<TouchableOpacity testID="back-button" onPress={handleBack}>
  <Text>←</Text>
</TouchableOpacity>
```

### **Boutons de navigation**
```jsx
// Dans les composants de navigation
<TouchableOpacity testID="continue-button" onPress={handleContinue}>
  <Text>Continuer</Text>
</TouchableOpacity>

<TouchableOpacity testID="start-button" onPress={handleStart}>
  <Text>Commencer</Text>
</TouchableOpacity>
```

## 🎨 TestID pour les éléments d'état

### **Loading states**
```jsx
// Dans tous les composants avec états de chargement
<ActivityIndicator testID="loading-indicator" />
<Text testID="loading-text">Chargement...</Text>
```

### **Empty states**
```jsx
// Dans les composants avec états vides
<View testID="empty-state">
  <Text testID="empty-title">Aucune donnée</Text>
  <Text testID="empty-subtitle">Commencez par...</Text>
</View>
```

### **Error states**
```jsx
// Dans les composants avec gestion d'erreur
<View testID="error-state">
  <Text testID="error-title">Erreur</Text>
  <Text testID="error-message">{errorMessage}</Text>
  <TouchableOpacity testID="retry-button" onPress={handleRetry}>
    <Text>Réessayer</Text>
  </TouchableOpacity>
</View>
```

## 🔍 TestID pour les métriques et données

### **Progression**
```jsx
// Dans les composants de progression
<View testID="progress-container">
  <Text testID="progress-current">{current}</Text>
  <Text testID="progress-total">/{total}</Text>
  <Text testID="progress-percentage">{percentage}%</Text>
</View>
```

### **Compteurs**
```jsx
// Dans les composants avec compteurs
<Text testID="words-count">{wordsCount}</Text>
<Text testID="streak-count">{streakCount}</Text>
<Text testID="time-spent">{timeSpent}</Text>
```

## 📋 Checklist d'implémentation

### **Phase 1 : TestID critiques (obligatoires)**
- [ ] Navigation footer (4 onglets)
- [ ] Boutons de niveau (level-1-button, etc.)
- [ ] Boutons d'exercice (vocabulary-button, etc.)
- [ ] Popup de révision (tous les éléments)
- [ ] Boutons d'exercice (traduire, suivant, précédent)

### **Phase 2 : TestID recommandés**
- [ ] Composants Dashboard (SimpleMetrics, QuickActions, LearningProgress)
- [ ] Composants d'exercice (Header, Progress, Navigation)
- [ ] Composants de paramètres (RevisionSettings)
- [ ] États de chargement et d'erreur

### **Phase 3 : TestID d'amélioration**
- [ ] Métriques et compteurs
- [ ] Navigation et boutons
- [ ] États vides et d'erreur
- [ ] Éléments d'interface utilisateur

## 🚀 Avantages des testID

### **Pour les tests E2E**
- **Sélecteurs stables** : Pas de dépendance au texte ou à la structure
- **Tests robustes** : Fonctionnent même si l'UI change
- **Maintenance facile** : Moins de casse-tête lors des refactoring

### **Pour le développement**
- **Documentation** : Les testID servent de documentation de l'interface
- **Debugging** : Plus facile de localiser les éléments
- **Accessibilité** : Améliore l'accessibilité pour les outils de test

### **Pour la qualité**
- **Tests fiables** : Moins de faux positifs
- **Couverture complète** : Tous les éléments critiques testés
- **Détection précoce** : Problèmes détectés avant la production

## 📝 Bonnes pratiques

### **Nommage des testID**
```jsx
// ✅ Bon : Descriptif et cohérent
testID="level-1-button"
testID="vocabulary-exercise-button"
testID="revision-popup-now"

// ❌ Éviter : Trop générique ou incohérent
testID="button"
testID="btn1"
testID="element"
```

### **Structure des testID**
```jsx
// ✅ Bon : Hiérarchie claire
testID="dashboard-simple-metrics-streak"
testID="exercise-vocabulary-progress-bar"
testID="settings-revisions-frequency-25"

// ❌ Éviter : Trop long ou confus
testID="dashboard-simple-metrics-current-streak-indicator-value"
```

### **Cohérence**
```jsx
// ✅ Bon : Pattern cohérent
testID="level-1-button"
testID="level-2-button"
testID="level-3-button"

// ❌ Éviter : Patterns différents
testID="level-1-button"
testID="button-level-2"
testID="level3-btn"
```

---

**Note** : L'ajout de ces testID est **critique** pour le bon fonctionnement des tests E2E. Sans eux, les tests ne pourront pas localiser les éléments et échoueront.
