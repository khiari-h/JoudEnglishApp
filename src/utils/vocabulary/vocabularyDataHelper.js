// utils/vocabularyDataHelper.js

// Import des données de vocabulaire par niveau (6 niveaux complets)
import vocabulary1Data from "../../data/vocabulary/1";
import vocabulary2Data from "../../data/vocabulary/2";
import vocabulary3Data from "../../data/vocabulary/3";
import vocabulary4Data from "../../data/vocabulary/4";
import vocabulary5Data from "../../data/vocabulary/5";
import vocabulary6Data from "../../data/vocabulary/6";

// Import des données Fast Vocabulary (exports nommés, pas default)
import { vocab as fastVocab1 } from "../../data/fastVocabulary/1";
import { vocab as fastVocab2 } from "../../data/fastVocabulary/2";
import { vocab as fastVocab3 } from "../../data/fastVocabulary/3";
import { vocab as fastVocab4 } from "../../data/fastVocabulary/4";
import { vocab as fastVocab5 } from "../../data/fastVocabulary/5";
import { vocab as fastVocab6 } from "../../data/fastVocabulary/6";
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
      "bonus": convertFastVocabToExercises(fastVocabBLevel),
    };

    const data = fastDataMap[level] || convertFastVocabToExercises(fastVocab1);
    return data;
  }

  // Mode classic (6 niveaux standards)
  const classicDataMap = {
    "1": vocabulary1Data,
    "2": vocabulary2Data,
    "3": vocabulary3Data,
    "4": vocabulary4Data,
    "5": vocabulary5Data,
    "6": vocabulary6Data,
  };

  const data = classicDataMap[level] || vocabulary1Data;
  return data;
};

/**
 * Récupère la liste des niveaux disponibles selon le mode
 * @param {string} mode - Le mode ('classic' ou 'fast')
 * @returns {Array} Liste des niveaux disponibles
 */
export const getAvailableLevels = (mode = "classic") => {
  if (mode === "fast") {
    return ["1", "2", "3", "4", "5", "6", "bonus"]; // 7 niveaux avec bonus
  }
  return ["1", "2", "3", "4", "5", "6"]; // 6 niveaux standards
};

/**
 * Récupère la couleur associée à un niveau de langue
 * @param {string} level - Le niveau de langue (1, 2, 3, 4, 5, 6, bonus)
 * @returns {string} Code couleur hexadécimal pour le niveau
 */
export const getLevelColor = (level) => {
  const colors = {
    "1": "#3b82f6", // Bleu - Débutant
    "2": "#16a34a", // Vert - Élémentaire
    "3": "#f97316", // Orange - Intermédiaire
    "4": "#eab308", // Jaune doré - Intermédiaire+
    "5": "#ef4444", // Rouge - Avancé
    "6": "#8b5cf6", // Violet - Maîtrise
    "bonus": "#f59e0b", // Orange spécial pour le niveau bonus
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
    "1": "Débutant",
    "2": "Élémentaire",
    "3": "Intermédiaire",
    "4": "Intermédiaire+",
    "5": "Avancé",
    "6": "Maîtrise",
    "bonus": "Bonus Level", // Niveau spécial
  };
  return displayNames[level] || `Niveau ${level}`;
};

/**
 * Vérifie si un niveau est un niveau bonus
 * @param {string} level - Le niveau à vérifier
 * @returns {boolean} True si c'est un niveau bonus
 */
export const isBonusLevel = (level) => {
  return level === "bonus";
};