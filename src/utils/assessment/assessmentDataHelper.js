// src/utils/assessment/assessmentDataHelper.js

// Import des données d'évaluation par niveau
import levelA1AssessmentData from "../../data/assessment/assessmentsA1";

/**
 * Récupère les données d'évaluation en fonction du niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {Object} Les données d'évaluation pour le niveau spécifié
 */
export const getAssessmentData = (level) => {
  const dataMap = {
    A1: levelA1AssessmentData,
  };
  return dataMap[level] || levelA1AssessmentData;
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
 * Obtient les sections de l'évaluation
 * @returns {Array} Liste des sections disponibles
 */
export const getAssessmentSections = () => [
  "vocabulary",
  "grammar",
  "phrases_expressions",
  "error_correction",
  "spelling",
  "spelling_rules",
  "reading_comprehension",
];

/**
 * Vérifie si c'est la dernière question dans une section
 * @param {number} questionIndex - Index de la question actuelle
 * @param {string} section - Section actuelle
 * @param {Object} assessmentData - Données d'évaluation
 * @returns {boolean} Vrai si c'est la dernière question de la section
 */
export const isLastQuestionInSection = (
  questionIndex,
  section,
  assessmentData
) => {
  if (!assessmentData || !assessmentData[section]) return false;
  return questionIndex === assessmentData[section].questions.length - 1;
};
