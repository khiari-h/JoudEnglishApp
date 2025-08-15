// src/utils/errorCorrection/errorCorrectionDataHelper.js

// Import des données d'error correction par niveau
// Niveau A1
import errorCorrectionA1 from "../../data/errorCorrection/A1";

// Niveau A2
import errorCorrectionA2 from "../../data/errorCorrection/A2";

// Niveau B1
import errorCorrectionB1 from "../../data/errorCorrection/B1";

// Niveau B2
import errorCorrectionB2 from "../../data/errorCorrection/B2";

// Niveau C1
import errorCorrectionC1 from "../../data/errorCorrection/C1";

// Niveau C2
import errorCorrectionC2 from "../../data/errorCorrection/C2";

/**
 * Récupère les données d'exercices d'error correction en fonction du niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {Object} Les données d'exercices d'error correction pour le niveau spécifié
 */
export const getErrorsData = (level) => {
  const dataMap = {
    A1: errorCorrectionA1,
    A2: errorCorrectionA2,
    B1: errorCorrectionB1,
    B2: errorCorrectionB2,
    C1: errorCorrectionC1,
    C2: errorCorrectionC2,
  };

  return dataMap[level] || errorCorrectionA1; // Fallback vers A1 si niveau non trouvé
};

/**
 * Récupère la couleur associée à un niveau de langue
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {string} Code couleur hexadécimal pour le niveau
 */
export const getLevelColor = (level) => {
  const colors = {
    A1: "#3b82f6", // Bleu
    A2: "#8b5cf6", // Violet
    B1: "#10b981", // Vert
    B2: "#f59e0b", // Orange
    C1: "#ef4444", // Rouge
    C2: "#6366f1", // Indigo
  };
  return colors[level] || "#4361EE"; // Couleur par défaut
};

/**
 * Récupère les caractéristiques d'un niveau d'error correction
 * @param {string} level - Le niveau de langue
 * @returns {Object} Caractéristiques du niveau (difficulté, types d'erreurs, etc.)
 */
export const getLevelCharacteristics = (level) => {
  const characteristics = {
    A1: {
      name: "Débutant",
      textLength: "1-2 phrases (50-100 caractères)",
      errorCount: "1-2 erreurs par exercice",
      errorTypes: ["Basic grammar", "Simple vocabulary", "Word order"],
      difficulty: "Très facile",
      focus: "Erreurs évidentes, correction directe",
    },
    A2: {
      name: "Élémentaire",
      textLength: "2-3 phrases (80-150 caractères)",
      errorCount: "2-3 erreurs par exercice",
      errorTypes: ["Intermediate grammar", "Tense usage", "Prepositions"],
      difficulty: "Facile",
      focus: "Erreurs communes, inférences simples",
    },
    B1: {
      name: "Intermédiaire",
      textLength: "3-4 phrases (120-200 caractères)",
      errorCount: "3-4 erreurs par exercice",
      errorTypes: ["Complex tenses", "Passive voice", "Reported speech"],
      difficulty: "Modéré",
      focus: "Erreurs subtiles, analyse requise",
    },
    B2: {
      name: "Intermédiaire avancé",
      textLength: "4-5 phrases (150-250 caractères)",
      errorCount: "4-5 erreurs par exercice",
      errorTypes: ["Advanced conditionals", "Register", "Discourse markers"],
      difficulty: "Difficile",
      focus: "Nuances grammaticales et stylistiques",
    },
    C1: {
      name: "Autonome",
      textLength: "5-6 phrases (200-300 caractères)",
      errorCount: "5-6 erreurs par exercice",
      errorTypes: [
        "Sophisticated structures",
        "Cultural references",
        "Stylistic nuances",
      ],
      difficulty: "Très difficile",
      focus: "Erreurs sophistiquées, analyse approfondie",
    },
    C2: {
      name: "Maîtrise",
      textLength: "6-8 phrases (250-400 caractères)",
      errorCount: "6-8 erreurs par exercice",
      errorTypes: ["Literary language", "Archaic forms", "Creative expression"],
      difficulty: "Expert",
      focus: "Subtilités linguistiques maximales",
    },
  };

  return characteristics[level] || characteristics.A1;
};

