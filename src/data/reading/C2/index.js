// src/data/exercises/reading/readingC2Index.js

import readingTextsC2 from './categories/readingTextsC2.js';
import readingQuestionsC2 from './categories/readingQuestionsC2.js';

// Fonction pour combiner textes et questions
const combineTextWithQuestions = (textId) => {
  const text = readingTextsC2.find(t => t.id === textId);
  const questions = readingQuestionsC2.find(q => q.textId === textId);
  
  if (!text || !questions) {
    console.warn(`Text or questions not found for ID: ${textId}`);
    return null;
  }
  
  return {
    ...text,
    questions: questions.questions
  };
};

// Fonction pour obtenir tous les exercices combinés
const getAllC2Exercises = () => {
  return readingTextsC2.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Fonction pour obtenir un exercice par ID
const getC2ExerciseById = (textId) => {
  return combineTextWithQuestions(textId);
};

// Fonction pour obtenir des exercices par difficulté
const getC2ExercisesByDifficulty = (difficulty) => {
  const filteredTexts = readingTextsC2.filter(text => text.difficulty === difficulty);
  return filteredTexts.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Fonction pour obtenir des exercices par sujet
const getC2ExercisesByTopic = (topic) => {
  const filteredTexts = readingTextsC2.filter(text => 
    text.topics?.includes(topic)
  );
  return filteredTexts.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Métadonnées du niveau C2
const c2Metadata = {
  level: "C2",
  totalTexts: readingTextsC2.length,
  totalQuestions: readingQuestionsC2.reduce((sum, q) => sum + q.questions.length, 0),
  averageWordCount: Math.round(readingTextsC2.reduce((sum, text) => sum + text.wordCount, 0) / readingTextsC2.length),
  difficulties: [...new Set(readingTextsC2.map(text => text.difficulty))].sort(),
  topics: [...new Set(readingTextsC2.flatMap(text => text.topics))].sort(),
  description: "Mastery level reading comprehension exercises featuring highly sophisticated philosophical, academic, and literary texts with complex argumentation, extensive vocabulary, and nuanced interpretive challenges."
};

// Export par défaut avec structure complète
const readingC2Data = {
  metadata: c2Metadata,
  exercises: getAllC2Exercises(),
  
  // Fonctions utilitaires
  getAll: getAllC2Exercises,
  getById: getC2ExerciseById,
  getByDifficulty: getC2ExercisesByDifficulty,
  getByTopic: getC2ExercisesByTopic,
  
  // Accès séparé aux données brutes
  texts: readingTextsC2,
  questions: readingQuestionsC2
};

export default readingC2Data;

// Exports nommés pour plus de flexibilité
export {
  readingTextsC2,
  readingQuestionsC2,
  getAllC2Exercises,
  getC2ExerciseById,
  getC2ExercisesByDifficulty,
  getC2ExercisesByTopic,
  c2Metadata
};