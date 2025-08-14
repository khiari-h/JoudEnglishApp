// src/data/exercises/reading/readingA1Index.js

import readingTextsA1 from './categories/readingTextsA1.js';
import readingQuestionsA1 from './categories/readingQuestionsA1.js';

// Fonction pour combiner textes et questions
const combineTextWithQuestions = (textId) => {
  const text = readingTextsA1.find(t => t.id === textId);
  const questions = readingQuestionsA1.find(q => q.textId === textId);

  if (!text || !questions) {

    return null;
  }

  return {
    ...text,
    questions: questions.questions
  };
};

// Fonction pour obtenir tous les exercices combinés
const getAllA1Exercises = () => {
  return readingTextsA1.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Fonction pour obtenir un exercice par ID
const getA1ExerciseById = (textId) => {
  return combineTextWithQuestions(textId);
};

// Fonction pour obtenir des exercices par difficulté
const getA1ExercisesByDifficulty = (difficulty) => {
  const filteredTexts = readingTextsA1.filter(text => text.difficulty === difficulty);
  return filteredTexts.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Fonction pour obtenir des exercices par sujet
const getA1ExercisesByTopic = (topic) => {
  const filteredTexts = readingTextsA1.filter(text => 
    text.topics?.includes(topic)
  );
  return filteredTexts.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Métadonnées du niveau A1
const a1Metadata = {
  level: "A1",
  totalTexts: readingTextsA1.length,
  totalQuestions: readingQuestionsA1.reduce((sum, q) => sum + q.questions.length, 0),
  averageWordCount: Math.round(readingTextsA1.reduce((sum, text) => sum + text.wordCount, 0) / readingTextsA1.length),
  difficulties: [...new Set(readingTextsA1.map(text => text.difficulty))].sort((a, b) => a.localeCompare(b)),
  topics: [...new Set(readingTextsA1.flatMap(text => text.topics))].sort((a, b) => a.localeCompare(b)),
  description: "Beginner level reading comprehension exercises focusing on everyday situations and basic vocabulary."
};

// Export par défaut avec structure complète
const readingA1Data = {
  metadata: a1Metadata,
  exercises: getAllA1Exercises(),

  // Fonctions utilitaires
  getAll: getAllA1Exercises,
  getById: getA1ExerciseById,
  getByDifficulty: getA1ExercisesByDifficulty,
  getByTopic: getA1ExercisesByTopic,

  // Accès séparé aux données brutes
  texts: readingTextsA1,
  questions: readingQuestionsA1
};

export default readingA1Data;

// Exports nommés pour plus de flexibilité
export {
  readingTextsA1,
  readingQuestionsA1,
  getAllA1Exercises,
  getA1ExerciseById,
  getA1ExercisesByDifficulty,
  getA1ExercisesByTopic,
  a1Metadata
};