/**
 * Récupère les statistiques d'exercices pour un niveau donné
 * @param {string} level - Le niveau de langue
 * @returns {Object} Statistiques des exercices (nombre, types, catégories, etc.)
 */
export const getErrorCorrectionStats = (level) => {
  const stats = {
    exerciseCount: 0,
    totalQuestions: 0,
    categoryCount: 0,
    typeDistribution: {
      full: 0,
      identify: 0,
      multiple_choice: 0,
    },
    categories: [],
    averageTextLength: 0,
    totalErrorPositions: 0,
  };

  try {
    const data = getErrorsData(level);

    if (data?.exercises) {
      stats.exerciseCount = data.exercises.length;
      stats.totalQuestions = data.exercises.length; // Chaque exercice = 1 question
      stats.categoryCount = data.categories?.length || 0;

      // Distribution par type
      if (data.statistics) {
        stats.typeDistribution = {
          full: data.statistics.full || 0,
          identify: data.statistics.identify || 0,
          multiple_choice: data.statistics.multiple_choice || 0,
        };
      }

      // Informations sur les catégories
      if (data.categories) {
        stats.categories = data.categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
          count: cat.exerciseCount || 0,
          difficulty: cat.difficulty || "Unknown",
        }));
      }

      // Calcul longueur moyenne des textes
      const textLengths = data.exercises.map((ex) =>
        ex.text ? ex.text.length : 0
      );
      stats.averageTextLength =
        textLengths.length > 0
          ? Math.round(
              textLengths.reduce((a, b) => a + b, 0) / textLengths.length
            )
          : 0;

      // Calcul total des positions d'erreurs
      stats.totalErrorPositions = data.exercises
        .filter((ex) => ex.errorPositions)
        .reduce((total, ex) => total + ex.errorPositions.length, 0);
    }
  } catch (error) {
    console.warn(`Error calculating stats for level ${level}:`, error);
  }

  return stats;
};

/**
 * Récupère les statistiques globales pour tous les niveaux implémentés
 * @returns {Object} Statistiques complètes du programme d'error correction
 */
export const getGlobalErrorCorrectionStats = () => {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const globalStats = {
    totalExercises: 0,
    totalQuestions: 0,
    totalCategories: 0,
    byLevel: {},
    byType: {
      full: 0,
      identify: 0,
      multiple_choice: 0,
    },
    implementedLevels: 6, // Maintenant tous les niveaux sont implémentés
    progression: [],
  };

  levels.forEach((level) => {
    const levelStats = getErrorCorrectionStats(level);
    globalStats.byLevel[level] = levelStats;

    if (levelStats.exerciseCount > 0) {
      globalStats.totalExercises += levelStats.exerciseCount;
      globalStats.totalQuestions += levelStats.totalQuestions;
      globalStats.totalCategories += levelStats.categoryCount;

      // Cumul par type
      globalStats.byType.full += levelStats.typeDistribution.full;
      globalStats.byType.identify += levelStats.typeDistribution.identify;
      globalStats.byType.multiple_choice +=
        levelStats.typeDistribution.multiple_choice;

      // Progression des niveaux
      globalStats.progression.push({
        level,
        exercises: levelStats.exerciseCount,
        difficulty: getLevelCharacteristics(level).difficulty,
      });
    }
  });

  return globalStats;
};

/**
 * Récupère les exercices par catégorie pour un niveau donné
 * @param {string} level - Le niveau de langue
 * @param {number} categoryId - L'ID de la catégorie
 * @returns {Array} Liste des exercices de la catégorie
 */
export const getExercisesByCategory = (level, categoryId) => {
  const data = getErrorsData(level);
  
  if (data?.getExercisesByCategory) {
    return data.getExercisesByCategory(categoryId);
  }
  
  return data?.exercises?.filter((ex) => ex.categoryId === categoryId) || [];
};

