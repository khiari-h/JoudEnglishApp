// src/utils/spelling/spellingDataHelper.js

// Import des données d'orthographe par niveau et type
// Niveau A1
import spellingCorrectionA1 from "../../data/spelling/A1/spellingCorrectionA1";
import spellingRulesA1 from "../../data/spelling/A1/spellingRulesA1";
import spellingHomophonesA1 from "../../data/spelling/A1/spellingHomophonesA1";

// Niveau A2
import spellingCorrectionA2 from "../../data/spelling/A2/spellingCorrectionA2";
import spellingRulesA2 from "../../data/spelling/A2/spellingRulesA2";
import spellingHomophonesA2 from "../../data/spelling/A2/spellingHomophonesA2";

// Niveau B1
import spellingCorrectionB1 from "../../data/spelling/B1/spellingCorrectionB1";
import spellingRulesB1 from "../../data/spelling/B1/spellingRulesB1";
import spellingHomophonesB1 from "../../data/spelling/B1/spellingHomophonesB1";

// Niveau B2
import spellingCorrectionB2 from "../../data/spelling/B2/spellingCorrectionB2";
import spellingRulesB2 from "../../data/spelling/B2/spellingRulesB2";
import spellingHomophonesB2 from "../../data/spelling/B2/spellingHomophonesB2";

// Niveau C1
import spellingCorrectionC1 from "../../data/spelling/C1/spellingCorrectionC1";
import spellingRulesC1 from "../../data/spelling/C1/spellingRulesC1";
import spellingHomophonesC1 from "../../data/spelling/C1/spellingHomophonesC1";

// Niveau C2
import spellingCorrectionC2 from "../../data/spelling/C2/spellingCorrectionC2";
import spellingRulesC2 from "../../data/spelling/C2/spellingRulesC2";
import spellingHomophonesC2 from "../../data/spelling/C2/spellingHomophonesC2";

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
    A2: {
      correction: spellingCorrectionA2,
      rules: spellingRulesA2,
      homophones: spellingHomophonesA2,
    },
    B1: {
      correction: spellingCorrectionB1,
      rules: spellingRulesB1,
      homophones: spellingHomophonesB1,
    },
    B2: {
      correction: spellingCorrectionB2,
      rules: spellingRulesB2,
      homophones: spellingHomophonesB2,
    },
    C1: {
      correction: spellingCorrectionC1,
      rules: spellingRulesC1,
      homophones: spellingHomophonesC1,
    },
    C2: {
      correction: spellingCorrectionC2,
      rules: spellingRulesC2,
      homophones: spellingHomophonesC2,
    },
  };

  // Sélectionner les données appropriées
  if (dataMap[level]?.[type]) {
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

    // Compter tous les niveaux maintenant qu'ils sont implémentés
    globalStats.byType.correction += levelStats.correction;
    globalStats.byType.rules += levelStats.rules;
    globalStats.byType.homophones += levelStats.homophones;
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

      return false;
    }
  }

  // Validation spécifique par type
  switch (exercise.type) {
    case "correction":
      if (!exercise.wordToCorrect) {

        return false;
      }
      break;

    case "spelling_rule":
      if (!exercise.rule) {

        return false;
      }
      break;

    case "homophones":
      if (!exercise.sentence || !exercise.choices || !Array.isArray(exercise.choices)) {

        return false;
      }
      if (exercise.choices.length < 2) {

        return false;
      }
      if (!exercise.choices.includes(exercise.correctAnswer)) {

        return false;
      }
      break;

    default:

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
