// src/utils/assessment/assessmentDataHelper.js - VERSION MISE À JOUR

// Import des données d'évaluation par niveau
import level1AssessmentData from "../../data/assessment/assessmentsA1";
import level2AssessmentData from "../../data/assessment/assessmentsA2";
import level3AssessmentData from "../../data/assessment/assessmentsB1";
import level4AssessmentData from "../../data/assessment/assessmentsB2";
import level5AssessmentData from "../../data/assessment/assessmentsC1";
import level6AssessmentData from "../../data/assessment/assessmentsC2";

/**
 * Récupère les données d'évaluation en fonction du niveau
 * @param {string|number} level - Le niveau de langue (1, 2, 3, 4, 5, 6)
 * @returns {Object} Les données d'évaluation pour le niveau spécifié
 */
export const getAssessmentData = (level) => {
  // Convertir le niveau en string pour la correspondance
  const levelStr = String(level);
  
  const dataMap = {
    "1": level1AssessmentData,  // Ancien A1
    "2": level2AssessmentData,  // Ancien A2
    "3": level3AssessmentData,  // Ancien B1
    "4": level4AssessmentData,  // Ancien B2
    "5": level5AssessmentData,  // Ancien C1
    "6": level6AssessmentData,  // Ancien C2
  };
  
  console.log('🔍 DEBUG getAssessmentData:', { level, levelStr, hasData: !!dataMap[levelStr] });
  
  return dataMap[levelStr] ?? level1AssessmentData; // Fallback vers niveau 1
};

/**
 * Récupère la couleur associée à un niveau de langue
 * @param {string|number} level - Le niveau de langue (1, 2, 3, 4, 5, 6)
 * @returns {string} Code couleur hexadécimal pour le niveau
 */
export const getLevelColor = (level) => {
  // Convertir le niveau en string pour la correspondance
  const levelStr = String(level);
  
  const colors = {
    "1": "#3b82f6", // Bleu (ancien A1)
    "2": "#8b5cf6", // Violet (ancien A2)
    "3": "#10b981", // Vert (ancien B1)
    "4": "#f59e0b", // Orange (ancien B2)
    "5": "#ef4444", // Rouge (ancien C1)
    "6": "#6366f1", // Indigo (ancien C2)
  };
  
  return colors[levelStr] || "#4361EE"; // Couleur par défaut
};

/**
 * Obtient les sections de l'évaluation
 * @returns {Array} Liste des sections disponibles (11 sections × 5 questions = 55 questions)
 */
export const getAssessmentSections = () => [
  "vocabulary",
  "grammar",
  "phrases_expressions",
  "numbers_time",        // ← AJOUTÉ
  "can_cant",           // ← AJOUTÉ
  "prepositions",       // ← AJOUTÉ
  "demonstratives",     // ← AJOUTÉ
  "error_correction",

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
  return questionIndex === (assessmentData[section]?.questions?.length || 0) - 1;
};