/**
 * Récupère les exercices par type pour un niveau donné
 * @param {string} level - Le niveau de langue
 * @param {string} type - Le type d'exercice (full, identify, multiple_choice)
 * @returns {Array} Liste des exercices du type spécifié
 */
export const getExercisesByType = (level, type) => {
  const data = getErrorsData(level);
  
  if (data?.getExercisesByType) {
    return data.getExercisesByType(type);
  }
  
  return data?.exercises?.filter((ex) => ex.type === type) || [];
};

/**
 * Récupère les exercices par catégorie ET type
 * @param {string} level - Le niveau de langue
 * @param {number} categoryId - L'ID de la catégorie
 * @param {string} type - Le type d'exercice
 * @returns {Array} Liste des exercices filtrés
 */
export const getExercisesByCategoryAndType = (level, categoryId, type) => {
  const data = getErrorsData(level);
  
  if (data?.getExercisesByCategoryAndType) {
    return data.getExercisesByCategoryAndType(categoryId, type);
  }
  
  return (
    data?.exercises?.filter(
      (ex) => ex.categoryId === categoryId && ex.type === type
    ) || []
  );
};

/**
 * Valide qu'un exercice d'error correction a la structure correcte
 * @param {Object} exercise - L'exercice à valider
 * @returns {boolean} True si l'exercice est valide
 */
export const validateErrorCorrectionExercise = (exercise) => {
  if (!exercise || typeof exercise !== "object") {
    return false;
  }

  // Champs requis pour tous les types
  const requiredFields = [
    "categoryId",
    "type",
    "text",
    "correctedText",
    "hint",
    "explanation",
  ];

  for (const field of requiredFields) {
    if (!exercise[field]) {
      return false;
    }
  }

  // Validation des types autorisés
  const validTypes = ["full", "identify", "multiple_choice"];
  if (!validTypes.includes(exercise.type)) {
    return false;
  }

  // Validation spécifique par type
  if (exercise.type === "multiple_choice") {
    if (
      !exercise.choices ||
      !Array.isArray(exercise.choices) ||
      exercise.choices.length < 2
    ) {
      return false;
    }

    if (
      typeof exercise.correctChoiceIndex !== "number" ||
      exercise.correctChoiceIndex < 0 ||
      exercise.correctChoiceIndex >= exercise.choices.length
    ) {
      return false;
    }
  } else if (!exercise.errorPositions || !Array.isArray(exercise.errorPositions)) {
    // Pour "full" et "identify", errorPositions est requis
    return false;
  }

  return true;
};

/**
 * Valide toutes les données d'un niveau donné
 * @param {string} level - Le niveau à valider
 * @returns {Object} Résultat de la validation avec détails
 */
export const validateErrorCorrectionData = (level) => {
  const data = getErrorsData(level);

  if (!data?.exercises) {
    return {
      valid: false,
      error: "No error correction data found",
      exerciseCount: 0,
    };
  }

  const results = {
    valid: true,
    exerciseCount: data.exercises.length,
    invalidExercises: [],
    errors: [],
    categoryCount: data.categories?.length ?? 0,
    typeDistribution: {
      full: 0,
      identify: 0,
      multiple_choice: 0,
    },
  };

  // Validation des exercices
  data.exercises.forEach((exercise, index) => {
    if (!validateErrorCorrectionExercise(exercise)) {
      results.valid = false;
      results.invalidExercises.push(index);
      results.errors.push(
        `Exercise ${index + 1} (category ${
          exercise.categoryId ?? "unknown"
        }) is invalid`
      );
    } else if (results.typeDistribution.hasOwnProperty(exercise.type)) {
      // Comptage par type
      results.typeDistribution[exercise.type]++;
    }
  });

  // Validation de la structure du niveau
  if (data.validateStructure && !data.validateStructure()) {
    results.valid = false;
    results.errors.push("Level structure validation failed");
  }

  return results;
};

