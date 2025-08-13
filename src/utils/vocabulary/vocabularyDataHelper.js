/**
 * Formate une liste de mots pour garantir la présence des clés word et translation
 * @param {Array} data
 * @returns {Array}
 */
export const formatVocabularyList = (data = []) => {
  return data.map(entry => ({
    word: entry.word,
    translation: entry.translation
  }));
};
// src/utils/vocabulary/vocabularyDataHelper.js

// Import des données de vocabulaire par niveau (6 niveaux + bonus)
import vocabulary1Data from "../../data/vocabulary/1";
import vocabulary2Data from "../../data/vocabulary/2";
import vocabulary3Data from "../../data/vocabulary/3";
import vocabulary4Data from "../../data/vocabulary/4";
import vocabulary5Data from "../../data/vocabulary/5";
import vocabulary6Data from "../../data/vocabulary/6";
import vocabularyBonusData from "../../data/vocabulary/bonus";

// Import des données Fast Vocabulary (exports nommés, pas default)
import { vocab as fastVocab1 } from "../../data/fastVocabulary/1";
import { vocab as fastVocab2 } from "../../data/fastVocabulary/2";
import { vocab as fastVocab3 } from "../../data/fastVocabulary/3";
import { vocab as fastVocab4 } from "../../data/fastVocabulary/4";
import { vocab as fastVocab5 } from "../../data/fastVocabulary/5";
import { vocab as fastVocab6 } from "../../data/fastVocabulary/6";
import { vocab as fastVocabBonus } from "../../data/fastVocabulary/bonus";

/**
 * Fonction pour convertir la structure Fast vers la structure attendue
 * @param {Object} fastVocab - Données fast vocabulary
 * @returns {Object} Structure convertie pour l'app
 */
const convertFastVocabToExercises = (fastVocab) => {
  if (!fastVocab || !fastVocab.words) {
    return { exercises: [] };
  }

  return {
    exercises: [
      {
        title: fastVocab.title || "Vocabulaire Fast",
        words: fastVocab.words,
      },
    ],
  };
};

/**
 * Récupère les données de vocabulaire en fonction du niveau et du mode
 * @param {string} level - Le niveau de langue (1, 2, 3, 4, 5, 6, bonus)
 * @param {string} mode - Le mode ('classic' ou 'fast')
 * @returns {Object} Les données de vocabulaire pour le niveau et mode spécifiés
 */
export const getVocabularyData = (level, mode = "classic") => {
  if (mode === "fast") {
    const fastDataMap = {
      "1": convertFastVocabToExercises(fastVocab1),
      "2": convertFastVocabToExercises(fastVocab2),
      "3": convertFastVocabToExercises(fastVocab3),
      "4": convertFastVocabToExercises(fastVocab4),
      "5": convertFastVocabToExercises(fastVocab5),
      "6": convertFastVocabToExercises(fastVocab6),
      "bonus": convertFastVocabToExercises(fastVocabBonus),
    };

    return fastDataMap[level] || convertFastVocabToExercises(fastVocab1);
  }

  // Mode classic (6 niveaux standards + bonus)
  const classicDataMap = {
    "1": vocabulary1Data,
    "2": vocabulary2Data,
    "3": vocabulary3Data,
    "4": vocabulary4Data,
    "5": vocabulary5Data,
    "6": vocabulary6Data,
    "bonus": vocabularyBonusData,
  };

  return classicDataMap[level] || vocabulary1Data;
};

/**
 * Chargement dynamique des données de vocabulaire par niveau et mode
 * Utilise import() pour éviter de charger tous les niveaux au démarrage.
 * Conserve getVocabularyData pour compatibilité.
 */
export const loadVocabularyData = async (level, mode = "classic") => {
  try {
    if (mode === "fast") {
      const fastLoaders = {
        "1": () => import("../../data/fastVocabulary/1"),
        "2": () => import("../../data/fastVocabulary/2"),
        "3": () => import("../../data/fastVocabulary/3"),
        "4": () => import("../../data/fastVocabulary/4"),
        "5": () => import("../../data/fastVocabulary/5"),
        "6": () => import("../../data/fastVocabulary/6"),
        bonus: () => import("../../data/fastVocabulary/bonus"),
      };
      const loadFast = fastLoaders[level] || fastLoaders["1"];
      const fastModule = await loadFast();
      const fastVocab = fastModule.vocab || fastModule.default || {};
      return {
        exercises: [
          {
            title: fastVocab.title || "Vocabulaire Fast",
            words: fastVocab.words || [],
          },
        ],
      };
    }

    const loaders = {
      "1": () => import("../../data/vocabulary/1"),
      "2": () => import("../../data/vocabulary/2"),
      "3": () => import("../../data/vocabulary/3"),
      "4": () => import("../../data/vocabulary/4"),
      "5": () => import("../../data/vocabulary/5"),
      "6": () => import("../../data/vocabulary/6"),
      bonus: () => import("../../data/vocabulary/bonus"),
    };

    const load = loaders[level] || loaders["1"];
    const mod = await load();
    return mod.default || mod;
  } catch (error) {
    // Fallback: structure vide en cas d'échec
    return { exercises: [] };
  }
};

