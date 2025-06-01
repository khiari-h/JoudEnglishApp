// utils/vocabularyDataHelper.js

// Import des données de vocabulaire par niveau (6 niveaux complets)
import vocabularyA1Data from "../../data/vocabulary/A1";
import vocabularyA2Data from "../../data/vocabulary/A2";
import vocabularyB1Data from "../../data/vocabulary/B1";
import vocabularyB2Data from "../../data/vocabulary/B2";
import vocabularyC1Data from "../../data/vocabulary/C1";
import vocabularyC2Data from "../../data/vocabulary/C2";

// Import des données Fast Vocabulary (exports nommés, pas default)
import { vocab as fastVocabA1 } from "../../data/fastVocabulary/A1";
import { vocab as fastVocabA2 } from "../../data/fastVocabulary/A2";
import { vocab as fastVocabB1 } from "../../data/fastVocabulary/B1";
import { vocab as fastVocabB2 } from "../../data/fastVocabulary/B2";
import { vocab as fastVocabC1 } from "../../data/fastVocabulary/C1";
import { vocab as fastVocabC2 } from "../../data/fastVocabulary/C2";
import { vocab as fastVocabBLevel } from "../../data/fastVocabulary/BLevel";

// Fonction pour convertir la structure Fast vers la structure attendue
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
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2, BLevel)
 * @param {string} mode - Le mode ('classic' ou 'fast')
 * @returns {Object} Les données de vocabulaire pour le niveau et mode spécifiés
 */
export const getVocabularyData = (level, mode = "classic") => {

  if (mode === "fast") {
    const fastDataMap = {
      A1: convertFastVocabToExercises(fastVocabA1),
      A2: convertFastVocabToExercises(fastVocabA2),
      B1: convertFastVocabToExercises(fastVocabB1),
      B2: convertFastVocabToExercises(fastVocabB2),
      C1: convertFastVocabToExercises(fastVocabC1),
      C2: convertFastVocabToExercises(fastVocabC2),
      BLevel: convertFastVocabToExercises(fastVocabBLevel),
    };

    const data = fastDataMap[level] || convertFastVocabToExercises(fastVocabA1);

    return data;
  }

  // Mode classic (6 niveaux standards)
  const classicDataMap = {
    A1: vocabularyA1Data,
    A2: vocabularyA2Data,
    B1: vocabularyB1Data,
    B2: vocabularyB2Data,
    C1: vocabularyC1Data,
    C2: vocabularyC2Data,
  };

  const data = classicDataMap[level] || vocabularyA1Data;

  return data;
};

/**
 * Récupère la liste des niveaux disponibles selon le mode
 * @param {string} mode - Le mode ('classic' ou 'fast')
 * @returns {Array} Liste des niveaux disponibles
 */
export const getAvailableLevels = (mode = "classic") => {
  if (mode === "fast") {
    return ["A1", "A2", "B1", "B2", "C1", "C2", "BLevel"]; // 7 niveaux avec bonus
  }
  return ["A1", "A2", "B1", "B2", "C1", "C2"]; // 6 niveaux standards
};

/**
 * Récupère la couleur associée à un niveau de langue
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2, BLevel)
 * @returns {string} Code couleur hexadécimal pour le niveau
 */
export const getLevelColor = (level) => {
  const colors = {
    A1: "#3b82f6", // Bleu
    A2: "#16a34a", // Vert
    B1: "#f97316", // Orange
    B2: "#eab308", // Jaune doré
    C1: "#ef4444", // Rouge
    C2: "#8b5cf6", // Violet
    BLevel: "#f59e0b", // Orange spécial pour le niveau bonus
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
    A1: "Débutant",
    A2: "Élémentaire",
    B1: "Intermédiaire",
    B2: "Intermédiaire+",
    C1: "Avancé",
    C2: "Maîtrise",
    BLevel: "Bonus Level", // Niveau spécial
  };
  return displayNames[level] || level;
};

/**
 * Vérifie si un niveau est un niveau bonus
 * @param {string} level - Le niveau à vérifier
 * @returns {boolean} True si c'est un niveau bonus
 */
export const isBonusLevel = (level) => {
  return level === "BLevel";
};

