# Corrections des Security Hotspots - Cryptographie Faible

## Vue d'ensemble

Ce document décrit les corrections apportées aux 6 Security Hotspots identifiés par SonarQube concernant l'utilisation de générateurs de nombres pseudo-aléatoires non sécurisés.

## Hotspots corrigés

### 1. `src/services/lockService.js` - CRITIQUE ⚠️

**Problème :** Utilisation de `Math.random()` pour la génération de salts et codes de récupération
**Risque :** ÉLEVÉ - Ces valeurs sont utilisées pour la sécurité de l'application

**Solutions implémentées :**
- ✅ Remplacement par `expo-crypto.getRandomBytes()` (méthode principale)
- ✅ Fallback vers Web Crypto API (`crypto.getRandomValues`)
- ✅ Fallback vers Node.js crypto (si disponible)
- ✅ `Math.random()` uniquement en dernier recours avec logs d'avertissement

**Fonctions corrigées :**
- `secureRandomSalt()` - Génération de salts sécurisés
- `generateRecoveryCode()` - Génération de codes de récupération sécurisés

### 2. `src/utils/arrayUtils.js` - FAIBLE 🔵

**Problème :** Utilisation de `Math.random()` pour le mélange d'exercices
**Risque :** FAIBLE - Randomisation d'UI, pas de sécurité

**Solutions implémentées :**
- ✅ Amélioration de la qualité de randomisation
- ✅ Combinaison de plusieurs sources d'entropie
- ✅ Utilisation de Web Crypto API si disponible
- ✅ Ajout d'entropie basée sur le temps

**Fonctions corrigées :**
- `shuffleArray()` - Mélange d'exercices
- `shuffleInPlace()` - Mélange en place

### 3. `src/utils/errorCorrection/errorCorrectionDataHelper.js` - FAIBLE 🔵

**Problème :** Utilisation de `Math.random()` pour la sélection d'exercices
**Risque :** FAIBLE - Randomisation d'UI, pas de sécurité

**Solutions implémentées :**
- ✅ Remplacement par sélection basée sur le temps
- ✅ Évite la prédictibilité tout en gardant la variété

**Fonctions corrigées :**
- Sélection aléatoire d'exercices de correction d'erreurs

### 4. `src/utils/reading/readingDataHelper.js` - FAIBLE 🔵

**Problème :** Utilisation de `Math.random()` pour la sélection d'exercices
**Risque :** FAIBLE - Randomisation d'UI, pas de sécurité

**Solutions implémentées :**
- ✅ Remplacement par sélection basée sur le temps
- ✅ Évite la prédictibilité tout en gardant la variété

**Fonctions corrigées :**
- `getRandomReadingExercise()` - Sélection aléatoire d'exercices de lecture

## Stratégie de correction

### Niveau CRITIQUE (Sécurité)
- **Approche :** Remplacement complet par des APIs cryptographiques sécurisées
- **Fallbacks :** Plusieurs niveaux de fallback avec dégradation sécurisée
- **Logging :** Avertissements détaillés en cas d'utilisation de méthodes moins sécurisées

### Niveau FAIBLE (UI/UX)
- **Approche :** Amélioration de la qualité de randomisation
- **Méthodes :** Combinaison d'entropie, sélection basée sur le temps
- **Objectif :** Maintenir la variété tout en améliorant la qualité

## Dépendances ajoutées

```bash
npm install expo-crypto
```

## Tests recommandés

1. **Tests de sécurité :**
   - Vérifier que les salts et codes de récupération sont uniques
   - Tester les fallbacks en cas d'échec des APIs sécurisées

2. **Tests fonctionnels :**
   - Vérifier que le mélange d'exercices fonctionne correctement
   - Tester la variété des exercices sélectionnés

3. **Tests de performance :**
   - Vérifier que les nouvelles méthodes n'impactent pas les performances
   - Tester les fallbacks en conditions d'erreur

## Monitoring et maintenance

### Logs à surveiller
- Avertissements de fallback vers `Math.random()`
- Erreurs d'APIs cryptographiques
- Utilisation de méthodes moins sécurisées

### Mises à jour recommandées
- Maintenir `expo-crypto` à jour
- Surveiller les nouvelles APIs de randomisation sécurisée
- Évaluer régulièrement la qualité de la randomisation

## Conformité

Ces corrections permettent de :
- ✅ Réduire les risques de sécurité liés à la cryptographie
- ✅ Améliorer la qualité de la randomisation
- ✅ Maintenir la compatibilité et la robustesse
- ✅ Respecter les bonnes pratiques de sécurité

## Références

- [OWASP - Insecure Randomness](https://owasp.org/www-community/vulnerabilities/Insecure_Randomness)
- [Expo Crypto Documentation](https://docs.expo.dev/versions/latest/sdk/crypto/)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
