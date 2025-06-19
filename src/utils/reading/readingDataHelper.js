// src/utils/reading/readingDataHelper.js

// Import de tous les index des niveaux de lecture (6 niveaux + bonus)
import reading1Data from "../../data/reading/1";
import reading2Data from "../../data/reading/2";
import reading3Data from "../../data/reading/3";
import reading4Data from "../../data/reading/4";
import reading5Data from "../../data/reading/5";
import reading6Data from "../../data/reading/6";
import readingBonusData from "../../data/reading/bonus";

/**
 * Récupère les données de lecture en fonction du niveau
 * @param {string} level - Le niveau de langue (1, 2, 3, 4, 5, 6, bonus)
 * @returns {Object} Les données de lecture pour le niveau spécifié
 */
export const getReadingData = (level) => {
  const dataMap = {
    "1": reading1Data,
    "2": reading2Data,
    "3": reading3Data,
    "4": reading4Data,
    "5": reading5Data,
    "6": reading6Data,
    "bonus": readingBonusData,
  };
  
  // Si le niveau demandé n'existe pas, on retourne le niveau 1 par défaut
  return dataMap[level] || reading1Data;
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
  return icons[level] || "📖";
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
 * Récupère les statistiques d'un niveau de lecture
 * @param {string} level - Le niveau de langue
 * @returns {Object} Statistiques du niveau
 */
export const getReadingStats = (level) => {
  const data = getReadingData(level);
  
  if (!data || !data.exercises) {
    return { 
      totalTexts: 0, 
      totalQuestions: 0,
      averageWordCount: 0,
      averageQuestionsPerText: 0
    };
  }

  const totalTexts = data.exercises.length;
  const totalQuestions = data.exercises.reduce((sum, exercise) => {
    return sum + (exercise.questions ? exercise.questions.length : 0);
  }, 0);
  
  const totalWords = data.exercises.reduce((sum, exercise) => {
    return sum + (exercise.wordCount || 0);
  }, 0);

  return {
    totalTexts,
    totalQuestions,
    averageWordCount: totalTexts > 0 ? Math.round(totalWords / totalTexts) : 0,
    averageQuestionsPerText: totalTexts > 0 ? Math.round(totalQuestions / totalTexts) : 0,
    level: data.metadata?.level || level,
  };
};

/**
 * Récupère un exercice de lecture par ID
 * @param {string} level - Le niveau de langue
 * @param {string} textId - L'ID du texte
 * @returns {Object|null} L'exercice trouvé ou null
 */
export const getReadingExerciseById = (level, textId) => {
  const data = getReadingData(level);
  if (!data.exercises) return null;
  
  return data.exercises.find(exercise => exercise.id === textId) || null;
};

/**
 * Récupère les exercices par difficulté
 * @param {string} level - Le niveau de langue
 * @param {number} difficulty - La difficulté (1, 2, 3...)
 * @returns {Array} Liste des exercices de cette difficulté
 */
export const getReadingExercisesByDifficulty = (level, difficulty) => {
  const data = getReadingData(level);
  if (!data.exercises) return [];
  
  return data.exercises.filter(exercise => exercise.difficulty === difficulty);
};

/**
 * Récupère les exercices par sujet/topic
 * @param {string} level - Le niveau de langue
 * @param {string} topic - Le sujet recherché
 * @returns {Array} Liste des exercices sur ce sujet
 */
export const getReadingExercisesByTopic = (level, topic) => {
  const data = getReadingData(level);
  if (!data.exercises) return [];
  
  return data.exercises.filter(exercise => 
    exercise.topics && exercise.topics.includes(topic)
  );
};

/**
 * Récupère tous les sujets disponibles pour un niveau
 * @param {string} level - Le niveau de langue
 * @returns {Array} Liste unique des sujets disponibles
 */
export const getAvailableTopics = (level) => {
  const data = getReadingData(level);
  if (!data.exercises) return [];
  
  const allTopics = data.exercises.flatMap(exercise => exercise.topics || []);
  return [...new Set(allTopics)].sort();
};

/**
 * Récupère les métadonnées d'un niveau de lecture
 * @param {string} level - Le niveau de langue
 * @returns {Object} Métadonnées du niveau
 */
export const getReadingMetadata = (level) => {
  const data = getReadingData(level);
  return data.metadata || {
    level: level,
    totalTexts: 0,
    totalQuestions: 0,
    averageWordCount: 0,
    difficulties: [],
    topics: [],
    description: "Exercices de compréhension écrite"
  };
};

/**
 * Récupère un exercice aléatoire pour un niveau
 * @param {string} level - Le niveau de langue
 * @returns {Object|null} Un exercice aléatoire ou null
 */
export const getRandomReadingExercise = (level) => {
  const data = getReadingData(level);
  if (!data.exercises || data.exercises.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * data.exercises.length);
  return data.exercises[randomIndex];
};