/**
 * Récupère un exercice aléatoire d'un niveau et type donnés
 * @param {string} level - Le niveau de langue
 * @param {string} type - Le type d'exercice (optionnel)
 * @param {number} categoryId - L'ID de la catégorie (optionnel)
 * @returns {Object|null} Un exercice aléatoire ou null si aucun trouvé
 */
export const getRandomErrorCorrectionExercise = (
  level,
  type = null,
  categoryId = null
) => {
  const data = getErrorsData(level);

  if (!data?.exercises?.length) {
    return null;
  }

  let filteredExercises = data.exercises;

  // Filtrage par type si spécifié
  if (type) {
    filteredExercises = filteredExercises.filter((ex) => ex.type === type);
  }

  // Filtrage par catégorie si spécifiée
  if (categoryId) {
    filteredExercises = filteredExercises.filter(
      (ex) => ex.categoryId === categoryId
    );
  }

  if (filteredExercises.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * filteredExercises.length);
  return {
    ...filteredExercises[randomIndex],
    index: randomIndex,
    totalCount: filteredExercises.length,
    level,
  };
};

/**
 * Récupère les informations d'un mode d'exercice
 * @param {string} mode - Le mode (full, identify, multiple_choice)
 * @returns {Object} Informations sur le mode
 */
export const getModeInfo = (mode) => {
  const modes = {
    full: {
      name: "Full Correction",
      description: "Rewrite the entire text correcting all errors",
      difficulty: "Hard",
      icon: "✏️",
      color: "#ef4444",
    },
    identify: {
      name: "Identify Errors",
      description: "Click on words that contain errors",
      difficulty: "Medium",
      icon: "🔍",
      color: "#f59e0b",
    },
    multiple_choice: {
      name: "Multiple Choice",
      description: "Choose the correct option from multiple choices",
      difficulty: "Easy",
      icon: "✅",
      color: "#10b981",
    },
  };

  return modes[mode] ?? modes.full;
};

/**
 * Récupère des exercices recommandés basés sur les performances
 * @param {string} level - Le niveau actuel
 * @param {Array} completedExercises - Liste des exercices complétés
 * @param {Object} performance - Statistiques de performance
 * @returns {Array} Exercices recommandés
 */
export const getRecommendedExercises = (
  level,
  completedExercises = [],
  performance = {}
) => {
  const data = getErrorsData(level);

  if (!data?.exercises) {
    return [];
  }

  // Filtrer les exercices non complétés
  const availableExercises = data.exercises.filter(
    (ex) => !completedExercises.includes(`${ex.categoryId}_${ex.type}`)
  );

  // Si pas de données de performance, retourner des exercices variés
  if (!performance?.weakCategories) {
    return availableExercises.slice(0, 5);
  }

  // Prioriser les catégories faibles
  const recommendedExercises = [];

  performance.weakCategories.forEach((categoryId) => {
    const categoryExercises = availableExercises.filter(
      (ex) => ex.categoryId === categoryId
    );
    recommendedExercises.push(...categoryExercises.slice(0, 2));
  });

  return recommendedExercises.slice(0, 5);
};

/**
 * Export des niveaux disponibles avec leurs métadonnées
 */
export const getAvailableLevels = () => {
  return [
    {
      level: "A1",
      name: "Débutant",
      exercises: getErrorCorrectionStats("A1").exerciseCount,
    },
    {
      level: "A2",
      name: "Élémentaire",
      exercises: getErrorCorrectionStats("A2").exerciseCount,
    },
    {
      level: "B1",
      name: "Intermédiaire",
      exercises: getErrorCorrectionStats("B1").exerciseCount,
    },
    {
      level: "B2",
      name: "Intermédiaire avancé",
      exercises: getErrorCorrectionStats("B2").exerciseCount,
    },
    {
      level: "C1",
      name: "Autonome",
      exercises: getErrorCorrectionStats("C1").exerciseCount,
    },
    {
      level: "C2",
      name: "Maîtrise",
      exercises: getErrorCorrectionStats("C2").exerciseCount,
    },
  ];
};