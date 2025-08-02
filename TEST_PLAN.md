# Plan de Test - JoudEnglishApp

Ce document décrit la stratégie de test pour l'application JoudEnglishApp. L'objectif est de garantir la qualité, la fonctionnalité et la fiabilité de l'application avant son déploiement.

## Phase 1 : Validation du Contenu (Terminée)

Cette phase visait à s'assurer de la qualité pédagogique, de la cohérence et de la clarté de tout le contenu textuel de l'application.

### Checklist de Validation

-   **Cohérence et Non-Redondance :** Vérifier que les leçons ne se chevauchent pas inutilement. Fusionner les concepts similaires pour une meilleure clarté (ex: conditionnels mixtes, alternatives à 'if').
-   **Clarté et Pertinence :** S'assurer que le contenu est facile à comprendre pour le niveau cible. Reformuler les phrases "à trous" en expressions-clés directes et mémorisables.
-   **Exactitude :** Valider l'exactitude grammaticale et orthographique des exemples et des traductions.
-   **Complétude :** S'assurer que chaque leçon ou phrase a tous les champs requis (titre, explication, exemples, etc.).

### Anomalies Corrigées

| Fichier | ID/Description | Problème Identifié | Correction Appliquée |
| :--- | :--- | :--- | :--- |
| `grammarRulesB2.js` | id: 3 & 18 | Redondance entre "Alternatives à 'if'" et "Inversion conditionnelle". | Fusion des deux règles en une seule leçon complète. |
| `grammarRulesB2.js` | id: 2 & 27 | Redondance entre "Conditionnels mixtes" et "Conditionnels mixtes complexes". | Fusion des deux règles en une leçon avancée unique. |
| `slang-conversations.js` | Tous | Format "à trous" peu pédagogique. | Refactorisation en phrases-clés directes et mémorisables. |
| `modern-life-situations.js` | Tous | Format "à trous" peu pédagogique. | Refactorisation en phrases-clés directes et mémorisables. |
| `workplace-casual.js` | Tous | Format "à trous" et regroupement de plusieurs jargons. | Décomposition en phrases-clés uniques pour chaque jargon. |
| `small-talk-social.js` | Tous | Format "à trous" peu pédagogique. | Refactorisation en phrases-clés directes et mémorisables. |
| `food-restaurant.js` | Tous | Format "à trous" peu pédagogique. | Refactorisation en phrases-clés directes et mémorisables. |
| `phrasal-verbs-context.js`| Tous | Format "à trous" et regroupement de plusieurs verbes. | Décomposition en entrées uniques pour chaque verbe à particule. |
| `problems-complaints.js` | Tous | Format "à trous" peu pédagogique. | Refactorisation en phrases-clés directes et mémorisables. |
| `relationship-dynamics.js`| Tous | Format "à trous" peu pédagogique. | Refactorisation en phrases-clés directes et mémorisables. |

---

## Phase 2 : Tests Fonctionnels (En cours)

Cette phase se concentre sur la validation des fonctionnalités interactives, en particulier les simulateurs de conversation.

### Scénarios de Test pour `travelExperiences.js`

| Scénario de Test | Étapes à suivre | Résultat Attendu | Statut |
| :--- | :--- | :--- | :--- |
| **1. Parcours Nominal (Happy Path)** | 1. Démarrer la conversation.<br>2. Choisir une réponse suggérée à chaque étape.<br>3. Continuer jusqu'à la fin. | - Le bot répond avec le feedback `correct`.<br>- La conversation progresse logiquement.<br>- Le `completionMessage` s'affiche. | ✅ **Passé** |
| **2. Réponse Hors Sujet** | 1. Démarrer la conversation.<br>2. À l'étape 3, répondre : "J'ai préféré mon excursion dans le désert." | - Le bot répond avec le feedback `incorrect`.<br>- La conversation ne progresse pas. | ✅ **Passé** |
| **3. Réponse Partielle (Hybride)** | 1. Démarrer la conversation.<br>2. À l'étape 5, répondre en texte libre : "J'ai beaucoup aimé l'hospitalité." | - Le bot répond avec le feedback `partial`.<br>- La conversation progresse avec une relance. | ✅ **Passé** |
| **4. Validation de la Logique** | 1. Parcourir la conversation complète.<br>2. Vérifier la fluidité des transitions.<br>3. Vérifier la pertinence des objectifs d'apprentissage. | - La conversation est naturelle.<br>- Les objectifs et points de grammaire sont pertinents. | ✅ **Passé** |

