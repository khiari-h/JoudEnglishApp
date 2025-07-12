// src/utils/constants.js - VERSION FINALE SIMPLE

// =================== NIVEAUX ===================
export const LANGUAGE_LEVELS = {
  1: { id: "1", title: "Niveau 1", color: "#3b82f6", icon: "🌱" },
  2: { id: "2", title: "Niveau 2", color: "#8b5cf6", icon: "🌿" },
  3: { id: "3", title: "Niveau 3", color: "#10b981", icon: "🌳" },
  4: { id: "4", title: "Niveau 4", color: "#f59e0b", icon: "🚀" },
  5: { id: "5", title: "Niveau 5", color: "#ef4444", icon: "💎" },
  6: { id: "6", title: "Niveau 6", color: "#6366f1", icon: "🏆" },
  bonus: { id: "bonus", title: "Bonus", color: "#9333EA", icon: "🔥" },
};

// =================== EXERCICES ===================
export const EXERCISES = {
  vocabulary: { 
    id: "vocabulary", 
    title: "Vocabulaire", 
    icon: "📚", 
    color: "#3b82f6",
    route: "/tabs/vocabularyExercise"
  },
  vocabulary_fast: { 
    id: "vocabulary_fast", 
    title: "Fast Vocabulary", 
    icon: "⚡", 
    color: "#f59e0b",
    route: "/tabs/vocabularyExercise" 
  },
  phrases: { 
    id: "phrases", 
    title: "Expressions", 
    icon: "🗣️", 
    color: "#10b981",
    route: "/tabs/phrasesExercise"
  },
  grammar: { 
    id: "grammar", 
    title: "Grammaire", 
    icon: "📝", 
    color: "#f59e0b",
    route: "/tabs/grammarExercise"
  },
  spelling: { 
    id: "spelling", 
    title: "Orthographe", 
    icon: "🔤", 
    color: "#8b5cf6",
    route: "/tabs/spellingExercise"
  },
  reading: { 
    id: "reading", 
    title: "Lecture", 
    icon: "📖", 
    color: "#ef4444",
    route: "/tabs/readingExercise"
  },
  errorCorrection: { 
    id: "errorCorrection", 
    title: "Correction d'erreurs", 
    icon: "✏️", 
    color: "#6366f1",
    route: "/tabs/errorCorrectionExercise"
  },
  conversations: { 
    id: "conversations", 
    title: "Conversations", 
    icon: "💬", 
    color: "#10b981",
    route: "/(tabs)/conversationsExercise"
  },
  wordGames: { 
    id: "wordGames", 
    title: "Jeux de mots", 
    icon: "🎮", 
    color: "#f59e0b",
    route: "/(tabs)/wordGamesExercise"
  },
  assessment: { 
    id: "assessment", 
    title: "Évaluation", 
    icon: "🏆", 
    color: "#ef4444",
    route: "/(tabs)/levelAssessment"
  },
};

// =================== LISTES SIMPLES ===================
export const LEVELS_LIST = Object.keys(LANGUAGE_LEVELS);
export const EXERCISES_LIST = Object.values(EXERCISES);

// Pour compatibilité avec ancien code
export const LEVELS = LEVELS_LIST;
export const EXERCISE_TYPES = EXERCISES;

// =================== CONFIGS ===================
export const BONUS_EXERCISES = ["reading", "vocabulary", "phrases"];

export const STORAGE_KEYS = {
  LAST_ACTIVITY: "user_last_activity",
  USER_PROGRESS: "user_progress", 
  USER_SETTINGS: "user_settings",
  STREAK_DATA: "user_streak_data",
};