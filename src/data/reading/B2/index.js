// src/data/exercises/reading/readingB2Index.js

import readingTextsB2 from './categories/readingTextsB2.js';
import readingQuestionsB2 from './categories/readingQuestionsB2.js';

// Fonction pour combiner textes et questions
const combineTextWithQuestions = (textId) => {
  const text = readingTextsB2.find(t => t.id === textId);
  const questions = readingQuestionsB2.find(q => q.textId === textId);

  if (!text || !questions) {

    return null;
  }

  return {
    ...text,
    questions: questions.questions
  };
};

// Fonction pour obtenir tous les exercices combinés
const getAllB2Exercises = () => {
  return readingTextsB2.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Fonction pour obtenir un exercice par ID
const getB2ExerciseById = (textId) => {
  return combineTextWithQuestions(textId);
};

// Fonction pour obtenir des exercices par difficulté
const getB2ExercisesByDifficulty = (difficulty) => {
  const filteredTexts = readingTextsB2.filter(text => text.difficulty === difficulty);
  return filteredTexts.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Fonction pour obtenir des exercices par sujet
const getB2ExercisesByTopic = (topic) => {
  const filteredTexts = readingTextsB2.filter(text => 
    text.topics?.includes(topic)
  );
  return filteredTexts.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Métadonnées du niveau B2
const b2Metadata = {
  level: "B2",
  totalTexts: readingTextsB2.length,
  totalQuestions: readingQuestionsB2.reduce((sum, q) => sum + q.questions.length, 0),
  averageWordCount: Math.round(readingTextsB2.reduce((sum, text) => sum + text.wordCount, 0) / readingTextsB2.length),
  difficulties: [...new Set(readingTextsB2.map(text => text.difficulty))].sort(),
  topics: [...new Set(readingTextsB2.flatMap(text => text.topics))].sort(),
  description: "Upper-intermediate level reading comprehension exercises focusing on complex arguments, detailed analysis, and sophisticated vocabulary in academic and professional contexts."
};

// Export par défaut avec structure complète
const readingB2Data = {
  metadata: b2Metadata,
  exercises: getAllB2Exercises(),

  // Fonctions utilitaires
  getAll: getAllB2Exercises,
  getById: getB2ExerciseById,
  getByDifficulty: getB2ExercisesByDifficulty,
  getByTopic: getB2ExercisesByTopic,

  // Accès séparé aux données brutes
  texts: readingTextsB2,
  questions: readingQuestionsB2
};

export default readingB2Data;

// Exports nommés pour plus de flexibilité
export {
  readingTextsB2,
  readingQuestionsB2,
  getAllB2Exercises,
  getB2ExerciseById,
  getB2ExercisesByDifficulty,
  getB2ExercisesByTopic,
  b2Metadata
};