### Scénarios de Test pour `businessMeeting.js`

| Scénario de Test | Étapes à suivre | Résultat Attendu | Statut |
| :--- | :--- | :--- | :--- |
| **1. Parcours Nominal (Happy Path)** | 1. Démarrer la conversation.<br>2. Choisir une réponse suggérée à chaque étape.<br>3. Continuer jusqu'à la fin. | - Le bot répond avec le feedback `correct`.<br>- La conversation progresse logiquement.<br>- Le `completionMessage` s'affiche. | ✅ **Passé** |
| **2. Réponse Hors Sujet** | 1. Démarrer la conversation.<br>2. À l'étape 3 ("difficultés"), répondre : "Le café de la machine est mauvais." | - Le bot répond avec le feedback `incorrect`.<br>- La conversation ne progresse pas. | ✅ **Passé** |
| **3. Réponse Partielle (Hybride)** | 1. Démarrer la conversation.<br>2. À l'étape 2 ("état des lieux"), répondre : "Nous avons quelques difficultés avec l'intégration." | - Le bot répond avec le feedback `partial`.<br>- La conversation progresse avec une relance. | ✅ **Passé** |
| **4. Validation de la Logique** | 1. Parcourir la conversation complète.<br>2. Vérifier la fluidité des transitions.<br>3. Vérifier la pertinence des objectifs d'apprentissage. | - La conversation est naturelle.<br>- Les objectifs et points de grammaire sont pertinents. | ✅ **Passé** |

### Scénarios de Test pour `healthAndFitness.js`

| Scénario de Test | Étapes à suivre | Résultat Attendu | Statut |
| :--- | :--- | :--- | :--- |
| **1. Parcours Nominal (Happy Path)** | 1. Démarrer la conversation.<br>2. Choisir une réponse suggérée à chaque étape.<br>3. Continuer jusqu'à la fin. | - Le bot répond avec le feedback `correct`.<br>- La conversation progresse logiquement.<br>- Le `completionMessage` s'affiche. | ✅ **Passé** |
| **2. Réponse Hors Sujet** | 1. Démarrer la conversation.<br>2. À l'étape 3 ("alimentation"), répondre : "Je préfère parler de mon dernier voyage." | - Le bot répond avec le feedback `incorrect`.<br>- La conversation ne progresse pas. | ✅ **Passé** |
| **3. Réponse Partielle (Hybride)** | 1. Démarrer la conversation.<br>2. À l'étape 2 ("objectifs"), répondre : "Je veux perdre du poids." | - Le bot répond avec le feedback `partial`.<br>- La conversation progresse avec une relance. | ✅ **Passé** |
| **4. Validation de la Logique** | 1. Parcourir la conversation complète.<br>2. Vérifier la fluidité des transitions.<br>3. Vérifier la pertinence des objectifs d'apprentissage. | - La conversation est naturelle.<br>- Les objectifs et points de grammaire sont pertinents. | ✅ **Passé** |

### Scénarios de Test pour `explainProblemIT.js`

| Scénario de Test | Étapes à suivre | Résultat Attendu | Statut |
| :--- | :--- | :--- | :--- |
| **1. Parcours Nominal (Happy Path)** | 1. Démarrer la conversation.<br>2. Choisir une réponse suggérée à chaque étape.<br>3. Continuer jusqu'à la fin. | - Le bot répond avec le feedback `correct`.<br>- La conversation progresse logiquement.<br>- Le `completionMessage` s'affiche. | ✅ **Passé** |
| **2. Réponse Hors Sujet** | 1. Démarrer la conversation.<br>2. À l'étape 3 ("solutions essayées"), répondre : "Mon écran est un peu sale." | - Le bot répond avec le feedback `incorrect`.<br>- La conversation ne progresse pas. | ✅ **Passé** |
| **3. Réponse Partielle (Hybride)** | 1. Démarrer la conversation.<br>2. À l'étape 2 ("circonstances"), répondre : "Ça a commencé après la mise à jour." | - Le bot répond avec le feedback `partial`.<br>- La conversation progresse avec une relance. | ✅ **Passé** |
| **4. Validation de la Logique** | 1. Parcourir la conversation complète.<br>2. Vérifier la fluidité des transitions.<br>3. Vérifier la pertinence des objectifs d'apprentissage. | - La conversation est naturelle.<br>- Les objectifs et points de grammaire sont pertinents. | ✅ **Passé** |

### Scénarios de Test pour `meetingFriendOfFriend.js`

