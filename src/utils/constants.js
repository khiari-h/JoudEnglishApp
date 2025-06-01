// src/utils/constants.js

/**
 * Constantes pour l'application d'apprentissage des langues
 */

// Niveaux simplifiés (1 à 6 + bonus)
export const LANGUAGE_LEVELS = {
  1: {
    id: "1",
    name: "1",
    title: "Niveau 1",
    description: "Communication basique, expressions simples du quotidien",
    color: "#3b82f6", // Bleu
    icon: "🌱",
  },
  2: {
    id: "2",
    name: "2",
    title: "Niveau 2",
    description: "Expressions simples, conversations courantes",
    color: "#8b5cf6", // Violet
    icon: "🌿",
  },
  3: {
    id: "3",
    name: "3",
    title: "Niveau 3",
    description: "Communication claire sur des sujets familiers",
    color: "#10b981", // Vert
    icon: "🌳",
  },
  4: {
    id: "4",
    name: "4",
    title: "Niveau 4",
    description: "Communication complexe, discussions techniques",
    color: "#f59e0b", // Orange
    icon: "🚀",
  },
  5: {
    id: "5",
    name: "5",
    title: "Niveau 5",
    description: "Expression fluide, sujets complexes",
    color: "#ef4444", // Rouge
    icon: "💎",
  },
  6: {
    id: "6",
    name: "6",
    title: "Niveau 6",
    description: "Niveau proche du locuteur natif, maîtrise de la langue",
    color: "#6366f1", // Indigo
    icon: "🏆",
  },
  bonus: {
    id: "bonus",
    name: "B",
    title: "Bonus",
    description: "Contenu exclusif et avancé",
    color: "#9333EA", // Violet premium
    icon: "🔥",
  },
};

// Liste des niveaux de langue (pour les itérations)
export const LEVELS = Object.keys(LANGUAGE_LEVELS);

export const EXERCISE_TYPES = {
  vocabulary: {
    id: "vocabulary",
    title: "Vocabulaire",
    description: "Apprenez de nouveaux mots et expressions",
    icon: "📚",
    color: "#3b82f6",
    route: "VocabularyExercise",
  },
  phrases: {
    id: "phrases",
    title: "Expressions",
    description: "Apprenez des expressions utiles dans leur contexte",
    icon: "🗣️",
    color: "#10b981",
    route: "PhrasesExercise",
  },
  grammar: {
    id: "grammar",
    title: "Grammaire",
    description: "Pratiquez les règles et structures grammaticales",
    icon: "📝",
    color: "#f59e0b",
    route: "GrammarExercise",
  },
  spelling: {
    id: "spelling",
    title: "Orthographe",
    description: "Travaillez sur l'orthographe et la ponctuation",
    icon: "🔤",
    color: "#8b5cf6",
    route: "SpellingExercise",
  },
  reading: {
    id: "reading",
    title: "Lecture",
    description: "Améliorez votre compréhension écrite",
    icon: "📖",
    color: "#ef4444",
    route: "ReadingExercise",
  },
  errorCorrection: {
    id: "errorCorrection",
    title: "Correction d'erreurs",
    description: "Identifiez et corrigez les erreurs dans des textes",
    icon: "✏️",
    color: "#6366f1",
    route: "ErrorCorrectionExercise",
  },
  conversations: {
    id: "conversations",
    title: "Conversations",
    description: "Pratiquez la conversation avec des scénarios guidés",
    icon: "💬",
    color: "#10b981",
    route: "ConversationsExercise",
  },
  wordGames: {
    id: "wordGames",
    title: "Jeux de mots",
    description: "Jeux amusants basés sur le vocabulaire et la grammaire",
    icon: "🎮",
    color: "#f59e0b",
    route: "WordGamesExercise",
  },
  assessment: {
    id: "assessment",
    title: "Évaluation",
    description: "Testez votre niveau et vos progrès",
    icon: "🏆",
    color: "#ef4444",
    route: "LevelAssessment",
  },
};

// Liste des types d'exercices (pour les itérations)
export const EXERCISE_TYPES_LIST = Object.values(EXERCISE_TYPES);

// Catégories de vocabulaire
export const VOCABULARY_CATEGORIES = {
  basics: {
    id: "basics",
    title: "Fondamentaux",
    icon: "🏠",
  },
  travel: {
    id: "travel",
    title: "Voyage",
    icon: "✈️",
  },
  food: {
    id: "food",
    title: "Nourriture",
    icon: "🍽️",
  },
  work: {
    id: "work",
    title: "Travail",
    icon: "💼",
  },
  health: {
    id: "health",
    title: "Santé",
    icon: "🏥",
  },
  education: {
    id: "education",
    title: "Éducation",
    icon: "🎓",
  },
  entertainment: {
    id: "entertainment",
    title: "Divertissement",
    icon: "🎭",
  },
  technology: {
    id: "technology",
    title: "Technologie",
    icon: "💻",
  },
  nature: {
    id: "nature",
    title: "Nature",
    icon: "🌳",
  },
  sports: {
    id: "sports",
    title: "Sports",
    icon: "⚽",
  },
};

