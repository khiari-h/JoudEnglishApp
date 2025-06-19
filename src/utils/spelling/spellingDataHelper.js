// src/utils/spelling/spellingDataHelper.js - VERSION NETTOYÉE

// Import des données d'orthographe par niveau et type
import spellingCorrection1 from "../../data/spelling/1/spellingCorrection1";
import spellingRules1 from "../../data/spelling/1/spellingRules1";
import spellingHomophones1 from "../../data/spelling/1/spellingHomophones1";

import spellingCorrection2 from "../../data/spelling/2/spellingCorrection2";
import spellingRules2 from "../../data/spelling/2/spellingRules2";
import spellingHomophones2 from "../../data/spelling/2/spellingHomophones2";

import spellingCorrection3 from "../../data/spelling/3/spellingCorrection3";
import spellingRules3 from "../../data/spelling/3/spellingRules3";
import spellingHomophones3 from "../../data/spelling/3/spellingHomophones3";

import spellingCorrection4 from "../../data/spelling/4/spellingCorrection4";
import spellingRules4 from "../../data/spelling/4/spellingRules4";
import spellingHomophones4 from "../../data/spelling/4/spellingHomophones4";

import spellingCorrection5 from "../../data/spelling/5/spellingCorrection5";
import spellingRules5 from "../../data/spelling/5/spellingRules5";
import spellingHomophones5 from "../../data/spelling/5/spellingHomophones5";

import spellingCorrection6 from "../../data/spelling/6/spellingCorrection6";
import spellingRules6 from "../../data/spelling/6/spellingRules6";
import spellingHomophones6 from "../../data/spelling/6/spellingHomophones6";

/**
 * Récupère les données d'exercices d'orthographe
 */
export const getSpellingData = (level, type) => {
  const dataMap = {
    "1": {
      correction: spellingCorrection1,
      rules: spellingRules1,
      homophones: spellingHomophones1,
    },
    "2": {
      correction: spellingCorrection2,
      rules: spellingRules2,
      homophones: spellingHomophones2,
    },
    "3": {
      correction: spellingCorrection3,
      rules: spellingRules3,
      homophones: spellingHomophones3,
    },
    "4": {
      correction: spellingCorrection4,
      rules: spellingRules4,
      homophones: spellingHomophones4,
    },
    "5": {
      correction: spellingCorrection5,
      rules: spellingRules5,
      homophones: spellingHomophones5,
    },
    "6": {
      correction: spellingCorrection6,
      rules: spellingRules6,
      homophones: spellingHomophones6,
    },
  };

  if (dataMap[level]?.[type]) {
    return dataMap[level][type];
  }

  // Fallback
  const fallbackMap = {
    correction: spellingCorrection1,
    rules: spellingRules1,
    homophones: spellingHomophones1,
  };

  return fallbackMap[type] || spellingCorrection1;
};

/**
 * Récupère la couleur associée à un niveau
 */
export const getLevelColor = (level) => {
  const colors = {
    "1": "#3b82f6",
    "2": "#8b5cf6",
    "3": "#10b981",
    "4": "#f59e0b",
    "5": "#ef4444",
    "6": "#6366f1",
  };
  
  return colors[level] || "#4361EE";
};

/**
 * Récupère les types d'exercices disponibles
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