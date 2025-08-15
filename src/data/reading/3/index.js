// src/data/exercises/reading/readingB1Index.js

import readingTextsB1 from './categories/readingTextsB1.js';
import readingQuestionsB1 from './categories/readingQuestionsB1.js';

// Fonction pour combiner textes et questions
const combineTextWithQuestions = (textId) => {
  const text = readingTextsB1.find(t => t.id === textId);
  const questions = readingQuestionsB1.find(q => q.textId === textId);

  if (!text || !questions) {

    return null;
  }

  return {
    ...text,
    questions: questions.questions
  };
};

// Fonction pour obtenir tous les exercices combinés
const getAllB1Exercises = () => {
  return readingTextsB1.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Fonction pour obtenir un exercice par ID
const getB1ExerciseById = (textId) => {
  return combineTextWithQuestions(textId);
};

// Fonction pour obtenir des exercices par difficulté
const getB1ExercisesByDifficulty = (difficulty) => {
  const filteredTexts = readingTextsB1.filter(text => text.difficulty === difficulty);
  return filteredTexts.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Fonction pour obtenir des exercices par sujet
const getB1ExercisesByTopic = (topic) => {
  const filteredTexts = readingTextsB1.filter(text => 
    text.topics?.includes(topic)
  );
  return filteredTexts.map(text => combineTextWithQuestions(text.id)).filter(Boolean);
};

// Métadonnées du niveau B1
const b1Metadata = {
  level: "B1",
  totalTexts: readingTextsB1.length,
  totalQuestions: readingQuestionsB1.reduce((sum, q) => sum + q.questions.length, 0),
  averageWordCount: Math.round(readingTextsB1.reduce((sum, text) => sum + text.wordCount, 0) / readingTextsB1.length),
  
  // ✅ BEST PRACTICE : Tri numérique pour les difficultés (niveaux ordonnés)
  difficulties: [...new Set(readingTextsB1.map(text => text.difficulty))]
    .filter(difficulty => typeof difficulty === 'number')
    .sort((a, b) => a - b),
  
  // ✅ BEST PRACTICE : Tri alphabétique pour les topics (strings)
  topics: [...new Set(readingTextsB1.flatMap(text => text.topics))]
    .filter(topic => typeof topic === 'string' && topic.trim())
    .sort((a, b) => a.localeCompare(b)),
    
  description: "Intermediate level reading comprehension exercises focusing on familiar topics, opinions, and experiences."
};

// Export par défaut avec structure complète
const readingB1Data = {
  metadata: b1Metadata,
  exercises: getAllB1Exercises(),

  // Fonctions utilitaires
  getAll: getAllB1Exercises,
  getById: getB1ExerciseById,
  getByDifficulty: getB1ExercisesByDifficulty,
  getByTopic: getB1ExercisesByTopic,

  // Accès séparé aux données brutes
  texts: readingTextsB1,
  questions: readingQuestionsB1
};

export default readingB1Data;

// Exports nommés pour plus de flexibilité
export {
  readingTextsB1,
  readingQuestionsB1,
  getAllB1Exercises,
  getB1ExerciseById,
  getB1ExercisesByDifficulty,
  getB1ExercisesByTopic,
  b1Metadata
};