// Catégories de grammaire
export const GRAMMAR_CATEGORIES = {
  verbs: {
    id: "verbs",
    title: "Verbes",
    icon: "🏃",
  },
  tenses: {
    id: "tenses",
    title: "Temps",
    icon: "⏰",
  },
  nouns: {
    id: "nouns",
    title: "Noms",
    icon: "📦",
  },
  adjectives: {
    id: "adjectives",
    title: "Adjectifs",
    icon: "🎨",
  },
  adverbs: {
    id: "adverbs",
    title: "Adverbes",
    icon: "🔄",
  },
  prepositions: {
    id: "prepositions",
    title: "Prépositions",
    icon: "📍",
  },
  articles: {
    id: "articles",
    title: "Articles",
    icon: "📰",
  },
  pronouns: {
    id: "pronouns",
    title: "Pronoms",
    icon: "👤",
  },
  conjunctions: {
    id: "conjunctions",
    title: "Conjonctions",
    icon: "🔗",
  },
  questions: {
    id: "questions",
    title: "Questions",
    icon: "❓",
  },
};

// Types de questions pour les exercices
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: "multiple_choice", // Choix multiple (une seule réponse)
  MULTIPLE_SELECT: "multiple_select", // Sélection multiple (plusieurs réponses)
  TEXT_INPUT: "text_input", // Saisie de texte
  DRAG_DROP: "drag_drop", // Glisser-déposer
  MATCH_PAIRS: "match_pairs", // Associer des paires
  REORDER: "reorder", // Réorganiser des éléments
  TRUE_FALSE: "true_false", // Vrai ou faux
  GAP_FILL: "gap_fill", // Texte à trous
  HOTSPOT: "hotspot", // Cliquer sur une zone
  FLASHCARD: "flashcard", // Carte d'apprentissage
};

// Paramètres par défaut de l'application
export const DEFAULT_SETTINGS = {
  notifications: true,
  dailyGoal: 10, // Minutes par jour
  dailyReminder: true,
  reminderTime: "20:00",
  soundEffects: true,
  darkMode: "system", // 'light', 'dark', 'system'
  fontSize: "medium", // 'small', 'medium', 'large'
  autoPlayAudio: true,
  showTranslations: true,
  language: "fr",
};

// Clés de stockage pour AsyncStorage
export const STORAGE_KEYS = {
  USER_PROGRESS: "userProgress",
  USER_SETTINGS: "userSettings",
  LAST_ACTIVITY: "lastActivity",
  CURRENT_LEVEL: "currentLevel",
  STREAK_DATA: "streakData",
  COMPLETED_EXERCISES: "completedExercises",
};

// Messages de feedback
export const FEEDBACK_MESSAGES = {
  correct: [
    "Excellent !",
    "Parfait !",
    "Bravo !",
    "Très bien !",
    "C'est ça !",
    "Correct !",
  ],
  incorrect: [
    "Pas tout à fait...",
    "Essaie encore !",
    "Presque...",
    "Pas exactement.",
    "Ce n'est pas correct.",
  ],
  encouragement: [
    "Continue comme ça !",
    "Tu progresses bien !",
    "Tu te débrouilles très bien !",
    "Tu es sur la bonne voie !",
    "Persévère !",
  ],
};

// Intervalles pour la répétition espacée (en heures)
export const SPACED_REPETITION_INTERVALS = [0, 4, 8, 24, 72, 168, 336, 672];

// Seuils pour les niveaux de maîtrise
export const MASTERY_THRESHOLDS = {
  NOVICE: 0,
  FAMILIAR: 40,
  COMPETENT: 70,
  PROFICIENT: 85,
  EXPERT: 95,
};

// Routes de l'application
export const ROUTES = {
  DASHBOARD: "Dashboard",
  LEVEL_SELECTION: "LevelSelection",
  EXERCISE_SELECTION: "ExerciseSelection",
  VOCABULARY: "VocabularyExercise",
  GRAMMAR: "GrammarExercise",
  CONVERSATIONS: "ConversationsExercise",
  READING: "ReadingExercise",
  ERROR_CORRECTION: "ErrorCorrectionExercise",
  WORD_GAMES: "WordGamesExercise",
  PHRASES: "PhrasesExercise",
  SPELLING: "SpellingExercise",
  ASSESSMENT_EXERCISE: "LevelAssessment",
};

// Durées pour les animations (en ms)
export const ANIMATION_DURATIONS = {
  SHORT: 200,
  MEDIUM: 400,
  LONG: 600,
};

// Palette de couleurs de l'application
export const COLORS = {
  primary: "#5E60CE",
  primaryDark: "#4E50AE",
  secondary: "#6B7280",
  secondaryLight: "#9CA3AF",
  accent: "#F59E0B",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
  background: "#FFFFFF",
  surface: "#F8F8F8",
  text: "#1F2937",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  divider: "#E5E7EB",
  disabled: "#9CA3AF",
  icon: "#4B5563",
};

export default {
  LANGUAGE_LEVELS,
  LEVELS,
  EXERCISE_TYPES,
  EXERCISE_TYPES_LIST,
  VOCABULARY_CATEGORIES,
  GRAMMAR_CATEGORIES,
  QUESTION_TYPES,
  DEFAULT_SETTINGS,
  STORAGE_KEYS,
  FEEDBACK_MESSAGES,
  SPACED_REPETITION_INTERVALS,
  MASTERY_THRESHOLDS,
  ROUTES,
  ANIMATION_DURATIONS,
  COLORS,
};

