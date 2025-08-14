// src/data/exercises/reading/readingBonusIndex.js

import readingTextsBonus from './categories/readingTextsBonus.js';
import readingQuestionsBonus from './categories/readingQuestionsBonus.js';

// Fonction pour combiner textes et questions
const combineTextWithQuestions = (textId) => {
  const text = readingTextsBonus.find(t => t.id === textId);
  const questions = readingQuestionsBonus.find(q => q.textId === textId);

  if (!text || !questions) {
    return null;
  }

  return {
    ...text,
    questions: questions.questions
  };
};

// Fonction pour obtenir tous les exercices combinés
const getAllBonusExercises = () => {
  return readingTextsBonus.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Fonction pour obtenir un exercice par ID
const getBonusExerciseById = (textId) => {
  return combineTextWithQuestions(textId);
};

// Fonction pour obtenir des exercices par difficulté
const getBonusExercisesByDifficulty = (difficulty) => {
  const filteredTexts = readingTextsBonus.filter(text => text.difficulty === difficulty);
  return filteredTexts.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Fonction pour obtenir des exercices par sujet
const getBonusExercisesByTopic = (topic) => {
  const filteredTexts = readingTextsBonus.filter(text => 
    text.topics?.includes(topic)
  );
  return filteredTexts.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Métadonnées du niveau Bonus
const bonusMetadata = {
  level: "bonus",
  totalTexts: readingTextsBonus.length,
  totalQuestions: readingQuestionsBonus.reduce((sum, q) => sum + q.questions.length, 0),
  averageWordCount: Math.round(readingTextsBonus.reduce((sum, text) => sum + text.wordCount, 0) / readingTextsBonus.length),
  difficulties: [...new Set(readingTextsBonus.map(text => text.difficulty))].sort((a, b) => a.localeCompare(b)),
  topics: [...new Set(readingTextsBonus.flatMap(text => text.topics))].sort((a, b) => a.localeCompare(b)),
  description: "Native-level reading comprehension exercises featuring authentic content that native speakers encounter daily. Focuses on inference, tone analysis, and cultural understanding."
};

// Export par défaut avec structure complète
const readingBonusData = {
  metadata: bonusMetadata,
  exercises: getAllBonusExercises(),

  // Fonctions utilitaires
  getAll: getAllBonusExercises,
  getById: getBonusExerciseById,
  getByDifficulty: getBonusExercisesByDifficulty,
  getByTopic: getBonusExercisesByTopic,

  // Accès séparé aux données brutes
  texts: readingTextsBonus,
  questions: readingQuestionsBonus
};

export default readingBonusData;

// Exports nommés pour plus de flexibilité
export {
  readingTextsBonus,
  readingQuestionsBonus,
  getAllBonusExercises,
  getBonusExerciseById,
  getBonusExercisesByDifficulty,
  getBonusExercisesByTopic,
  bonusMetadata
};