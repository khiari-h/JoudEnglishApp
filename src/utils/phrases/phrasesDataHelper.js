// src/utils/phrases/phrasesDataHelper.js

// Import des données de phrases par niveau (6 niveaux + bonus)
import phrases1Data from "../../data/phrases/1";
import phrases2Data from "../../data/phrases/2";
import phrases3Data from "../../data/phrases/3";
import phrases4Data from "../../data/phrases/4";
import phrases5Data from "../../data/phrases/5";
import phrases6Data from "../../data/phrases/6";
import phrasesBonusData from "../../data/phrases/bonus";

/**
 * Récupère les données de phrases en fonction du niveau
 * @param {string} level - Le niveau de langue (1, 2, 3, 4, 5, 6, bonus)
 * @returns {Object} Les données de phrases pour le niveau spécifié
 */
export const getPhrasesData = (level) => {
  const dataMap = {
    "1": phrases1Data,
    "2": phrases2Data,
    "3": phrases3Data,
    "4": phrases4Data,
    "5": phrases5Data,
    "6": phrases6Data,
    "bonus": phrasesBonusData,
  };

  // Si le niveau demandé n'existe pas, on retourne le niveau 1 par défaut
  return dataMap[level] || phrases1Data;
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
  return colors[level] || "#3b82f6"; // Bleu par défaut (niveau 1)
};

/**
 * Récupère le nom d'affichage d'un niveau
 * @param {string} level - Le niveau de langue (1, 2, 3, 4, 5, 6, bonus)
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
 * @param {string} level - Le niveau de langue (1, 2, 3, 4, 5, 6, bonus)
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
  return icons[level] || "🗣️";
};

/**
 * Récupère le titre complet d'un niveau
 * @param {string} level - Le niveau de langue (1, 2, 3, 4, 5, 6, bonus)
 * @returns {string} Titre complet du niveau
 */
export const getLevelTitle = (level) => {
  const displayName = getLevelDisplayName(level);
  const description = getLevelDescription(level);
  return `${displayName} - ${description}`;
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
 * Récupère la liste des niveaux disponibles
 * @returns {Array} Liste des niveaux disponibles
 */
export const getAvailableLevels = () => {
  return ["1", "2", "3", "4", "5", "6", "bonus"];
};

/**
 * Récupère les statistiques d'un niveau de phrases
 * @param {string} level - Le niveau de langue
 * @returns {Object} Statistiques du niveau
 */
export const getPhrasesStats = (level) => {
  const data = getPhrasesData(level);
  
  if (!data || !data.phrases) {
    return { 
      totalPhrases: 0, 
      totalCategories: 0,
      averagePhrasesPerCategory: 0
    };
  }

  const totalPhrases = data.phrases.length;
  const totalCategories = data.categories ? data.categories.length : 0;

  return {
    totalPhrases,
    totalCategories,
    averagePhrasesPerCategory: totalCategories > 0 ? Math.round(totalPhrases / totalCategories) : 0,
    difficulty: data.difficulty || level,
  };
};

/**
 * Récupère les catégories d'un niveau
 * @param {string} level - Le niveau de langue
 * @returns {Array} Liste des catégories pour ce niveau
 */
export const getPhrasesCategories = (level) => {
  const data = getPhrasesData(level);
  return data.categories || [];
};

/**
 * Récupère les phrases d'une catégorie spécifique
 * @param {string} level - Le niveau de langue
 * @param {number} categoryId - L'ID de la catégorie
 * @returns {Array} Liste des phrases de la catégorie
 */
export const getPhrasesByCategory = (level, categoryId) => {
  const data = getPhrasesData(level);
  if (!data.phrases) return [];
  
  return data.phrases.filter(phrase => phrase.categoryId === categoryId);
};

/**
 * Récupère les métadonnées d'un niveau
 * @param {string} level - Le niveau de langue
 * @returns {Object} Métadonnées du niveau
 */
export const getPhrasesMetadata = (level) => {
  const data = getPhrasesData(level);
  return {
    difficulty: data.difficulty || level,
    categoryDescriptions: data.categoryDescriptions || {},
    usageNotes: data.usageNotes || {},
    levelInfo: data.levelInfo || {},
    contentStats: data.contentStats || {},
    learningSequence: data.learningSequence || [],
  };
};