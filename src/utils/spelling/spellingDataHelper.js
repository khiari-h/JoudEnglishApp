// src/utils/spelling/spellingDataHelper.js

// Import des données d'orthographe par niveau et type
import spellingCorrectionA1 from "../../data/spelling/A1/spellingCorrectionA1";
import spellingRulesA1 from "../../data/spelling/A1/spellingRulesA1";
import spellingHomophonesA1 from "../../data/spelling/A1/spellingHomophonesA1";

/**
 * Récupère les données d'exercices d'orthographe en fonction du niveau et du type
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @param {string} type - Le type d'exercice (correction, rules, homophones)
 * @returns {Object} Les données d'exercices d'orthographe pour le niveau et type spécifiés
 */
export const getSpellingData = (level, type) => {
  // Mapping des données par niveau et type
  const dataMap = {
    A1: {
      correction: spellingCorrectionA1,
      rules: spellingRulesA1,
      homophones: spellingHomophonesA1,
    },
    // TODO: Ajouter d'autres niveaux
    A2: {
      // Fallback temporaire vers A1 en attendant l'implémentation
      correction: spellingCorrectionA1,
      rules: spellingRulesA1,
      homophones: spellingHomophonesA1,
    },
    B1: {
      // Fallback temporaire vers A1 en attendant l'implémentation
      correction: spellingCorrectionA1,
      rules: spellingRulesA1,
      homophones: spellingHomophonesA1,
    },
    B2: {
      // Fallback temporaire vers A1 en attendant l'implémentation
      correction: spellingCorrectionA1,
      rules: spellingRulesA1,
      homophones: spellingHomophonesA1,
    },
    C1: {
      // Fallback temporaire vers A1 en attendant l'implémentation
      correction: spellingCorrectionA1,
      rules: spellingRulesA1,
      homophones: spellingHomophonesA1,
    },
    C2: {
      // Fallback temporaire vers A1 en attendant l'implémentation
      correction: spellingCorrectionA1,
      rules: spellingRulesA1,
      homophones: spellingHomophonesA1,
    },
  };

  // Sélectionner les données appropriées
  if (dataMap[level] && dataMap[level][type]) {
    return dataMap[level][type];
  }

  // Fallback par type si le niveau n'existe pas
  const fallbackMap = {
    correction: spellingCorrectionA1,
    rules: spellingRulesA1,
    homophones: spellingHomophonesA1,
  };

  return fallbackMap[type] || spellingCorrectionA1;
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
 * Récupère la liste des types d'exercices disponibles avec leurs métadonnées
 * @returns {Array} Liste des types d'exercices avec icônes et descriptions
 */
export const getAvailableExerciseTypes = () => {
  return [
    {
      type: "correction",
      title: "Spelling Correction",
      description: "Correct common spelling mistakes",
      icon: "✏️",
      color: "#ef4444"
    },
    {
      type: "rules", 
      title: "Spelling Rules",
      description: "Learn and apply spelling rules & patterns",
      icon: "📚",
      color: "#10b981"
    },
    {
      type: "homophones",
      title: "Homophones", 
      description: "Distinguish words that sound the same",
      icon: "👂",
      color: "#8b5cf6"
    }
  ];
};

/**
 * Récupère le nombre total d'exercices pour un niveau donné
 * @param {string} level - Le niveau de langue
 * @returns {Object} Répartition des exercices par type
 */
export const getExerciseStats = (level) => {
  const stats = {
    correction: 0,
    rules: 0,
    homophones: 0,
    total: 0
  };

  try {
    const correctionData = getSpellingData(level, "correction");
    const rulesData = getSpellingData(level, "rules");
    const homophonesData = getSpellingData(level, "homophones");

    stats.correction = correctionData?.exercises?.length || 0;
    stats.rules = rulesData?.exercises?.length || 0;
    stats.homophones = homophonesData?.exercises?.length || 0;
    stats.total = stats.correction + stats.rules + stats.homophones;
  } catch (error) {
    console.error("Error calculating exercise stats:", error);
  }

  return stats;
};

/**
 * Récupère les statistiques globales pour tous les niveaux implémentés
 * @returns {Object} Statistiques complètes du programme
 */
export const getGlobalStats = () => {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const globalStats = {
    totalExercises: 0,
    byLevel: {},
    byType: {
      correction: 0,
      rules: 0,
      homophones: 0
    }
  };

  levels.forEach(level => {
    const levelStats = getExerciseStats(level);
    globalStats.byLevel[level] = levelStats;
    globalStats.totalExercises += levelStats.total;
    
    // Seulement compter A1 pour éviter les doublons des fallbacks
    if (level === "A1") {
      globalStats.byType.correction += levelStats.correction;
      globalStats.byType.rules += levelStats.rules;
      globalStats.byType.homophones += levelStats.homophones;
    }
  });

  return globalStats;
};

/**
 * Valide qu'un exercice a la structure correcte selon son type
 * @param {Object} exercise - L'exercice à valider
 * @returns {boolean} True si l'exercice est valide
 */
export const validateExercise = (exercise) => {
  if (!exercise || typeof exercise !== "object") {
    return false;
  }

  // Champs requis pour tous les types
  const requiredFields = ["type", "instruction", "correctAnswer"];
  
  for (const field of requiredFields) {
    if (!exercise[field]) {
      console.warn(`Missing required field: ${field}`);
      return false;
    }
  }

  // Validation spécifique par type
  switch (exercise.type) {
    case "correction":
      if (!exercise.wordToCorrect) {
        console.warn("Correction exercise missing wordToCorrect");
        return false;
      }
      break;
    
    case "spelling_rule":
      if (!exercise.rule) {
        console.warn("Spelling rule exercise missing rule");
        return false;
      }
      break;
    
    case "homophones":
      if (!exercise.sentence || !exercise.choices || !Array.isArray(exercise.choices)) {
        console.warn("Homophones exercise missing sentence or choices");
        return false;
      }
      if (exercise.choices.length < 2) {
        console.warn("Homophones exercise needs at least 2 choices");
        return false;
      }
      if (!exercise.choices.includes(exercise.correctAnswer)) {
        console.warn("Homophones exercise correctAnswer not in choices");
        return false;
      }
      break;
    
    default:
      console.warn(`Unknown exercise type: ${exercise.type}`);
      return false;
  }

  return true;
};

/**
 * Valide toutes les données d'un niveau et type donnés
 * @param {string} level - Le niveau à valider
 * @param {string} type - Le type d'exercice à valider
 * @returns {Object} Résultat de la validation avec détails
 */
export const validateExerciseData = (level, type) => {
  const data = getSpellingData(level, type);
  
  if (!data || !data.exercises) {
    return {
      valid: false,
      error: "No exercise data found",
      exerciseCount: 0
    };
  }

  const results = {
    valid: true,
    exerciseCount: data.exercises.length,
    invalidExercises: [],
    errors: []
  };

  data.exercises.forEach((exercise, index) => {
    if (!validateExercise(exercise)) {
      results.valid = false;
      results.invalidExercises.push(index);
      results.errors.push(`Exercise ${index + 1} is invalid`);
    }
  });

  return results;
};

/**
 * Récupère un exercice aléatoire d'un niveau et type donnés
 * @param {string} level - Le niveau de langue
 * @param {string} type - Le type d'exercice
 * @returns {Object|null} Un exercice aléatoire ou null si aucun trouvé
 */
export const getRandomExercise = (level, type) => {
  const data = getSpellingData(level, type);
  
  if (!data || !data.exercises || data.exercises.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * data.exercises.length);
  return {
    ...data.exercises[randomIndex],
    index: randomIndex,
    totalCount: data.exercises.length
  };
};