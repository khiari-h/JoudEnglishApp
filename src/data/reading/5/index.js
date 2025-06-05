// src/data/exercises/reading/readingC1Index.js

import readingTextsC1 from './categories/readingTextsC1.js';
import readingQuestionsC1 from './categories/readingQuestionsC1.js';

// Fonction pour combiner textes et questions
const combineTextWithQuestions = (textId) => {
  const text = readingTextsC1.find(t => t.id === textId);
  const questions = readingQuestionsC1.find(q => q.textId === textId);

  if (!text || !questions) {

    return null;
  }

  return {
    ...text,
    questions: questions.questions
  };
};

// Fonction pour obtenir tous les exercices combinés
const getAllC1Exercises = () => {
  return readingTextsC1.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Fonction pour obtenir un exercice par ID
const getC1ExerciseById = (textId) => {
  return combineTextWithQuestions(textId);
};

// Fonction pour obtenir des exercices par difficulté
const getC1ExercisesByDifficulty = (difficulty) => {
  const filteredTexts = readingTextsC1.filter(text => text.difficulty === difficulty);
  return filteredTexts.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Fonction pour obtenir des exercices par sujet
const getC1ExercisesByTopic = (topic) => {
  const filteredTexts = readingTextsC1.filter(text => 
    text.topics?.includes(topic)
  );
  return filteredTexts.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Métadonnées du niveau C1
const c1Metadata = {
  level: "C1",
  totalTexts: readingTextsC1.length,
  totalQuestions: readingQuestionsC1.reduce((sum, q) => sum + q.questions.length, 0),
  averageWordCount: Math.round(readingTextsC1.reduce((sum, text) => sum + text.wordCount, 0) / readingTextsC1.length),
  difficulties: [...new Set(readingTextsC1.map(text => text.difficulty))].sort(),
  topics: [...new Set(readingTextsC1.flatMap(text => text.topics))].sort(),
  description: "Advanced level reading comprehension exercises featuring complex philosophical, scientific, and cultural texts with sophisticated vocabulary and nuanced argumentation."
};

// Export par défaut avec structure complète
const readingC1Data = {
  metadata: c1Metadata,
  exercises: getAllC1Exercises(),

  // Fonctions utilitaires
  getAll: getAllC1Exercises,
  getById: getC1ExerciseById,
  getByDifficulty: getC1ExercisesByDifficulty,
  getByTopic: getC1ExercisesByTopic,

  // Accès séparé aux données brutes
  texts: readingTextsC1,
  questions: readingQuestionsC1
};

export default readingC1Data;

// Exports nommés pour plus de flexibilité
export {
  readingTextsC1,
  readingQuestionsC1,
  getAllC1Exercises,
  getC1ExerciseById,
  getC1ExercisesByDifficulty,
  getC1ExercisesByTopic,
  c1Metadata
};
