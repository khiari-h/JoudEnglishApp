// utils/timeConstants.js
/**
 * Configuration centralisée pour le système de tracking des temps
 */

// ⏱️ Configuration du timer
export const TIMER_CONFIG = {
  INTERVAL_MS: 1000,           // Mise à jour toutes les secondes
  MIN_SESSION_SECONDS: 5,      // Minimum 5s pour sauvegarder une session
  AUTO_SAVE_INTERVAL_MS: 30000 // Auto-save toutes les 30s
};

// 💾 Configuration du stockage
export const STORAGE_CONFIG = {
  KEY: 'exercise_time_stats',
  VERSION: '2.0', // Pour gérer les migrations
  BACKUP_KEY: 'exercise_time_stats_backup'
};

// 🎯 Configuration des recommandations
export const RECOMMENDATION_CONFIG = {
  THRESHOLD_MINUTES: 3,        // Seuil pour déclencher une recommandation
  MAX_IDLE_MINUTES: 30,        // Temps max sans activité avant reset
  LEARNING_PATH: {
    vocabulary: 'phrases',
    phrases: 'grammar', 
    grammar: 'reading',
    reading: 'conversations',
    conversations: 'assessment',
    assessment: 'vocabulary',
    spelling: 'vocabulary',
    errorCorrection: 'reading',
    wordGames: 'vocabulary',
  }
};

// 📊 Types d'exercices supportés
export const EXERCISE_TYPES = {
  VOCABULARY: 'vocabulary',
  PHRASES: 'phrases',
  GRAMMAR: 'grammar',
  READING: 'reading',
  CONVERSATIONS: 'conversations',
  SPELLING: 'spelling',
  ERROR_CORRECTION: 'errorCorrection',
  WORD_GAMES: 'wordGames',
  ASSESSMENT: 'assessment'
};

// 🔧 Valeurs par défaut
export const DEFAULT_STATS = Object.values(EXERCISE_TYPES).reduce((acc, type) => {
  acc[type] = 0;
  return acc;
}, {});

// 🎨 Messages de recommandation
export const RECOMMENDATION_MESSAGES = {
  'vocabulary->phrases': {
    icon: '🎉',
    title: 'Belle progression !',
    message: 'Tu as bien enrichi ton vocabulaire ! Que dirais-tu de mettre ces mots en pratique avec des expressions ?',
    button: 'Pratiquer les expressions'
  },
  'phrases->grammar': {
    icon: '💪', 
    title: 'Bien joué !',
    message: 'Tu progresses bien avec les expressions ! Pour être encore plus précis, on travaille la grammaire ?',
    button: 'Renforcer la grammaire'
  },
  'grammar->reading': {
    icon: '🎯',
    title: 'Tu avances bien !', 
    message: 'Tu progresses en grammaire ! Pour voir tout en action, que dirais-tu de lire des textes complets ?',
    button: 'Passer à la lecture'
  },
  'reading->conversations': {
    icon: '🗣️',
    title: 'Super entraînement !',
    message: 'Tu progresses bien en lecture ! Prêt à compléter avec de la pratique orale ?',
    button: 'Essayer les dialogues'
  },
  'conversations->assessment': {
    icon: '🏆',
    title: 'Excellent parcours !',
    message: 'Tu as bien travaillé les dialogues ! Que dirais-tu de tester tes progrès globaux ?',
    button: 'Faire le bilan'
  },
  'assessment->vocabulary': {
    icon: '🚀',
    title: 'Bravo pour ce niveau !',
    message: 'Tu as validé tes acquis ! Prêt à découvrir du nouveau vocabulaire ?',
    button: 'Nouveau vocabulaire'
  },
  'spelling->vocabulary': {
    icon: '✨',
    title: 'Orthographe au top !',
    message: 'Tu écris mieux ! Que dirais-tu d\'apprendre de nouveaux mots ?',
    button: 'Enrichir le vocabulaire'
  },
  'errorCorrection->reading': {
    icon: '🔍',
    title: 'Précision améliorée !',
    message: 'Tu corriges bien les erreurs ! Prêt à lire des textes complets ?',
    button: 'Reprendre la lecture'
  },
  'wordGames->vocabulary': {
    icon: '🎮',
    title: 'Bien révisé !',
    message: 'Tu t\'es bien amusé ! Que dirais-tu d\'apprendre de nouveaux mots ?',
    button: 'Nouveau vocabulaire'
  }
};