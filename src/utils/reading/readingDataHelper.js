// src/utils/reading/readingHelper.js

// Import de tous les index des niveaux CECR
import readingA1Data from "../../data/reading/A1";
import readingA2Data from "../../data/reading/A2";
import readingB1Data from "../../data/reading/B1";
import readingB2Data from "../../data/reading/B2";
import readingC1Data from "../../data/reading/C1";
import readingC2Data from "../../data/reading/C2";

/**
 * Récupère les données de lecture en fonction du niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {Object} Les données de lecture pour le niveau spécifié
 */
export const getReadingData = (level) => {
  const dataMap = {
    A1: readingA1Data,
    A2: readingA2Data,
    B1: readingB1Data,
    B2: readingB2Data,
    C1: readingC1Data,
    C2: readingC2Data,
  };
  return dataMap[level] || readingA1Data; // A1 par défaut
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
  return colors[level] || "#3b82f6"; // Bleu par défaut
};