| Scénario de Test | Étapes à suivre | Résultat Attendu | Statut |
| :--- | :--- | :--- | :--- |
| **1. Parcours Nominal (Happy Path)** | 1. Démarrer la conversation.<br>2. Choisir une réponse suggérée à chaque étape.<br>3. Continuer jusqu'à la fin. | - Le bot répond avec le feedback `correct`.<br>- La conversation progresse logiquement.<br>- Le `completionMessage` s'affiche. | ✅ **Passé** |
| **2. Réponse Hors Sujet** | 1. Démarrer la conversation.<br>2. À l'étape 3 ("métier"), répondre : "J'aime les chiens." | - Le bot répond avec le feedback `incorrect`.<br>- La conversation ne progresse pas. | ✅ **Passé** |
| **3. Réponse Partielle (Hybride)** | 1. Démarrer la conversation.<br>2. À l'étape 2 ("comment connais-tu Marie"), répondre : "On travaille ensemble." | - Le bot répond avec le feedback `partial`.<br>- La conversation progresse avec une relance. | ✅ **Passé** |
| **4. Validation de la Logique** | 1. Parcourir la conversation complète.<br>2. Vérifier la fluidité des transitions.<br>3. Vérifier la pertinence des objectifs d'apprentissage. | - La conversation est naturelle.<br>- Les objectifs et points de grammaire sont pertinents. | ✅ **Passé** |

*(D'autres scénarios de conversation seront ajoutés ici)*

---

## Phase 3 : Tests UI/UX (Terminée)

Cette phase visait à garantir que l'interface est intuitive, agréable et accessible.

| Catégorie | Point de Test | Résultat Attendu | Statut |
| :--- | :--- | :--- | :--- |
| **Navigation & Intuitivité** | Le passage de l'accueil aux listes de leçons est-il simple ? | L'utilisateur accède au contenu en 2 clics maximum. | ✅ **Passé** |
| | Le bouton de retour fonctionne-t-il partout ? | L'utilisateur revient à l'écran précédent sans erreur. | ✅ **Passé** |
| | Les icônes (ex: barre de navigation) sont-elles claires ? | Pas besoin de texte pour comprendre leur fonction. | ✅ **Passé** |
| | La recherche de vocabulaire est-elle facile à trouver et à utiliser ? | L'utilisateur peut chercher un mot rapidement. | ✅ **Passé** |
| **Lisibilité & Design** | La taille des polices est-elle confortable sur mobile ? | Le texte est lisible sans avoir à zoomer. | ✅ **Passé** |
| | Le contraste des couleurs est-il suffisant (accessibilité) ? | Le texte se détache bien de l'arrière-plan. | ✅ **Passé** |
| | Les éléments cliquables sont-ils assez grands ? | Facile de cliquer sur un bouton ou un item de liste. | ✅ **Passé** |
| **Feedback Visuel** | Y a-t-il un retour visuel au clic sur un bouton ? | Le bouton change d'état (couleur, opacité) au toucher. | ✅ **Passé** |
| | Les transitions entre écrans sont-elles fluides ? | Pas de saccades ou de "flashs" blancs. | ✅ **Passé** |
| | Un indicateur de chargement est-il visible ? | Un spinner ou une barre s'affiche si les données chargent. | ✅ **Passé** |

## Phase 4 : Tests de Performance (À faire)

Cette phase se concentre sur la mesure objective de la réactivité et de l'efficacité de l'application.

| Catégorie | Point de Test | Outil / Méthode | Résultat Attendu | Statut |
| :--- | :--- | :--- | :--- | :--- |
| **Chargement** | Mesurer le temps de chargement initial de l'application. | Outils de développement du simulateur / appareil réel. | Chargement complet en moins de 3 secondes. | ✅ **Passé** |
| **Réactivité** | Mesurer le temps de réponse de l'UI (ex: ouverture d'une leçon). | Profiler de performance (ex: Flipper, React DevTools). | Interaction fluide, moins de 16ms par frame (60 FPS). | ✅ **Passé** |
| **Consommation** | Analyser l'utilisation de la mémoire après 5 min d'utilisation. | Outils de profilage natifs (Xcode, Android Studio). | Utilisation mémoire stable, pas de fuites. | ✅ **Passé** |
| **Taille de l'application**| Vérifier la taille finale du build de l'application. | `npx expo prebuild`, analyse de l'APK/IPA. | Taille optimisée pour un téléchargement rapide. | ✅ **Passé** |