/**
 * Récupère la liste des niveaux disponibles selon le mode
 * @param {string} mode - Le mode ('classic' ou 'fast')
 * @returns {Array} Liste des niveaux disponibles
 */
export const getAvailableLevels = () => {
  return ["1", "2", "3", "4", "5", "6", "bonus"];
};

/**
 * Récupère la couleur associée à un niveau de langue
 * @param {string} level - Le niveau de langue (1, 2, 3, 4, 5, 6, bonus)
 * @returns {string} Code couleur hexadécimal pour le niveau
 */
export const getLevelColor = (level) => {
  const colors = {
    "1": "#3b82f6", // Bleu - Niveau 1
    "2": "#8b5cf6", // Violet - Niveau 2
    "3": "#10b981", // Vert - Niveau 3
    "4": "#f59e0b", // Orange - Niveau 4
    "5": "#ef4444", // Rouge - Niveau 5
    "6": "#6366f1", // Indigo - Niveau 6
    "bonus": "#9333EA", // Violet premium - Bonus
  };
  return colors[level] || "#5E60CE"; // Couleur par défaut
};

/**
 * Récupère le nom d'affichage d'un niveau
 * @param {string} level - Le niveau de langue
 * @returns {string} Nom d'affichage du niveau
 */
export const getLevelDisplayName = (level) => {
  const displayNames = {
    "1": "Niveau 1",
    "2": "Niveau 2", 
    "3": "Niveau 3",
    "4": "Niveau 4",
    "5": "Niveau 5",
    "6": "Niveau 6",
    "bonus": "Bonus",
  };
  return displayNames[level] || `Niveau ${level}`;
};

/**
 * Récupère la description d'un niveau
 * @param {string} level - Le niveau de langue
 * @returns {string} Description du niveau
 */
export const getLevelDescription = (level) => {
  const descriptions = {
    "1": "Communication basique, expressions simples du quotidien",
    "2": "Expressions simples, conversations courantes",
    "3": "Communication claire sur des sujets familiers",
    "4": "Communication complexe, discussions techniques",
    "5": "Expression fluide, sujets complexes",
    "6": "Niveau proche du locuteur natif, maîtrise de la langue",
    "bonus": "Contenu exclusif et avancé",
  };
  return descriptions[level] || "Niveau de langue";
};

/**
 * Récupère l'icône associée à un niveau
 * @param {string} level - Le niveau de langue
 * @returns {string} Emoji icône pour le niveau
 */
export const getLevelIcon = (level) => {
  const icons = {
    "1": "🌱",
    "2": "🌿",
    "3": "🌳",
    "4": "🚀",
    "5": "💎",
    "6": "🏆",
    "bonus": "🔥",
  };
  return icons[level] || "📚";
};

/**
 * Vérifie si un niveau est un niveau bonus
 * @param {string} level - Le niveau à vérifier
 * @returns {boolean} True si c'est un niveau bonus
 */
export const isBonusLevel = (level) => {
  return level === "bonus";
};

/**
 * Récupère les statistiques d'un niveau de vocabulaire
 * @param {string} level - Le niveau de langue
 * @param {string} mode - Le mode ('classic' ou 'fast')
 * @returns {Object} Statistiques du niveau
 */
export const getVocabularyStats = (level, mode = "classic") => {
  const data = getVocabularyData(level, mode);
  
  if (!data || !data.exercises) {
    return { totalWords: 0, totalExercises: 0 };
  }

  const totalExercises = data.exercises.length;
  const totalWords = data.exercises.reduce((sum, exercise) => {
    return sum + (exercise.words ? exercise.words.length : 0);
  }, 0);

  return {
    totalWords,
    totalExercises,
    averageWordsPerExercise: totalExercises > 0 ? Math.round(totalWords / totalExercises) : 0,
  };
};